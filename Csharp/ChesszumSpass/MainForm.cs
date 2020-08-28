using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ChesszumSpass
{
    public partial class MainForm : Form
    {
        const int SIZE = 640;
        Game game;
        Drawer drawer;

        public MainForm()
        {
            InitializeComponent();

            game = new Game();
            game.setPlayer(true, false);
            drawer = new Drawer(SIZE);
            update_output();
            game.setDifficulty(trackBar_diff.Value);
        }

        private void pictureBox_main_MouseDown(object sender, MouseEventArgs e)
        {
            int x = Math.Min(7, Math.Max(0, e.X / (SIZE / 8)));
            int y = Math.Min(7, Math.Max(0, e.Y / (SIZE / 8)));
            if (!game.whiteTurn)
            {
                x = 7 - x;
                y = 7 - y;
            }
            game.tryMove(x, y);
            update_output();
        }

        private void button_restart_Click(object sender, EventArgs e)
        {
            game.reset();
            update_output();
        }

        private void radioButton_whiteblack_CheckedChanged(object sender, EventArgs e)
        {
            game.setPlayer(radioButton_white.Checked || radioButton_both.Checked, radioButton_both.Checked);
        }

        private void button_back_Click(object sender, EventArgs e)
        {
            game.revertStep();
            update_output();
        }

        private void update_output()
        {
            pictureBox_main.Image = drawer.update(game);

            if (game.checkmate)
            {
                textBox_check.Text = "Checkmate";
            }
            else if (game.check)
            {
                textBox_check.Text = "Check";
            }
            else if (game.draw)
            {
                textBox_check.Text = "Draw";
            }
            else
            {
                textBox_check.Text = "";
            }

            label_speed.Text = "Calcspeed: " + Opponent.checkedMoves + " Moves in " + Opponent.timeMs + " ms = ";
            if (Opponent.timeMs > 0)
            {
                label_speed.Text += (Opponent.checkedMoves * 1000 / Opponent.timeMs) + "/s";
            }

            richTextBox_history.Text = game.board.getHistoryText();
            richTextBox_history.ScrollToCaret();
        }

        private void trackBar_diff_ValueChanged(object sender, EventArgs e)
        {
            game.setDifficulty(trackBar_diff.Value);
        }
    }
}

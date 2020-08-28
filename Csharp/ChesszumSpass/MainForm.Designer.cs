namespace ChesszumSpass
{
    partial class MainForm
    {
        /// <summary>
        /// Erforderliche Designervariable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Verwendete Ressourcen bereinigen.
        /// </summary>
        /// <param name="disposing">True, wenn verwaltete Ressourcen gelöscht werden sollen; andernfalls False.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Vom Windows Form-Designer generierter Code

        /// <summary>
        /// Erforderliche Methode für die Designerunterstützung.
        /// Der Inhalt der Methode darf nicht mit dem Code-Editor geändert werden.
        /// </summary>
        private void InitializeComponent()
        {
            this.pictureBox_main = new System.Windows.Forms.PictureBox();
            this.button_restart = new System.Windows.Forms.Button();
            this.radioButton_white = new System.Windows.Forms.RadioButton();
            this.radioButton_black = new System.Windows.Forms.RadioButton();
            this.groupBox_color = new System.Windows.Forms.GroupBox();
            this.radioButton_both = new System.Windows.Forms.RadioButton();
            this.button_back = new System.Windows.Forms.Button();
            this.textBox_check = new System.Windows.Forms.TextBox();
            this.trackBar_diff = new System.Windows.Forms.TrackBar();
            this.label_speed = new System.Windows.Forms.Label();
            this.richTextBox_history = new System.Windows.Forms.RichTextBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_main)).BeginInit();
            this.groupBox_color.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar_diff)).BeginInit();
            this.SuspendLayout();
            // 
            // pictureBox_main
            // 
            this.pictureBox_main.Location = new System.Drawing.Point(12, 12);
            this.pictureBox_main.Name = "pictureBox_main";
            this.pictureBox_main.Size = new System.Drawing.Size(640, 640);
            this.pictureBox_main.TabIndex = 0;
            this.pictureBox_main.TabStop = false;
            this.pictureBox_main.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pictureBox_main_MouseDown);
            // 
            // button_restart
            // 
            this.button_restart.Location = new System.Drawing.Point(805, 12);
            this.button_restart.Name = "button_restart";
            this.button_restart.Size = new System.Drawing.Size(75, 23);
            this.button_restart.TabIndex = 1;
            this.button_restart.Text = "Restart";
            this.button_restart.UseVisualStyleBackColor = true;
            this.button_restart.Click += new System.EventHandler(this.button_restart_Click);
            // 
            // radioButton_white
            // 
            this.radioButton_white.AutoSize = true;
            this.radioButton_white.Checked = true;
            this.radioButton_white.Location = new System.Drawing.Point(6, 19);
            this.radioButton_white.Name = "radioButton_white";
            this.radioButton_white.Size = new System.Drawing.Size(53, 17);
            this.radioButton_white.TabIndex = 2;
            this.radioButton_white.TabStop = true;
            this.radioButton_white.Text = "White";
            this.radioButton_white.UseVisualStyleBackColor = true;
            this.radioButton_white.CheckedChanged += new System.EventHandler(this.radioButton_whiteblack_CheckedChanged);
            // 
            // radioButton_black
            // 
            this.radioButton_black.AutoSize = true;
            this.radioButton_black.Location = new System.Drawing.Point(6, 42);
            this.radioButton_black.Name = "radioButton_black";
            this.radioButton_black.Size = new System.Drawing.Size(52, 17);
            this.radioButton_black.TabIndex = 3;
            this.radioButton_black.Text = "Black";
            this.radioButton_black.UseVisualStyleBackColor = true;
            this.radioButton_black.CheckedChanged += new System.EventHandler(this.radioButton_whiteblack_CheckedChanged);
            // 
            // groupBox_color
            // 
            this.groupBox_color.Controls.Add(this.radioButton_both);
            this.groupBox_color.Controls.Add(this.radioButton_white);
            this.groupBox_color.Controls.Add(this.radioButton_black);
            this.groupBox_color.Location = new System.Drawing.Point(658, 12);
            this.groupBox_color.Name = "groupBox_color";
            this.groupBox_color.Size = new System.Drawing.Size(90, 91);
            this.groupBox_color.TabIndex = 4;
            this.groupBox_color.TabStop = false;
            this.groupBox_color.Text = "Choose Side";
            // 
            // radioButton_both
            // 
            this.radioButton_both.AutoSize = true;
            this.radioButton_both.Location = new System.Drawing.Point(7, 65);
            this.radioButton_both.Name = "radioButton_both";
            this.radioButton_both.Size = new System.Drawing.Size(47, 17);
            this.radioButton_both.TabIndex = 4;
            this.radioButton_both.Text = "Both";
            this.radioButton_both.UseVisualStyleBackColor = true;
            this.radioButton_both.CheckedChanged += new System.EventHandler(this.radioButton_whiteblack_CheckedChanged);
            // 
            // button_back
            // 
            this.button_back.Location = new System.Drawing.Point(805, 41);
            this.button_back.Name = "button_back";
            this.button_back.Size = new System.Drawing.Size(75, 23);
            this.button_back.TabIndex = 5;
            this.button_back.Text = "Revert Step";
            this.button_back.UseVisualStyleBackColor = true;
            this.button_back.Click += new System.EventHandler(this.button_back_Click);
            // 
            // textBox_check
            // 
            this.textBox_check.Location = new System.Drawing.Point(658, 109);
            this.textBox_check.Name = "textBox_check";
            this.textBox_check.ReadOnly = true;
            this.textBox_check.Size = new System.Drawing.Size(87, 20);
            this.textBox_check.TabIndex = 6;
            // 
            // trackBar_diff
            // 
            this.trackBar_diff.Location = new System.Drawing.Point(754, 12);
            this.trackBar_diff.Maximum = 5;
            this.trackBar_diff.Minimum = 1;
            this.trackBar_diff.Name = "trackBar_diff";
            this.trackBar_diff.Orientation = System.Windows.Forms.Orientation.Vertical;
            this.trackBar_diff.Size = new System.Drawing.Size(45, 91);
            this.trackBar_diff.TabIndex = 7;
            this.trackBar_diff.Value = 2;
            this.trackBar_diff.ValueChanged += new System.EventHandler(this.trackBar_diff_ValueChanged);
            // 
            // label_speed
            // 
            this.label_speed.AutoSize = true;
            this.label_speed.Location = new System.Drawing.Point(658, 641);
            this.label_speed.Name = "label_speed";
            this.label_speed.Size = new System.Drawing.Size(60, 13);
            this.label_speed.TabIndex = 8;
            this.label_speed.Text = "Calcspeed:";
            // 
            // richTextBox_history
            // 
            this.richTextBox_history.Location = new System.Drawing.Point(658, 135);
            this.richTextBox_history.Name = "richTextBox_history";
            this.richTextBox_history.ReadOnly = true;
            this.richTextBox_history.Size = new System.Drawing.Size(222, 503);
            this.richTextBox_history.TabIndex = 9;
            this.richTextBox_history.Text = "";
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(904, 681);
            this.Controls.Add(this.richTextBox_history);
            this.Controls.Add(this.label_speed);
            this.Controls.Add(this.trackBar_diff);
            this.Controls.Add(this.textBox_check);
            this.Controls.Add(this.button_back);
            this.Controls.Add(this.groupBox_color);
            this.Controls.Add(this.button_restart);
            this.Controls.Add(this.pictureBox_main);
            this.MaximizeBox = false;
            this.MaximumSize = new System.Drawing.Size(920, 720);
            this.Name = "MainForm";
            this.Text = "ChesszumSpass";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_main)).EndInit();
            this.groupBox_color.ResumeLayout(false);
            this.groupBox_color.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar_diff)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBox_main;
        private System.Windows.Forms.Button button_restart;
        private System.Windows.Forms.RadioButton radioButton_white;
        private System.Windows.Forms.RadioButton radioButton_black;
        private System.Windows.Forms.GroupBox groupBox_color;
        private System.Windows.Forms.RadioButton radioButton_both;
        private System.Windows.Forms.Button button_back;
        private System.Windows.Forms.TextBox textBox_check;
        private System.Windows.Forms.TrackBar trackBar_diff;
        private System.Windows.Forms.Label label_speed;
        private System.Windows.Forms.RichTextBox richTextBox_history;
    }
}


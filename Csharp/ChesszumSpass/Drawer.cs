using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChesszumSpass
{
    class Drawer
    {
        Bitmap bitmap;
        int size;

        Image[] pieceimg;

        public Drawer(int size)
        {
            this.size = size;
            bitmap = new Bitmap(size, size);

            pieceimg = new Bitmap[12];
            for (int i = 0; i < 12; i++)
            {
                pieceimg[i] = Bitmap.FromFile("..\\images\\" + ((Pieces)(i + 1)).ToString() + ".png");
            }
        }

        public Bitmap update(Game game)
        {
            int rectsize = size / 8;
            int field = 0;
            using (Graphics g = Graphics.FromImage(bitmap))
            {
                for (int y = 0; y < 8; y++)
                {
                    for (int x = 0; x < 8; x++)
                    {
                        bool movpos = false;
                        if (game.ismarked)
                        {
                            for (int i = 0; i < game.possiblePos.Count; i++)
                            {
                                if (((game.whiteTurn && game.possiblePos[i].x == x) || (!game.whiteTurn && game.possiblePos[i].x == 7 - x)) && ((game.whiteTurn && game.possiblePos[i].y == y) || (!game.whiteTurn && game.possiblePos[i].y == 7 - y)))
                                {
                                    movpos = true;
                                    break;
                                }
                            }
                        }
                        if (movpos)
                        {
                            if (field % 2 == 0)
                            {
                                g.FillRectangle(Brushes.LightGray, rectsize * x, rectsize * y, rectsize, rectsize);
                            }
                            else
                            {
                                g.FillRectangle(Brushes.SlateGray, rectsize * x, rectsize * y, rectsize, rectsize);
                            }
                        }
                        else
                        {
                            if (field % 2 == 0)
                            {
                                g.FillRectangle(Brushes.RosyBrown, rectsize * x, rectsize * y, rectsize, rectsize);
                            }
                            else
                            {
                                g.FillRectangle(Brushes.Brown, rectsize * x, rectsize * y, rectsize, rectsize);
                            }
                        }
                        field++;
                    }
                    field++;
                }

                Font font = new Font(FontFamily.GenericMonospace, (float)(rectsize / 8));
                for (int i = 0; i < 8; i++)
                {
                    int pos = 8 - i;
                    if (!game.whiteTurn) pos = i + 1;
                    g.DrawString(pos.ToString(), font, Brushes.Black, 1 , 1 + rectsize * i);
                    g.DrawString(Convert.ToChar(Convert.ToByte('a') + 8 - pos).ToString(), font, Brushes.Black, 1 + rectsize * i + (float)(rectsize * 0.8), 1 + 7 * rectsize + (float)(rectsize * 0.8));
                }

                for (int y = 0; y < 8; y++)
                {
                    for (int x = 0; x < 8; x++)
                    {
                        if (game.board.pieces[y, x] != Pieces.EMPTY)
                        {
                            int posx = rectsize * x;
                            int posy = rectsize * y;
                            if (!game.whiteTurn)
                            {
                                posx = rectsize * (7 - x);
                                posy = rectsize * (7 - y);
                            }
                            g.DrawImage(pieceimg[((int)game.board.pieces[y, x]) - 1], posx, posy, rectsize, rectsize);
                        }
                    }
                }

                if (game.ismarked && game.marked.x >= 0 && game.marked.y >= 0 && game.marked.x < 8 && game.marked.y < 8)
                {
                    int posx = game.marked.x;
                    int posy = game.marked.y;
                    if (!game.whiteTurn)
                    {
                        posx = 7 - posx;
                        posy = 7 - posy;
                    }
                    g.FillRectangle(Brushes.LimeGreen, rectsize * posx, rectsize * posy, rectsize, rectsize / 16);
                    g.FillRectangle(Brushes.LimeGreen, rectsize * posx, rectsize * posy + rectsize / 16 * 15, rectsize, rectsize / 16);
                    g.FillRectangle(Brushes.LimeGreen, rectsize * posx, rectsize * posy, rectsize / 16, rectsize);
                    g.FillRectangle(Brushes.LimeGreen, rectsize * posx + rectsize / 16 * 15, rectsize * posy, rectsize / 16, rectsize);
                }
            }

            return bitmap;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChesszumSpass
{
    class Game
    {
        public Board board;

        int difficulty;
        bool playerWhite;
        bool playerBoth;
        public bool whiteTurn;

        public List<Move> possibleMoves;
        public List<Position> possiblePos;

        public bool ismarked;
        public Position marked;

        public bool checkmate;
        public bool check;
        public bool draw;

        public Game()
        {
            board = new Board();
            marked = new Position(-1, -1);
            possiblePos = new List<Position>();
            possibleMoves = new List<Move>();
            playerWhite = true;
            reset();
        }

        public void reset()
        {
            board.reset();
            ismarked = false;
            whiteTurn = true;
            check = false;
            checkmate = false;
            draw = false;
            if (playerBoth) playerWhite = true;
            possibleMoves = Rules.checkMoves(board, whiteTurn, true);
            if (playerWhite != whiteTurn)
            {
                Opponent.move(board, possibleMoves, whiteTurn, difficulty);
                whiteTurn = !whiteTurn;
                possibleMoves = Rules.checkMoves(board, whiteTurn, true);
            }
        }

        public void setPlayer(bool isWhite, bool both)
        {
            playerWhite = isWhite;
            playerBoth = both;
        }

        public void setDifficulty(int difficulty)
        {
            this.difficulty = difficulty;
        }

        public void tryMove(int x, int y)
        {
            if (checkmate) return;
            
            if (posIsPlayer(x, y)) ismarked = false;

            if (ismarked)
            {
                for (int i = 0; i < possiblePos.Count; i++)
                {
                    if (possiblePos[i].x == x && possiblePos[i].y == y)
                    {
                        board.move(new Move(marked, new Position(y, x)), true);
                        whiteTurn = !whiteTurn;
                        if (playerBoth) playerWhite = !playerWhite;
                        possibleMoves = Rules.checkMoves(board, whiteTurn, true);
                        if (playerWhite != whiteTurn && possibleMoves.Count > 0) 
                        { 
                            Opponent.move(board, possibleMoves, whiteTurn, difficulty);
                            whiteTurn = !whiteTurn;
                            possibleMoves = Rules.checkMoves(board, whiteTurn, true);
                        }
                        checkCheck();
                        break;
                    }
                }
                ismarked = false;
            }
            else
            {
                int start = 7;
                if (playerWhite) start = 1;
                if ((int)board.pieces[y, x] >= start && (int)board.pieces[y, x] < start + 6)
                {
                    possiblePos.Clear();
                    for (int i = 0; i < possibleMoves.Count; i++)
                    {
                        if (possibleMoves[i].source.x == x && possibleMoves[i].source.y == y)
                        {
                            possiblePos.Add(possibleMoves[i].target);
                        }
                    }
                    if (possiblePos.Count > 0)
                    {
                        ismarked = true;
                        marked.x = x;
                        marked.y = y;
                    }
                }
            }
        }

        public void revertStep()
        {
            if (board.revertStep(true))
            {
                ismarked = false;
                whiteTurn = !whiteTurn;
                if (playerBoth) playerWhite = !playerWhite;
                possibleMoves = Rules.checkMoves(board, whiteTurn, true);
                checkCheck();
            }
        }

        private bool posIsPlayer(int x, int y)
        {
            if (playerWhite && (int)board.pieces[y, x] >= 1 && (int)board.pieces[y, x] < 7) return true;
            if (!playerWhite && (int)board.pieces[y, x] >= 7 && (int)board.pieces[y, x] < 13) return true;
            return false;
        }

        private void checkCheck()
        {
            check = !Rules.checkFieldSave(board, whiteTurn, Rules.getKingPos(board, whiteTurn));
            checkmate = possibleMoves.Count == 0 && check;
            draw = possibleMoves.Count == 0 && !check;
        }

    }
}

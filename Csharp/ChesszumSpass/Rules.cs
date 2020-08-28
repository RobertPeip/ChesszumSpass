using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChesszumSpass
{
    public static class Rules
    {
        public static List<Move> checkMoves(Board board, bool whiteTurn, bool kingCheck)
        {
            List<Move> moves = new List<Move>();

            for (int y = 0; y < 8; y++)
            {
                for (int x = 0; x < 8; x++)
                {
                    if (board.pieces[y, x] != Pieces.EMPTY)
                    {
                        bool isWhite = true;
                        if ((int)board.pieces[y, x] >= 7) isWhite = false;
                        if (whiteTurn == isWhite)
                        {
                            Position pos = new Position(y, x);
                            if (board.pieces[y, x] == Pieces.WHITE_PAWN   || board.pieces[y, x] == Pieces.BLACK_PAWN) moves.AddRange(checkMovesPawn(board, pos, isWhite));
                            if (board.pieces[y, x] == Pieces.WHITE_KNIGHT || board.pieces[y, x] == Pieces.BLACK_KNIGHT) moves.AddRange(checkMovesKnight(board, pos, isWhite));
                            if (board.pieces[y, x] == Pieces.WHITE_BISHOP || board.pieces[y, x] == Pieces.BLACK_BISHOP) moves.AddRange(checkMovesBishop(board, pos, isWhite, 7));
                            if (board.pieces[y, x] == Pieces.WHITE_ROOK   || board.pieces[y, x] == Pieces.BLACK_ROOK) moves.AddRange(checkMovesRook(board, pos, isWhite, 7));
                            if (board.pieces[y, x] == Pieces.WHITE_QUEEN  || board.pieces[y, x] == Pieces.BLACK_QUEEN) moves.AddRange(checkMovesQueen(board, pos, isWhite));
                            if (board.pieces[y, x] == Pieces.WHITE_KING   || board.pieces[y, x] == Pieces.BLACK_KING) moves.AddRange(checkMovesKing(board, pos, isWhite, kingCheck));
                        }
                    }
                }
            }

            if (kingCheck)
            {
                for (int i = 0; i < moves.Count; i++)
                {
                    board.move(moves[i], false);
                    if (!checkFieldSave(board, whiteTurn, getKingPos(board, whiteTurn)))
                    {
                        moves.RemoveAt(i);
                        i--;
                    }
                    board.revertStep(false);
                }
            }

            return moves;
        }

        public static void addIfEmpty(Board board, Position pos, List<Position> checkpos, List<Move> list)
        {
            for (int i = 0; i < checkpos.Count; i++)
            {
                if (checkpos[i].x < 0 || checkpos[i].x > 7 || checkpos[i].y < 0 || checkpos[i].y > 7) continue;
                if (board.pieces[checkpos[i].y, checkpos[i].x] != Pieces.EMPTY)
                {
                    return;
                }
                else
                {
                    list.Add(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
                }
            }
        }

        public static void addIfColor(Board board, Position pos, List<Position> checkpos, List<Move> list, bool checkWhite)
        {
            for (int i = 0; i < checkpos.Count; i++)
            {
                if (checkpos[i].x < 0 || checkpos[i].x > 7 || checkpos[i].y < 0 || checkpos[i].y > 7) continue;
                if (board.pieces[checkpos[i].y, checkpos[i].x] != Pieces.EMPTY)
                {
                    bool isWhite = true;
                    if ((int)board.pieces[checkpos[i].y, checkpos[i].x] >= 7) isWhite = false;
                    if (checkWhite == isWhite) list.Add(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
                }
            }
        }

        public static void addIfEmptyOrColor(Board board, Position pos, List<Position> checkpos, List<Move> list, bool checkWhite, bool stopOnPiece)
        {
            for (int i = 0; i < checkpos.Count; i++)
            {
                if (checkpos[i].x < 0 || checkpos[i].x > 7 || checkpos[i].y < 0 || checkpos[i].y > 7) continue;
                if (board.pieces[checkpos[i].y, checkpos[i].x] != Pieces.EMPTY)
                {
                    bool isWhite = true;
                    if ((int)board.pieces[checkpos[i].y, checkpos[i].x] >= 7) isWhite = false;
                    if (checkWhite == isWhite) list.Add(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
                    if (stopOnPiece) return;
                }  
                else
                {
                    list.Add(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
                }
            }
        }

        public static Position getKingPos(Board board, bool isWhite)
        {
            for (int y = 0; y < 8; y++)
            {
                for (int x = 0; x < 8; x++)
                {
                    if ((board.pieces[y, x] == Pieces.WHITE_KING && isWhite) || (board.pieces[y, x] == Pieces.BLACK_KING && !isWhite)) return new Position(y, x);
                }
            }
            return new Position(0, 0);
        }

        private static bool fieldHostile(Board board, bool isWhite, Position pos, int distance, int xdir, int ydir)
        {
            if (board.pieces[pos.y, pos.x] == Pieces.EMPTY) return false;
            if (((int)board.pieces[pos.y, pos.x] >= 7 && isWhite) || ((int)board.pieces[pos.y, pos.x] < 7 && !isWhite))
            {
                if (board.pieces[pos.y, pos.x] == Pieces.WHITE_PAWN && distance == 1 && ydir == 1 && (xdir == -1 || xdir == 1)) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.BLACK_PAWN && distance == 1 && ydir == -1 && (xdir == -1 || xdir == 1)) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.WHITE_BISHOP && ydir != 0 && xdir != 0) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.BLACK_BISHOP && ydir != 0 && xdir != 0) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.WHITE_ROOK && (ydir == 0 || xdir == 0)) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.BLACK_ROOK && (ydir == 0 || xdir == 0)) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.WHITE_QUEEN) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.BLACK_QUEEN) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.WHITE_KING && distance == 1) return true;
                if (board.pieces[pos.y, pos.x] == Pieces.BLACK_KING && distance == 1) return true;
            }
            return false;
        }

        public static bool checkFieldSave(Board board, bool isWhite, Position pos)
        {
            // all but knight
            for (int x = -1; x <= 1; x++)
            {
                for (int y = -1; y <= 1; y++)
                {
                    if (x != 0 || y != 0)
                    {
                        for (int i = 1; i <= 7; i++)
                        {
                            int checkx = pos.x + (i * x);
                            int checky = pos.y + (i * y);
                            if (checkx < 0 || checkx > 7 || checky < 0 || checky > 7) break;
                            if (checkx == 2 && checky == 4)
                            {
                                int a = 5;
                            }
                            if (fieldHostile(board, isWhite, new Position(checky, checkx), i, x, y)) return false;
                            if (board.pieces[checky, checkx] != Pieces.EMPTY) break;
                        }
                    }
                }
            }
            //knight
            if (isWhite)
            {
                if (pos.x > 1 && pos.y > 0 && board.pieces[pos.y - 1, pos.x - 2] == Pieces.BLACK_KNIGHT) return false;
                if (pos.x > 0 && pos.y > 1 && board.pieces[pos.y - 2, pos.x - 1] == Pieces.BLACK_KNIGHT) return false;
                if (pos.x > 0 && pos.y < 6 && board.pieces[pos.y + 2, pos.x - 1] == Pieces.BLACK_KNIGHT) return false;
                if (pos.x > 1 && pos.y < 7 && board.pieces[pos.y + 1, pos.x - 2] == Pieces.BLACK_KNIGHT) return false;
                if (pos.x < 6 && pos.y > 0 && board.pieces[pos.y - 1, pos.x + 2] == Pieces.BLACK_KNIGHT) return false;
                if (pos.x < 7 && pos.y > 1 && board.pieces[pos.y - 2, pos.x + 1] == Pieces.BLACK_KNIGHT) return false;
                if (pos.x < 7 && pos.y < 6 && board.pieces[pos.y + 2, pos.x + 1] == Pieces.BLACK_KNIGHT) return false;
                if (pos.x < 6 && pos.y < 7 && board.pieces[pos.y + 1, pos.x + 2] == Pieces.BLACK_KNIGHT) return false;
            }
            else
            {
                if (pos.x > 1 && pos.y > 0 && board.pieces[pos.y - 1, pos.x - 2] == Pieces.WHITE_KNIGHT) return false;
                if (pos.x > 0 && pos.y > 1 && board.pieces[pos.y - 2, pos.x - 1] == Pieces.WHITE_KNIGHT) return false;
                if (pos.x > 0 && pos.y < 6 && board.pieces[pos.y + 2, pos.x - 1] == Pieces.WHITE_KNIGHT) return false;
                if (pos.x > 1 && pos.y < 7 && board.pieces[pos.y + 1, pos.x - 2] == Pieces.WHITE_KNIGHT) return false;
                if (pos.x < 6 && pos.y > 0 && board.pieces[pos.y - 1, pos.x + 2] == Pieces.WHITE_KNIGHT) return false;
                if (pos.x < 7 && pos.y > 1 && board.pieces[pos.y - 2, pos.x + 1] == Pieces.WHITE_KNIGHT) return false;
                if (pos.x < 7 && pos.y < 6 && board.pieces[pos.y + 2, pos.x + 1] == Pieces.WHITE_KNIGHT) return false;
                if (pos.x < 6 && pos.y < 7 && board.pieces[pos.y + 1, pos.x + 2] == Pieces.WHITE_KNIGHT) return false;
            }

            return true;
        }

        public static List<Move> checkMovesPawn(Board board, Position pos, bool isWhite)
        {
            List<Move> moves = new List<Move>();

            List<Position> checkpos = new List<Position>();
            if (isWhite)
            {
                checkpos.Add(new Position(pos.y - 1, pos.x));
                if (pos.y == 6) checkpos.Add(new Position(pos.y - 2, pos.x));
                addIfEmpty(board, pos, checkpos, moves);
                checkpos.Clear();
                checkpos.Add(new Position(pos.y - 1, pos.x - 1));
                checkpos.Add(new Position(pos.y - 1, pos.x + 1));
                addIfColor(board, pos, checkpos, moves, false);
            }
            else
            {
                checkpos.Add(new Position(pos.y + 1, pos.x));;
                if (pos.y == 1) checkpos.Add(new Position(pos.y + 2, pos.x));
                addIfEmpty(board, pos, checkpos, moves);
                checkpos.Clear();
                checkpos.Add(new Position(pos.y + 1, pos.x - 1));
                checkpos.Add(new Position(pos.y + 1, pos.x + 1));
                addIfColor(board, pos, checkpos, moves, true);
            }

            if (board.allowEnPassant)
            {
                if (pos.y == board.enPassantRow)
                {
                    if (pos.x - 1 == board.enPassantColumn || pos.x + 1 == board.enPassantColumn)
                    {
                        if (isWhite)
                        {
                            moves.Add(new Move(pos, new Position(board.enPassantRow - 1, board.enPassantColumn)));
                        }
                        else
                        {
                            moves.Add(new Move(pos, new Position(board.enPassantRow + 1, board.enPassantColumn)));
                        }
                    }
                }
            }

            return moves;
        }

        public static List<Move> checkMovesKnight(Board board, Position pos, bool isWhite)
        {
            List<Move> moves = new List<Move>();
            List<Position> checkpos = new List<Position>();
            
            checkpos.Add(new Position(pos.y - 1, pos.x - 2));
            checkpos.Add(new Position(pos.y - 2, pos.x - 1));
            checkpos.Add(new Position(pos.y + 2, pos.x - 1));
            checkpos.Add(new Position(pos.y + 1, pos.x - 2));
            checkpos.Add(new Position(pos.y - 1, pos.x + 2));
            checkpos.Add(new Position(pos.y - 2, pos.x + 1));
            checkpos.Add(new Position(pos.y + 2, pos.x + 1));
            checkpos.Add(new Position(pos.y + 1, pos.x + 2));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, false);
          
            return moves;
        }

        public static List<Move> checkMovesBishop(Board board, Position pos, bool isWhite, int distance)
        {
            List<Move> moves = new List<Move>();
            List<Position> checkpos = new List<Position>();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y - i, pos.x - i));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
            checkpos.Clear();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y - i, pos.x + i));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
            checkpos.Clear();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y + i, pos.x - i));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
            checkpos.Clear();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y + i, pos.x + i));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);

            return moves;
        }

        public static List<Move> checkMovesRook(Board board, Position pos, bool isWhite, int distance)
        {
            List<Move> moves = new List<Move>();
            List<Position> checkpos = new List<Position>();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y - i, pos.x));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
            checkpos.Clear();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y + i, pos.x));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
            checkpos.Clear();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y, pos.x - i));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
            checkpos.Clear();

            for (int i = 1; i <= distance; i++) checkpos.Add(new Position(pos.y, pos.x + i));
            addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);

            return moves;
        }

        public static List<Move> checkMovesQueen(Board board, Position pos, bool isWhite)
        {
            List<Move> moves = checkMovesBishop(board, pos, isWhite, 7);
            moves.AddRange(checkMovesRook(board, pos, isWhite, 7));
            return moves;
        }

        public static List<Move> checkMovesKing(Board board, Position pos, bool isWhite, bool castling_check)
        {
            List<Move> moves = checkMovesBishop(board, pos, isWhite, 1);
            moves.AddRange(checkMovesRook(board, pos, isWhite, 1));

            if (castling_check)
            {
                if (isWhite && !board.whiteKingMoved || !isWhite && !board.blackKingMoved)
                {
                    if (isWhite && !board.whiteRook1Moved || !isWhite && !board.blackRook1Moved)
                    {
                        if (board.pieces[pos.y, pos.x - 1] == Pieces.EMPTY && board.pieces[pos.y, pos.x - 2] == Pieces.EMPTY && board.pieces[pos.y, pos.x - 3] == Pieces.EMPTY)
                        {
                            if (checkFieldSave(board, isWhite, new Position(pos.y, pos.x)) && checkFieldSave(board, isWhite, new Position(pos.y, pos.x - 1)) && checkFieldSave(board, isWhite, new Position(pos.y, pos.x - 2)))
                            {
                                moves.Add(new Move(pos, new Position(pos.y, pos.x - 2)));
                            }
                        }
                    }
                    if (isWhite && !board.whiteRook2Moved || !isWhite && !board.blackRook2Moved)
                    {
                        if (board.pieces[pos.y, pos.x + 1] == Pieces.EMPTY && board.pieces[pos.y, pos.x + 2] == Pieces.EMPTY)
                        {
                            if (checkFieldSave(board, isWhite, new Position(pos.y, pos.x)) && checkFieldSave(board, isWhite, new Position(pos.y, pos.x + 1)) && checkFieldSave(board, isWhite, new Position(pos.y, pos.x + 2)))
                            {
                                moves.Add(new Move(pos, new Position(pos.y, pos.x + 2)));
                            }
                        }
                    }
                }
            }

            return moves;
        }
    }
}

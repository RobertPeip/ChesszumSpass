using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChesszumSpass
{
    public class Board
    {
        Pieces[,] initpos = new Pieces[8, 8]
        {
            { Pieces.BLACK_ROOK, Pieces.BLACK_KNIGHT, Pieces.BLACK_BISHOP, Pieces.BLACK_QUEEN, Pieces.BLACK_KING, Pieces.BLACK_BISHOP, Pieces.BLACK_KNIGHT, Pieces.BLACK_ROOK },
            { Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN },
            { Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY },
            { Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY },
            { Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY },
            { Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY },
            { Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN },
            { Pieces.WHITE_ROOK, Pieces.WHITE_KNIGHT, Pieces.WHITE_BISHOP, Pieces.WHITE_QUEEN, Pieces.WHITE_KING, Pieces.WHITE_BISHOP, Pieces.WHITE_KNIGHT, Pieces.WHITE_ROOK }
        };
        public Pieces[,] pieces;

        public bool whiteKingMoved;
        public bool whiteRook1Moved;
        public bool whiteRook2Moved;
        public bool blackKingMoved;
        public bool blackRook1Moved;
        public bool blackRook2Moved;

        public bool allowEnPassant;
        public byte enPassantColumn;
        public byte enPassantRow;

        List<UInt32[]> history;
        List<string> moveHistory;

        public Board()
        {
            pieces = new Pieces[8, 8];
            history = new List<uint[]>();
            moveHistory = new List<string>();
            reset();
        }

        public void reset()
        {
            copy(initpos, pieces);
            history.Clear();
            moveHistory.Clear();
            whiteKingMoved = false;
            whiteRook1Moved = false;
            whiteRook2Moved = false;
            blackKingMoved = false;
            blackRook1Moved = false;
            blackRook2Moved = false;
            allowEnPassant = false;
            enPassantColumn = 0;
            enPassantRow = 0;
        }

        public void copy(Pieces[,] from, Pieces[,] to)
        {
            for (int x = 0; x < 8; x++)
            {
                for (int y = 0; y < 8; y++)
                {
                    to[y, x] = from[y, x];
                }
            }
        }

        private void addHistoryText(Move move)
        {
            string text = (moveHistory.Count + 1).ToString() + ". ";
            if (pieces[move.source.y, move.source.x] == Pieces.WHITE_KNIGHT || pieces[move.source.y, move.source.x] == Pieces.BLACK_KNIGHT) text += "N";
            if (pieces[move.source.y, move.source.x] == Pieces.WHITE_BISHOP || pieces[move.source.y, move.source.x] == Pieces.BLACK_BISHOP) text += "B";
            if (pieces[move.source.y, move.source.x] == Pieces.WHITE_ROOK   || pieces[move.source.y, move.source.x] == Pieces.BLACK_ROOK)   text += "R";
            if (pieces[move.source.y, move.source.x] == Pieces.WHITE_QUEEN  || pieces[move.source.y, move.source.x] == Pieces.BLACK_QUEEN)  text += "Q";
            if (pieces[move.source.y, move.source.x] == Pieces.WHITE_KING   || pieces[move.source.y, move.source.x] == Pieces.BLACK_KING)   text += "K";

            text += Convert.ToChar(Convert.ToByte('a') + move.source.x).ToString();
            text += (8 - move.source.y).ToString();

            if (pieces[move.target.y, move.target.x] != Pieces.EMPTY) text += "x";

            if (pieces[move.target.y, move.target.x] == Pieces.WHITE_KNIGHT || pieces[move.target.y, move.target.x] == Pieces.BLACK_KNIGHT) text += "N";
            if (pieces[move.target.y, move.target.x] == Pieces.WHITE_BISHOP || pieces[move.target.y, move.target.x] == Pieces.BLACK_BISHOP) text += "B";
            if (pieces[move.target.y, move.target.x] == Pieces.WHITE_ROOK   || pieces[move.target.y, move.target.x] == Pieces.BLACK_ROOK)   text += "R";
            if (pieces[move.target.y, move.target.x] == Pieces.WHITE_QUEEN  || pieces[move.target.y, move.target.x] == Pieces.BLACK_QUEEN)  text += "Q";
            if (pieces[move.target.y, move.target.x] == Pieces.WHITE_KING   || pieces[move.target.y, move.target.x] == Pieces.BLACK_KING)   text += "K";

            text += Convert.ToChar(Convert.ToByte('a') + move.target.x).ToString();
            text += (8 - move.target.y).ToString();

            moveHistory.Add(text);
        }

        public string getHistoryText()
        {
            return string.Join("\n", moveHistory);
        }

        private void addHistory()
        {
            UInt32[] entry = new UInt32[9];
            for (int y = 0; y < 8; y++)
            {
                UInt32 line = 0;
                for (int x = 0; x < 8; x++)
                {
                    line = (line << 4) + (uint)pieces[y, x];
                }
                entry[y] = line;
            }
            entry[8] = enPassantColumn;
            entry[8] |= (uint)(enPassantRow << 3);
            if (allowEnPassant) entry[8] |= 0x40;
            if (whiteKingMoved ) entry[8] |= 0x100;
            if (whiteRook1Moved) entry[8] |= 0x200;
            if (whiteRook2Moved) entry[8] |= 0x400;
            if (blackKingMoved ) entry[8] |= 0x1000;
            if (blackRook1Moved) entry[8] |= 0x2000;
            if (blackRook2Moved) entry[8] |= 0x4000;

            history.Add(entry);
        }

        public bool revertStep(bool final)
        {
            if (final && moveHistory.Count > 0)
            {
                moveHistory.RemoveAt(moveHistory.Count - 1);
            }

            if (history.Count > 0)
            {
                UInt32[] entry = history[history.Count - 1];
                for (int y = 0; y < 8; y++)
                {
                    UInt32 line = entry[y];
                    for (int x = 0; x < 8; x++)
                    {
                        pieces[y, 7 - x] = (Pieces)(line & 0xF);
                        line >>= 4;
                    }
                }
                enPassantColumn = (byte)(entry[8] & 0x7);
                enPassantRow = (byte)((entry[8] >> 3) & 0x7);
                allowEnPassant  = ((entry[8] & 0x40  ) > 0);
                whiteKingMoved  = ((entry[8] & 0x100 ) > 0);
                whiteRook1Moved = ((entry[8] & 0x200 ) > 0);
                whiteRook2Moved = ((entry[8] & 0x400 ) > 0);
                blackKingMoved  = ((entry[8] & 0x1000) > 0);
                blackRook1Moved = ((entry[8] & 0x2000) > 0);
                blackRook2Moved = ((entry[8] & 0x4000) > 0);

                history.Remove(entry);
                return true;
            }
            return false;
        }

        public void move(Move move, bool final)
        {
            addHistory();
            if (final) addHistoryText(move);

            bool targetEmpty = false;
            if (pieces[move.target.y, move.target.x] == Pieces.EMPTY) targetEmpty = true;
            pieces[move.target.y, move.target.x] = pieces[move.source.y, move.source.x];

            if (move.source.y == 0 && move.source.x == 4) blackKingMoved = true;
            if (move.source.y == 0 && move.source.x == 0) blackRook1Moved = true;
            if (move.source.y == 0 && move.source.x == 7) blackRook2Moved = true;
            if (move.source.y == 7 && move.source.x == 4) whiteKingMoved = true;
            if (move.source.y == 7 && move.source.x == 0) whiteRook1Moved = true;
            if (move.source.y == 7 && move.source.x == 7) whiteRook2Moved = true;

            if (pieces[move.source.y, move.source.x] == Pieces.WHITE_KING || pieces[move.source.y, move.source.x] == Pieces.BLACK_KING) // castling
            {
                if (move.target.x < move.source.x - 1 || move.target.x > move.source.x + 1)
                {
                    if (move.target.x < 4) // queen side
                    {
                        pieces[move.target.y, 3] = pieces[move.target.y, 0];
                        pieces[move.target.y, 0] = Pieces.EMPTY;
                    }
                    else
                    {
                        pieces[move.target.y, 5] = pieces[move.target.y, 7];
                        pieces[move.target.y, 7] = Pieces.EMPTY;
                    }
                }
            }

            allowEnPassant = false;
            if (pieces[move.source.y, move.source.x] == Pieces.WHITE_PAWN || pieces[move.source.y, move.source.x] == Pieces.BLACK_PAWN)
            {
                if (move.target.y < move.source.y - 1 || move.target.y > move.source.y + 1) // double step
                {
                    allowEnPassant = true;
                    enPassantColumn = (byte)move.target.x;
                    enPassantRow = (byte)move.target.y;
                }
                if (move.source.x != move.target.x && targetEmpty) // en passant
                {
                    pieces[move.source.y, move.target.x] = Pieces.EMPTY;
                }
                // promote
                if (pieces[move.target.y, move.target.x] == Pieces.WHITE_PAWN && move.target.y == 0) pieces[move.target.y, move.target.x] = Pieces.WHITE_QUEEN;
                if (pieces[move.target.y, move.target.x] == Pieces.BLACK_PAWN && move.target.y == 7) pieces[move.target.y, move.target.x] = Pieces.BLACK_QUEEN;
                
            }

            pieces[move.source.y, move.source.x] = Pieces.EMPTY;
        }
    }
}

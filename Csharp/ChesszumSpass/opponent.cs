using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChesszumSpass
{
    public static class Opponent
    {
        public static int checkedMoves;
        public static int timeMs;

        public static void move(Board board, List<Move> moves, bool isWhite, int difficulty)
        {
            checkedMoves = 0;
            DateTime start = DateTime.Now;

            int bestmove = 0;
            int bestscore = 99999;
            if (isWhite) bestscore = -99999;

            for (int i = 0; i < moves.Count; i++)
            {
                board.move(moves[i], false);
                int score = minimax(board, difficulty - 1, !isWhite, -100000, 100000);
                if ((score > bestscore && isWhite) || (score < bestscore && !isWhite))
                {
                    bestmove = i;
                    bestscore = score;
                }
                board.revertStep(false);
            }

            board.move(moves[bestmove], true);

            timeMs = (int)(DateTime.Now - start).TotalMilliseconds;
        }

        private static int minimax(Board board, int depth, bool isWhite, int alpha, int beta)
        {
            if (depth == 0)
            {
                checkedMoves++;
                return evalBoard(board);
            }

            List<Move> moves = Rules.checkMoves(board, isWhite, true);

            if (isWhite)
            {
                int bestMove = -99999;
                for (int i = 0; i < moves.Count; i++)
                {
                    board.move(moves[i], false);
                    bestMove = Math.Max(bestMove, minimax(board, depth - 1, !isWhite, alpha, beta));
                    board.revertStep(false);
                    alpha = Math.Max(alpha, bestMove);
                    if (beta <= alpha)
                    {
                        return bestMove;
                    }
                }
                return bestMove;
            }
            else
            {
                int bestMove = 99999;
                for (int i = 0; i < moves.Count; i++)
                {
                    board.move(moves[i], false);
                    bestMove = Math.Min(bestMove, minimax(board, depth - 1, !isWhite, alpha, beta));
                    board.revertStep(false);
                    beta = Math.Min(beta, bestMove);
                    if (beta <= alpha)
                    {
                        return bestMove;
                    }
                }
                return bestMove;
            }
        }

        private static int evalBoard(Board board)
        {
            int score = 0;
            for (int y = 0; y < 8; y++)
            {
                for (int x = 0; x < 8; x++)
                {
                    switch (board.pieces[y, x])
                    {
                        case Pieces.WHITE_PAWN: score += 100 + pawnPos[y, x]; break;
                        case Pieces.WHITE_KNIGHT: score += 300 + knightPos[y, x]; break;
                        case Pieces.WHITE_BISHOP: score += 300 + bishopPos[y, x]; break;
                        case Pieces.WHITE_ROOK: score += 500 + rookPos[y, x]; break;
                        case Pieces.WHITE_QUEEN: score += 900 + queenPos[y, x]; break;
                        case Pieces.WHITE_KING: score += 9000 + kingPos[y, x]; break;
                        case Pieces.BLACK_PAWN: score -= 100 - pawnPos[7 - y, x]; break;
                        case Pieces.BLACK_KNIGHT: score -= 300 + knightPos[y, x]; break;
                        case Pieces.BLACK_BISHOP: score -= 300 - bishopPos[7 - y, x]; break;
                        case Pieces.BLACK_ROOK: score -= 500 - rookPos[7 - y, x]; break;
                        case Pieces.BLACK_QUEEN: score -= 900 + queenPos[y, x]; break;
                        case Pieces.BLACK_KING: score -= 9000 - kingPos[7 - y, x]; break;
                    }
                }
            }
            return score;
        }

        static int[,] pawnPos = new int[8, 8]
        {
            { 00,  00,  00,  00,  00,  00,  00,  00 },
            { 50,  50,  50,  50,  50,  50,  50,  50 },
            { 10,  10,  20,  30,  30,  20,  10,  10 },
            { 05,  05,  10,  25,  25,  10,  05,  05 },
            { 00,  00,  00,  20,  20,  00,  00,  00 },
            { 05, -05, -10,  00,  00, -10, -05,  05 },
            { 05,  10,  10, -20, -20,  10,  10,  05 },
            { 00,  00,  00,  00,  00,  00,  00,  00 }
        };

        static int[,] knightPos = new int[8, 8]
        {
            { -50, -40, -30, -30, -30, -30, -40, -50 },
            { -40, -20,  00,  00,  00,  00, -20, -40 },
            { -30,  00,  10,  15,  15,  10,  00, -30 },
            { -30,  05,  15,  20,  20,  15,  05, -30 },
            { -30,  00,  15,  20,  20,  15,  00, -30 },
            { -30,  05,  10,  15,  15,  10,  05, -30 },
            { -40, -20,  00,  05,  05,  00, -20, -40 },
            { -50, -40, -30, -30, -30, -30, -40, -50 }
        };

        static int[,] bishopPos = new int[8, 8]
        {
            { -20, -10, -10, -10, -10, -10, -10, -20 },
            { -10,  00,  00,  00,  00,  00,  00, -10 },
            { -10,  00,  05,  10,  10,  05,  00, -10 },
            { -10,  05,  05,  10,  10,  05,  05, -10 },
            { -10,  00,  10,  10,  10,  10,  00, -10 },
            { -10,  10,  10,  10,  10,  10,  10, -10 },
            { -10,  05,  00,  00,  00,  00,  05, -10 },
            { -20, -10, -10, -10, -10, -10, -10, -20 }
        };

        static int[,] rookPos = new int[8, 8]
        {
            { -20, -10, -10, -05, -05, -10, -10, -20},
            { -10,  00,  00,  00,  00,  00,  00, -10},
            { -10,  00,  05,  05,  05,  05,  00, -10},
            { -05,  00,  05,  05,  05,  05,  00, -05},
            {  00,  00,  05,  05,  05,  05,  00, -05},
            { -10,  05,  05,  05,  05,  05,  00, -10},
            { -10,  00,  05,  00,  00,  00,  00, -10},
            { -20, -10, -10, -05, -05, -10, -10, -20}
        };

        static int[,] queenPos = new int[8, 8]
        {
            { -20, -10, -10, -05, -05, -10, -10, -20 },
            { -10,  00,  00,  00,  00,  00,  00, -10 },
            { -10,  00,  05,  05,  05,  05,  00, -10 },
            { -05,  00,  05,  05,  05,  05,  00, -05 },
            {  00,  00,  05,  05,  05,  05,  00, -05 },
            { -10,  05,  05,  05,  05,  05,  00, -10 },
            { -10,  00,  05,  00,  00,  00,  00, -10 },
            { -20, -10, -10, -05, -05, -10, -10, -20 }
        };

        static int[,] kingPos = new int[8, 8]
        {
            { -30, -40, -40, -50, -50, -40, -40, -30 },
            { -30, -40, -40, -50, -50, -40, -40, -30 },
            { -30, -40, -40, -50, -50, -40, -40, -30 },
            { -30, -40, -40, -50, -50, -40, -40, -30 },
            { -20, -30, -30, -40, -40, -30, -30, -20 },
            { -10, -20, -20, -20, -20, -20, -20, -10 },
            {  20,  20,  00,  00,  00,  00,  20,  20 },
            {  20,  30,  10,  00,  00,  10,  30,  20 }
        };

    }
}

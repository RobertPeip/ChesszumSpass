var opponent = new Opponent();

function Opponent()
{
   this.checkedMoves;
   this.timeMs;
   
   this.move = function(board, moves, isWhite, difficulty)
   {
      checkedMoves = 0;
      //DateTime start = DateTime.Now;

      var bestmove = 0;
      var bestscore = 99999;
      if (isWhite) bestscore = -99999;

      for (var i = 0; i < moves.length; i++)
      {
         board.move(moves[i], false);
         var score = this.minimax(board, difficulty - 1, !isWhite, -100000, 100000);
         if ((score > bestscore && isWhite) || (score < bestscore && !isWhite))
         {
            bestmove = i;
            bestscore = score;
         }
         board.revertStep(false);
      }

      board.move(moves[bestmove], true);
      
      //timeMs = (DateTime.Now - start).TotalMilliseconds;
   }
   
  
   this.minimax = function(board, depth, isWhite, alpha, beta)
   {
      checkedMoves++;
      if (depth == 0)
      {
         return this.evalBoard(board);
      }
      
      var moves = rules.checkMoves(board, isWhite, true);
      
      if (isWhite)
      {
         var bestMove = -99999;
         for (var i = 0; i < moves.length; i++)
         {
            board.move(moves[i], false);
            bestMove = Math.max(bestMove, this.minimax(board, depth - 1, !isWhite, alpha, beta));
            board.revertStep(false);
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha)
            {
               return bestMove;
            }
         }
         return bestMove;
      }
      else
      {
         var bestMove = 99999;
         for (var i = 0; i < moves.length; i++)
         {
            board.move(moves[i], false);
            bestMove = Math.min(bestMove, this.minimax(board, depth - 1, !isWhite, alpha, beta));
            board.revertStep(false);
            beta = Math.min(beta, bestMove);
            if (beta <= alpha)
            {
               return bestMove;
            }
         }
         return bestMove;
      }
   }
   
   this.evalBoard = function(board)
   {
      var score = 0;
      for (var y = 0; y < 8; y++)
      {
         for (var x = 0; x < 8; x++)
         {
            switch (board.pieces[y][x])
            {
               case Pieces.WHITE_PAWN:   score += (100  + this.pawnPos[y][x]      ); break;
               case Pieces.WHITE_KNIGHT: score += (300  + this.knightPos[y][x]    ); break;
               case Pieces.WHITE_BISHOP: score += (300  + this.bishopPos[y][x]    ); break;
               case Pieces.WHITE_ROOK:   score += (500  + this.rookPos[y][x]      ); break;
               case Pieces.WHITE_QUEEN:  score += (900  + this.queenPos[y][x]     ); break;
               case Pieces.WHITE_KING:   score += (9000 + this.kingPos[y][x]      ); break;
               case Pieces.BLACK_PAWN:   score -= (100  - this.pawnPos[7 - y][x]  ); break;
               case Pieces.BLACK_KNIGHT: score -= (300  + this.knightPos[y][x]    ); break;
               case Pieces.BLACK_BISHOP: score -= (300  - this.bishopPos[7 - y][x]); break;
               case Pieces.BLACK_ROOK:   score -= (500  - this.rookPos[7 - y][x]  ); break;
               case Pieces.BLACK_QUEEN:  score -= (900  + this.queenPos[y][x]     ); break;
               case Pieces.BLACK_KING:   score -= (9000 - this.kingPos[7 - y][x]  ); break;
            }
         }
      }
      
      switch(settings.randomness)
      {
         case 1 : score = score - 16 + Math.floor(Math.random() * 32); break; 
         case 2 : score = score - 64 + Math.floor(Math.random() * 128); break; 
         case 3 : score = score - 256 + Math.floor(Math.random() * 512); break; 
         case 4 : score = score - 1024 + Math.floor(Math.random() * 2048); break;
      }
      
      return score;
   }
   
   this.pawnPos = 
   [
      [ 00,  00,  00,  00,  00,  00,  00,  00 ],
      [ 50,  50,  50,  50,  50,  50,  50,  50 ],
      [ 10,  10,  20,  30,  30,  20,  10,  10 ],
      [ 05,  05,  10,  25,  25,  10,  05,  05 ],
      [ 00,  00,  00,  20,  20,  00,  00,  00 ],
      [ 05, -05, -10,  00,  00, -10, -05,  05 ],
      [ 05,  10,  10, -20, -20,  10,  10,  05 ],
      [ 00,  00,  00,  00,  00,  00,  00,  00 ]
   ];
   
   this.knightPos = 
   [
      [ -50, -40, -30, -30, -30, -30, -40, -50 ],
      [ -40, -20,  00,  00,  00,  00, -20, -40 ],
      [ -30,  00,  10,  15,  15,  10,  00, -30 ],
      [ -30,  05,  15,  20,  20,  15,  05, -30 ],
      [ -30,  00,  15,  20,  20,  15,  00, -30 ],
      [ -30,  05,  10,  15,  15,  10,  05, -30 ],
      [ -40, -20,  00,  05,  05,  00, -20, -40 ],
      [ -50, -40, -30, -30, -30, -30, -40, -50 ]
   ];

   this.bishopPos =
   [
      [ -20, -10, -10, -10, -10, -10, -10, -20 ],
      [ -10,  00,  00,  00,  00,  00,  00, -10 ],
      [ -10,  00,  05,  10,  10,  05,  00, -10 ],
      [ -10,  05,  05,  10,  10,  05,  05, -10 ],
      [ -10,  00,  10,  10,  10,  10,  00, -10 ],
      [ -10,  10,  10,  10,  10,  10,  10, -10 ],
      [ -10,  05,  00,  00,  00,  00,  05, -10 ],
      [ -20, -10, -10, -10, -10, -10, -10, -20 ]
   ];
   
   this.rookPos =
   [
      [ -20, -10, -10, -05, -05, -10, -10, -20],
      [ -10,  00,  00,  00,  00,  00,  00, -10],
      [ -10,  00,  05,  05,  05,  05,  00, -10],
      [ -05,  00,  05,  05,  05,  05,  00, -05],
      [  00,  00,  05,  05,  05,  05,  00, -05],
      [ -10,  05,  05,  05,  05,  05,  00, -10],
      [ -10,  00,  05,  00,  00,  00,  00, -10],
      [ -20, -10, -10, -05, -05, -10, -10, -20]
   ];
   
   this.queenPos =
   [
      [ -20, -10, -10, -05, -05, -10, -10, -20 ],
      [ -10,  00,  00,  00,  00,  00,  00, -10 ],
      [ -10,  00,  05,  05,  05,  05,  00, -10 ],
      [ -05,  00,  05,  05,  05,  05,  00, -05 ],
      [  00,  00,  05,  05,  05,  05,  00, -05 ],
      [ -10,  05,  05,  05,  05,  05,  00, -10 ],
      [ -10,  00,  05,  00,  00,  00,  00, -10 ],
      [ -20, -10, -10, -05, -05, -10, -10, -20 ]
   ];
   
   this.kingPos =
   [
      [ -30, -40, -40, -50, -50, -40, -40, -30 ],
      [ -30, -40, -40, -50, -50, -40, -40, -30 ],
      [ -30, -40, -40, -50, -50, -40, -40, -30 ],
      [ -30, -40, -40, -50, -50, -40, -40, -30 ],
      [ -20, -30, -30, -40, -40, -30, -30, -20 ],
      [ -10, -20, -20, -20, -20, -20, -20, -10 ],
      [  20,  20,  00,  00,  00,  00,  20,  20 ],
      [  20,  30,  10,  00,  00,  10,  30,  20 ]
   ];

} 

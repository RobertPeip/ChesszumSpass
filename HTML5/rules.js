var rules = new Rules();

function Rules()
{
   this.checkMoves = function(board, whiteTurn, kingCheck)
   {  
      var moves = [];

      for (var y = 0; y < 8; y++)
      {
         for (var x = 0; x < 8; x++)
         {
            if (board.pieces[y][x] != Pieces.EMPTY)
            {
               var isWhite = true;
               if (board.pieces[y][x] >= 7) isWhite = false;
               if (whiteTurn == isWhite)
               {
                  pos = new Position(y, x);
                  if (board.pieces[y][x] == Pieces.WHITE_PAWN   || board.pieces[y][x] == Pieces.BLACK_PAWN) this.checkMovesPawn(moves, board, pos, isWhite);
                  if (board.pieces[y][x] == Pieces.WHITE_KNIGHT || board.pieces[y][x] == Pieces.BLACK_KNIGHT) this.checkMovesKnight(moves, board, pos, isWhite);
                  if (board.pieces[y][x] == Pieces.WHITE_BISHOP || board.pieces[y][x] == Pieces.BLACK_BISHOP) this.checkMovesBishop(moves, board, pos, isWhite, 7);
                  if (board.pieces[y][x] == Pieces.WHITE_ROOK   || board.pieces[y][x] == Pieces.BLACK_ROOK) this.checkMovesRook(moves, board, pos, isWhite, 7);
                  if (board.pieces[y][x] == Pieces.WHITE_QUEEN  || board.pieces[y][x] == Pieces.BLACK_QUEEN) this.checkMovesQueen(moves, board, pos, isWhite);
                  if (board.pieces[y][x] == Pieces.WHITE_KING   || board.pieces[y][x] == Pieces.BLACK_KING) this.checkMovesKing(moves, board, pos, isWhite, kingCheck);
               }
            }
         }
      }
      
      if (kingCheck)
      {
         for (var i = 0; i < moves.length; i++)
         {
            board.move(moves[i], false);
            if (!this.checkFieldSave(board, whiteTurn, this.getKingPos(board, whiteTurn)))
            {
               moves.splice(i, 1);
               i--;
            }
            board.revertStep(false);
         }
      }
      
      return moves;
   }
   
   this.addIfEmpty = function(board, pos, checkpos, list)
   {
      for (var i = 0; i < checkpos.length; i++)
      {
         if (checkpos[i].x < 0 || checkpos[i].x > 7 || checkpos[i].y < 0 || checkpos[i].y > 7) continue;
         if (board.pieces[checkpos[i].y][checkpos[i].x] != Pieces.EMPTY)
         {
            return;
         }
         else
         {
            list.push(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
         }
      }
   }
   
   this.addIfColor = function(board, pos, checkpos, list, checkWhite)
   {
      for (var i = 0; i < checkpos.length; i++)
      {
         if (checkpos[i].x < 0 || checkpos[i].x > 7 || checkpos[i].y < 0 || checkpos[i].y > 7) continue;
         if (board.pieces[checkpos[i].y][checkpos[i].x] != Pieces.EMPTY)
         {
            var isWhite = true;
            if (board.pieces[checkpos[i].y][checkpos[i].x] >= 7) isWhite = false;
            if (checkWhite == isWhite) list.push(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
         }
      }
   }
   
   this.addIfEmptyOrColor = function(board, pos, checkpos, list, checkWhite, stopOnPiece)
   {
      for (var i = 0; i < checkpos.length; i++)
      {
         if (checkpos[i].x < 0 || checkpos[i].x > 7 || checkpos[i].y < 0 || checkpos[i].y > 7) continue;
         if (board.pieces[checkpos[i].y][checkpos[i].x] != Pieces.EMPTY)
         {
            var isWhite = true;
            if (board.pieces[checkpos[i].y][checkpos[i].x] >= 7) isWhite = false;
            if (checkWhite == isWhite) list.push(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
            if (stopOnPiece) return;
         }  
         else
         {
            list.push(new Move(pos, new Position(checkpos[i].y, checkpos[i].x)));
         }
      }
   }
   
   this.getKingPos = function(board, isWhite)
   {
      for (var y = 0; y < 8; y++)
      {
         for (var x = 0; x < 8; x++)
         {
            if ((board.pieces[y][x] == Pieces.WHITE_KING && isWhite) || (board.pieces[y][x] == Pieces.BLACK_KING && !isWhite)) return new Position(y, x);
         }
      }
      return new Position(0, 0);
   }
   
   this.fieldHostile = function(board, isWhite, pos, distance, xdir, ydir)
   {
      if (board.pieces[pos.y][pos.x] == Pieces.EMPTY) return false;
      if ((board.pieces[pos.y][pos.x] >= 7 && isWhite) || (board.pieces[pos.y][pos.x] < 7 && !isWhite))
      {
         if (board.pieces[pos.y][pos.x] == Pieces.WHITE_PAWN && distance == 1 && ydir == 1 && (xdir == -1 || xdir == 1)) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.BLACK_PAWN && distance == 1 && ydir == -1 && (xdir == -1 || xdir == 1)) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.WHITE_BISHOP && ydir != 0 && xdir != 0) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.BLACK_BISHOP && ydir != 0 && xdir != 0) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.WHITE_ROOK && (ydir == 0 || xdir == 0)) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.BLACK_ROOK && (ydir == 0 || xdir == 0)) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.WHITE_QUEEN) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.BLACK_QUEEN) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.WHITE_KING && distance == 1) return true;
         if (board.pieces[pos.y][pos.x] == Pieces.BLACK_KING && distance == 1) return true;
      }
      return false;
   }
   
   this.checkFieldSave = function(board, isWhite, pos)
   {
      // all but knight
      for (var x = -1; x <= 1; x++)
      {
         for (var y = -1; y <= 1; y++)
         {
            if (x != 0 || y != 0)
            {
                  for (var i = 1; i <= 7; i++)
                  {
                     var checkx = pos.x + (i * x);
                     var checky = pos.y + (i * y);
                     if (checkx < 0 || checkx > 7 || checky < 0 || checky > 7) break;
                     if (this.fieldHostile(board, isWhite, new Position(checky, checkx), i, x, y)) return false;
                     if (board.pieces[checky][checkx] != Pieces.EMPTY) break;
                  }
            }
         }
      }
      //knight
      if (isWhite)
      {
         if (pos.x > 1 && pos.y > 0 && board.pieces[pos.y - 1][pos.x - 2] == Pieces.BLACK_KNIGHT) return false;
         if (pos.x > 0 && pos.y > 1 && board.pieces[pos.y - 2][pos.x - 1] == Pieces.BLACK_KNIGHT) return false;
         if (pos.x > 0 && pos.y < 6 && board.pieces[pos.y + 2][pos.x - 1] == Pieces.BLACK_KNIGHT) return false;
         if (pos.x > 1 && pos.y < 7 && board.pieces[pos.y + 1][pos.x - 2] == Pieces.BLACK_KNIGHT) return false;
         if (pos.x < 6 && pos.y > 0 && board.pieces[pos.y - 1][pos.x + 2] == Pieces.BLACK_KNIGHT) return false;
         if (pos.x < 7 && pos.y > 1 && board.pieces[pos.y - 2][pos.x + 1] == Pieces.BLACK_KNIGHT) return false;
         if (pos.x < 7 && pos.y < 6 && board.pieces[pos.y + 2][pos.x + 1] == Pieces.BLACK_KNIGHT) return false;
         if (pos.x < 6 && pos.y < 7 && board.pieces[pos.y + 1][pos.x + 2] == Pieces.BLACK_KNIGHT) return false;
      }
      else
      {
         if (pos.x > 1 && pos.y > 0 && board.pieces[pos.y - 1][pos.x - 2] == Pieces.WHITE_KNIGHT) return false;
         if (pos.x > 0 && pos.y > 1 && board.pieces[pos.y - 2][pos.x - 1] == Pieces.WHITE_KNIGHT) return false;
         if (pos.x > 0 && pos.y < 6 && board.pieces[pos.y + 2][pos.x - 1] == Pieces.WHITE_KNIGHT) return false;
         if (pos.x > 1 && pos.y < 7 && board.pieces[pos.y + 1][pos.x - 2] == Pieces.WHITE_KNIGHT) return false;
         if (pos.x < 6 && pos.y > 0 && board.pieces[pos.y - 1][pos.x + 2] == Pieces.WHITE_KNIGHT) return false;
         if (pos.x < 7 && pos.y > 1 && board.pieces[pos.y - 2][pos.x + 1] == Pieces.WHITE_KNIGHT) return false;
         if (pos.x < 7 && pos.y < 6 && board.pieces[pos.y + 2][pos.x + 1] == Pieces.WHITE_KNIGHT) return false;
         if (pos.x < 6 && pos.y < 7 && board.pieces[pos.y + 1][pos.x + 2] == Pieces.WHITE_KNIGHT) return false;
      }

      return true;
   }
   
   this.checkMovesPawn = function(moves, board, pos, isWhite)
   {
      var checkpos = [];
      if (isWhite)
      {
         checkpos.push(new Position(pos.y - 1, pos.x));
         if (pos.y == 6) checkpos.push(new Position(pos.y - 2, pos.x));
         this.addIfEmpty(board, pos, checkpos, moves);
         checkpos = [];
         checkpos.push(new Position(pos.y - 1, pos.x - 1));
         checkpos.push(new Position(pos.y - 1, pos.x + 1));
         this.addIfColor(board, pos, checkpos, moves, false);
      }
      else
      {
         checkpos.push(new Position(pos.y + 1, pos.x));;
         if (pos.y == 1) checkpos.push(new Position(pos.y + 2, pos.x));
         this.addIfEmpty(board, pos, checkpos, moves);
         checkpos = [];
         checkpos.push(new Position(pos.y + 1, pos.x - 1));
         checkpos.push(new Position(pos.y + 1, pos.x + 1));
         this.addIfColor(board, pos, checkpos, moves, true);
      }
      
      if (board.allowEnPassant)
      {
         if (pos.y == board.enPassantRow)
         {
            if (pos.x - 1 == board.enPassantColumn || pos.x + 1 == board.enPassantColumn)
            {
               if (isWhite)
               {
                  moves.push(new Move(pos, new Position(board.enPassantRow - 1, board.enPassantColumn)));
               }
               else
               {
                  moves.push(new Move(pos, new Position(board.enPassantRow + 1, board.enPassantColumn)));
               }
            }
         }
      }
   }
  
   this.checkMovesKnight = function(moves, board, pos, isWhite)
   {
      var checkpos = [];
      checkpos.push(new Position(pos.y - 1, pos.x - 2));
      checkpos.push(new Position(pos.y - 2, pos.x - 1));
      checkpos.push(new Position(pos.y + 2, pos.x - 1));
      checkpos.push(new Position(pos.y + 1, pos.x - 2));
      checkpos.push(new Position(pos.y - 1, pos.x + 2));
      checkpos.push(new Position(pos.y - 2, pos.x + 1));
      checkpos.push(new Position(pos.y + 2, pos.x + 1));
      checkpos.push(new Position(pos.y + 1, pos.x + 2));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, false);
   }
   
   this.checkMovesBishop = function(moves, board, pos, isWhite, distance)
   {
      var checkpos = [];

      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y - i, pos.x - i));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
      checkpos = [];
      
      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y - i, pos.x + i));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
      checkpos = [];
      
      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y + i, pos.x - i));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
      checkpos = [];
      
      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y + i, pos.x + i));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
   }
   
   this.checkMovesRook = function(moves, board, pos, isWhite, distance)
   {
      var checkpos = [];

      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y - i, pos.x));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
      checkpos = [];

      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y + i, pos.x));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
      checkpos = [];

      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y, pos.x - i));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
      checkpos = [];

      for (var i = 1; i <= distance; i++) checkpos.push(new Position(pos.y, pos.x + i));
      this.addIfEmptyOrColor(board, pos, checkpos, moves, !isWhite, true);
   }
   
   this.checkMovesQueen = function(moves, board, pos, isWhite)
   {
      this.checkMovesBishop(moves, board, pos, isWhite, 7);
      this.checkMovesRook(moves, board, pos, isWhite, 7);
   }
   
   this.checkMovesKing = function(moves, board, pos, isWhite, castling_check)
   {
      this.checkMovesBishop(moves, board, pos, isWhite, 1);
      this.checkMovesRook(moves, board, pos, isWhite, 1);
      
      if (castling_check)
      {
         if (isWhite && !board.whiteKingMoved || !isWhite && !board.blackKingMoved)
         {
            if (isWhite && !board.whiteRook1Moved || !isWhite && !board.blackRook1Moved)
            {
               if (board.pieces[pos.y][pos.x - 1] == Pieces.EMPTY && board.pieces[pos.y][pos.x - 2] == Pieces.EMPTY && board.pieces[pos.y][pos.x - 3] == Pieces.EMPTY)
               {
                  if (this.checkFieldSave(board, isWhite, new Position(pos.y, pos.x)) && this.checkFieldSave(board, isWhite, new Position(pos.y, pos.x - 1)) && this.checkFieldSave(board, isWhite, new Position(pos.y, pos.x - 2)))
                  {
                     moves.push(new Move(pos, new Position(pos.y, pos.x - 2)));
                  }
               }
            }
            if (isWhite && !board.whiteRook2Moved || !isWhite && !board.blackRook2Moved)
            {
               if (board.pieces[pos.y][pos.x + 1] == Pieces.EMPTY && board.pieces[pos.y][pos.x + 2] == Pieces.EMPTY)
               {
                  if (this.checkFieldSave(board, isWhite, new Position(pos.y, pos.x)) && this.checkFieldSave(board, isWhite, new Position(pos.y, pos.x + 1)) && this.checkFieldSave(board, isWhite, new Position(pos.y, pos.x + 2)))
                  {
                     moves.push(new Move(pos, new Position(pos.y, pos.x + 2)));
                  }
               }
            }
         }
      }
   }
} 

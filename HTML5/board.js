var board = new Board();

function Board()
{
   this.pieces = [];
   
   this.initpos =
   [
      [ Pieces.BLACK_ROOK, Pieces.BLACK_KNIGHT, Pieces.BLACK_BISHOP, Pieces.BLACK_QUEEN, Pieces.BLACK_KING, Pieces.BLACK_BISHOP, Pieces.BLACK_KNIGHT, Pieces.BLACK_ROOK ],
      [ Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN ],
      [ Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY ],
      [ Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY ],
      [ Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY ],
      [ Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY, Pieces.EMPTY ],
      [ Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN ],
      [ Pieces.WHITE_ROOK, Pieces.WHITE_KNIGHT, Pieces.WHITE_BISHOP, Pieces.WHITE_QUEEN, Pieces.WHITE_KING, Pieces.WHITE_BISHOP, Pieces.WHITE_KNIGHT, Pieces.WHITE_ROOK ]
   ];
   
   this.whiteKingMoved;
   this.whiteRook1Moved;
   this.whiteRook2Moved;
   this.blackKingMoved;
   this.blackRook1Moved;
   this.blackRook2Moved;

   this.allowEnPassant;
   this.enPassantColumn;
   this.enPassantRow;

   this.history = [];
   this.moveHistory = [];
   
   this.reset = function()
   {  
      this.copy(this.initpos, this.pieces);
      this.history = [];
      this.moveHistory = [];
      this.whiteKingMoved = false;
      this.whiteRook1Moved = false;
      this.whiteRook2Moved = false;
      this.blackKingMoved = false;
      this.blackRook1Moved = false;
      this.blackRook2Moved = false;
      this.allowEnPassant = false;
      this.enPassantColumn = 0;
      this.enPassantRow = 0;
   }
  
   this.copy = function(from, to)
   {
      for (var y = 0; y < 8; y++)
      {
         to[y] = [];
         for (var x = 0; x < 8; x++)
         {
             to[y][x] = from[y][x];
         }
      }
   }
   
   this.addHistoryText = function(move)
   {
   }
   
   this.getHistoryText = function()
   {
   }
   
   this.addHistory = function()
   {
      var entry = {};
      entry.pieces = []
      for (var y = 0; y < 8; y++)
      {
          var line = [];
          for (var x = 0; x < 8; x++)
          {
              line[x] = this.pieces[y][x];
          }
          entry.pieces.push(line);
      }
      entry.enPassantColumn = this.enPassantColumn;
      entry.enPassantRow    = this.enPassantRow;
      entry.allowEnPassant  = this.allowEnPassant;
      entry.whiteKingMoved  = this.whiteKingMoved;
      entry.whiteRook1Moved = this.whiteRook1Moved;
      entry.whiteRook2Moved = this.whiteRook2Moved;
      entry.blackKingMoved  = this.blackKingMoved;
      entry.blackRook1Moved = this.blackRook1Moved;
      entry.blackRook2Moved = this.blackRook2Moved;

      this.history.push(entry);
   }
   
   this.revertStep = function(finalstep)
   {
      if (finalstep && this.moveHistory.length > 0)
      {
         this.moveHistory.RemoveAt(this.moveHistory.length - 1);
      }
      
      if (this.history.length > 0)
      {
         var entry = this.history[this.history.length - 1];
         for (var y = 0; y < 8; y++)
         {
            for (var x = 0; x < 8; x++)
            {
               this.pieces[y][x] = entry.pieces[y][x];
            }
         }
         this.enPassantColumn = entry.enPassantColumn;
         this.enPassantRow    = entry.enPassantRow;
         this.allowEnPassant  = entry.allowEnPassant;
         this.whiteKingMoved  = entry.whiteKingMoved;
         this.whiteRook1Moved = entry.whiteRook1Moved;
         this.whiteRook2Moved = entry.whiteRook2Moved;
         this.blackKingMoved  = entry.blackKingMoved;
         this.blackRook1Moved = entry.blackRook1Moved;
         this.blackRook2Moved = entry.blackRook2Moved;
      
         this.history.pop();
         return true;
      }
      return false;
   }
   
   this.move = function(move, finalstep)
   {
      this.addHistory();
      if (finalstep) this.addHistoryText(move);
      
      var targetEmpty = false;
      if (this.pieces[move.target.y][move.target.x] == Pieces.EMPTY) targetEmpty = true;
      this.pieces[move.target.y][move.target.x] = this.pieces[move.source.y][move.source.x];
      
      if (move.source.y == 0 && move.source.x == 4) this.blackKingMoved = true;
      if (move.source.y == 0 && move.source.x == 0) this.blackRook1Moved = true;
      if (move.source.y == 0 && move.source.x == 7) this.blackRook2Moved = true;
      if (move.source.y == 7 && move.source.x == 4) this.whiteKingMoved = true;
      if (move.source.y == 7 && move.source.x == 0) this.whiteRook1Moved = true;
      if (move.source.y == 7 && move.source.x == 7) this.whiteRook2Moved = true;
      
      if (this.pieces[move.source.y][move.source.x] == Pieces.WHITE_KING || this.pieces[move.source.y][move.source.x] == Pieces.BLACK_KING) // castling
      {
         if (move.target.x < move.source.x - 1 || move.target.x > move.source.x + 1)
         {
            if (move.target.x < 4) // queen side
            {
                  this.pieces[move.target.y][3] = this.pieces[move.target.y][0];
                  this.pieces[move.target.y][0] = Pieces.EMPTY;
            }
            else
            {
                  this.pieces[move.target.y][5] = this.pieces[move.target.y][7];
                  this.pieces[move.target.y][7] = Pieces.EMPTY;
            }
         }
      }
      
      this.allowEnPassant = false;
      if (this.pieces[move.source.y][move.source.x] == Pieces.WHITE_PAWN || this.pieces[move.source.y][move.source.x] == Pieces.BLACK_PAWN)
      {
         if (move.target.y < move.source.y - 1 || move.target.y > move.source.y + 1) // double step
         {
            this.allowEnPassant = true;
            this.enPassantColumn = move.target.x;
            this.enPassantRow = move.target.y;
         }
         if (move.source.x != move.target.x && targetEmpty) // en passant
         {
            this.pieces[move.source.y][move.target.x] = Pieces.EMPTY;
         }
         // promote
         if (this.pieces[move.target.y][move.target.x] == Pieces.WHITE_PAWN && move.target.y == 0) this.pieces[move.target.y][move.target.x] = Pieces.WHITE_QUEEN;
         if (this.pieces[move.target.y][move.target.x] == Pieces.BLACK_PAWN && move.target.y == 7) this.pieces[move.target.y][move.target.x] = Pieces.BLACK_QUEEN;
         
      }
      
      this.pieces[move.source.y][move.source.x] = Pieces.EMPTY;
   }
   
   this.reset();
} 

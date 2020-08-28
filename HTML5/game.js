var game = new Game();

function Game()
{
   this.whiteTurn = true;
   this.possibleMoves = [];
   this.possiblePos = [];

   this.ismarked;
   this.marked = new Position(0,0);

   this.checkmate;
   this.check;
   this.gamedraw;
   
   this.reset = function()
   {
      board.reset();
      this.ismarked = false;
      this.whiteTurn = true;
      this.check = false;
      this.checkmate = false;
      this.gamedraw = false;
      this.possibleMoves = rules.checkMoves(board, this.whiteTurn, true);
      if (!settings.playerWhite)
      {
         opponent.move(board, this.possibleMoves, this.whiteTurn, settings.difficulty);
         this.whiteTurn = !this.whiteTurn;
         this.possibleMoves = rules.checkMoves(board, this.whiteTurn, true);
      }
   }
   
   this.boardclick = function(call_info, bpos)
   {
      var height = canvas.height - 50;
      var width = canvas.width;
      if (height > width) height = width;
      if (width > height) width = height;   
      var rectsize = Math.floor(height / 8);
      
      var posx = Math.floor(bpos[0] / rectsize);
      var posy = Math.floor(bpos[1] / rectsize);
      if (!settings.playerWhite) 
      {
         posx = 7 - posx;
         posy = 7 - posy;
      }
      this.tryMove(posx, posy);
      
      if (this.gamedraw) maingui.tabs[1].name = "Game: Draw";
      else if (this.checkmate) maingui.tabs[1].name = "Game: Checkmate";
      else if (this.check) maingui.tabs[1].name = "Game: Check";
      else maingui.tabs[1].name = "Game";
   }
   this.buttonBoard = new Button(this.boardclick, this, 0);
   
   this.tryMove = function(x, y)
   {
      if (this.checkmate) return;
            
      if (this.posIsPlayer(x, y)) this.ismarked = false;
      
      if (this.ismarked)
      {
         for (var i = 0; i < this.possiblePos.length; i++)
         {
            if (this.possiblePos[i].x == x && this.possiblePos[i].y == y)
            {
               board.move(new Move(this.marked, new Position(y, x)), true);
               this.whiteTurn = !this.whiteTurn;
               this.possibleMoves = rules.checkMoves(board, this.whiteTurn, true);
               if (settings.playerWhite != this.whiteTurn && this.possibleMoves.length > 0) 
               { 
                  opponent.move(board, this.possibleMoves, this.whiteTurn, settings.difficulty);
                  this.whiteTurn = !this.whiteTurn;
                  this.possibleMoves = rules.checkMoves(board, this.whiteTurn, true);
               }
               this.checkCheck();
               break;
            }
         }
         this.ismarked = false;
      }
      else
      {
         var start = 7;
         if (settings.playerWhite) start = 1;
         if (board.pieces[y][x] >= start && board.pieces[y][x] < start + 6)
         {
            this.possiblePos = []
            for (var i = 0; i < this.possibleMoves.length; i++)
            {
               if (this.possibleMoves[i].source.x == x && this.possibleMoves[i].source.y == y)
               {
                  this.possiblePos.push(this.possibleMoves[i].target);
               }
            }
            if (this.possiblePos.length > 0)
            {
               this.ismarked = true;
               this.marked.x = x;
               this.marked.y = y;
            }
         }
      }
   }
   
   this.posIsPlayer = function(x, y)
   {
      if (this.whiteTurn && board.pieces[y][x] >= 1 && board.pieces[y][x] < 7) return true;
      if (!this.whiteTurn && board.pieces[y][x] >= 7 && board.pieces[y][x] < 13) return true;
      return false;
   }

   this.draw = function(x, y, sizeX, sizeY)
   {  
      var height = canvas.height - 50;
      var width = canvas.width;
      if (height > width) height = width;
      if (width > height) width = height;   
      this.buttonBoard.draw(0, 50, width, height, "", "red", "salmon", "black");
      
      drawer.draw(x, y, sizeX, sizeY)
   }
   
   this.checkCheck = function()
   {
      this.check = !rules.checkFieldSave(board, this.whiteTurn, rules.getKingPos(board, this.whiteTurn));
      this.checkmate = this.possibleMoves.length == 0 && this.check;
      this.gamedraw = this.possibleMoves.length == 0 && !this.check;
   }
  
} 

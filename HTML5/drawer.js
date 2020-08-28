var drawer = new Drawer();

function Drawer()
{
   this.draw = function(x, y, sizeX, sizeY)
   {  
      var height = canvas.height - 50;
      var width = canvas.width;
      if (height > width) height = width;
      if (width > height) width = height;   
      var rectsize = Math.floor(height / 8);

      var field = 0;
      for (var y = 0; y < 8; y++)
      {
         for (var x = 0; x < 8; x++)
         {
            var movpos = false;
            if (game.ismarked)
            {
               for (var i = 0; i < game.possiblePos.length; i++)
               {
                  if (((settings.playerWhite && game.possiblePos[i].x == x) || (!settings.playerWhite && game.possiblePos[i].x == 7 - x)) && ((settings.playerWhite && game.possiblePos[i].y == y) || (!settings.playerWhite && game.possiblePos[i].y == 7 - y)))
                  {
                     movpos = true;
                     break;
                  }
               }
            }
            if (field % 2 == 0)
            {
               canvascontext.drawImage(Images.TILE1.image, rectsize * x,50 + rectsize * y, rectsize, rectsize);
            }
            else
            {
               canvascontext.drawImage(Images.TILE0.image, rectsize * x,50 + rectsize * y, rectsize, rectsize);
            }
            if (movpos)
            {
               if (field % 2 == 0)
               {
                  canvascontext.fillStyle = `rgb(153, 230, 153)`;
               }
               else
               {
                  canvascontext.fillStyle = `rgb(45, 185, 45)`;
               }
               canvascontext.fillRect(rectsize * x,50 + rectsize * y,rectsize, rectsize);
            }
            field++;
         }
         field++;
      }
      
      for (var i = 0; i < 8; i++)
      {
         var pos = 8 - i;
         if (!settings.playerWhite) pos = i + 1;
         canvascontext.fillStyle = `rgb(0, 0, 0)`;
         textblock.draw(0, 50 + rectsize * i, 50, 20, "black", "" + pos);
         textblock.draw(rectsize * i + Math.floor(rectsize * 0.85), 50 + 7 * rectsize + Math.floor(rectsize * 0.8), 50, 20, "black", String.fromCharCode(("a".charCodeAt(0)) + 8 - pos));
      }
      
      for (var y = 0; y < 8; y++)
      {
         for (var x = 0; x < 8; x++)
         {
            if (board.pieces[y][x] != Pieces.EMPTY)
            {
               var posx = rectsize * x;
               var posy = rectsize * y;
               if (!settings.playerWhite) 
               {
                  posx = rectsize * (7 - x);
                  posy = rectsize * (7 - y);
               }
               var imagepos = board.pieces[y][x] - 1;
               canvascontext.drawImage(Imagelist[imagepos].image, posx, 50 + posy, rectsize, rectsize);
            }
         }
      }
      
      if (game.ismarked && game.marked.x >= 0 && game.marked.y >= 0 && game.marked.x < 8 && game.marked.y < 8)
      {
          var posx = game.marked.x;
          var posy = game.marked.y;
          if (!settings.playerWhite) 
          {
             posx = 7 - posx;
             posy = 7 - posy;
          }
          canvascontext.fillStyle = `rgb(255, 0, 0)`;
          canvascontext.fillRect(rectsize * posx, 50 + rectsize * posy, rectsize, rectsize / 16);
          canvascontext.fillRect(rectsize * posx, 50 + rectsize * posy + rectsize / 16 * 15, rectsize, rectsize / 16);
          canvascontext.fillRect(rectsize * posx, 50 + rectsize * posy, rectsize / 16, rectsize);
          canvascontext.fillRect(rectsize * posx + rectsize / 16 * 15, 50 + rectsize * posy, rectsize / 16, rectsize);
      }
      
   }
  
} 

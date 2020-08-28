var textblock = new Textblock();

function Textblock()
{
   this.draw = function(x, y, xSpace, size, color, texts)
   {  
      var lineIndex = 1;
      // text
      
      for (var i = 0; i < texts.length; i++)
      {
         var line = texts[i];
      
         canvascontext.fillStyle = color;
         canvascontext.font = size + "px consolas";
         canvascontext.textAlign = "left";
         
         if (line.includes("{color:"))
         {
            var startstring = line.substring(line.indexOf("{color:") + 7);
            var colorstring = startstring.substring(0, startstring.indexOf("}"));
            canvascontext.fillStyle = colorstring;
            line = line.substring(line.indexOf("}") + 1);
         }
         if (line.includes("{bold}"))
         {
            canvascontext.font = "bold "+size + "px consolas";
            line = line.substring(line.indexOf("}") + 1);
         }
         
         if (line == "")
         {
            canvascontext.fillText("", x + 5, y + (lineIndex) * size);
            lineIndex++;
         }
         
         while (line.length > 0)
         {
            if (line.length * size * 0.6 > xSpace)
            {
               var endindex = Math.floor(xSpace / (size * 0.6))
               var spacefound = false;
               for (var c = endindex; c >= 0; c--)
               {
                  if (line[c] == " ")
                  {
                     var linepart = line.substring(0, c);
                     line = line.substring(c + 1);
                     canvascontext.fillText(linepart, x + 5, y + (lineIndex) * size);
                     lineIndex++;
                     spacefound = true;
                     break;
                  }
               }
               if (!spacefound)
               {
                  canvascontext.fillText(line, x + 5, y + (lineIndex) * size);
                  lineIndex++;
                  line = "";
               }
            }
            else
            {
               canvascontext.fillText(line, x + 5, y + (lineIndex) * size);
               lineIndex++;
               line = "";
            }
         }
      }
   }
  
} 

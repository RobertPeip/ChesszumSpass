function Radiobuttons(count)
{
   this.count = count;
   this.active = 0;
   
   this.buttonlist = [];
   
   this.mousevent = function(call_info, bpos)
   {
      this.active = call_info;
   }
   
   this.init = function()
   {
      for (var i = 0; i < this.count; i++)
      {
         var button = new Button(this.mousevent, this, i)
         this.buttonlist.push(button);
      }
   }
   
   this.draw = function(x, y, sizeX, content)
   {
      for (var i = 0; i < this.count; i++)
      {
         var colorInner = "white";
         if (this.active == i) colorInner = "red";
         this.buttonlist[i].draw(x, y + 30 * i, 20, 20, "", "lightgrey", colorInner, "black");
         texts = []
         texts.push(content[i].text);
         textblock.draw(x + 30, y + 30 * i, sizeX, 20, "black", texts);
      }
   } 
   
   this.init();
} 


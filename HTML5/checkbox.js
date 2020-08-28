function Checkbox(callback, caller, call_info)
{
   this.callback = callback;
   this.caller = caller;
   this.call_info = call_info;
   this.marked = false;
   this.pressed = false;
   this.visible = true;
   
   this.position = [0,0];
   this.size = [0,0];
   
   this.glow = "no";
   
   this.check_active = function()
   {
      this.marked = true;

      this.bpos = []
      for (i = 0; i < 2; i++)
      {
         this.bpos[i] = mouse.position[i] - this.position[i];
         if (mouse.position[i] < this.position[i] || mouse.position[i] > (this.position[i] + this.size[i]))
         {
             this.marked = false;
             break;
         }
      }
      if (this.marked)
      {
         if (mouse.click)
         {
            if (this.callback)
            {
               this.callback.call(this.caller, this.call_info, this.bpos);
            }
         }
      }
   }

   this.trybutton = function(mouse, offset, zoom)
   {
      var oldmarked = this.marked;
      var oldpressed = this.pressed;
   
      this.pressed = false;
      this.check_active();
      
      if (this.marked)
      {
         if (mouse.isdown)
         {
            this.glow = "blue";
            this.pressed = true;
         }
         else
         {
            this.glow = "green";
         }
      }
      else
      {
         this.glow = "no";
      }
      
      if (oldmarked != this.marked || oldpressed != this.pressed)
      {
         return true;
      }
      
      return false;
   }

   this.set_visible = function(visible)
   {
      this.visible = visible;
   }

   this.destroy = function()
   {
      var index = buttonlist.list.indexOf(this);
      if (index > -1) 
      {
         buttonlist.list.splice(index, 1);
      }
   }
   
   
   this.draw = function(x, y, sizeX, sizeY, text, colorOuter, colorInner, colorText)
   {
      buttonlist.list.push(this);
   
      this.position = [x, y];
      this.size = [sizeX, sizeY];
   
      // rectouter
      canvascontext.fillStyle = colorOuter;
      canvascontext.fillRect(x, y, sizeX, sizeY); 
      
      // rectinner
      if (this.glow != "no")
      {
         canvascontext.shadowBlur = 20;
         canvascontext.shadowColor = this.glow;
      }
      canvascontext.fillStyle = colorInner;
      canvascontext.fillRect(x + 2, y + 2, sizeX - 4, sizeY - 4);
      if (this.glow != "no")
      {
         canvascontext.shadowBlur = 0;
      }
     
      // text
      canvascontext.fillStyle = colorText;
      canvascontext.font = (sizeY * 0.7) + "px consolas";
      canvascontext.textAlign = "center";
      canvascontext.fillText(text, x + sizeX / 2, y + sizeY * 0.7);
   }   
} 

var buttonlist = new Buttonlist();
function Buttonlist()
{
   this.list = [];
   this.try_all_buttons = function(offset, zoom)
   {
      var anyChange = false; 
      for (var i=0; i<this.list.length; i++)
      {
         if (this.list[i].visible)
         {
            anyChange |= this.list[i].trybutton(mouse, offset, zoom);
         }
      }  
      return anyChange;
   }
}




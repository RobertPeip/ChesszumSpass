var mouse = new Mouse();

function Mouse()
{
   this.position = [0, 0];
   this.lastclick = [-1, -1];
   this.isdown = false;
   this.click = false;
   this.clicksoon = false;
   this.clickbuffer = false;
   
   this.rightlastclick = [-1, -1];
   this.rightisdown = false;
   this.rightclick = false;
   this.rightclicksoon = false;
   this.rightclickbuffer = false;

   this.canvas = null;
   this.offsetX = 0;
   this.offsetY = 0;

   this.set_canvas = function(canvas)
   {
      this.canvas = canvas;
      if (this.canvas != null)
      {
         testcanvas = this.canvas;
         if (testcanvas.offsetParent) 
         {
            do 
            {
               this.offsetX += testcanvas.offsetLeft;
               this.offsetY += testcanvas.offsetTop;
            } while (testcanvas = testcanvas.offsetParent);
         }  
      }
   }

   this.getMousePos = function(event)
   {
      if (this.canvas != null)
      {
            mouse_x = (event.pageX || (event.clientX + document.body.scrollLeft +  document.documentElement.scrollLeft)) - this.offsetX;
            mouse_y = (event.pageY || (event.clientY + document.body.scrollTop + document.documentElement.scrollTop)) - this.offsetY;  
            this.position = [mouse_x,mouse_y];
      }
   }

   this.clearpress = function()
   {
      this.lastclick = [-1, -1];
      this.click = false;
      this.rightclick = false;
      this.clicksoon = false;
      this.rightclicksoon = false;
      this.clickbuffer = false;
      this.rightclickbuffer = false;
   }
   
   this.updatestate = function()
   {
      this.click = this.clickbuffer;
      this.rightclick = this.rightclickbuffer;
      this.clickbuffer = false;
      this.rightclickbuffer = false;
   }
}

function contextmenu(event)
{
   event.preventDefault();
}

function mousedown(event) 
{
   if (event.which == 1)
   {
      mouse.isdown = true;
      mouse.clicksoon = true;
   }
   else if (event.which == 3)
   {
      mouse.rightisdown = true;
      mouse.rightclicksoon = true;
   }
}

function mouseup(event) 
{
   if (event.which == 1)
   {
      mouse.isdown = false;
      mouse.getMousePos(event);
      mouse.lastclick = mouse.position;
      if (mouse.clicksoon)
      {
         mouse.clickbuffer = true;
      }
   }
   if (event.which == 3)
   {
      mouse.rightisdown = false;
      mouse.getMousePos(event);
      mouse.rightlastclick = mouse.position;
      if (mouse.rightclicksoon)
      {
         mouse.rightclickbuffer = true;
      }
   }
}

function mouseclick(event) 
{
   if (event.which == 1)
   {
      mouse.isdown = false;
      mouse.getMousePos(event);
      mouse.lastclick = mouse.position;
      //console.log(mouse.position[0], mouse.position[1]);
   }
   else if (event.which == 3)
   {
      mouse.rightisdown = false;
   } 
}

function mousemove(event) 
{
   mouse.getMousePos(event);
}
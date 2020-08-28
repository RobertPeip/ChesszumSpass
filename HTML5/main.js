var canvas;
var canvascontext;
var fps = 30
var framerate = 1000/fps;

var lastTime = (new Date()).getTime();
var usage = 0;

var cyclelist = [];

var mainloop = function()
{
   window.requestAnimationFrame(mainloop);
   var currentTime = (new Date()).getTime();
   var delta = (currentTime - lastTime);
   if(delta > framerate) 
   {
      mouse.updatestate();
      var anyChange = buttonlist.try_all_buttons(0, 1);

      if (anyChange || ((window.innerWidth - 30) != canvas.width) || ((window.innerHeight - 30) != canvas.height))
      {
         canvas.width  = Math.max(200, window.innerWidth - 30);
         canvas.height = Math.max(200, window.innerHeight - 30);
   
         canvascontext.clearRect(0,0,canvas.width, canvas.height);
         
         cyclelist = [];
         buttonlist.list = [];
         maingui.draw(0, 0, canvas.width, canvas.height);
      }
      
      for (var i = 0; i < cyclelist.length; i++)
      {
         cyclelist[i].cycling.call(cyclelist[i], delta);
      }
      
      lastTime = currentTime - (delta % framerate);
      usage += (new Date()).getTime() - currentTime;
   }
   
   start_loading_images();
}

function main() 
{
   canvas = document.getElementById("Canvas");
   canvascontext = canvas.getContext("2d");
   canvas.width  = 200;
   canvas.height = 200;
   mouse.set_canvas(canvas);

   console.log("Init done");
   game.reset();
   console.log("Reset done");
   
   mainloop();
}
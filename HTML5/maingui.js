var maingui = new Maingui();

function Maingui()
{
   ///////////////////////////////////////
   ///////////// content   ///////////////
   ///////////////////////////////////////
   
   this.tabs = 
   [
      { name : "Settings"    ,         page : settings }, 
      { name : "Game",                 page : game }
   ];

   ///////////////////////////////////////
   ///////////// controls  ///////////////
   ///////////////////////////////////////
   
   this.tabcontrol = new Tabcontrol(this.tabs.length, false);
   
   ///////////////////////////////////////
   ///////////// extern functions  ///////
   ///////////////////////////////////////
   
   this.draw = function(x, y, sizeX, sizeY)
   {  
      this.tabcontrol.draw(x, y, sizeX, sizeY, -1, 30, this.tabs);
   }
  
} 

var settings = new Settings();

function Settings()
{
   this.playerWhite = true;
   this.difficulty = 1;
   
   this.text = 
   [
      "Choose your side and difficulty and start playing!"
   ],
   
   this.sideSelectionBoxes = 
   [
      { text : "Player takes White" }, 
      { text : "Player takes Black" }
   ];
   this.radiobuttonsSide = new Radiobuttons(this.sideSelectionBoxes.length);
   
   this.DifficultySelectionBoxes = 
   [
      { text : "Difficulty 1" }, 
      { text : "Difficulty 2" },
      { text : "Difficulty 3" },
      { text : "Difficulty 4" },
      { text : "Difficulty 5" }
   ];
   this.radiobuttonsDifficulty = new Radiobuttons(this.DifficultySelectionBoxes.length);
  
  
   this.buttonStartCallback = function(call_info, bpos)
   {
      this.playerWhite = this.radiobuttonsSide.active == 0;
      this.difficulty  = this.radiobuttonsDifficulty.active + 1;
      game.reset();
      maingui.tabcontrol.currenttab = 1;
   }
   this.buttonStart = new Button(this.buttonStartCallback, this, 0);
   
   this.draw = function(x, y, sizeX, sizeY)
   {  
      textblock.draw(x, y + 30, sizeX, 20, "black", this.text);
    
      this.radiobuttonsSide.draw(x + 10, y + 100, sizeX, this.sideSelectionBoxes);
      this.radiobuttonsDifficulty.draw(x + 10, y + 200, sizeX, this.DifficultySelectionBoxes);
      
      this.buttonStart.draw(x + 10, y + 400, 200, 40, "Start", "lightgrey", "white", "black");
   }

} 

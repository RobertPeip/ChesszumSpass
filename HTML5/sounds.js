Sounds = 
{
   "music"              : { overlapcount : 1, path : "music/music.mp3"},
};

var all_sounds_created = false;

start_loading_sounds = function()
{
   for (var sound in Sounds)
   {
      Sounds[sound].list = [];
   
      for (var i = 0; i < Sounds[sound].overlapcount; i++)
      {
         Sounds[sound].list[i] = new Audio();
         Sounds[sound].list[i].src = Sounds[sound].path;
      }
   }
   all_sounds_created = true;
}

Soundplayer = {}
Soundplayer.soundon = true;
Soundplayer.play = function(sound)
{
   if (this.soundon)
   {
      for (var i = 0; i < sound.list.length; i++)
      {
         if (sound.list[i].ended || sound.list[i].currentTime == 0)
         {
            sound.list[i].muted = false;
            sound.list[i].play();
            break;
         }
         else if (!sound.list[i].ended && sound.list[i].muted)
         {
            sound.list[i].muted = false;
            sound.list[i].currentTime = 0;
            break;
         }
      }
   }
}

Soundplayer.loop = function(sound)
{
   if (this.soundon)
   {
      sound.list[0].muted = false;
      sound.list[0].play();
      sound.list[0].loop = true;
   }
}

Soundplayer.stop = function(sound)
{
   for (var i = 0; i < sound.list.length; i++)
   {
      sound.list[i].loop = false;
      sound.list[i].muted = true;
   }
}

Soundplayer.stopall = function()
{
   for (var sound in Sounds)
   {
      Soundplayer.stop(Sounds[sound]);
   }
}

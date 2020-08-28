Images = 
{
   WHITE_PAWN         : {imagelink : "../images/white_pawn.png"},
   WHITE_KNIGHT       : {imagelink : "../images/white_knight.png"},
   WHITE_BISHOP       : {imagelink : "../images/white_bishop.png"},
   WHITE_ROOK         : {imagelink : "../images/white_rook.png"},
   WHITE_QUEEN        : {imagelink : "../images/white_queen_60.png"},
   WHITE_KING         : {imagelink : "../images/white_king.png"},
   BLACK_PAWN         : {imagelink : "../images/black_pawn.png"},
   BLACK_KNIGHT       : {imagelink : "../images/black_knight.png"},
   BLACK_BISHOP       : {imagelink : "../images/black_bishop.png"},
   BLACK_ROOK         : {imagelink : "../images/black_rook.png"},
   BLACK_QUEEN        : {imagelink : "../images/black_queen.png"},
   BLACK_KING         : {imagelink : "../images/black_king.png"},
   TILE0              : {imagelink : "../images/tile_0.bmp"},
   TILE1              : {imagelink : "../images/tile_1.bmp"}
}

start_loading_images = function()
{
   for (var key in Images)
   {
      var imageelement = Images[key];
      imageelement.image = new Image();
      imageelement.image.src = imageelement.imagelink;
   }
}

Imagelist = [];
for (var i in Images)
{
   Imagelist.push(Images[i]);
}
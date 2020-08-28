function Tabcontrol(count, isVertical)
{
   this.isVertical = isVertical;

   this.list = [];
   
   this.tabcount = count;
   
   this.currenttab = 0;
   this.buttonlist = [];
   this.tabcontent = [];
   
   this.tabchange = function(new_index)
   {
      if (new_index != this.currenttab)
      {
         for (var i = 0; i < this.tabcontent[this.currenttab].length; i++)
         {
            this.set_control_visible(this.tabcontent[this.currenttab][i], false);
         }
         if (new_index >= 0 && new_index < this.tabcontent.length)
         {
            for (var i = 0; i < this.tabcontent[new_index].length; i++)
            {
               this.set_control_visible(this.tabcontent[new_index][i], true);
            }
         }
         this.currenttab = new_index;
      }
   }
   
   this.tabchange_mousevent = function(call_info, bpos)
   {
      this.tabchange(call_info);
   }
   
   this.set_current_tab = function(index)
   {
      this.tabchange(index);
   }
   
   this.set_control_visible = function(control, visible)
   {
      if (typeof control.set_visible === 'function')
      {
         control.set_visible(visible);
      }
      else
      {
         control.prototype.visible = visible;
      }
   }
   
   this.set_visible = function(visible)
   {
      for (var i = 0; i < this.buttonlist.length; i++)
      {
         this.buttonlist[i].set_visible(visible);
      }
      for (var i = 0; i < this.tabcontent[this.currenttab].length; i++)
      {
         this.set_control_visible(this.tabcontent[this.currenttab][i], visible);
      }
      this.visible = visible;
   }
   
   this.init = function()
   {
      for (var i = 0; i < this.tabcount; i++)
      {
         this.tabcontent[i] = [];
         var button = new Button(this.tabchange_mousevent, this, i)
         this.buttonlist.push(button);
      }
   }
   
   this.add_control_to_tab = function(index, control)
   {
      this.tabcontent[index].push(control);
      if (index != this.currenttab)
      {
         this.set_control_visible(control, false);
      }
   }
   
   this.draw = function(x, y, sizeX, sizeY, tabsizeX, tabsizeY, content)
   {
      if (this.isVertical)
      {
         var buttonsizeY = tabsizeY;
         if (buttonsizeY < 0)
         {
            buttonsizeY = sizeY / this.tabcount;
         }
         
         for (var i = 0; i < this.tabcount; i++)
         {
            var colorInner = "white";
            if (i == this.currenttab)
            {
               if (content[i].page != null)
               {
                  content[i].page.draw(x + tabsizeX, y, sizeX - tabsizeX, sizeY);
               }
               colorInner = "darkgrey";
            }
            this.buttonlist[i].draw(x, y + buttonsizeY * i, tabsizeX, buttonsizeY, content[i].name, "lightgrey", colorInner, "black")
         }
      }
      else
      {
         var buttonsizeX = tabsizeX;
         if (buttonsizeX < 0)
         {
            buttonsizeX = sizeX / this.tabcount;
         }
         
         for (var i = 0; i < this.tabcount; i++)
         {
            var colorInner = "white";
            if (i == this.currenttab)
            {
               if (content[i].page != null)
               {
                  content[i].page.draw(x, y + tabsizeY, sizeX, sizeY - tabsizeY);
               }
               colorInner = "darkgrey";
            }
            this.buttonlist[i].draw(x + buttonsizeX * i, y, buttonsizeX, tabsizeY, content[i].name, "lightgrey", colorInner, "black")
         }
      }
   }
   
   this.init();

} 


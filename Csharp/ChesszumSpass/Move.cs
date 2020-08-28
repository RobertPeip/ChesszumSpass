using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChesszumSpass
{
    public class Move
    {
        public Position source;
        public Position target;

        public Move(Position source, Position target)
        {
            this.source = source;
            this.target = target;
        }
    }
}

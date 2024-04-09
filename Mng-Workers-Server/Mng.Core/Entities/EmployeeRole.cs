using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Entities
{
    public class EmployeeRole
    {
        public int Id { get; set; }
        public bool IsAdministrative { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime EnterDate { get; set; }
        public DateTime LastChange { get; set; }=DateTime.Now;  


    }
}

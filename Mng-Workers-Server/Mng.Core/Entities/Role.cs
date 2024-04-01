using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public EmployeeRole EmployeeRole { get; set; }
        public List<Employee> Employees { get; set; }
    }
}

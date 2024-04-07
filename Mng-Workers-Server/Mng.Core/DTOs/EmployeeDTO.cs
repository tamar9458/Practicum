using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.DTOs
{
    public enum PermissionLevel {NONE ,WATCHING , EDITING, ALL }

    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string TZ { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime? StartDate { get; set; }
        public bool Status { get; set; }
        public PermissionLevel PermissionLevel {
            get {
                int level = Roles.Sum(r=>r.IsAdministrative?1:0);
                return level == 0 ? PermissionLevel.NONE :
                    level >=5 ? PermissionLevel.ALL :
                    level >=3 ?PermissionLevel.EDITING :
                    PermissionLevel.WATCHING;
            }
            set { }
        }
        public List<EmployeeRole> Roles { get; set; }
    }
}

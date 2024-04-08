using Mng.Core.Entities;

namespace Mng.Api.PostModels
{
    public class EmployeeRolePostModel
    {
        public bool IsAdministrative { get; set; }
        public int RoleId { get; set; }
        public DateTime EnterDate { get; set; }
        public DateTime? LastChange { get; set; }=DateTime.Now;
    }
}

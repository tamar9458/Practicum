using Mng.Api.PostModels;
using Mng.Core.Entities;

namespace Mng.Api.Mappings
{
    public class EmployeePostModel
    {
        public string TZ { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; }
        public bool Status { get; set; }
        public List<EmployeeRolePostModel> Roles { get; set; }

    }
}

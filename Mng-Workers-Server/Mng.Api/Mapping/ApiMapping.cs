using AutoMapper;
using Mng.Api.Mappings;
using Mng.Api.PostModels;
using Mng.Core.Entities;

namespace Mng.Api.Mapping
{
    public class ApiMapping:Profile
    {
        public ApiMapping() { 
        CreateMap<Employee,EmployeePostModel>().ReverseMap();
        CreateMap<EmployeeRole,EmployeeRolePostModel>().ReverseMap();
        CreateMap<Role,RolePostModel>().ReverseMap();
        }
    }
}

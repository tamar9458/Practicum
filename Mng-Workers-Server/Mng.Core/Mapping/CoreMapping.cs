using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using Mng.Data.DTOs;

namespace Mng.Core.Mappings
{
    public class CoreMapping : Profile
    {
        public CoreMapping()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<Role, RoleDTO>().ReverseMap();

        }
    }
}

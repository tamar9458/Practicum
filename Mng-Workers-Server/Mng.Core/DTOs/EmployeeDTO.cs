﻿using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string TZ { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; }
        public bool Status { get; set; }
        public List<EmployeeRole> Roles { get; set; }
    }
}

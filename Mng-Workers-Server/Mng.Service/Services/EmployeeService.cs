﻿using Mng.Core.Entities;
using Mng.Core.Repositories;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;
        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            var list = await _repository.GetAllAsync();
            return list;
        }
        public async Task<Employee> GetByIdAsync(int id)
        {
            Employee employee = await _repository.GetByIdAsync(id);
            return employee;

        }
        public async Task<Employee> GetByPasswordAsync(string password)
        {
            Employee employee = await _repository.GetByPasswordAsync(password);
            return employee;
        }

        public async Task<Employee> PostAsync(Employee value)
        {
            value.Roles = value.Roles.Distinct().ToList();
            
            var today = DateTime.Now.Date;
            if (value.Roles.Any(r =>r.EnterDate<r.LastChange|| r.EnterDate.Date < today))
                return null;
            Employee employee = await _repository.PostAsync(value);
            return employee;
        }
        public async Task<Employee> PutAsync(int id, Employee value)
        {
            value.Roles = value.Roles.Distinct().ToList();//Duplication check for the new positions
            var today = DateTime.Now.Date;
            if (value.Roles.Any(r => r.Id == 0 && (r.EnterDate.Date < r.LastChange.Date || r.EnterDate.Date < today)))
                return null;
            Employee employee = await _repository.PutAsync(id, value);
            return employee;
        }
        public async Task<Employee> DeleteAsync(int id)
        {
            Employee employee = await _repository.DeleteAsync(id);
            return employee;
        }
    }
}

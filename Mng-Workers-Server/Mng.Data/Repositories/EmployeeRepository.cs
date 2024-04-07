using Microsoft.EntityFrameworkCore;
using Mng.Core.Entities;
using Mng.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees.Include(e => e.Roles).ThenInclude(r => r.Role).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(int id)
        {
            var employee = await _context.Employees
    .Include(e => e.Roles).ThenInclude(r => r.Role)
    .FirstOrDefaultAsync(e => e.Id == id);
            return employee;
        }
        public async Task<Employee> GetByPasswordAsync(string password)
        {
            var employee = await _context.Employees
.Include(e => e.Roles).ThenInclude(r => r.Role)
.FirstOrDefaultAsync(e => e.Password == password);
            return employee;
        }

        public async Task<Employee> PostAsync(Employee value)
        {
            _context.Employees.Add(value);
            await _context.SaveChangesAsync();
            var employee = await _context.Employees
              .Include(e => e.Roles).ThenInclude(r => r.Role)
              .FirstOrDefaultAsync(e => e.Id == value.Id);
            return employee;
        }
        public async Task<Employee> PutAsync(int id, Employee value)
        {
            Employee employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                employee.TZ = value.TZ;
                employee.FirstName = value.FirstName;
                employee.LastName = value.LastName;
                employee.Gender = value.Gender;
                employee.BirthDate = value.BirthDate;
                employee.StartDate = value.StartDate;
                employee.Status = value.Status;
                employee.Password = value.Password;
                var list = employee?.Roles!=null?employee.Roles.ToList():new List<EmployeeRole>();//Duplication check for the new positions against to the old
                list.AddRange(value?.Roles!=null?value.Roles.ToList():null);
                employee.Roles = list?.Distinct().ToList(); 
                await _context.SaveChangesAsync();
                employee = await _context.Employees.Include(e => e.Roles).ThenInclude(r => r.Role).FirstOrDefaultAsync(e => e.Id == id);
                return employee;
            }
            return employee;
        }
        public async Task<Employee> DeleteAsync(int id)
        {
            Employee employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                employee.Status = false;
                await _context.SaveChangesAsync();
                employee = await _context.Employees.Include(e => e.Roles).ThenInclude(r => r.Role).FirstOrDefaultAsync(e => e.Id == id);
            }
            return employee;
        }
    }
}

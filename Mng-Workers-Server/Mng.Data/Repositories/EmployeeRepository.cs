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
            Employee existEmpTz = await _context.Employees.FirstOrDefaultAsync(e => e.TZ == value.TZ);
            if (existEmpTz != null)
                throw new ArgumentException("ERROR in Tz. try another");

            if (!string.IsNullOrEmpty(value.Password))
            {
                Employee existEmpPassword = await _context.Employees.FirstOrDefaultAsync(e => e.Password == value.Password);
                if (existEmpPassword == null)
                    throw new ArgumentException("ERROR in password. try another");
            }
            _context.Employees.Add(value);
            await _context.SaveChangesAsync();
            return await _context.Employees.Include(e => e.Roles).ThenInclude(r => r.Role)
              .FirstOrDefaultAsync(e => e.Id == value.Id);
        }
        public async Task<Employee> PutAsync(int id, Employee value)
        {
            Employee employee = await _context.Employees.Include(e => e.Roles)
             .ThenInclude(r => r.Role).FirstOrDefaultAsync(e => e.Id == id);
            if (employee != null)
            {
                employee.FirstName = value.FirstName;
                employee.LastName = value.LastName;
                employee.Gender = value.Gender;
                employee.BirthDate = value.BirthDate;
                employee.StartDate = value.StartDate;
                employee.Status = value.Status;

                Employee existEmpTz = await _context.Employees.FirstOrDefaultAsync(e => e.TZ == value.TZ);
                if (existEmpTz!=null)
                    throw new ArgumentException("ERROR in Tz. try another");
                employee.TZ = value.TZ;

                if (!string.IsNullOrEmpty(value.Password))
                {
                    Employee existEmpPassword = await _context.Employees.FirstOrDefaultAsync(e => e.Password == value.Password);
                       if (existEmpPassword==null)
                        throw new ArgumentException("ERROR in password. try another");
                    employee.Password = value.Password;
                }

                foreach (var newRole in value.Roles)
                {
                    var existingRole = employee.Roles.FirstOrDefault(r => r.RoleId == newRole.RoleId);
                    if (existingRole != null)
                    {
                        existingRole.EnterDate = newRole.EnterDate;
                        existingRole.IsAdministrative = newRole.IsAdministrative;
                    }
                    else
                        employee.Roles.Add(newRole);
                }

                await _context.SaveChangesAsync();
               return await _context.Employees.Include(e => e.Roles)
                    .ThenInclude(r => r.Role).FirstOrDefaultAsync(e => e.Id == id);
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

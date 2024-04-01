using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IEmployeeService
    {
        public Task<IEnumerable<Employee>> GetAllAsync();
        public Task<Employee> GetByIdAsync(int id);
        public Task<Employee> PostAsync(Employee employee);
        public Task<Employee> PutAsync(int id,Employee employee);
        public Task<Employee> DeleteAsync(int id);
       
    }
}

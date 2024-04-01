using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IRoleService
    {
        public Task<IEnumerable<Role>> GetAllAsync();
        public Task<Role> GetByIdAsync(int id);
        public Task<Role> PostAsync(Role employee);
        public Task<Role> PutAsync(int id, Role employee);
        public Task<Role> DeleteAsync(int id);
    }
}

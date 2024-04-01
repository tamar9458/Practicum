using Mng.Core.Entities;
using Mng.Core.Repositories;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Service.Services
{
    public class RoleService: IRoleService
    {
        private readonly IRoleRepository _repository;
        public RoleService(IRoleRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            var list =await _repository.GetAllAsync();
            return list;
        }
        public async Task<Role> GetByIdAsync(int id)
        {
         Role role=await _repository.GetByIdAsync(id);  
            return role;
        }
        public async Task<Role> PostAsync(Role value)
        {
            Role role=await _repository.PostAsync(value);
            return role;
        }
        public async Task<Role> PutAsync(int id, Role value)
        {
         Role role=await _repository.PutAsync(id,value);
            return role;
        }
        public async Task<Role> DeleteAsync(int id)
        {
            Role role=await _repository.DeleteAsync(id);
            return role;
        }
    }
}

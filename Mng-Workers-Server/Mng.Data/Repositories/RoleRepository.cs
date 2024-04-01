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
    public class RoleRepository: IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            var list = await _context.Roles.Include(r=>r.Employees).ToListAsync();
            return list;
        }
        public async Task<Role> GetByIdAsync(int id)
        {
            Role role=await _context.Roles.FindAsync(id);
            return role;

        }
        public async Task<Role> PostAsync(Role value)
        {
            _context.Roles.Add(value);   
            await _context.SaveChangesAsync();
            return await _context.Roles.FindAsync(value.Id);
            
        }
        public async Task<Role> PutAsync(int id, Role value)
        {

            Role role = await _context.Roles.FindAsync(id);
            if(role!=null)
            {
                role.Description = value.Description;
                role.Employees = value.Employees;
                _context.SaveChangesAsync();
            }
            return role;
        }
        public async Task<Role> DeleteAsync(int id)
        {
            Role role = await _context.Roles.FindAsync(id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
            return role;
        }
    }
}

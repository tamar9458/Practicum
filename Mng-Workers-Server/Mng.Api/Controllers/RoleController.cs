using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Mng.Api.Mappings;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using Mng.Core.Services;
using Mng.Data;
using Mng.Data.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mng.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _service;
        private readonly IMapper _mapper;

        public RoleController(IRoleService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            var list = await _service.GetAllAsync();
            var listDto=list.Select(r=>_mapper.Map<RoleDTO>(r)).ToList();
            return Ok(listDto);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            var role = await _service.GetByIdAsync(id);
            var resDto=_mapper.Map<RoleDTO>(role);
            return resDto != null ? Ok(resDto) : NotFound(id);
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] RolePostModel value)
        {
            var role=_mapper.Map<Role>(value);
            var res = await _service.PostAsync(role);
            var resDto = _mapper.Map<RoleDTO>(res);
            return resDto != null ? Ok(resDto) : BadRequest(value);
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel value)
        {
            var role = _mapper.Map<Role>(value);
            var res = await _service.PutAsync(id, role);
            var resDto = _mapper.Map<RoleDTO>(res);
            return resDto != null ? Ok(resDto) : BadRequest(value);
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var role = await _service.DeleteAsync(id);
            var resDto = _mapper.Map<RoleDTO>(role);
            return resDto != null ? Ok(resDto) : NotFound(id);
        }
    }
}

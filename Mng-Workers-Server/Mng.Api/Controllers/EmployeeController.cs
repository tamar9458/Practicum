using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Mng.Api.Mappings;
using Mng.Core.Entities;
using Mng.Core.Services;
using Mng.Data;
using Mng.Data.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mng.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _service;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService service ,IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            var list = await _service.GetAllAsync();
            var listDto=list.Select(e=>_mapper.Map<EmployeeDTO>(e)).ToList();
            return Ok(listDto);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            var employee = await _service.GetByIdAsync(id);
            var resDto=_mapper.Map<EmployeeDTO>(employee);
            return resDto != null ? Ok(resDto) : NotFound(id);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] EmployeePostModel value)
        {
            var employee=_mapper.Map<Employee>(value);
            var res = await _service.PostAsync(employee);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return resDto != null ? Ok(resDto) : BadRequest(value);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> PutAsync(int id, [FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            var res =await _service.PutAsync(id, employee);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return resDto != null ? Ok(resDto) : BadRequest(value);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var employee= await _service.DeleteAsync(id);
            var resDto = _mapper.Map<EmployeeDTO>(employee);
            return resDto != null ? Ok(resDto) : NotFound(id);
        }
    }
}

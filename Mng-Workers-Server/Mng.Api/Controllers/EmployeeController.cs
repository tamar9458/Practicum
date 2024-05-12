using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Mng.Api.Mappings;
using Mng.Core.Entities;
using Mng.Core.Services;
using Mng.Data;
using Mng.Data.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mng.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly string _passwordForTesting = "123";
        private readonly IEmployeeService _service;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;


        public EmployeeController(IEmployeeService service, IMapper mapper, IConfiguration configuration)
        {
            _service = service;
            _mapper = mapper;
            _configuration = configuration;

        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] string password)
        {
            Employee employee;
            if (password == _passwordForTesting)
            {
                employee = new Employee();
                employee.FirstName = "Testing";
            }
            else
                employee = await _service.GetByPasswordAsync(password);
            if (employee != null)
            {
                var resDto = _mapper.Map<EmployeeDTO>(employee);

                var claims = new List<Claim>
                {

                new Claim(ClaimTypes.Name, resDto.FirstName),
                new Claim("Name", resDto.FirstName),
                new Claim("Permission", resDto.PermissionLevel.ToString()),
                };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        [Authorize]

        public async Task<ActionResult> GetAllAsync()
        {
            var list = await _service.GetAllAsync();
            var listDto = list.Select(e => _mapper.Map<EmployeeDTO>(e)).ToList();
            return Ok(listDto);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            var employee = await _service.GetByIdAsync(id);
            var resDto = _mapper.Map<EmployeeDTO>(employee);
            return resDto != null ? Ok(resDto) : NotFound(id);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            var res = await _service.PostAsync(employee);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return resDto != null ? Ok(resDto) : BadRequest(value);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> PutAsync(int id, [FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            var res = await _service.PutAsync(id, employee);
            var resDto = _mapper.Map<EmployeeDTO>(res);
            return resDto != null ? Ok(resDto) : BadRequest(value);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var employee = await _service.DeleteAsync(id);
            var resDto = _mapper.Map<EmployeeDTO>(employee);
            return resDto != null ? Ok(resDto) : NotFound(id);
        }
    }
}

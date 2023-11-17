using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ProfitJetTest_new.Controllers
{
    [EnableCors("AllowOrigin")] //  node и IIS не хотели запускаться на одном порте
    [ApiController]
    [Route("empl")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }

        [HttpGet(nameof(GetEmployeesQuery))]
        public IEnumerable<Employee> GetEmployeesQuery()
        {
            var empls = new Employee[] { };
            using var context = new ProfiJetDbContext(new DbContextOptions<ProfiJetDbContext>());
            empls = context.Employees.ToArray();
            ;
            return empls; // обычно отдается не сущность а какой то другой класс, просто тут проект маленький
        }

        [HttpPost(nameof(AddOrEditEmployee))]
        public async Task<ActionResult> AddOrEditEmployee() // [FromBody] .. почему то не сработало
        {
            var rawRequestBody = await new StreamReader(Request.Body).ReadToEndAsync();
            var em = JsonConvert.DeserializeObject<Employee>(rawRequestBody);

            await using var context = new ProfiJetDbContext(new DbContextOptions<ProfiJetDbContext>());
            var employee = context.Employees.FirstOrDefault(t => t.Id == em.Id) ?? new Employee();
            var isNew = employee.Id == 0;

            employee.ProjectName = em.ProjectName;
            employee.FirstName = em.FirstName;
            employee.LastName = em.LastName;
            employee.Rate = em.Rate;
            employee.Role = em.Role;

            if (isNew)
                context.Employees.Add(employee);
            else
                context.Update(employee);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost(nameof(RemoveEmployeeById))]
        public async Task<ActionResult> RemoveEmployeeById(int id)
        {
            await using var context = new ProfiJetDbContext(new DbContextOptions<ProfiJetDbContext>());
            context.Employees.Remove(context.Employees.First(y => y.Id == id));
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
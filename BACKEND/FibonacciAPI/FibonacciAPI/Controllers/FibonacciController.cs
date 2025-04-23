using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FibonacciAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FibonacciController : ControllerBase
    {
        

        [HttpPost]
        public IActionResult GetFibonacci([FromBody] int number)
        {
            return Ok(new Fibonacci(number));
        }



    }
}

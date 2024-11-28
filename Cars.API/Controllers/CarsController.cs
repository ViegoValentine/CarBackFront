using Cars.Application.Cars;
using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Cars.API.Controllers
{
    public class CarsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Car>>> GetCars()
        {
            var result = await Mediator.Send(new List.Query());
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });

            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value ==  null)
                return NotFound();
            return BadRequest(result.Error);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCar(Guid id, Car car)
        {
            car.Id = id;
            var result = await Mediator.Send(new Edit.Command { Car = car });
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCar([FromBody] Car car)
        {
            var result = await Mediator.Send(new Create.Command { Car = car });

            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}

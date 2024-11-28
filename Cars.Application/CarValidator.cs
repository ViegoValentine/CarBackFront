using Cars.Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application
{
    public class CarValidator : AbstractValidator<Car>
    {
        public CarValidator()
        {
            RuleFor(c => c.Brand).NotEmpty().WithMessage("Brand is required");
            RuleFor(c => c.Model).NotEmpty().WithMessage("Model is required");
            RuleFor(c => c.DoorsNumber).NotEmpty().InclusiveBetween(2, 10).WithMessage("Doors number is required and must be integer between 2 and 10");
            RuleFor(c => c.LuggageCapacity).NotEmpty().WithMessage("Luggage capacity is required");
            RuleFor(c => c.EngineCapacity).NotEmpty().WithMessage("EngineCapacity is required");
            RuleFor(c => c.FuelType).NotEmpty().WithMessage("Fuel type is required");
            RuleFor(c => c.ProductionDate).NotEmpty().WithMessage("Production date is required");
            RuleFor(c => c.CarFuelConsumption).NotEmpty().GreaterThan(0).WithMessage("Car fuel consumption is required");
            RuleFor(c => c.BodyType).NotEmpty().WithMessage("Body type is required");
        }
    }
}

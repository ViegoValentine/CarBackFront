using Cars.Domain;
using Cars.Infrastructure;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class Create
    {
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Car).SetValidator(new CarValidator());
            }
        }

        public class Command : IRequest<Result<Unit>>
        {
            public Car Car { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Add new car to the database context
                _context.Cars.Add(request.Car);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }

}

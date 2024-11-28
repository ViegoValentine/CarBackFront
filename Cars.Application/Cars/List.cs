using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.DataContracts;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class List
    {
        public class Query : IRequest<Result<List<Car>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Car>>>
        {
            // Pass data context
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Car>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Cars.ToListAsync(cancellationToken);
                return Result<List<Car>>.Success(result);
            }
        }
    }
}

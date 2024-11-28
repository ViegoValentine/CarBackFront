using Cars.Domain;
using System.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Infrastructure
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            // Return if any records present in database
            if (context.Cars.Any()) return;

            var cars = new List<Car>
            {
                new Car {
                        Brand = "Mazda",
                        Model = "MX-5",
                        DoorsNumber = 2,
                        LuggageCapacity = 200,
                        EngineCapacity = 1839,
                        FuelType = FuelType.Petrol,
                        ProductionDate = DateTime.ParseExact("1994", "yyyy", CultureInfo.InvariantCulture),
                        CarFuelConsumption = 9.5,
                        BodyType = BodyType.Roadster
                },
                new Car {
                        Brand = "Toyota",
                        Model = "Supra",
                        DoorsNumber = 3,
                        LuggageCapacity = 300,
                        EngineCapacity = 2997,
                        FuelType = FuelType.Petrol,
                        ProductionDate = DateTime.ParseExact("1996", "yyyy", CultureInfo.InvariantCulture),
                        CarFuelConsumption = 10,
                        BodyType = BodyType.Coupe
                },
                new Car {
                        Brand = "Daewoo",
                        Model = "Matiz",
                        DoorsNumber = 5,
                        LuggageCapacity = 200,
                        EngineCapacity = 800,
                        FuelType = FuelType.Petrol,
                        ProductionDate = DateTime.ParseExact("1999", "yyyy", CultureInfo.InvariantCulture),
                        CarFuelConsumption = 6.4,
                        BodyType = BodyType.Hatchback
                },
                new Car {
                        Brand = "Volkswagen",
                        Model = "Polo",
                        DoorsNumber = 3,
                        LuggageCapacity = 250,
                        EngineCapacity = 1197,
                        FuelType = FuelType.Petrol,
                        ProductionDate = DateTime.ParseExact("2010", "yyyy", CultureInfo.InvariantCulture),
                        CarFuelConsumption = 7.5,
                        BodyType = BodyType.Hatchback
                },
                new Car {
                        Brand = "Skoda",
                        Model = "Octavia",
                        DoorsNumber = 5,
                        LuggageCapacity = 400,
                        EngineCapacity = 1968,
                        FuelType = FuelType.Diesel,
                        ProductionDate = DateTime.ParseExact("2019", "yyyy", CultureInfo.InvariantCulture),
                        CarFuelConsumption = 6,
                        BodyType = BodyType.Sedan
                }
            };

            // Add to database and save changes
            await context.Cars.AddRangeAsync(cars);
            await context.SaveChangesAsync();
        }
    }
}

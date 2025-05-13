using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using VBDepoziteFinalVersion.Server.Domain;

namespace VBDepoziteFinalVersion.Server.Services
{
    public class CalculareService
    {
        private readonly IMongoCollection<Depozit> _depoziteCollection;

        public CalculareService(IOptions<DataBaseSetting> databaseSettings)
        {
            var client = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = client.GetDatabase(databaseSettings.Value.DatabaseName);
            _depoziteCollection = database.GetCollection<Depozit>(databaseSettings.Value.CollectionName);
        }
        public async Task<Rezultat> CalculareServiceSer(DepozitSimulareRequest depozitRequest, Depozit depozit)
        {
            int termMonths;
            var interestRate = depozit.InterestRatePercent;
            if (interestRate <= 0)
            {
                //return BadRequest("Rata dobânzii nu este validă.");
            }

            // Convertim termenul în luni
            if (depozit.FixedTermMonths.StartsWith("P") &&
                int.TryParse(depozit.FixedTermMonths.Substring(1, depozit.FixedTermMonths.Length - 2), out termMonths))
            {
                // Ok
            }
            else
            {
               // return BadRequest("Termenul depozitului nu este valid.");
            }

            // Calculăm dobânda brută
            decimal principalAmount = depozitRequest.Suma;
            decimal grossInterest = (principalAmount * interestRate / 100) * depozitRequest.Termen / 12;

            // Calculăm suma finală
            decimal finalAmount = principalAmount + grossInterest;

            // Creăm programul de dobândă pentru fiecare lună
            var schedule = new List<LunaSimulare>();
            decimal balance = principalAmount;
            for (int month = 1; month <= depozitRequest.Termen; month++)
            {
                decimal monthlyInterest = grossInterest / depozitRequest.Termen;
                balance += monthlyInterest;

                schedule.Add(new LunaSimulare
                {
                    Month = month,
                    Date = DateTime.UtcNow.AddMonths(month),
                    Interest = monthlyInterest,
                    Balance = balance
                });
            }

            // Returnăm rezultatul
            var result = new Rezultat
            {
                FinalAmount = finalAmount,
                GrossInterest = grossInterest,
                Schedule = schedule
            };
            return result;
        }
        public async Task<Depozit?> GetByIdAsync(string id) =>
            await _depoziteCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
}

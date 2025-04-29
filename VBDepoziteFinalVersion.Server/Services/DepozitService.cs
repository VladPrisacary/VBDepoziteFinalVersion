using VBDepoziteFinalVersion.Server.Domain;
using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace VBDepoziteFinalVersion.Server.Services
{
    public class DepozitService
    {
        private readonly IMongoCollection<Depozit> _depoziteCollection;

        public DepozitService(IOptions<DataBaseSetting> databaseSettings)
        {
            var client = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = client.GetDatabase(databaseSettings.Value.DatabaseName);
            _depoziteCollection = database.GetCollection<Depozit>(databaseSettings.Value.CollectionName);
        }

        public async Task<List<Depozit>> GetAsync() =>
            await _depoziteCollection.Find(_ => true).ToListAsync();

        public async Task<Depozit?> GetByIdAsync(string id) =>
            await _depoziteCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Depozit depozit) =>
            await _depoziteCollection.InsertOneAsync(depozit);

        public async Task UpdateAsync(string id, Depozit updatedDepozit)
        {
            updatedDepozit.Id = id; // ne asigurăm că ID-ul rămâne același
            await _depoziteCollection.ReplaceOneAsync(x => x.Id == id, updatedDepozit);
        }

        public async Task DeleteAsync(string id) =>
            await _depoziteCollection.DeleteOneAsync(x => x.Id == id);
    }
}

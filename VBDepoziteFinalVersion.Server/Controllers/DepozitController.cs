using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using VBDepoziteFinalVersion.Server.Domain;
using VBDepoziteFinalVersion.Server.Services;

namespace VBDepozite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepoziteController : ControllerBase
    {
        private readonly DepozitService _service;

        public DepoziteController(DepozitService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Depozit>>> GetAll() =>
            await _service.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Depozit>> Get(string id)
        {
            if (!ObjectId.TryParse(id, out _))
            {
                return BadRequest("ID invalid.");
            }

            var depozit = await _service.GetByIdAsync(id);
            if (depozit == null) return NotFound();
            return depozit;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Depozit depozit)
        {
            await _service.CreateAsync(depozit);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Depozit updated)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();

            updated.Id = id; // asigură-te că nu schimbă id-ul
            await _service.UpdateAsync(id, updated);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();

            await _service.DeleteAsync(id);
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using VBDepoziteFinalVersion.Server.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VBDepoziteFinalVersion.Server.Services;

[Route("api/[controller]")]
[ApiController]
public class DepoziteController : ControllerBase
{
    private readonly CalculareService _calculareService;

    public DepoziteController(CalculareService calculare)
    {
        _calculareService = calculare;
    }

    [HttpPost("calculeaza")]
    public async Task<IActionResult> CalculeazaDepozit([FromBody] DepozitSimulareRequest request)
    {
        // Verificare validitate cerere
        if (request == null || request.Suma <= 0 || string.IsNullOrEmpty(request.DepozitId))
        {
            return BadRequest("Datele cererii sunt invalide.");
        }

        try
        {
            // Căutăm depozitul după ID
            var depozit = await _calculareService.GetByIdAsync(request.DepozitId);
            if (depozit == null)
            {
                return NotFound("Depozitul nu a fost găsit.");
            }

            var rezult = await _calculareService.CalculareServiceSer(request, depozit);
            return Ok(rezult);  

        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Eroare internă: {ex.Message}");
        }
    }
}

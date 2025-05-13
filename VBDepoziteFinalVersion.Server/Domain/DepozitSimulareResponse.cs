namespace VBDepoziteFinalVersion.Server.Domain
{
    public class DepozitSimulareResponse
    {
        public decimal FinalAmount { get; set; }
    public decimal GrossInterest { get; set; }
    public List<LunaSimulare> Schedule { get; set; }
    }
}

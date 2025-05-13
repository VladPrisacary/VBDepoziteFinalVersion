namespace VBDepoziteFinalVersion.Server.Domain
{
    public class DepozitSimulareRequest
    {
        public string DepozitId { get; set; }
        public decimal Suma { get; set; }
        public int Termen { get; set; } // în luni
      
    }
}

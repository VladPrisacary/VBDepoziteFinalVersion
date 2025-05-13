namespace VBDepoziteFinalVersion.Server.Domain
{
    public class LunaSimulare
    {
        public int Month { get; set; }
        public DateTime Date { get; set; }
        public decimal Interest { get; set; }
        public decimal Balance { get; set; }
    }
    public class Rezultat
    {
        public decimal FinalAmount { get; set; }
        public decimal GrossInterest { get; set; }
        public List<LunaSimulare> Schedule { get; set; }
    }
}

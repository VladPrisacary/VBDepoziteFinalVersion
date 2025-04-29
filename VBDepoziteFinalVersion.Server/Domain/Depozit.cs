using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VBDepoziteFinalVersion.Server.Domain
{
    public class Depozit
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string ProductType { get; set; }
        public string ProductGroup { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string ClientType { get; set; }
        public string Currency { get; set; }
        public decimal AmountToOpen { get; set; }
        public string FixedTermMonths { get; set; }
        public string CanBeProlongedReissued { get; set; }
        public decimal InterestRatePercent { get; set; }
        public string InterestPaymentFrequency { get; set; }
        public string Capitalization { get; set; }
        public bool TopUpPermitted { get; set; }
        public bool PartialWithdrawal { get; set; }
        public string PartialWithdrawalType { get; set; }
        public string EarlyClosedBranch { get; set; }
    }
}

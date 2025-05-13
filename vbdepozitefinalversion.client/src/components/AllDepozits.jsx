import React, { useState } from 'react';
import { getToateDepozitele } from "../services/api"; 

const DepoziteViewer = () => {
    const [depozite, setDepozite] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLoadAll = async () => {
        setLoading(true);
        setError('');
        const data = await getToateDepozitele();
        if (data) {
            setDepozite(data);
        } else {
            setError('Eroare la încărcarea depozitelor!');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>📋 Toate Depozitele</h2>
            <button onClick={handleLoadAll} style={{ padding: '10px 20px', marginBottom: '20px' }}>
                Afișează Toate Depozitele
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Se încarcă...</p>}

            <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#f9f9f9'
            }}>
                {depozite.length > 0 ? (
                    depozite.map((dep) => (
                        <div key={dep._id} style={{
                            marginBottom: '15px',
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                        }}>
                            <p><strong>ID:</strong> {dep._id}</p>
                            <p><strong>ProductType:</strong> {dep.productType}</p>
                            <p><strong>ProductGroup:</strong> {dep.productGroup}</p>
                            <p><strong>ProductName:</strong> {dep.productName}</p>
                            <p><strong>ProductCode:</strong> {dep.productCode}</p>
                            <p><strong>ClientType:</strong> {dep.clientType}</p>
                            <p><strong>Currency:</strong> {dep.currency}</p>
                            <p><strong>AmountToOpen:</strong> {dep.amountToOpen}</p>
                            <p><strong>FixedTermMonths:</strong> {dep.fixedTermMonths}</p>
                            <p><strong>CanBeProlongedReissued:</strong> {dep.canBeProlongedReissued}</p>
                            <p><strong>InterestRatePercent:</strong> {dep.interestRatePercent}</p>
                            <p><strong>InterestPaymentFrequency:</strong> {dep.interestPaymentFrequency}</p>
                            <p><strong>Capitalization:</strong> {dep.capitalization}</p>
                            <p><strong>TopUpPermitted:</strong> {dep.topUpPermitted ? 'Da' : 'Nu'}</p>
                            <p><strong>PartialWithdrawal:</strong> {dep.partialWithdrawal ? 'Da' : 'Nu'}</p>
                            <p><strong>PartialWithdrawalType:</strong> {dep.partialWithdrawalType}</p>
                            <p><strong>EarlyClosedBranch:</strong> {dep.earlyClosedBranch}</p>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#666' }}>Niciun depozit afișat încă.</p>
                )}
            </div>
        </div>
    );
};

export default DepoziteViewer;

import React, { useState } from 'react';
import { getDepozitById, actualizeazaDepozit, stergeDepozit } from "../services/api";

const initialFields = {
    productType: '',
    productGroup: '',
    productName: '',
    productCode: '',
    clientType: '',
    currency: '',
    amountToOpen: '',
    fixedTermMonths: '',
    canBeProlongedReissued: '',
    interestRatePercent: '',
    interestPaymentFrequency: '',
    capitalization: '',
    topUpPermitted: false,
    partialWithdrawal: false,
    partialWithdrawalType: '',
    earlyClosedBranch: ''
};

const DepozitManager = () => {
    const [id, setId] = useState('');
    const [depozit, setDepozit] = useState(null);
    const [updatedData, setUpdatedData] = useState(initialFields);
    const [message, setMessage] = useState('');

    const handleGetDepozit = async () => {
        if (!id.trim()) {
            setMessage('⚠️ ID-ul depozitului este necesar!');
            return;
        }

        const data = await getDepozitById(id);

        if (data) {
            setDepozit(data);
            setUpdatedData({
                productType: data.productType || '',
                productGroup: data.productGroup || '',
                productName: data.productName || '',
                productCode: data.productCode || '',
                clientType: data.clientType || '',
                currency: data.currency || '',
                amountToOpen: data.amountToOpen || '',
                fixedTermMonths: data.fixedTermMonths || '',
                canBeProlongedReissued: data.canBeProlongedReissued || '',
                interestRatePercent: data.interestRatePercent || '',
                interestPaymentFrequency: data.interestPaymentFrequency || '',
                capitalization: data.capitalization || '',
                topUpPermitted: data.topUpPermitted || false,
                partialWithdrawal: data.partialWithdrawal || false,
                partialWithdrawalType: data.partialWithdrawalType || '',
                earlyClosedBranch: data.earlyClosedBranch || ''
            });
            setMessage('');
        } else {
            setMessage('Depozitul nu a fost găsit!');
            setDepozit(null);
        }
    };

    const handleUpdateDepozit = async () => {
        if (!id.trim()) {
            setMessage('⚠️ ID-ul este necesar!');
            return;
        }

        const data = await actualizeazaDepozit(id, updatedData);
        if (data) {
            setMessage('✅ Depozitul a fost actualizat cu succes!');
            setDepozit(data);
        } else {
            setMessage('❌ Eroare la actualizarea depozitului!');
        }
    };

    const handleDeleteDepozit = async () => {
        if (!id.trim()) {
            setMessage('⚠️ ID-ul este necesar!');
            return;
        }

        const data = await stergeDepozit(id);
        if (data) {
            setMessage('🗑️ Depozitul a fost șters!');
            setDepozit(null);
            setUpdatedData(initialFields);
        } else {
            setMessage('❌ Eroare la ștergerea depozitului!');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Gestionare Depozit</h1>

            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    placeholder="Introdu ID depozit"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{ padding: '8px', width: '100%' }}
                />
                <button onClick={handleGetDepozit} style={{ marginTop: '10px' }}>🔍 Caută Depozit</button>
            </div>

            {message && <p><strong>{message}</strong></p>}

            {depozit && (
                <div style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    backgroundColor: '#f5f5f5'
                }}>
                    <h2>📦 Informații Depozit</h2>
                    <p><strong>ID:</strong> {depozit._id}</p>

                    {Object.entries(updatedData).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                {key}
                            </label>
                            {typeof value === 'boolean' ? (
                                <input
                                    type="checkbox"
                                    name={key}
                                    checked={value}
                                    onChange={handleChange}
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    style={{ padding: '8px', width: '100%' }}
                                />
                            )}
                        </div>
                    ))}

                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleUpdateDepozit} style={{ marginRight: '10px' }}>💾 Actualizează</button>
                        <button
                            onClick={handleDeleteDepozit}
                            style={{
                                backgroundColor: '#e53e3e',
                                color: 'white',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            🗑️ Șterge
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepozitManager;

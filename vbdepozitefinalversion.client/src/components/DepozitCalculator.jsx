import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const DepozitCalculator = () => {
    const [suma, setSuma] = useState('');
    const [depozitId, setDepozitId] = useState('');
    const [perioada, setPerioada] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            DepozitId: depozitId,
            Suma: parseFloat(suma),
            Perioada: parseInt(perioada),
        };
        console.info(requestData);
        try {
            const response = await axios.post('https://localhost:7040/api/Depozite/calculeaza', requestData);

            console.info(response);
            setResult(response.data);
        } catch (error) {
            console.error('Eroare la calcul:', error);
            alert('A apărut o eroare la calcul.');
        }
    };

    return (
        <div>
            <h2>Calculator Depozit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="suma">Suma:</label>
                    <input
                        type="number"
                        id="suma"
                        value={suma}
                        onChange={(e) => setSuma(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="depozitId">ID Depozit:</label>
                    <input
                        type="text"
                        id="depozitId"
                        value={depozitId}
                        onChange={(e) => setDepozitId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="perioada">Perioada (în luni):</label>
                    <input
                        type="number"
                        id="perioada"
                        value={perioada}
                        onChange={(e) => setPerioada(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Calculează Dobânda</button>
            </form>

            {result && (
                <div className="result-container">
                    <h3>Rezultate</h3>
                    <p><strong>Suma finală:</strong> {result.FinalAmount}</p>
                    <p><strong>Dobânda brută:</strong> {result.GrossInterest}</p>
                    <h4>Programul Dobânzii:</h4>
                    <ul>
                        {result.Schedule.map((luna, index) => (
                            <li key={index}>
                                Luna {luna.Month} - {luna.Date} - Dobândă: {luna.Interest} - Sold: {luna.Balance}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DepozitCalculator;

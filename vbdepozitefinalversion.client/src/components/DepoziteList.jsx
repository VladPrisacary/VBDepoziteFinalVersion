import React, { useState } from 'react';
import { getDepozitById, actualizeazaDepozit, stergeDepozit } from "../services/api";

const DepozitManager = () => {
    const [id, setId] = useState(''); // ID-ul depozitului
    const [depozit, setDepozit] = useState(null); // Depozitul curent
    const [updatedData, setUpdatedData] = useState({ name: '', description: '' }); // Datele actualizate ale depozitului
    const [message, setMessage] = useState(''); // Mesaj de feedback pentru utilizator

    // Funcție pentru a căuta depozitul după ID
    const handleGetDepozit = async () => {
        if (!id) {
            setMessage('ID-ul depozitului este necesar!');
            return;
        }

        const data = await getDepozitById(id);
        if (data) {
            setDepozit(data);
            setUpdatedData({ name: data.name, description: data.description });
            setMessage('');
        } else {
            setMessage('Depozitul nu a fost găsit!');
        }
    };

    // Funcție pentru a actualiza depozitul
    const handleUpdateDepozit = async () => {
        if (!id) {
            setMessage('ID-ul depozitului este necesar!');
            return;
        }

        const data = await actualizeazaDepozit(id, updatedData);
        if (data) {
            setMessage('Depozitul a fost actualizat cu succes!');
            setDepozit(data); // Actualizează depozitul cu datele noi
        } else {
            setMessage('Eroare la actualizarea depozitului!');
        }
    };

    // Funcție pentru a șterge depozitul
    const handleDeleteDepozit = async () => {
        if (!id) {
            setMessage('ID-ul depozitului este necesar!');
            return;
        }

        const data = await stergeDepozit(id);
        if (data) {
            setMessage('Depozitul a fost șters!');
            setDepozit(null); // Golește depozitul din stare
            setUpdatedData({ name: '', description: '' }); // Resetează câmpurile
        } else {
            setMessage('Eroare la ștergerea depozitului!');
        }
    };

    return (
        <div>
            <h1>Gestionare Depozit</h1>
            <div>
                <input
                    type="text"
                    placeholder="Introdu ID depozit"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={handleGetDepozit}>Vizualizează Depozit</button>
            </div>

            {message && <p>{message}</p>}

            {depozit && (
                <div>
                    <h2>Depozit: {depozit.name}</h2>
                    <p>Description: {depozit.description}</p>

                    <h3>Actualizează Depozit</h3>
                    <input
                        type="text"
                        placeholder="Nume Depozit"
                        value={updatedData.name}
                        onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Descriere Depozit"
                        value={updatedData.description}
                        onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                    />
                    <button onClick={handleUpdateDepozit}>Actualizează</button>

                    <h3>Șterge Depozit</h3>
                    <button onClick={handleDeleteDepozit}>Șterge</button>
                </div>
            )}
        </div>
    );
};

export default DepozitManager;

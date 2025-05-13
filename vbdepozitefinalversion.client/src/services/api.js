import axios from 'axios';

const API_URL = 'https://localhost:7040/api/Depozite'; // URL-ul backend-ului

// Obține un depozit pe baza ID-ului
export const getDepozitById = async (id) => {
    const url = `${API_URL}/${id}`;
    console.log("🌐 GET URL:", url);

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("❌ Eroare GET depozit:", error.response?.data || error.message);
        return null;
    }
};

// Actualizează un depozit existent
export const actualizeazaDepozit = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Eroare UPDATE depozit:", error.response?.data || error.message);
        return null;
    }
};

// Șterge un depozit pe baza ID-ului
export const stergeDepozit = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("❌ Eroare DELETE depozit:", error.response?.data || error.message);
        return null;
    }
};

// Obține toate depozitele
export const getToateDepozitele = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (err) {
        console.error('Eroare la încărcarea tuturor depozitelor:', err);
        return null;
    }
};

// 🔹 Calculează dobânda pe baza ID-ului depozitului și a sumei
export const calculeazaDepozit = async (depozitId, suma) => {
    const url = `${API_URL}/calculeaza`;
    const payload = {
        DepozitId: depozitId,
        Suma: suma,
    };

    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("❌ Eroare la calcul dobândă:", error.response?.data || error.message);
        return null;
    }
};

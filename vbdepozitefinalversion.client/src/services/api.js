import axios from 'axios';

const API_URL = 'http://localhost:7040/api/depozit/{id}'; // URL-ul backend-ului

// Obține un depozit pe baza ID-ului
export const getDepozitById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Eroare GET depozit:", error);
        return null;
    }
};

// Actualizează un depozit existent
export const actualizeazaDepozit = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Eroare UPDATE depozit:", error);
        return null;
    }
};

// Șterge un depozit pe baza ID-ului
export const stergeDepozit = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Eroare DELETE depozit:", error);
        return null;
    }
};

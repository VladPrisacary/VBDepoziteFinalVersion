import React, { useState } from 'react';
import DepoziteList from './components/DepoziteList';
import './App.css'; 

function App() {
    const [selected, setSelected] = useState('depozite');

    return (
        <div className="app-container">
            <div className="sidebar">
                <h2>VB App</h2>
                <div>
                    <a className="menu-item" onClick={() => setSelected('depozite')}>Depozite</a>
                    <a className="menu-item" onClick={() => setSelected('cont')}>Contul meu</a>
                    <a className="menu-item" onClick={() => setSelected('tranzactii')}>Tranzacții</a>
                </div>
                <button className="logout-button">Deconectare</button>
            </div>

            <div className="main-content">
                <header className="header">
                    {selected === 'depozite' && 'Gestionare Depozite'}
                    {selected === 'cont' && 'Contul Meu'}
                    {selected === 'tranzactii' && 'Tranzacții'}
                </header>

                <div className="content">
                    {selected === 'depozite' && <DepoziteList />}
                    {selected === 'cont' && <p>Informații despre contul tău.</p>}
                    {selected === 'tranzactii' && <p>Aici apar tranzacțiile tale recente.</p>}
                </div>
            </div>
        </div>
    );
}

export default App;

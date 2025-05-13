import React, { useState } from 'react';
import DepoziteList from './components/DepoziteList';
import AllDepozits from './components/AllDepozits';
import DepozitCalculator from './components/DepozitCalculator';
import './App.css';

function App() {
    const [selected, setSelected] = useState('depozite');
    const [showAll, setShowAll] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);

    return (
        <div className="app-container">
            <div className="sidebar">
                <h2>VB App</h2>
                <div>
                    <a className="menu-item" onClick={() => { setSelected('depozite'); setShowAll(false); setShowCalculator(false); }}>
                        Depozite
                    </a>
                    <a className="menu-item" onClick={() => setSelected('cont')}>
                        Contul meu
                    </a>
                    <a className="menu-item" onClick={() => setSelected('tranzactii')}>
                        Tranzacții
                    </a>
                </div>
                <button className="logout-button">Deconectare</button>
            </div>

            <div className="main-content">
                <header className="header">
                    {selected === 'depozite' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Gestionare Depozite</span>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {!showCalculator && (
                                    <button
                                        className="toggle-button"
                                        onClick={() => setShowAll(!showAll)}
                                    >
                                        {showAll ? '🔙 Înapoi la gestionare' : '📋 Afișează toate depozitele'}
                                    </button>
                                )}
                                <button
                                    className="toggle-button"
                                    onClick={() => {
                                        setShowCalculator(!showCalculator);
                                        setShowAll(false); // dezactivează AllDepozits dacă e activ
                                    }}
                                >
                                    {showCalculator ? '🔙 Înapoi la gestionare' : '🧮 Calculator Dobândă'}
                                </button>
                            </div>
                        </div>
                    )}
                    {selected === 'cont' && 'Contul Meu'}
                    {selected === 'tranzactii' && 'Tranzacții'}
                </header>

                <div className="content">
                    {selected === 'depozite' && (
                        showCalculator ? (
                            <DepozitCalculator />
                        ) : showAll ? (
                            <AllDepozits />
                        ) : (
                            <DepoziteList />
                        )
                    )}
                    {selected === 'cont' && <p>Informații despre contul tău.</p>}
                    {selected === 'tranzactii' && <p>Aici apar tranzacțiile tale recente.</p>}
                </div>
            </div>
        </div>
    );
}

export default App;

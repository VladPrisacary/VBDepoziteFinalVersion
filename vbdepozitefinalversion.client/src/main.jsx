import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // C�tre fi?ierul principal App.jsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Import� stilurile Bootstrap

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

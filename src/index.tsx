import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Router>
        <nav className="flex gap-4 p-4 bg-gray-200 text-gray-800">
            <Link to="/service">서비스</Link>
            <Link to="/backend">백엔드</Link>
            <Link to="/frontend">프론트엔드</Link>
        </nav>
        <App />
    </Router>

);

reportWebVitals();

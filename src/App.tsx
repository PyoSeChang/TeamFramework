// App.tsx
import { Routes, Route } from 'react-router-dom';
import AbstractServicePage from './pages/AbstractServicePage';
import AbstractBackendPage from './pages/AbstractBackendPage';
import AbstractFrontendPage from './pages/AbstractFrontendPage';
// index.tsx
import './index.css'; // ✅ tailwind가 들어간 css 파일


function App() {
    return (
        <Routes>
            <Route path="/" element={<div className="p-6 text-xl">Teamframe에 오신 걸 환영합니다 😊</div>} />
            <Route path="/service" element={<AbstractServicePage />} />
            <Route path="/backend" element={<AbstractBackendPage />} />
            <Route path="/frontend" element={<AbstractFrontendPage />} />
        </Routes>
    );
}

export default App;

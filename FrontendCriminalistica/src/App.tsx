import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MapView } from './pages/MapView';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';
import { Footer } from './components/common/Footer'; // 1. Descomenta el import

function App() {
  return (
    <Router>
      {/* Si tuvieras un Navbar, iría aquí arriba */}
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mapa" element={<MapView />} />

        {/* Ruta wildcard SIEMPRE al final */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* 2. Coloca el Footer aquí para que sea persistente en todas las rutas */}
      <Footer />
    </Router>
  );
}

export default App;

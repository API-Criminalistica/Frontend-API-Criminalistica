import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MapView } from './pages/MapView';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mapa" element={<MapView />} />

        {/* Ruta wildcard SIEMPRE al final */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
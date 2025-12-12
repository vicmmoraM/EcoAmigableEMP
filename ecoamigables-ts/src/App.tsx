import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layaout/Layout';
import Home from './pages/Home';
import Guias from './pages/Guias';
import Mapa from './pages/Mapa';
import Metas from './pages/Metas';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guias" element={<Guias />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/metas" element={<Metas />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
import { HashRouter, Routes, Route } from 'react-router-dom';
import ThreadListPage from './pages/ThreadListPage';
import NewThreadPage from './pages/NewThreadPage';
import ThreadDetailPage from './pages/ThreadDetailPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ThreadListPage />} />
        <Route path="/new" element={<NewThreadPage />} />
        <Route path="/thread/:id" element={<ThreadDetailPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

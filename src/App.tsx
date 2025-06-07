import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThreadListPage from './pages/ThreadListPage';
import NewThreadPage from './pages/NewThreadPage';
import ThreadDetailPage from './pages/ThreadDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThreadListPage />} />
        <Route path="/new" element={<NewThreadPage />} />
        <Route path="/thread/:id" element={<ThreadDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

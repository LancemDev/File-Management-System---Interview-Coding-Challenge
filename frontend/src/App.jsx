import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileExplorer from './components/FileExplorer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-primary text-white p-4">
          <h1 className="text-2xl font-bold">File Explorer</h1>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<FileExplorer />} />
            <Route path="/directory/:id" element={<FileExplorer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


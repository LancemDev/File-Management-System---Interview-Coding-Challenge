import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import FileExplorer from './components/FileExplorer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        <motion.header 
          className="bg-primary-600 text-white p-4 shadow-lg"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <h1 className="text-3xl font-bold">File Explorer</h1>
        </motion.header>
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


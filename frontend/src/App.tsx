import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TasksPage from './pages/TasksPage';
import TagsPage from './pages/TagsPage';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/tags" element={<TagsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

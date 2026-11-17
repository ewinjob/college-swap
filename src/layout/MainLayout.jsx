import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  const [selectedCollege, setSelectedCollege] = useState('all');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 antialiased font-sans">
      <Navbar 
        selectedCollege={selectedCollege} 
        onSelectCollege={setSelectedCollege} 
      />
      <main className="flex-1">
        <Outlet context={{ selectedCollege, setSelectedCollege }} />
      </main>
      <Footer />
    </div>
  );
}

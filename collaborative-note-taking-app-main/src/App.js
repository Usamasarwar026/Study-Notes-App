// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, setPersistence, browserLocalPersistence, signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Layout from './Layout';
import Notes from './Notes';
import About from './About';
import Login from './Login';
import Register from './Register';
import NoteForm from './NoteForm';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null); // Clear user state on logout
    }).catch((error) => {
      console.error("Error during logout:", error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={user ? <Notes /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/note-form" element={<NoteForm />} />
          <Route path="/note-form/:noteId" element={<NoteForm />} />
        </Routes>
      </Layout>
      <ToastContainer /> {/* Add ToastContainer here */}
    </Router>
  );
}

export default App;

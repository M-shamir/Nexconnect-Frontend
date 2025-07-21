// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Rooms from './pages/Rooms/Room';
import Chat from './pages/Chat/Chat';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        
        <Route
          path="/rooms"
          element={
            <PrivateRoute>
              <Rooms />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:roomId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

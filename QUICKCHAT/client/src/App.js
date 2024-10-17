import './App.css';
import { Routes, Route } from 'react-router-dom';
import SetAvatar from './pages/SetAvatar';
import Register from './pages/Register';
import Login from './pages/Login';

import Chat from './pages/Chat';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register></Register>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/' element={<Chat></Chat>} />
        <Route path='/setAvatar' element={<SetAvatar></SetAvatar>} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import { useContext } from 'react';
import Loader from './components/Loader';
import { Context } from '.';

function App() {

  const { auth } = useContext(Context);
  const [user,loading,error] = useAuthState(auth);



  if(loading) {
    return <Loader />
  }
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;

import {useState} from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import Needs from './pages/Needs/Needs';
import Propose from './pages/Propose/Propose';
import CreateNeed from './pages/CreateNeed/CreateNeed';
import CreatePropose from './pages/CreatePropose/CreatePropose';

function App() {
  const [auth, setAuth] = useState(false);

  return (
      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index path="/" element={<Home/>}/>
              <Route path="needs" element={<Needs/>}/>
              <Route path="needs/add-new"
                     element={
                         <RequireAuth auth={auth}>
                             <CreateNeed/>
                         </RequireAuth>
                     }
              />
              <Route path="propose" element={<Propose/>}/>
              <Route path="propose/add-new"
                     element={
                         <RequireAuth auth={auth}>
                             <CreatePropose/>
                         </RequireAuth>
                     }
              />
          </Route>
          <Route path="/login" element={<Login auth={auth} signIn={() => setAuth(true)}/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/forgot-password" element={<ForgotPass/>} />
      </Routes>
  );
}

export default App;

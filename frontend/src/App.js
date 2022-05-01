import {useEffect} from 'react';
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
import NotFound from './pages/NotFound/NotFound';
import {connect} from 'react-redux';
import {getCurrentUser} from "./store/actions/user";
import Preloader from './components/Preloader/Preloader';

function App(props) {
  const {currentUserLoading, getCurrentUser, authLoading} = props;

  useEffect(() => {
      console.log("render")
      getCurrentUser();
  }, [getCurrentUser]);

  if (currentUserLoading || authLoading) {
      return <div className="wrapper"><Preloader/></div>
  }

  return (
      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index path="/" element={<Home/>}/>
              <Route path="needs" element={<Needs/>}/>
              <Route path="needs/add-new"
                     element={
                         <RequireAuth>
                             <CreateNeed/>
                         </RequireAuth>
                     }
              />
              <Route path="propose" element={<Propose/>}/>
              <Route path="propose/add-new"
                     element={
                         <RequireAuth>
                             <CreatePropose/>
                         </RequireAuth>
                     }
              />
              <Route path="*" element={<NotFound/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/forgot-password" element={<ForgotPass/>} />
      </Routes>
  );
}

const mapStateToProps = ({user}) => {
    return {
        currentUserLoading: user.currentUserLoading,
        authLoading: user.authLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => dispatch(getCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

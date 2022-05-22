import {Route, Routes,} from "react-router-dom";
import Layout from '../components/Layout/Layout';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import ForgotPass from '../pages/ForgotPass/ForgotPass';
import Needs from '../pages/Needs/Needs';
import Propose from '../pages/Propose/Propose';
import CreateNeed from '../pages/CreateNeed/CreateNeed';
import CreatePropose from '../pages/CreatePropose/CreatePropose';
import ConfirmRegistration from '../pages/ConfirmRegistration/ConfirmRegistration';
import NotFound from '../pages/NotFound/NotFound';

function AppRouter() {
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
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration/>} />
                <Route path="forgot-password" element={<ForgotPass/>} />
                <Route path="confirm-registration" element={<ConfirmRegistration/>} />
                <Route path="*" element={<NotFound/>}/>
            </Route>

        </Routes>
    )
}

export default AppRouter;
import {Route, Routes,} from "react-router-dom";
import Layout from '../components/Layout/Layout';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import ForgotPass from '../pages/ForgotPass/ForgotPass';
import Needs from '../pages/Needs/Needs';
import CreateNeed from '../pages/CreateNeed/CreateNeed';
import CreatePropose from '../pages/CreatePropose/CreatePropose';
import ConfirmRegistration from '../pages/ConfirmRegistration/ConfirmRegistration';
import ResstPassword from '../pages/RestPassword/ResetPassword';
import NotFound from '../pages/NotFound/NotFound';
import Proposal from "../pages/Proposal/Proposal";
import Profile from "../pages/Profile/Profile";
import CurrentUserNeeds from "../pages/CurrentUserNeeds/CurrentUserNeeds";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index path="/" element={<Home/>}/>
                <Route path="profile/:id"
                       element={
                           <RequireAuth>
                               <Profile/>
                           </RequireAuth>
                       }
                />
                <Route path="needs" element={<Needs/>}/>
                <Route path="needs/add-new"
                       element={
                           <RequireAuth>
                               <CreateNeed/>
                           </RequireAuth>
                       }
                />
                <Route path="needs/user/:id"
                       element={
                           <RequireAuth>
                               <CurrentUserNeeds/>
                           </RequireAuth>
                       }
                />
                <Route path="propose" element={<Proposal/>}/>
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
                <Route path="reset-password" element={<ResstPassword/>} />
                <Route path="*" element={<NotFound/>}/>
            </Route>

        </Routes>
    )
}

export default AppRouter;
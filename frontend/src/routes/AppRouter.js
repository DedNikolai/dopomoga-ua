import {Route, Routes,} from "react-router-dom";
import Layout from '../components/Layout/Layout';
import AdminLayout from "../components/AdminLayout/AdminLayout";
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
import CurrentUserProposal from "../pages/CurrentUserProposal/CurrentUserProposal";
import EditNeed from "../pages/EditNeed/EditNeed";
import EditProposal from "../pages/EditProposal/EditProposal";
import AdminHome from '../pages/Admin/Home/Home';
import AdminNeeds from '../pages/Admin/Needs/Needs';
import AdminCategories from '../pages/Admin/Categories/Categories';
import AdminHelps from "../pages/Admin/Hepls/Helps";
import AdminRegions from "../pages/Admin/Regions/Regions";
import AdminUsers from "../pages/Admin/Users/Users";
import CreateCategory from "../pages/Admin/CreateCategory/CreateCategory";
import CreateRegion from "../pages/Admin/CreateRegion/CreateRegion";
import UserNeeds from "../pages/Admin/UserNeeds/UserNeeds";
import UserHelps from "../pages/Admin/UserHelps/UserHelps";
import Project from "../pages/Project/Project";
import Policy from "../pages/Policy/Policy";
import ProtectedRouter from "../components/ProtectedRouter/ProtectedRouter";
import ChatMessage from "../pages/ChatMessage/ChatMessage";
import Chats from "../pages/Chats/Chats";

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
                <Route path="profile/chats"
                       element={
                           <RequireAuth>
                               <Chats/>
                           </RequireAuth>
                       }
                />
                <Route path="profile/chat/user/:id"
                       element={
                           <RequireAuth>
                               <ChatMessage/>
                           </RequireAuth>
                       }
                />
                <Route path="needs" element={<Needs/>}/>
                <Route path="profile/:id/needs/:needId"
                       element={
                           <RequireAuth>
                               <EditNeed/>
                           </RequireAuth>
                       }
                />
                <Route path="profile/:id/proposal/:proposalId"
                       element={
                           <RequireAuth>
                               <EditProposal/>
                           </RequireAuth>
                       }
                />
                <Route path="profile/:id/needs/create"
                       element={
                           <RequireAuth>
                               <CreateNeed/>
                           </RequireAuth>
                       }
                />
                <Route path="profile/:id/proposal/create"
                       element={
                           <RequireAuth>
                               <CreatePropose/>
                           </RequireAuth>
                       }
                />
                <Route path="profile/:id/needs"
                       element={
                           <RequireAuth>
                               <CurrentUserNeeds/>
                           </RequireAuth>
                       }
                />

                <Route path="profile/:id/proposal"
                       element={
                           <RequireAuth>
                               <CurrentUserProposal/>
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
                <Route path="project" element={<Project />} />
                <Route path="privace-policy" element={<Policy />} />
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration/>} />
                <Route path="forgot-password" element={<ForgotPass/>} />
                <Route path="confirm-registration" element={<ConfirmRegistration/>} />
                <Route path="reset-password" element={<ResstPassword/>} />
                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path="/admin" 
                   element={
                        <ProtectedRouter>
                             <AdminLayout />
                        </ProtectedRouter>
                       
                   }>
                <Route index path="/admin" element={<AdminHome/>}/>
                <Route path="categories" element={<AdminCategories />} />
                <Route path="helps" element={<AdminHelps/>} />
                <Route path="needs" element={<AdminNeeds/>} />
                <Route path="regions" element={<AdminRegions/>} />
                <Route path="users" element={<AdminUsers/>} />
                <Route path="users/:id/needs" element={<UserNeeds/>} />
                <Route path="users/:id/helps" element={<UserHelps/>} />
                <Route path="category/create" element={<CreateCategory/>} />
                <Route path="region/create" element={<CreateRegion/>} />
            </Route>

        </Routes>
    )
}

export default AppRouter;
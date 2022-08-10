import {Route, Routes,} from "react-router-dom";
import Layout from '../components/Layout/Layout';
import Home from '../pages/Admin/Home/Home';
import Needs from '../pages/Admin/Needs/Needs';
import Categories from '../pages/Admin/Categories/Categories';
import Helps from "../pages/Admin/Hepls/Helps";
import Regions from "../pages/Admin/Regions/Regions";
import Users from "../pages/Admin/Users/Users";
import NotFound from '../pages/NotFound/NotFound';

function AdminRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index path="/" element={<Home/>}/>
                <Route path="categories" element={<Categories />} />
                <Route path="helps" element={<Helps/>} />
                <Route path="needs" element={<Needs/>} />
                <Route path="regions" element={<Regions/>} />
                <Route path="users" element={<Users/>} />
                <Route path="*" element={<NotFound/>}/>
            </Route>

        </Routes>
    )
}

export default AdminRouter;
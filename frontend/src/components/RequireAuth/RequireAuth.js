import {
    Navigate,
    useLocation,
} from "react-router-dom";

function RequireAuth({children, auth, ...props}) {
    const location = useLocation();

    if (!auth) {
        return <Navigate to="/login" state={{from: location}} />
    }

    return children;
};

export default RequireAuth;
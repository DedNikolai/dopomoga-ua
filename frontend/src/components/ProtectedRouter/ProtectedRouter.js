import {
    Navigate,
    useLocation,
} from "react-router-dom";
import {connect} from 'react-redux';

function RequireAuth({children, currentUser}) {
    const location = useLocation();

    if (!hasAuthority(currentUser, 'ADMIN')) {
        if (hasAuthority(currentUser, 'USER')) {
            return <Navigate to='/'/>
        }
        return <Navigate to="/login" state={{from: location}} />
    }

    return children;
};

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser,
    }
};

export default connect(mapStateToProps)(RequireAuth);

const hasAuthority = (user, authirity) => {
    const set = new Set(user?.roles);
    return set.has(authirity);
};



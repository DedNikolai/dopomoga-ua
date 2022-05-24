import {
    Navigate,
    useLocation,
} from "react-router-dom";
import {connect} from 'react-redux';

function RequireAuth({children, currentUser}) {
    const location = useLocation();

    if (!currentUser) {
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



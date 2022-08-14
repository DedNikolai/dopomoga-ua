import React, {useEffect} from 'react';
import {
    Navigate,
    useLocation,
} from "react-router-dom";
import {connect} from 'react-redux';
import Preloader from "../Preloader/Preloader";
import {getCurrentUser} from "../../store/actions/user";

function ProtectedRouter({getCurrentUser, children, currentUser, currentUserLoading}) {
    const location = useLocation();

    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);

    if (currentUserLoading) {
        return <Preloader />
    }

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
        currentUserLoading: user.currentUserLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUser: () => dispatch(getCurrentUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRouter);

const hasAuthority = (user, authirity) => {
    const set = new Set(user?.roles);
    return set.has(authirity);
};



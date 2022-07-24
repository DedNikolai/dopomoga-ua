import {Fragment, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {connect} from 'react-redux';
import {getCurrentUser} from "../../store/actions/user";
import Loader from '../Loader/Loader';

function Layout({getCurrentUser, currentUserLoading, authLoading}) {
    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);
    
    return (
        <Fragment>
            {Loader({loading: currentUserLoading || authLoading})(Outlet)}
        </Fragment>
    )
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);


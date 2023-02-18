import {Fragment, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {connect} from 'react-redux';
import {getCurrentUser} from "../../store/actions/user";
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import Box from '@mui/material/Box';


function Layout({getCurrentUser, currentUserLoading, authLoading}) {
    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);
    
    return (
        <Fragment>
            <Header/>
            <Box sx={{padding: '65px 20px 0', marginBottom: '10px'}}>
                {Loader({loading: currentUserLoading || authLoading})(Outlet)}
            </Box>
        </Fragment>
    )
};

const mapStateToProps = ({user}) => {
    return {
        currentUserLoading: user.currentUserLoading,
        authLoading: user.authLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => dispatch(getCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

const hasAuthority = (user, authirity) => {
    const set = new Set(user?.roles);
    return set.has(authirity);
};


import {Fragment} from 'react';
import {Navigate, useLocation} from "react-router-dom";

function Login({signIn, auth}) {
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';

    if (auth) {
        return <Navigate to={fromPage} replace={true} />
    }

    return (
        <Fragment>
            <h1>Login</h1>
            <button onClick={signIn}>Sign In</button>
        </Fragment>
    )
};

export default Login;
import AppRouter from '../../routes/AppRouter';
import {Fragment} from 'react';
import Header from '../Header/Header';

function MainView() {
    return (
        <Fragment>
            <Header/>
            <AppRouter />
        </Fragment>
    )
}

export default MainView;
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {getCurrentUser} from "./store/actions/user";
import AppRouter from './routes/AppRouter';
import Loader from './components/Loader/Loader';

function App(props) {
  const {currentUserLoading, getCurrentUser, authLoading} = props;

  useEffect(() => {
      console.log("load current user");
      getCurrentUser();
  }, [getCurrentUser]);

  return Loader({loading: currentUserLoading || authLoading})(AppRouter)

}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);

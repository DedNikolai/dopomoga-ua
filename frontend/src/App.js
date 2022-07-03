import AppRouter from './routes/AppRouter';
import {Fragment} from 'react';
import Header from './components/Header/Header';


function App() {
  return (
   <Fragment>
      <Header/>
      <AppRouter />
   </Fragment>
  )
  // return <AppRouter />
}

export default App;

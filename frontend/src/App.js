import AppRouter from './routes/AppRouter';
import {Fragment} from 'react';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';


function App() {
  return (
   <Fragment>
      <Modal/>
      <Header/>
      <AppRouter />
   </Fragment>
  )
}

export default App;

import {Fragment} from 'react';
import Modal from './components/Modal/Modal';
import MainView from './components/MainView/MainView';
import Admin from './pages/Admin/Admin';
import {Route, Routes} from "react-router-dom";
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'


function App() {
  return (
   <Fragment>
      <Modal/>
       <Routes path="/" >
           <Route index path="/*" element={<MainView/>}/>
           <Route path="admin/*"
                  element={
                      <ProtectedRouter>
                          <Admin/>
                      </ProtectedRouter>
                  }/>
       </Routes>
   </Fragment>
  )
}

export default App;

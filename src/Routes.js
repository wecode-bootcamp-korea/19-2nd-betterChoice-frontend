import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import Identify from './Pages/SignUp/Identify';
import SignUp from './Pages/SignUp/SignUp';
// import Login from './Pages/Login/Login';
import TopButton from './Components/TopButton/TopButton';
import Footer from './Components/Footer/Footer';
import RoomLists from './Pages/RoomLists/RoomLists';
// import RoomDetail from './Page/RoomDetail/RoomDetail';

const Routes = () => {
  // console.log(window.location.pathname);

  return (
    <Router>
      {!window.location.pathname.includes('/join' || 'login') && <Nav />}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/join/identify" component={Identify} />
        <Route exact path="/join/signup" component={SignUp} />
        {/* <Route exact path="/login" component={Login} /> */}
      </Switch>
      {!window.location.pathname.includes('/join' || 'login') && <Footer />}
      {!window.location.pathname.includes('/join' || 'login') && <TopButton />}
    </Router>
  );
};

export default Routes;

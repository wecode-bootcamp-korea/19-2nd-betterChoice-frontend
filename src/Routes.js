import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Identify from './Pages/SignUp/Identify';
import SignUp from './Pages/SignUp/SignUp';
import TopButton from './Components/TopButton/TopButton';
import RoomLists from './Pages/RoomLists/RoomLists';
// import RoomDetail from './Page/RoomDetail/RoomDetail';

const join = window.location.pathname.includes('/join');
const login = window.location.pathname.includes('/login');

const Routes = () => {
  return (
    <Router>
      {!(join || login) && <Nav />}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/join/identify" component={Identify} />
        <Route exact path="/join/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/roomlists" component={RoomLists} />
        {/* <Route exact path="/room/detail/:id" component={RoomDetail} /> */}
      </Switch>
      {!(join || login) && <TopButton />}
    </Router>
  );
};

export default Routes;

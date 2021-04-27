import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Identify from './Pages/SignUp/Identify';
import SignUp from './Pages/SignUp/SignUp';
import RoomLists from './Pages/RoomLists/RoomLists';
import RoomDetail from './Pages/RoomDetail/RoomDetail';
import Order from './Pages/Order/Order';
import OrderConfirm from './Pages/Order/OrderConfirm/OrderConfirm';

const Routes = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/join/identify" component={Identify} />
        <Route exact path="/join/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/roomlists" component={RoomLists} />
        <Route exact path="/room/detail/:id" component={RoomDetail} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/order/orderConfirm" component={OrderConfirm} />
      </Switch>
    </Router>
  );
};

export default Routes;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import TopButton from './Components/TopButton/TopButton';
import Footer from './Components/Footer/Footer';
import RoomLists from './Pages/RoomLists/RoomLists';
// import RoomDetail from './Page/RoomDetail/RoomDetail';

const Routes = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/roomlists" component={RoomLists} />
        {/* <Route exact path="/room/detail/:id" component={RoomDetail} /> */}
      </Switch>
      <Footer />
      <TopButton />
    </Router>
  );
};

export default Routes;

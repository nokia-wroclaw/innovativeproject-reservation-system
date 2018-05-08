import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import DeviceBlock from './Device/DeviceBlock';
import DeviceAdd from './Device/DeviceDetails/DeviceAdd';
import ReservationPage from './ReservationForm/ReservationPage';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import style from '../style';
import DeviceEdit from './Device/DeviceDetails/DeviceEdit'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DeviceDetails from './Device/DeviceDetails/DeviceDetails';
import ReservationBlock from './ReservationBlock'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard/Dashboard'
import Logout from './Logout'
import NotFound from './NotFound';
import Verification from './Verification'
import Privacy from './Privacy'

import HomePage from './HomePage/HomePage'
import Navbar from "./Navbar/Navbar";

class HomeComponent extends Component {
  render() {
    return (
      <div style={style.body}>
        <Navbar/>
        <MuiThemeProvider>
          <div className="container content-container">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/devices" component={() => <DeviceBlock url='http://localhost:3001/api/devices'/>}/>
              <Route path='/devices/add' component={DeviceAdd}/>
              <Route exact path={'/devices/:id'} component={DeviceDetails}/>
              <Route path={'/devices/:id/edit'} component={DeviceEdit}/>
              <Route path="/reservations_list"
                     component={() => <ReservationBlock url='http://localhost:3001/api/reservations'/>}/>
              <Route path={'/reservation'}
                     component={() => <ReservationPage url='http://localhost:3001/api/reservations'/>}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/profile" component={Dashboard} />
              <Route path="/logout" component={Logout}/>
              <Route path="/verify/:id" component={Verification}/>
              <Route path="/privacy" component={Privacy}/>
              <Route component={NotFound} />
          </Switch>
            <footer style={style.footer}>
              Nokia- Innovative project 2018- Nokia Garage
            </footer>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default HomeComponent;

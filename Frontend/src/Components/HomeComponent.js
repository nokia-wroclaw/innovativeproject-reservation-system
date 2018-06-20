import React, { Component } from 'react';
import {
  Route,
  withRouter,
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
import Register from './Login/Register'
import Login from './Login/Login'
import Dashboard from './Profile/Profile'
import Logout from './Logout'
import NotFound from './NotFound';
import Verification from './Verification'
import Privacy from './Privacy'

import HomePage from './HomePage/HomePage'
import Navbar from "./Navbar/Navbar";

class HomeComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoginPage: false
    }
  }

  render() {
    if(this.props.location.pathname === "/login" || this.props.location.pathname === "/register"){
      this.state.isLoginPage = true
    }
    else {
      this.state.isLoginPage=  false
    }

    return (
      <div>
        {this.state.isLoginPage
        ? (
          <div>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route component={NotFound} />
            </Switch>
          </div>
        ) : (
          <div style={style.body}>
          <MuiThemeProvider>
            <Navbar/>
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
                  <Route path="/profile" component={Dashboard} />
                  <Route path="/logout" component={Logout}/>
                  <Route path="/verify/:id" component={Verification}/>
                  <Route path="/privacy" component={Privacy}/>
                  <Route path="/login" component={Login}/>
                  <Route component={NotFound} />
              </Switch>

                <footer style={style.footer}>
                  Nokia - Innovative project 2018 - Nokia Garage
                </footer>
              </div>
            </MuiThemeProvider>
          </div>

        )}
    </div>
    );
  }
}

export default withRouter(HomeComponent);

import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import DeviceBlock from './Device/DeviceBlock';
import ReservationBlock from './ReservationBlock';
import DeviceDetails from './Device/DeviceDetails/DeviceDetails';
import DeviceAdd from './Device/DeviceDetails/DeviceAdd';
import ReservationPage from './ReservationForm/ReservationPage';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import style from '../style';
import Radium from 'radium';
import DeviceEdit from './Device/DeviceDetails/DeviceEdit'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NokiaLogo from '../images/nokia.png'

import HomePage from './HomePage/HomePage'

const RadiatingLink = Radium(Link);

class HomeComponent extends Component{
  render() {
    return (
      <div style={style.body}>
        <MuiThemeProvider>
          <Toolbar style={{backgroundColor: 'white'}}>
            <ToolbarGroup firstChild={true} style={{marignRight: '50px'}}>
              <RadiatingLink to="/" style={{marginRight: '100px'}}>
                <img src={NokiaLogo}/>
              </RadiatingLink>
            </ToolbarGroup>
            <ToolbarGroup >
              <RadiatingLink to="/devices"  style={style.link}>
                <ToolbarTitle text="Devices"/>
              </RadiatingLink>

              <RadiatingLink to="/reservation"  style={style.link}>
                <ToolbarTitle text="Reservation"/>
              </RadiatingLink>

            </ToolbarGroup>
            <ToolbarGroup>

            </ToolbarGroup>
          </Toolbar>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/devices" component={() => <DeviceBlock url='http://localhost:3001/api/devices'/>}/>
            <Route path='/devices/add' component={DeviceAdd} />
            <Route exact path={'/devices/:id'} component={DeviceDetails} />
            <Route path={'/devices/:id/edit'} component={DeviceEdit}/>
  		      <Route path="/reservations_list" component={()=> <ReservationBlock url='http://localhost:3001/api/reservations'/>}/>
            <Route path={'/reservation'} component={() => <ReservationPage url='http://localhost:3001/api/reservations'/>} />
          </Switch>
          <footer style={style.footer}>
            Nokia- Innovative project 2018- Nokia Garage
          </footer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default HomeComponent;

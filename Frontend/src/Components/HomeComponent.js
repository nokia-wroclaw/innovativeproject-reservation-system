import React, {Component} from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import DeviceBlock from './Device/DeviceBlock';
import ReservationBlock from './ReservationBlock';
import DeviceDetails from './Device/DeviceDetails/DeviceDetails';
import ReservationPage from './ReservationForm/ReservationPage';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import style from '../style';
import Radium from 'radium';
import DeviceEdit from './Device/DeviceDetails/DeviceEdit'

const Home = () => (
  <div>
    <h1>Home page</h1>
    <p>



Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a vulputate augue. Donec euismod ipsum a felis dignissim eleifend. Nunc aliquam, nisi at ultrices pellentesque, metus felis blandit enim, sit amet pretium arcu mauris suscipit felis. Curabitur eu ultrices odio. Nam ornare varius ligula eu suscipit. Nam dapibus blandit aliquet. Pellentesque ac fringilla leo, vel tempor augue. Vestibulum sodales fringilla libero, in dapibus nisl porta non. Praesent aliquet luctus neque. Duis purus nulla, ullamcorper a orci efficitur, facilisis feugiat risus. Etiam lobortis, nisi vel faucibus pretium, lectus neque tristique tellus, a ultrices nulla enim a ipsum. Cras ullamcorper tellus metus, tempor efficitur quam auctor vel. Mauris blandit, est et ornare placerat, augue eros maximus magna, vitae pulvinar nibh leo ut urna. Curabitur in efficitur risus, a consequat nulla. In ac consequat ante. Aliquam et erat blandit, cursus libero in, venenatis eros.

Donec eleifend, augue vitae elementum condimentum, enim sapien pulvinar lectus, a euismod ante est fringilla nisi. Curabitur nec consectetur lorem. Etiam placerat, nulla quis porttitor ultricies, purus metus rutrum quam, at mollis nunc tortor sagittis tortor. In eros dui, laoreet at fermentum nec, accumsan at ante. Integer quis condimentum orci. Sed nec bibendum diam. Nulla quis luctus mauris. Integer nec nisl ut diam convallis imperdiet. Maecenas non vulputate velit. Pellentesque sodales sagittis massa, quis tincidunt mi rutrum id. Nam lobortis nunc at lectus mattis dapibus. Cras blandit rutrum tellus vitae ultrices. Morbi mi lectus, iaculis ut condimentum eu, scelerisque elementum massa. Curabitur luctus laoreet justo ut tempor.

    </p>
  </div>
);

const RadiatingLink = Radium(Link);

class HomeComponent extends Component{
  render() {
    return (
      <div style={style.body}>
        <ul style={style.unorderedlist}>
          <li style={style.list}>
            <RadiatingLink
              to='/' style={style.logo}>
              NOKIA
            </RadiatingLink>
          </li>
          <li style={style.list}>
            <RadiatingLink
             to="/devices" style={style.link}>
             Devices
            </RadiatingLink>
          </li>
		      <li style={style.list}>
            <RadiatingLink
             to="/reservations" style={style.link}>
             Reservations
            </RadiatingLink>
          </li>
          <li style={style.list}>
            <RadiatingLink
             to="/reservation_form" style={style.link}>
             Form
            </RadiatingLink>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/devices" component={() => <DeviceBlock url='http://localhost:3001/api/devices'/>}/>
		      <Route path="/reservations" component={()=> <ReservationBlock url='http://localhost:3001/api/reservations'/>}/>
          <Route exact path={'/devices/:id'} component={DeviceDetails} />
          <Route path={'/reservation_form'} component={() => <ReservationPage url='http://localhost:3001/api/reservations'/>} />
          <Route path={'/devices/:id/edit'} component={DeviceEdit}/>
        </Switch>
        <footer style={style.footer}>
          This is footer
        </footer>
      </div>
    );
  }
}

export default HomeComponent;

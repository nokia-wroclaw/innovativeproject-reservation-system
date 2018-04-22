import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'

class HomePage extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <Card>
          <CardHeader
            title='Welcome to Nokia Garage'
            titleStyle={{fontSize: '32px', textAlign: 'center'}}
          >
          </CardHeader>
          <CardMedia
            style={{textAlign: 'center'}}
            overlay={<FlatButton label="Join now" primary={true} style={{backgroundColor: 'white', textAlign: 'center'}}/>}
            overlayContentStyle={{backgroundColor: 'rgba(255, 255, 255, 0)', margin: '0px auto 30px auto'}}
          >
            <img src='http://static.antyweb.pl/uploads/2015/04/Nokia-logo.jpg' alt='nokia garage'/>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
      </div>
    );
  }

}

export default HomePage;

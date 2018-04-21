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
            <img src='https://www.archon.pl/images/products/m23c223bb0a00a/s/projekt-garaz-2-stanowiskowy-g27__26161.jpg' alt='nokia garage'/>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
      </div>
    );
  }

}

export default HomePage;

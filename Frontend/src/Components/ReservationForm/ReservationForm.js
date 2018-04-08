import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import NumOfPeopleTextField from './NumOfPeopleTextField'
import SelectRoomField from './SelectRoomField';
import DeviceTable from './DeviceTable';
import {Link} from 'react-router-dom';
import axios from 'axios'


class ReservationForm2 extends Component {
  constructor(props){
    super(props);
    this.state ={
      deviceData: [],
      value: 'WholeSpace',
      numOfPeople: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumOfPeopleChange = this.handleNumOfPeopleChange.bind(this);
    this.handleSelectRoomChange = this.handleSelectRoomChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let numOfPeople = this.state.numOfPeople.trim();
    let option = this.state.value;

    this.props.onReservationSubmit({ numOfPeople: numOfPeople, option: option});
    this.setState({numOfPeople: '', option: ''});
  }

  handleNumOfPeopleChange  (e) {
    this.setState({numOfPeople: e.target.value});
  }

  handleSelectRoomChange(event, index, value) {
    this.setState({value});
  }

  componentDidMount() {
    axios.get('/api/devices')
      .then(res => {
        this.setState({devicedata: res.data});
      })
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <NumOfPeopleTextField
            numOfPeople={this.state.numOfPeople}
            onChangeNumOfPeople={this.handleNumOfPeopleChange}
          />
          <SelectRoomField
            value={this.state.value}
            onRoomSelectChange={this.handleSelectRoomChange}
          />
          <DeviceTable
            onFormOpen={this.state.deviceData}
          />

          <MuiThemeProvider>
            <Link to='/'>
              <RaisedButton
                label="cancel"
                type="submit"
                primary={false}
                style={{float: 'left', margin: '10px 0px 0px 0px'}}
                />
            </Link>
            <RaisedButton
                label="Submit"
                type="submit"
                primary={true}
                style={{margin: '10px 0px 0px 50px'}}
            />
          </MuiThemeProvider>
          </form>

         </div>
    )
  }
}

export default ReservationForm2;

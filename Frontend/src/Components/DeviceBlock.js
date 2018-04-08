import React, {Component} from 'react'
import axios from 'axios'
import DeviceList from './DeviceList';
import DeviceForm from './DeviceForm';
import style from '../style';

class DeviceBlock extends Component {
  constructor(props){
    super(props);
    this.state = {data: []};
    this.loadDeviceFromServer = this.loadDeviceFromServer.bind(this);
    this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this);
    this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
    this.handleDeviceEdit = this.handleDeviceEdit.bind(this);

  }


  loadDeviceFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({data: res.data});
      })
  }

  handleDeviceSubmit(device){
    let devices = this.state.data;
    device.id = Date.now();
    axios.post(this.props.url, device)
    .then((result) =>{
      this.setState({data:  [...devices,result.data]});
    })
    .catch(err => {
      console.error(err);

    });
  }

  handleDeviceDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        let devices = this.state.data.filter((item) => item._id !== id )
          this.setState({data: devices});
        console.log('device deleted');
      })
      .catch(err => {
        console.error(err);
      });
    }

    handleDeviceEdit(id, device) {
      axios.put( `${this.props.url}/${id}`, device )
      .then(result => {
        console.log(result.data);
        const index = this.state.data.findIndex(function(item) {
          return item._id === result.data._id;
        })
        const newData = [...this.state.data];
        newData[index] = result.data;
        this.setState({data: newData});
      })
      .catch(err => {
        console.error(err);
      })
    }

  componentDidMount() {
    this.loadDeviceFromServer();
  }

  componentWillUnmount() {
  }

  render() {
    return (
        <div style={style.deviceBox}>
          <h3 style={style.title}>Devices:</h3>
        <DeviceForm
          onDeviceSubmit={this.handleDeviceSubmit} />
        <DeviceList
  
          onDeviceDelete = {this.handleDeviceDelete}
          onDeviceEdit={this.handleDeviceEdit}
          data={this.state.data}>
        </DeviceList>
        </div>
    )
  }
}

export default DeviceBlock;

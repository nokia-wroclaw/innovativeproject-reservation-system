import React, { Component } from 'react';
import Device from './Device';
import style from '../../style';

class DeviceList extends Component {
  static defaultProps = {data: []};
    render() {
      if(this.props.renderType === 'deviceList')
      {
      let deviceNodes = this.props.data.map(device => {
          return (
            <Device
              name={ device.name }
              numLeft={device.numLeft}
              description={device.description}
              uniqueID={ device['_id'] }
              image={device.deviceImage}
              onDeviceDelete={this.props.onDeviceDelete}
              onDeviceEdit={this.props.onDeviceEdit}
              key={ device._id }>
            </Device>

          )
        })
        return (
          <div style={ style.deviceList }>
            { deviceNodes }
          </div>
        )
      }
    else if(this.props.renderType === 'deviceSelection'){
        let deviceNodes = this.props.data.map(device => {
            return (
              <Device
                name={ device.name }
                numLeft={device.numLeft}
                uniqueID={ device['_id'] }
                selectedAmount={this.props.selectedAmount}
                onAmountChange={this.props.onAmountChange}
                key={ device._id }>
              </Device>

            )
          })
          return (
            <div style={ style.deviceList }>
              { deviceNodes }
            </div>
          )
        }
  }
}

export default DeviceList;

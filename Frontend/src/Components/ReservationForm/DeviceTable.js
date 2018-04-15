import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import AddIcon from '../../images/ic_add_black_24px.svg';

class DeviceTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter:true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '100px',
      toBeAdded: false
    }

    this.handleAddingButton = this.handleAddingButton.bind(this);
  }

  handleAddingButton(e) {
    e.preventDefault();
    this.setState({toBeAdded: !this.state.toBeAdded});
  }

  render() {
    return (
      <div>
      <MuiThemeProvider>
      <Table
        height={this.state.height}
        fixedFooter={this.state.fixedFooter}
        fixedHeader={this.state.fixedHeader}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
      >
        <TableHeader
          displaySelectAll={this.state.displaySelectAll}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
        >
        <TableRow>
          <TableHeaderColumn colSpan="2" tooltip="Device in reservation" style={{textAlign: 'center'}}>
            Devices
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn tooltip="Name">Device name</TableHeaderColumn>
          <TableHeaderColumn tooltip="Number of devices">Number of devices</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
        >
            <TableRow>
              <TableRowColumn>Oscilloscope</TableRowColumn>
              <TableRowColumn>
                <TextField
                  placeholder="ex. 1"
                  >
                </TextField>
              </TableRowColumn>
            </TableRow>
        </TableBody>
      </Table>
      {!this.state.toBeAdded
        ? (
        <List>
        <ListItem
          primaryText="Add new device"
          leftAvatar={<Avatar src={AddIcon} />}
          onClick={this.handleAddingButton}
          hoverColor='#ffffff'
          style={{color: 'black', backgroundColor: '#b3f2b0'}}
        />
        </List>
      ) : (
        <div>
          
        </div>
      )
      }
      </MuiThemeProvider>
      </div>
    )
  }
}


export default DeviceTable;

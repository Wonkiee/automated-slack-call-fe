import React from "react";
import stringConstants from '../utils/stringConstants'
import $ from 'jquery';
const STATUS = stringConstants.STATUS;

export default class ToggleButton extends React.Component {

  constructor(props) {
    super(props);
}

  render() {
    this.setToggleButtonState();
    return (
      <div>
        <label className="switch">
        <input type="checkbox" id="status" onClick={this.props.toggle}/>
        <span className="slider round"></span>
        </label>
      </div>
    );
  }

  setToggleButtonState = () => {
    if(this.props.currentStatus === STATUS.OFLINE) { console.log(this.props.currentStatus)
      $("#status").prop( "disabled", true);
      return;
    }
    $("#status").prop( "disabled", false);
    if(this.props.status === STATUS.ONLINE) {
      $("#status").prop( "checked", true);
      return;
    }
    $("#status").prop( "checked", false);
    return;
  }
}
import React from "react";
import Switch from "react-switch";
import slackCallApiClient from '../services/slackCallApiClient'
import stringConstants from '../utils/stringConstants';

export default class ActiveNumbers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          checked: false
        };
        this.getPhoneNumberActiveStates();
    }

    render() {
        return (
        <div>
            <span className="text-style">{this.props.phoneNumber}</span>
            <Switch onChange={ (e) => this.handleChange(this.props.phoneNumber, e)} checked={this.state.checked} id={this.props.phoneNumber}/>
        </div>
        );
    }

    handleChange = (phoneNumber, checked) => {
        this.setState({ checked });
        slackCallApiClient.handleCallingOperation(phoneNumber, checked);
    }

    setToggleButtonState = (PHONE_NUMBER_ACTIVE_STATES) => {
        if(PHONE_NUMBER_ACTIVE_STATES && PHONE_NUMBER_ACTIVE_STATES[this.props.phoneNumber]){
            let onlineState = PHONE_NUMBER_ACTIVE_STATES[this.props.phoneNumber];
            if(onlineState.ACTIVE_STATE === stringConstants.SERVICE_STATUS_TYPES.RUNNING) {
                return this.setState({
                    checked: true
                });
            }
            return this.setState({
                checked: false
            });
        }
    }

    getPhoneNumberActiveStates = () => {
        slackCallApiClient.phoneNumberActiveStates()
        .then((res) => {
            return this.setToggleButtonState(res);
        })
        .catch((err) => {
            return;
        });
    }

}
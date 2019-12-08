import React from 'react';
import { Container } from 'reactstrap';
import ToggleButton from './ToggleButton'
import ActiveNumber from './activeNumbers';
import slackCallApiClient from '../services/slackCallApiClient'
import stringConstants from '../utils/stringConstants'
import $ from 'jquery';
import { element } from 'prop-types';
import { stat } from 'fs';
const STATUS = stringConstants.STATUS;

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.getCurrentStatusOfApi();
        this.toggle = this.toggle.bind(this);
        this.state = {
          APP_STATUS: '',
          CURRENT_APP_STATUS: ',',
          activePhoneNumbersArray: [],
          PHONE_NUMBER_ACTIVE_STATES: {}
        };
    }

    render() {
console.log('called')
        return(
            <>
            <Container className="themed-container" fluid="xl" style={{backgroundColor: '#f1f1f1'}}>
                <h1 className="orange">Slack Call Generator</h1>
                <div className="seperator"/>
                <br/>
                <div>
                    <span className="text-style">Status:
                        <span className="server-status" id="serverStatus">{this.state.APP_STATUS} </span>
                    </span>
                    <span className="text-style status"></span>
                </div>
                <div>
                    <span className="text-style">Set Availability</span>
                    <span className="text-style"> <ToggleButton toggle={this.toggle} status={this.state.APP_STATUS} currentStatus={this.state.CURRENT_APP_STATUS}/> </span>
                </div>
                <div className="seperator"/>
                <div>
                    <span className="text-style">Active Numbers:</span>
                    <div id='active-phone-number'>
                    {
                        this.state.activePhoneNumbersArray.map((number, index) => {
                            return <ActiveNumber phoneNumber={number} key={index} status={this.state.APP_STATUS}/>
                        })
                    }
                    </div>
                </div>
            </Container>
            </>
        );
    }

    toggle = () => {
        if (document.getElementById('status').checked){
          this.setAppStatus(true);
          slackCallApiClient.setServerStatus(true);
          return;
        }
        this.setAppStatus(false);
        slackCallApiClient.setServerStatus(false);
        return;
    };

    setAppStatus = (status) => {
        if(status) {
            this.setState({
                APP_STATUS: STATUS.ONLINE
            });
            return;
        }
        this.setState({
            APP_STATUS: STATUS.OFLINE
        });
        return;
    }

    getCurrentStatusOfApi = () => {
        slackCallApiClient.getServerStatus()
        .then((res) => {
            if(res) {
                this.setState({
                    APP_STATUS:STATUS.ONLINE,
                    CURRENT_APP_STATUS:STATUS.ONLINE
                })
                this.getActiveNumbers();
                slackCallApiClient.phoneNumberActiveStates()
                .then((res) => {
                    this.setPhoneNumberActiveStates(res);
                })
                .catch((err) => {
                    return;
                });
                return;
            }
            this.setState({
                APP_STATUS:STATUS.OFLINE,
                CURRENT_APP_STATUS: STATUS.OFLINE
            });
            return;
        })
        .catch((err) => {
            this.setState({
                APP_STATUS:STATUS.OFLINE,
                CURRENT_APP_STATUS: STATUS.OFLINE
            });
        })
    };

    getActiveNumbers = () => {
        slackCallApiClient.getActiveNumbers().
        then((res) => {
            this.populateActiveNumbers(res);
        })
        .catch((err) => {

        });
    }

    populateActiveNumbers = (activeNumbersList) => {
        let phoneNumbers = JSON.parse(activeNumbersList),
            phoneNumbersArray = [];

         for (var key in phoneNumbers) {
            phoneNumbersArray.push(phoneNumbers[key]);
        }
        this.setState({
            activePhoneNumbersArray: phoneNumbersArray
        });
    }

    setPhoneNumberActiveStates = (res) => {
        this.setState({
            PHONE_NUMBER_ACTIVE_STATES:res
        });
    }
}
import React from "react";
import { ButtonToggle } from "reactstrap";

export default class ToggleButton extends React.Component {
//   constructor(props) {
//     super(props);

//     this.buttonClicked = this.buttonClicked.bind(this); //this binding is needed if your're using ES5 features
//     this.state = {
//       buttonId: this.props.buttonId //buttonId = phoneModelId
//     };
//   }

  render() {
    return (
      <div>
        <ButtonToggle color="secondary">ON</ButtonToggle>{' '}
        <ButtonToggle color="danger">OFF</ButtonToggle>{' '}
      </div>
    );
  }

//   buttonClicked = () => {
//     this.props.click(this.state.buttonId);
//   };
}

export default ToggleButton;
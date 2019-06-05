import React, {PureComponent} from "react";

const withFormHandler = (Component) => {
  class WithFormHandler extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        email: null,
        password: null,
      };
      this._handlerPasswordInput = this._handlerPasswordInput.bind(this);
      this._handlerEmailInput = this._handlerEmailInput.bind(this);
    }
    render() {
      return <Component
        {...this.props}
        formData={this.state}
        onPasswordInput={this._handlerPasswordInput}
        onEmailInput={this._handlerEmailInput}
      />;
    }
    _handlerPasswordInput(evt) {
      this.setState({password: evt.target.value});
    }
    _handlerEmailInput(evt) {
      this.setState({email: evt.target.value});
    }
  }
  return WithFormHandler;
};

export default withFormHandler;

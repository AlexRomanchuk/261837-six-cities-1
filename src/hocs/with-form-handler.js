import React, {PureComponent} from "react";

const withFormHandler = (defaultFormData = {}) => (Component) => {
  class WithFormHandler extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        formData: defaultFormData
      };
      this._handleInputChange = this._handleInputChange.bind(this);
    }
    render() {
      return <Component
        {...this.props}
        formData={this.state.formData}
        onFieldInput={this._handleInputChange}
      />;
    }
    _handleInputChange(evt) {
      const target = evt.target;
      const value = target.type === `checkbox` ?
        target.checked : target.value;
      const name = target.name;

      this.setState({
        formData: Object.assign({}, this.state.formData, {[name]: value}),
      });
    }
  }

  return WithFormHandler;
};

export default withFormHandler;

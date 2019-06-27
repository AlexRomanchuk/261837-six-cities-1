import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";
import withFormHandler from "../../hocs/with-form-handler.js";
import {authorizeUser} from "../../reducers/user/user.js";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  render() {
    const {autorizationError, onFieldInput, formData = {}, user} = this.props;
    const {email = ``, password = ``} = formData;
    const BAD_DATA = 400;
    if (user) {
      return <Redirect to="/" />;
    }
    return <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" onSubmit={this._handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" value={email} placeholder="Email" onChange={onFieldInput} required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" value={password} placeholder="Password" onChange={onFieldInput} required />
            </div>
            {(autorizationError && autorizationError.status === BAD_DATA) && <p>All fields are required.</p>}
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>;
  }
  _handleSubmit(evt) {
    evt.preventDefault();
    const {formData = {}, onSubmitForm} = this.props;
    const {email, password} = formData;
    onSubmitForm(email, password);
  }
}

const mapStateToProps = (state) => ({
  user: state[`USER`].user,
  authorizationError: state[`USER`].autorizationError,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (email, password) => dispatch(authorizeUser(email, password)),
});

Login.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onFieldInput: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  autorizationError: PropTypes.object,
  user: PropTypes.object,
};

export {Login};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFormHandler()
)(Login);


import React from "react";
import PropTypes from "prop-types";
import Loading from "../loading/loading.jsx";
import Property from "../property/property.jsx";
import Login from "../login/login.jsx";
import MainPage from "../main-page/main-page.jsx";
import Favorites from "../favorites/favorites.jsx";
import ScrollToTop from "../scroll-to-top/scroll-to-top.jsx";
import Redirector from "../redirector/redirector.jsx";
import {unauthorizeUser} from "../../reducers/user/user.js";
import history from "../../util/util.js";
import {Router, Switch, Route, Link} from "react-router-dom";
import {connect} from "react-redux";
import withAuthorizeRequired from "../../hocs/with-authorize-required.js";

const PrivateFavoritesPage = withAuthorizeRequired(Favorites);

const Main = (props) => {
  const {
    isLoading,
    user,
    onLogoutClick,
  } = props;

  return <React.Fragment>
    <Router history={history}>
      <ScrollToTop>
        <div style={{display: `none`}}>
          <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
        </div>

        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link header__logo-link--active" to="/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {user ?
                    <React.Fragment>
                      <li className="header__nav-item user">
                        <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                          <span className="header__user-name user__name">{user.email}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item logout">
                        <a href="#" onClick={onLogoutClick} className="header__nav-link header__nav-link--profile">
                          <span className="header__user-name">&nbsp;Logout</span>
                        </a>
                      </li>
                    </React.Fragment> :
                    <li className="header__nav-item user">
                      <Link to="/login" className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  }
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <Switch>
          <Route path="/" exact render={() => isLoading ? <Loading /> : <MainPage />} />
          <Route path="/login" component={Login} />
          <Route path="/favorites" component={PrivateFavoritesPage} />
          <Route path="/offer/:id" exact component={Property} />
          <Route path="/jsredir/:id" exact component={Redirector} />
        </Switch>
        <footer className="footer">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </ScrollToTop>
    </Router>
  </React.Fragment>;
};

Main.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  user: PropTypes.object,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: state[`OFFERS`].isLoading,
  user: state[`USER`].user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(unauthorizeUser());
  },
});

export {Main};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

import React from 'react';
import logo from '../../assets/images/logo.png'
import { ROUTES } from '../../config/routes';

const Header = (props) => (
  <div className="header">
    <div className="container">
      <div className="brand-bar">
        <div className="brand-bar__brand" onClick={() => props.pageChange(ROUTES.rootUrl)}>
          <img src={logo} alt='logo' />
        </div>
        <div className="brand-bar__menu">
          <div className={`brand-bar__menu-link ${props.headerActiveButton('HOME')}`} onClick={() => props.pageChange(ROUTES.rootUrl)}><p>HOME</p></div>
          {props.user.loggedIn ? (
            null
          ) :(
            <div className={`brand-bar__menu-link`} onClick={() => props.pageChange(ROUTES.login.info.url)}><p>LOGIN</p></div>
          )}
        </div>
      </div>
    </div>
    <div className="brand-bar__links">
      <div className="brand-bar__link" onClick={props.handleShowMenu}>
        <div className="brand-bar__link-name">
          {
            props.user.loggedIn ?
              <div>
                <div className="brand-bar__link-name"> {props.user.user.email} </div>
                <div className={`float-nav__item warning`} onClick={props.logout}>Sair</div>
              </div>
              :
              <div onClick={() => props.pageChange(ROUTES.login.info.url)}>
                <div className="brand-bar__link-name">Login</div>
              </div>
          }
        </div>
      </div>
    </div>
  </div>
)

export default Header;

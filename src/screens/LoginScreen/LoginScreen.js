import React from 'react';
import { PropTypes } from 'prop-types';
import LoginContainer from '../../containers/LoginContainer/LoginContainer';

export default class LoginScreen extends React.Component {

  render() {
    return (
      <LoginContainer 
        {...this.props}
        pageChange={this.props.pageChange}
      />
    );
  }
}

LoginScreen.propTypes = {
  welcome: PropTypes.string,
  message: PropTypes.string,
};

LoginScreen.defaultProps = {
  welcome: 'Bem-vindo!',
  message: 'Para atualizar ou excluir, pedimos que você faça o login primeiro.',
};

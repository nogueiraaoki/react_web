import React from 'react';
import { PropTypes } from 'prop-types';
import RegistrationContainer from '../../containers/RegistrationContainer/RegistrationContainer';

export default class RegistrationScreen extends React.Component {
  render() {
    return (
      <RegistrationContainer
        {...this.props}
        pageChange={this.props.pageChange}
      />
    );
  }
}

RegistrationScreen.propTypes = {
  welcome: PropTypes.string,
  message: PropTypes.string,
};

RegistrationScreen.defaultProps = {
  welcome: 'Bem-vindo!',
  message: 'Para atualizar ou excluir, pedimos que você se cadastre primeiro.'
};

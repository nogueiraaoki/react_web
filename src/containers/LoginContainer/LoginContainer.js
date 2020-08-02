import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { LABELS } from '../../config/labels';
import { loginClient } from '../../requests/loginFormRequest';
import { loginAction } from '../../redux/actions/loginActions';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ROUTES } from '../../config/routes';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: '',
      emailError: '',
      passwordError: '',
      valid: false,
      disabled: false
    };
  }

  handleChangeInput = (text, input) => {
    const {
        password,
        email,
    } = LABELS.LoginForm;

    switch (input) {
        case password:
            this.setState({ password: text });
            break;
        case email:
            this.setState({ email: text });
            break;
        default:
            break;
    }
  }

  handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;
        // validating password/password_confirmation input
        valid = this.validPassword() && valid;

        // validating email input
        valid = this.validEmail() && valid;

        if (valid) {
            this.setState({ disabled: true });
            const params = {
                email: this.state.email,
                password: this.state.password,
            };
            loginClient(params).then((response) => {
                this.setState({
                    email: '',
                    password: '',
                    loading: false,
                    disabled: false
                });
                let user = {...response.data};
                user.token = response.headers.authorization
                this.props.loginAction(user);
                toast.success('Usuário logado com sucesso!');
                this.props.pageChange(ROUTES.rootUrl)
            }).catch(error => {
                const message = error.message;
                toast.warn(message);
                this.setState({
                    disabled: false,
                    emailError: message
                });
            });
        } else {
            toast.warn('Não foi possível fazer login. Tente novamente!');
        }
    }

    validPassword = () => {
        if (this.state.password === '') {
            this.setState({
                passwordError: LABELS.LoginForm.messagePasswordBlank,
                valid: false
            });
        } else {
            this.setState({ passwordError: '', valid: true });
            return true;
        }
        return false;
    }

    validEmail = () => {
        const regexEmail = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/;

        if (this.state.email === '') {
            this.setState({
                emailError: LABELS.LoginForm.messageEmailBlank,
                valid: false
            });
        } else if (!this.state.email.match(regexEmail)) {
            this.setState({
                emailError: LABELS.LoginForm.messageEmailInvalid,
                valid: false
            });
        } else {
            this.setState({ emailError: '', valid: true });
            return true;
        }
        return false;
    }

    render() {
        return (
            <LoginForm
                state={this.state}
                {...this.props}
                handleChangeInput={this.handleChangeInput}
                handleSubmit={this.handleSubmit}
                pageChange={this.props.pageChange}
            />
        );
    }
}

LoginContainer.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    password_confirmation: PropTypes.string,
    buttonSubmit: PropTypes.string,
    notRegister: PropTypes.string
};

LoginContainer.defaultProps = {
    password: 'Senha',
    email: 'E-mail',
    inputs: [
        {
            name: 'email',
            placeholder: 'Preencha seu e-mail',
            errorLabel: 'emailError',
            type: 'email'
        },
        {
            name: 'password',
            placeholder: 'Preencha sua senha de acesso',
            errorLabel: 'passwordError',
            type: 'password'
        },
    ],
    buttonSubmit: 'Entrar',
    notRegister: 'Ainda não tem cadastro? '
};

const mapStateToProps = state => ({
    cart: state.cartReducer
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ loginAction }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

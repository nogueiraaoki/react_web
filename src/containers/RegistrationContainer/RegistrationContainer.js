import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { LABELS } from '../../config/labels';
import { registerClient } from '../../requests/registrationFormRequest';
import { loginAction } from '../../redux/actions/loginActions';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { ROUTES } from '../../config/routes';

class RegistrationContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        password: '',
        password_confirmation: '',
        email: '',
        emailError: '',
        passwordError: '',
        valid: false,
        showAlert: false,
        disabled: false
        };
    }

    handleChangeInput = (text, input) => {
        const {
            password,
            passwordConfirmation,
            email,
        } = LABELS.RegistrationForm;

        switch (input) {
            case password:
                this.setState({ password: text });
                break;
            case passwordConfirmation:
                this.setState({ password_confirmation: text });
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
                password_confirmation: this.state.password_confirmation,
            };
            registerClient(params).then((response) => {
                this.props.pageChange(ROUTES.login.info.url)
                this.setState({
                email: '',
                password: '',
                password_confirmation: '',
                loading: false,
                showAlert: true,
                disabled: false
                });
                toast.success('Usuário cadastrado com sucesso!');
                this.props.pageChange(ROUTES.rootUrl)
            }).catch(error => {
                this.setState({ disabled: false });
                this.showError(error.message);
                toast.warn('Não foi possível fazer o cadastro. Tente novamente!');
            });
        } else {
            toast.warn('Não foi possível fazer o cadastro. Tente novamente!');
        }
    }

    showError = error => {
        const { email } = LABELS.RegistrationForm;
        switch (error.id) {
            case email:
                this.setState({ emailError: error.title });
                break;
            default:
                break;
        }
    }

    validPassword = () => {
        if (this.state.password === '' && this.state.password_confirmation === '') {
            this.setState({
                passwordError: LABELS.RegistrationForm.messagePasswordBlank,
                valid: false
            });
        } else if (this.state.password !== this.state.password_confirmation) {
            this.setState({
                passwordError: LABELS.RegistrationForm.messagePasswordError,
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
                emailError: LABELS.RegistrationForm.messageEmailBlank,
                valid: false
            });
        } else if (!this.state.email.match(regexEmail)) {
            this.setState({
                emailError: LABELS.RegistrationForm.messageEmailInvalid,
                valid: false
            });
        } else {
            this.setState({ emailError: '', valid: true });
            return true;
        }
        return false;
    }

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    render() {
        return (
            <RegistrationForm
                state={this.state}
                {...this.props}
                handleChangeInput={this.handleChangeInput}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

RegistrationContainer.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    password_confirmation: PropTypes.string,
    buttonSubmit: PropTypes.string
};

RegistrationContainer.defaultProps = {
    password: 'Senha',
    password_confirmation: 'Confirmação de senha',
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
        placeholder: 'Escolha uma senha de acesso',
        type: 'password',
        errorLabel: 'passwordError'
        },
        {
        name: 'password_confirmation',
        placeholder: 'Repita a senha de acesso',
        type: 'password',
        errorLabel: 'passwordError'
        },
    ],
    buttonSubmit: 'Registrar'
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ loginAction }, dispatch)
);

export default connect(null, mapDispatchToProps)(RegistrationContainer);

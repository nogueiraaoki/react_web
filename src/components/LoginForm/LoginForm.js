import React from 'react';
import { ROUTES } from '../../config/routes';
const styles = 'login-form';

const LoginForm = (props) => (
    <div className='registration-container'>
        <form className='registration-form' onSubmit={props.handleSubmit}>
            <div className={`${styles}-not-register`} onClick={() => props.pageChange(ROUTES.register.info.url)}>
                <p className="login-form-form__warning">{props.notRegister}<b>Clique aqui para se cadastrar.</b></p>
            </div>
            {props.inputs.map((input, index) =>
                <div className="login-form-form__input" key={index}>
                    <p className="login-form-form__label">
                        {props[input.name]}
                    </p>
                    <input
                        className={`${styles}-input`}
                        value={props.state[input.name]}
                        type={input.type}
                        placeholder={input.placeholder}
                        onChange={(event) => props.handleChangeInput(event.target.value, input.name)}
                    />
                    <p className={`${styles}-text-error`}>
                        {props.state[input.errorLabel]}
                    </p>
                </div>
            )}
            <div className='registration-buttons'>
                <button className={`${styles}-button`} onClick={props.handleSubmit}>
                    <p className={`${styles}-text-button`}>{props.buttonSubmit}</p>
                </button>
            </div>
        </form>
    </div>
);

export default LoginForm;

import React from 'react';
import { ROUTES } from '../../config/routes';

const RegistrationForm = (props) => (
    <div className='registration-container'>
        <form className='registration-form' onSubmit={props.handleSubmit}>
            {props.inputs.map((input, index) =>
                <div key={index} className='registration-container-input'>
                    <p>
                        {props[input.name]}
                    </p>
                    <input
                        value={props.state[input.name]}
                        placeholder={input.placeholder}
                        type={input.type}
                        className='registration-input'
                        onChange={(event) => props.handleChangeInput(event.target.value, input.name)}
                    />
                    <p className='registration-text-error'>
                        {props.state[input.errorLabel]}
                    </p>
                </div>
            )}
            <div className='registration-buttons'>
                <button
                    className='back-registration-button'
                    onClick={() => props.pageChange(ROUTES.login.info.url)}
                    type='button'
                >
                    <p className='registration-text-button'>
                        Voltar para login
                    </p>
                </button>
                    <button
                        className='registration-button'
                        onClick={props.handleSubmit}
                        type='submit'
                    >
                    <p className='registration-text-button'>
                        {props.buttonSubmit}
                    </p>
                </button>
            </div>
        </form>
    </div>
);

export default RegistrationForm;

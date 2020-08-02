import React from 'react';
import logo from '../../assets/images/logo.png'

const Footer = (props) => (
    <div className="footer">
        <div className="footer__container">
            <div className="footer__brand">
                <img src={logo} alt='logo' />
            </div>
            <div className="footer__store-informations">
                <p className="footer__title">
                    Curitiba - PR
                </p>
                <p className="footer__paragraph">(99) 9999-9999</p>
                <p className="footer__paragraph">Rua Conselheiro, Centro</p>
            </div>
            <div className="footer__store-informations">
                <p className="footer__title">
                    Curitiba - PR
                </p>
                <p className="footer__paragraph">(99) 9999-9999</p>
                <p className="footer__paragraph">Rua Conselheiro, Centro</p>
            </div>
            <div className="footer__store-contacts">
                <p className="footer__title">Fale conosco</p>
                <p className="footer__paragraph">CEP: 00.000-000</p>
                <p className="footer__paragraph">Telefone: (99) 9999-9999</p>
                <p className="footer__paragraph">E-mail: email@email.com</p>
            </div>
        </div>
        <div className="copyright">© 2020 | Todos os direitos reservados</div>
    </div>
);

export default Footer;

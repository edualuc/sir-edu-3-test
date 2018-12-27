import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './Footer.scss'
import { logo } from '../../constants/configConstants'

import Paginas from '../../routes/Pages'

const dict = {
    footer: {
        LabelMenuCollapsed: 'Oi'
    }
}

const Footer = (pros) => {
    return (
        <div className="container-fluid footer">
            <div className="navbar-brand navbar-footer ml-3 ml-md-1">
                <img id="logo-footer" src={logo} />
                Sistema de Gestão e Acompanhamento Educacional - 2018
            </div>
            {/* <div className="navbar-inner navbar-right" id="navbarMenuFooter">
                <ul className="nav nav-menu navbar-nav navbar-right">
                    <li className={'nav-item'} key="termos"><Link to={Paginas.termos.pathWithoutParam}>Termo de uso e privacidade</Link></li>
                    <li className={'nav-item'} key="sobre"><Link to={Paginas.sobre.pathWithoutParam}>Sobre</Link></li>
                </ul>
            </div> */}
        </div>
    )
}

export default Footer;

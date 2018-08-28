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
                SR-Edu - Sistema integrado de recursos educacionais - 2018
            </div>
            {/* <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarMenuFooter" aria-controls="navbarMenuFooter" aria-expanded="false" aria-label={dict.footer.LabelMenuCollapsed}>
                <span className="navbar-toggler-icon" />
            </button>collapse navbar-collapse */}
            <div className="navbar-inner " id="navbarMenuFooter">
                <ul className="nav nav-menu navbar-nav navbar-right">
                    <li className={'nav-item'} key="termos"><Link to={Paginas.termos.pathWithoutParam}>Termo de uso e privacidade</Link></li>
                    <li className={'nav-item'} key="sobre"><Link to={Paginas.sobre.pathWithoutParam}>Sobre</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './Header.scss'
import { logo } from '../../constants/configConstants'
import { connect } from 'react-redux'
import { logout } from 'store/login'

import Home from '../../routes/Home'
import Paginas from '../../routes/Pages'
import Login from '../../routes/Login'

import StundentList from '../../routes/Student/StudentList'
import SchoolList from '../../routes/School/SchoolList'
//import GroupList from '../../routes/Group/GroupList'
import UserRegister from '../../routes/User/UserRegister'

const dictAll = {
  en: {
    header: {
      LabelMenuCollapsed: 'Toggle navigation'
    }
  },
  pt_br: {
    header: {
      LabelMenuCollapsed: 'Ver Opções do Menu'
    }
  }
}

const dict = dictAll['pt_br']

export const Header = (props, user) => {
  const classActive = {}
  classActive[window.location.pathname] = 'active';
  
  return (
    <header className="pt-0 pt-md-1">
      <nav className="navbar navbar-expand-md navbar-light ">
          <div className=" navbar-brand navbar-header ml-3 ml-md-1">
            <Link to={Home.pathWithoutPath}><img id="header-logo" src={logo} /> </Link>
          </div>

          <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarMenuItens" aria-controls="navbarMenuItens" aria-expanded="false" aria-label={dict.header.LabelMenuCollapsed}>
            <span className="navbar-toggler-icon" />
          </button>

          <div className="navbar-inner collapse navbar-collapse" id="navbarMenuItens">
            <ul className="nav nav-menu navbar-nav mr-auto">
              <li className={'nav-item ' + classActive[Home.pathWithoutPath]} key="inicial"><Link to={Home.pathWithoutPath}>Página inicial</Link></li>
              {
                (!props.auth.isAuthenticated)
                  ? [
                    <li className={'nav-item ' + classActive[Paginas.quemSomos.pathWithoutParam]} key="quem-somos"><Link to={Paginas.quemSomos.pathWithoutParam}>Quem somos</Link></li>,
                    <li className={'nav-item ' + classActive[Paginas.servico.pathWithoutParam]} key="servicos"><Link to={Paginas.servico.pathWithoutParam}>Serviços</Link></li>,
                    <li className={'nav-item ' + classActive[Paginas.contato.pathWithoutParam]} key="contato"><Link to={Paginas.contato.pathWithoutParam}>Contato</Link></li>
                  ] : [
                    <li className={'nav-item ' + classActive[StundentList.pathWithoutParam]} key="alunos"><Link to={StundentList.pathWithoutParam}>Alunos</Link></li>,
                    <li className={'nav-item ' + classActive[SchoolList.pathWithoutParam]} key="escolas"><Link to={SchoolList.pathWithoutParam}>Escolas</Link></li>,
                    //<li className={'nav-item ' + classActive[GroupList.pathWithoutParam]} key="grupos"><Link to={GroupList.pathWithoutParam}>Grupos</Link></li>
                  ]
              }
            </ul>
            <ul className="nav nav-login navbar-nav navbar-right">
              {
                (!props.auth.isAuthenticated)
                  ? [
                    <li className={'nav-item ' + classActive[Login.pathWithoutParam]} key="login"><Link to={Login.pathWithoutParam}><span className="glyphicon glyphicon-log-in" /> Entrar</Link></li>
                  ] : [
                    <li className={'nav-item ' + classActive[UserRegister.pathWithoutParam]} key="usuario"><Link to={UserRegister.pathWithoutParam + '/' + props.auth.user._id + '/editar'}><span className="glyphicon glyphicon-user" /> Bem-vindo, {props.auth.user.name}</Link></li>,
                    <li className={'nav-item '} key="logout"><a onClick={() => { props.logout(); }}>
                      <span className="glyphicon glyphicon-log-out" /> Sair
                  </a></li>
                  ]
              }
            </ul>
          </div>
        {/* </div> */}
      </nav>
    </header>
  )
}

Header.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func
}

const mapDispatchToProps = {
  logout
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

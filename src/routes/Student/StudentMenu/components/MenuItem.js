import React from 'react'
import { Link } from 'react-router'
import './StudentMenu.scss'
import StudentFiles from '../../../StudentFiles'
import StudentAttendance from '../../StudentAttendance';
import StudentAdaptation from '../../StudentAdaptation';
import StudentPlan from '../../StudentPlan';
import StudentRegister from '../../StudentRegister';
import Sight from '../../Sight'
import HeaderDefault from '../../../../components/HeaderDefault';

export const MenuItem = (props) => (
    <div className="row menu-items">
        <div className="col-md-2">
            <div className="menu-item">
                <Link to={props.location.pathname + StudentFiles.pathWithoutParam}>
                    <div className="icons-box">
                        <i className="fas fa-camera fa-3x" aria-hidden="true" />
                    </div>
                    <HeaderDefault type="h4" texto="Fotos/Vídeos" />
                </Link>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <Link to={props.location.pathname + StudentAttendance.pathWithoutParam}>
                    <div className="icons-box">
                        <i className="far fa-id-card fa-3x" aria-hidden="true" />
                    </div>
                    <HeaderDefault type="h4" texto="Atendimento" />
                </Link>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <Link to={props.location.pathname + Sight.pathWithoutParam}>
                    <div className="icons-box">
                        <i className="fas fa-pen fa-3x" aria-hidden="true" />
                    </div>
                    <HeaderDefault type="h4" texto="Parecer" />
                </Link>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <Link to={props.location.pathname + StudentAdaptation.pathWithoutParam}>
                    <div className="icons-box">
                        <i className="far fa-file-alt fa-3x" aria-hidden="true" />
                    </div>
                    <HeaderDefault type="h4" texto="Adequação Curricular" />
                </Link>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <Link to={props.location.pathname + StudentPlan.pathWithoutParam}>
                    <div className="icons-box">
                        <i className="far fa-list-alt fa-3x" aria-hidden="true" />
                    </div>
                    <HeaderDefault type="h4" texto="P.D.I." />
                </Link>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
            <Link to={props.location.pathname + '/editar'}>
                <div className="icons-box">
                    <i className="fa fa-user fa-3x" aria-hidden="true" />
                </div>
                    <HeaderDefault type="h4" texto="Aluno" />
                </Link>
            </div>
        </div>
    </div>
);

export default MenuItem

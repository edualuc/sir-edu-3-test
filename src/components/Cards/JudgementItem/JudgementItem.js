import React from 'react'
import { RaisedButton, FlatButton, DatePicker, TextField, Paper } from 'material-ui'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import './JudgementItem.scss'

const cardTextStyle = {
    overflow: 'hidden',
    padding: '0 16px',
    height: 40
}

class JudgementItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    close = () => {
        this.setState({open: false});
    }

    render() {
        const { item, editable, students, loggedUser } = this.props;
        const date = new Date(item.date);
        const displayDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const student = students.selectedStudent;
        const dados = {
            'TypeDescription' : 'Parecer',
            'date' : displayDate,
            'title' : item.title,
            'description' : item.text
        };
//fa fa-pencil-square-o
        return (
            <div className="judgement-item">
                <Card className="judgement-card" style={{margin: 5}}>
                    <div style={{height: 125, padding: '16px', cursor: 'pointer'}} onClick={() => { this.setState({open: true}) }}>
                        <div className="pull-left" >
                            <i  className="fas fa-pen"
                                aria-hidden="true"
                                style={{margin:0, fontSize:'7em'}}>
                            </i>
                        </div>
                        <div style={{paddingTop: 46}}>
                            <strong>{dados.TypeDescription}</strong>
                            <CardTitle style={{padding: '0'}} subtitle={dados.title || ''}/>
                        </div>
                    </div>
                    <CardTitle subtitle={dados.date} style={{padding: '2px 16px 5px'}}/>
                    <CardText style={cardTextStyle}>
                        <div dangerouslySetInnerHTML={{__html: dados.text}}/>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Editar"/>
                        <FlatButton label="Remover" secondary={true} />
                    </CardActions>
                </Card>
                <Modal show={this.state.open} onHide={this.close} backdrop="static" dialogClassName="judgement-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Visualizar Parecer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="judgement-content">
                            <Paper className="container-fluid judgement-text" zDepth={4}>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h5>{student.school}</h5>
                                    </div>
                                    <div className="col-md-12 text-center title">
                                        <h1>Parecer 2</h1>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Nome:</label> {student.name}
                                    </div>
                                    <div className="col-md-2">
                                        <label>Turma:</label> {student.classNumber || ''}
                                    </div>
                                    <div className="col-md-3">
                                        <label>Data de nascimento:</label> {student.birthDate || ''}
                                    </div>
                                    <div className="col-md-4">
                                        <label>Professor(a):</label> {loggedUser.user.name + ' ' + (loggedUser.user.lastName || '')}
                                    </div>
                                </div>
                                <div className="row text-container">
                                    <div className="col-md-5">
                                        <label>Data:</label> {displayDate}
                                    </div>
                                    <div className="col-md-12 text" dangerouslySetInnerHTML={{__html: dados.text}}/>
                                </div>
                            </Paper>
                            <div className="btn-generate-pdf text-center">
                                <RaisedButton label="Gerar PDF" primary={true}/>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    students: state.students,
    loggedUser: state.auth
})

export default connect(mapStateToProps, {})(JudgementItem)

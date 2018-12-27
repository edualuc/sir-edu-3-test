import React, { PropTypes } from 'react'
import { DatePicker } from 'material-ui' //Checkbox, RaisedButton, SelectField, MenuItem, TextFieldDefault, Button, 
import { setDefaultValue } from '../../../../helpers/register-helper'
import HeaderDefault from '../../../../components/HeaderDefault';
import TextFieldDefault from '../../../../components/TextFieldDefault'

const defaultValue = [
    { date: new Date() }
];

// const styles = {
//     field: {
//         color: 'white',
//         height: 48
//     }
// };

const handleChangeHelper = (event, id, valueParam) => {
    let name = '';
    let value = null;

    if (event) {
        name = event.target.name;
        value = event.target.value;
    } else {
        name = id;
        value = valueParam;
    }
    return { [name]: value }
}

const developeStatus = {
    title: 'Anacronismos e Habilidades',
    elements: [
        {
            title: 'Funções Cognitivas',
            elements: [
                { title: 'Memória (Curto/Longo Prazo)', column: 0, line: 0 },
                { title: 'Raciocínio Lógico', column: 0, line: 1 },
                { title: 'Linguagem', column: 0, line: 2 },
                { title: 'Atenção', column: 0, line: 3 },
                { title: 'Percepção', column: 0, line: 4 },
                { title: 'Funções Executivas', column: 0, line: 5 }]
        }, {
            title: 'Funções Interativas/Sociais',
            elements: [
                { title: 'Relações Interpessoais', column: 1, line: 0 },
                { title: 'Relações Comportamentais', column: 1, line: 1 },
                { title: 'Autonomia', column: 1, line: 2 },
                { title: 'Relações Culturais', column: 1, line: 3 },
                { title: 'Auto-imagem', column: 1, line: 4 },
                { title: 'Resolução de conflitos', column: 1, line: 5 }]
        }, {
            title: 'Funções Motoras',
            elements: [
                { title: 'Dinâmica Geral - Controle das ações motoras', column: 2, line: 0 },
                { title: 'Execução e intencionalidade', column: 2, line: 1 },
                { title: 'Flexibilidade, tonicidade, movimentos involuntários', column: 2, line: 2 },
                { title: 'Lateralidade e domínio de esquema corporal', column: 2, line: 3 },
                { title: 'Equilíbrio estático e dinâmico', column: 2, line: 4 },
                { title: 'Compensações motoras', column: 2, line: 5 }]
        }
    ]
}

//withStyles(styles)(RegisterForm)

export default class RegisterForm extends React.Component {
    static propTypes = {
        step: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        student: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.openTermOfUse = false;
        this.isInitialState = true;
        this.register = {}
        setDefaultValue(defaultValue, this.addRegister, this.getRegister)
        this.registerInitialLength = this.register.lenght
        this.InputLabelProps = {
            shrink: true
        }

        this.classes = theme => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            textField: {
                marginLeft: 10, //theme.spacing.unit,
                marginRight: 100, //theme.spacing.unit,
                width: 200
            }
        })

        this.developerStatusLayout()
    }

    developerStatusLayout = function () {
        let list = [];
        const lenghtElements = developeStatus.elements.reduce((prev, cur) => {
            return (prev > cur.elements.length) ? prev : cur.elements.length
        }, 0)
        for (let index = 0; index < lenghtElements; index++) {
            list.push([])
        }
        this.developeStatusTransposed = developeStatus.elements.reduce((prev, curr) => {
            for (const index in curr.elements) {
                prev[index].push(curr.elements[index])
            }
            return prev
        }, list)
    }

    handleChange = (event, id, valueParam) => {
        this.addRegister(handleChangeHelper(event, id, valueParam))
        this.forceUpdate()
        //this.setState(...this.register)
    }

    handleCheckbox = (event, value) => {
        this.addRegister({}, [event.target.name], value)
    }

    handleSelectChange = (event, index, values, stateProp) => {
        this.addRegister({}, stateProp, values)
    }

    handleCheckboxGroup = (value) => {
        let newSelectionArray;
        let student = this.props.student
        if (student.specialNeeds && student.specialNeeds.indexOf(value) > -1) {
            newSelectionArray = student.specialNeeds.filter(s => s !== value)
        } else {
            newSelectionArray = [...student.specialNeeds || '', value];
        }
        this.addRegister({}, 'specialNeeds', newSelectionArray)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        //this.setState(...this.register)
        this.props.handleSubmit(this.register);
    }

    addRegister = (entry, key = '', content = '') => {
        if (entry.length <= 0) {
            entry = { [key]: content }
        }
        this.register = {
            ...this.register,
            ...entry
        }
    }

    getRegister = (key) => {
        return (key) ? this.register[key] : this.register
    }

    render() {
        // if (!this.register.name) {
        //     this.register = { ...this.register, ...this.props.student }
        // }

        return (
            <form onSubmit={this.handleSubmit} className="col-md-12">
<<<<<<< HEAD
                {this.props.step === 0 &&
                    <div className="row">
                        <div className="col-md-6">
                            <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                                locale="pt-br"
                                value={this.register.date || {}}
                                name="date"
                                onChange={(evt, value) => { this.handleChange(evt, 'date', value.toISOString()) }}
                                floatingLabelText="Data"
                            />
                        </div><div className="col-md-3">
                            <TextFieldDefault fullWidth className="" value={this.register.days || ''} placeholder="Dias de atendimento" name="days" floatingLabelText="Dias de atendimento" onChange={(evt, value) => { this.handleChange(evt, 'days', value) }} />
                        </div><div className="col-md-3">
                            <TextFieldDefault fullWidth value={this.register.shift || ''} name="shift" floatingLabelText="Turno" onChange={(evt, value) => { this.handleChange(evt, 'shift', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine value={this.register.extraClassActivity || ''} name="extraClassActivity" floatingLabelText="Atividades Extra-Classe" onChange={(evt, value) => { this.handleChange(evt, 'extraClassActivity', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine value={this.register.AEE || ''} name="AEE" floatingLabelText="AEE" onChange={(evt, value) => { this.handleChange(evt, 'aee', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine rows={2} value={this.register.otherInformation || ''} name="otherInformation" floatingLabelText="Outras informação" onChange={(evt, value) => { this.handleChange(evt, 'otherInformation', value) }} />
                        </div>
                        <div className="col-md-12">
                            <HeaderDefault texto="Histórico" type="h3" />
                        </div>
                        <div className="col-md-6">
                            <TextFieldDefault fullWidth value={this.register.forwardingCode || ''} name="forwardingCode" floatingLabelText="Código no Encaminhamento AEE" onChange={(evt, value) => { this.handleChange(evt, 'forwardingCode', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth value={this.register.forwardingDate || ''} name="forwardingDate" floatingLabelText="Data do encaminhamento" onChange={(evt, value) => { this.handleChange(evt, 'forwardingDate', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine rows={2} value={this.register.forwardingReason || ''} name="forwardingReason" floatingLabelText="Motivo do encaminhamento" onChange={(evt, value) => { this.handleChange(evt, 'forwardingReason', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine rows={2} value={this.register.familyDinamics || ''} name="familyDinamics" floatingLabelText="Dinâmica Familiar" onChange={(evt, value) => { this.handleChange(evt, 'familyDinamics', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine rows={2} value={this.register.historical || ''} name="historical" floatingLabelText="Histórico Escolar" onChange={(evt, value) => { this.handleChange(evt, 'historical', value) }} />
                        </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine rows={2} value={this.register.attendance || ''} name="attendance" floatingLabelText="Atendimento (especializado)*" onChange={(evt, value) => { this.handleChange(evt, 'attendance', value) }} />
                        {/* </div><div className="col-md-6">
                            <TextFieldDefault fullWidth multiLine rows={2} value={this.register.NEES || ''} name="NEES" floatingLabelText="NEES *" onChange={(evt, value) => { this.handleChange(evt, 'NEES', value) }} /> */}
                        </div>
                    </div>
                }
                {(this.props.step === 1) &&
                    this.developeStatusTransposed.map(rowDiv => {
                        return <div className="row">
                        <div className="col-md-12">
                        {/* <HeaderDefault texto={developeStatus.title} type="h3" /> */}
=======
                <div>
                    {this.props.step === 0 &&
                        <div>
>>>>>>> fab5e10842c346cfc454ae220b5e4c52b007d64f
                            <div className="row">
                                <div className="col-md-6">
                                    <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                                        locale="pt-br"
                                        value={this.register.date || {}}
                                        name="date"
                                        onChange={(evt, value) => { this.handleChange(evt, 'date', value.toISOString()) }}
                                        floatingLabelText="Data"
                                    />
                                </div><div className="col-md-3">
                                    <TextFieldDefault fullWidth className="" value={this.register.days || ''} placeholder="Dias de atendimento" name="days" floatingLabelText="Dias de atendimento" onChange={(evt, value) => { this.handleChange(evt, 'days', value) }} />
                                </div><div className="col-md-3">
                                    <TextFieldDefault fullWidth value={this.register.shift || ''} name="shift" floatingLabelText="Turno" onChange={(evt, value) => { this.handleChange(evt, 'shift', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine value={this.register.extraClassActivity || ''} name="extraClassActivity" floatingLabelText="Atividades Extra-Classe" onChange={(evt, value) => { this.handleChange(evt, 'extraClassActivity', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine value={this.register.AEE || ''} name="AEE" floatingLabelText="AEE **" onChange={(evt, value) => { this.handleChange(evt, 'aee', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine rows={2} value={this.register.otherInformation || ''} name="otherInformation" floatingLabelText="Outras informação" onChange={(evt, value) => { this.handleChange(evt, 'otherInformation', value) }} />
                                </div>
                            </div>

                            <div className="row">
                                <HeaderDefault texto="Histórico" type="h3" />
                                <div className="col-md-4">
                                    <TextFieldDefault fullWidth value={this.register.forwardingCode || ''} name="forwardingCode" floatingLabelText="Código no Encaminhamento AEE" onChange={(evt, value) => { this.handleChange(evt, 'forwardingCode', value) }} />
                                </div><div className="col-md-4">
                                    <TextFieldDefault fullWidth value={this.register.forwardingDate || ''} name="forwardingDate" floatingLabelText="Data do encaminhamento" onChange={(evt, value) => { this.handleChange(evt, 'forwardingDate', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine rows={2} value={this.register.forwardingReason || ''} name="forwardingReason" floatingLabelText="Motivo do encaminhamento" onChange={(evt, value) => { this.handleChange(evt, 'forwardingReason', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine rows={2} value={this.register.familyDinamics || ''} name="familyDinamics" floatingLabelText="Dinâmica Familiar" onChange={(evt, value) => { this.handleChange(evt, 'familyDinamics', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine rows={2} value={this.register.historical || ''} name="historical" floatingLabelText="Histórico Escolar" onChange={(evt, value) => { this.handleChange(evt, 'historical', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine rows={2} value={this.register.attendance || ''} name="attendance" floatingLabelText="Atendimento (especializado)*" onChange={(evt, value) => { this.handleChange(evt, 'attendance', value) }} />
                                </div><div className="col-md-6">
                                    <TextFieldDefault fullWidth multiLine rows={2} value={this.register.NEES || ''} name="NEES" floatingLabelText="NEES *" onChange={(evt, value) => { this.handleChange(evt, 'NEES', value) }} />
                                </div>
                            </div>
                        </div>
                    }
                    {(this.props.step === 1 || this.props.step === 2 || this.props.step === 3) &&
                        this.developeStatusTransposed.map(rowDiv => {
                            return <div className="row">
                                <div className="col-md-12">
                                    <HeaderDefault texto={developeStatus.title} type="h3" />
                                    <div className="row">
                                        {
                                            rowDiv.map((columnDiv) => {
                                                return <div className="col-sm-6 col-md-4">
                                                    <TextFieldDefault fullWidth multiLine rows={2} rowsMax={4} value={this.register['caracter' + columnDiv.column + columnDiv.line] || ''} name={'caracter' + columnDiv.column + columnDiv.line} floatingLabelText={columnDiv.title} onChange={(evt, value) => { this.handleChange(evt, 'caracter' + columnDiv.column + columnDiv.line, value) }} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    {this.props.step === 4 &&
                        <div className="row">
                            <HeaderDefault texto="Plano de Intervenção Pedagógica" type="h3" />
                            <div className="col-md-12">
                                <TextFieldDefault fullWidth multiLine rows={4} value={this.register.actionExiting || ''} name="actionExiting" floatingLabelText="Ações já existentes" onChange={(evt, value) => { this.handleChange(evt, 'actionExiting', value) }} />
                            </div><div className="col-md-12">
                                <TextFieldDefault fullWidth multiLine rows={4} value={this.register.actionFuture || ''} name="actionFuture" floatingLabelText="Ações a serem desenvolvidas" onChange={(evt, value) => { this.handleChange(evt, 'actionFuture', value) }} />
                            </div>
                            {/* <div className="col-md-12 col-md-offset-3 text-area">
                    <Paper style={paperStyle} zDepth={5}>
                            <TinyMCE
                            content={this.register.text}
                            config={{
                                plugins: 'link paste autoresize',
                                toolbar: 'undo redo | bold italic | link | alignleft aligncenter alignright',
                                    autoresize_max_height: 1500,
                                    statusbar: false
                                }}
                                onChange={this.handleEditorChange}
                            />
                        </Paper>
                    </div> */}
                            <div className="col-md-12">
                                <button className="btn btn-primary">Cadastrar</button>
                                {/* btn Gerar .doc
                        btn Gerar Apresentações
                        btn Gerar pdf
                        btn Gerar Imprimir */}
                            </div>
                        </div>
                    }
                </div>
            </form>
        )
    }
}

/*

DADOS DE OUTROS CADASTROS
Escola
Aluno
idade
Data Nascimento
Matrícula
Matrícula
Ano/Série
Turno
Turma
Professores
Endereço
Contatos

btn Gerar .doc
btn Gerar Apresentações
btn Gerar pdf
btn Gerar Imprimir

*/

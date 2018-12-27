import React, { PropTypes } from 'react'
import './StudentPlan.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'
import RegisterForm from './RegisterForm';

export default class StudentPlan extends React.Component {
  static propTypes = {
    students: PropTypes.object, 
    params: PropTypes.shape({
      id: PropTypes.string,
      modo: PropTypes.string
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0
    }

    this.openTermOfUse = false;
    this.isInitialState = true

    this.tabs = [
      {name: 'Geral'},
      {name: 'Habilidades'},
      {name: 'Proposições'}
    ] 

    this.data = {
      tabs: this.tabs,
      setStepIndex: this.handleSetStepindex,
      handleSubmit: this.handleSubmit,
      handleNext: this.handleNext,
      handlePrev: this.handlePrev,
      step: this.state.stepIndex
    }
  }

  handleSetStepindex = (newState) => {
    this.setState({ stepIndex: newState })
  }

  handleSubmit = (form) => {
    switch (this.props.params.modo) {
      case 'editar':
        this.props.editStudent(form)
        break
      case 'excluir':
        this.props.deleteStudent(form)
        break
      case 'inserir':
        this.props.insertStudent(form)
        break
      default:
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state
    if (stepIndex < 3) {
      this.setState({ stepIndex: stepIndex + 1 })
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  componentDidMount() {
    //   const { getStudent, students } = this.props
    const { getFiles, getJudgements, routeParams } = this.props;

    // getFiles(routeParams.id);
    // getJudgements(routeParams.id);
    //   if (!students.student.name && ( 
    //     this.props.params.modo === 'editar' || this.props.params.modo === 'excluir')) { 
    //     getStudent(this.props.params.id)
    //   }
  }

  render() {
    this.data = {
      ...this.data,
      step: this.state.stepIndex
    }
    
    return (
      <RegisterLayout titulo="P.D.I.: Plano de Desenvolvimento Individualizado " {...this.data}>
        <div className="row register-form">
          <RegisterForm {...this.props.students} {...this.data} />
        </div>
      </RegisterLayout>
    )
  }
}

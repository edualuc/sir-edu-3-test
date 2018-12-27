import React, { PropTypes } from 'react'
import './StudentAttendance.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'
import RegisterForm from './RegisterForm';

export default class StudentAttendance extends React.Component {
  static propTypes = {
    // getStudent: PropTypes.func.isRequired,
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

    this.tabs = []

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
    //this.setState(...form)
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
    //const { getFiles, getJudgements, routeParams } = this.props;

    //getFiles(routeParams.id);
    //getJudgements(routeParams.id);
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

    console.log(this.props);
    return (
      <RegisterLayout titulo="Atendimento" {...this.data}>
        <div className="row register-form">
          <RegisterForm {...this.props.students} {...this.data} />
        </div>
        {/* <TimeLine /> */}
      </RegisterLayout>
    )
  }
}

import React from 'react'
import { TableBody,  TableRow } // TableFooter
  from 'material-ui/Table'
import { Avatar } from 'material-ui' // TextField

//import defaultAvatar from 'public/default-avatar.png'
import defaultAvatar from '../../../../constants/configConstants'

import './List.scss'
import { Alert } from 'react-bootstrap'
import StudentRegister from '../../StudentRegister'
import StudentMenu from '../../StudentMenu'
import ListLayout from '../../../../layouts/ListLayout'
import { getFiltered, makeColumn } from '../../../../helpers/list-helpers'

export default class StudentListTable extends React.Component {
  static propTypes = {
    filterStudents: React.PropTypes.func.isRequired,
    getStudentsList: React.PropTypes.func,
    students: React.PropTypes.object,
    //filterText: React.PropTypes.string,
    setSelectedStudent: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.searchStudent = this.searchStudent.bind(this)

    let returnParameter = (param) => { return param || '' }

    this.visibleColumn = [
      {
        name: 'Foto',
//        style: {width: 100},
        content: (avatar) => { return <Avatar src={avatar} className="student-avatar pull-left" size={40} /> }
      },
      {
        name: 'Nome',
        style: {width: '30%'},
        content: returnParameter,
        link: returnParameter
      },
      {
        name: 'Escola',
        style: {width: '20%'},
        content: returnParameter
      },
      {
        name: 'Turma',
        style: {width: '15%'},
        content: returnParameter
      },
      {
        name: 'Editar',
        className: 'register-edit',
        content: () => { return <span><i className="fa fa-pencil-square-o fa-lg" /> Editar</span> },
        link: (_id) => { return StudentRegister.pathWithoutParam + _id + '/editar' }
      },
      {
        name: 'Excluir',
        className: 'register-remove',
        content: () => { return <span><i className="fa fa-user-times fa-lg" /> Excluir</span> },
        link: (_id) => { return StudentRegister.pathWithoutParam + _id + '/excluir' }
      }
    ]
    this.inputValue = {}

    this.layoutData = {
      titulo: 'Meus Alunos',
      visibleColumn: this.visibleColumn
    }
    this.register = {
      handleFilter: this.searchStudent,
      searchValue: this.searchValue,
      descriptionRegister: 'aluno',
      pathRegister: StudentRegister.pathWithoutParam,
      lenght: this.props.students.list.length,
      textNothingFound: 'Nenhum Aluno cadastrado!'
    }
  }

  searchStudent(e) {
    e.preventDefault()
    const { filterStudents } = this.props
    filterStudents(this.inputValue)
  }

  searchValue(value) {
    this.inputValue = value
  }

  componentDidMount() {
    const { getStudentsList } = this.props

    if (!this.register.length) {
      getStudentsList()
    }
  }

  render() {
    const { students, filterText, setSelectedStudent } = this.props
    let filteredRegister
    //console.log(filterText);
    
    filteredRegister = getFiltered(students.list, ''); //filterText || 

    return (
      <div>
      <ListLayout className="list" layout={this.layoutData} register={this.register}>
         <TableBody
                            showRowHover
                            displayRowCheckbox={false}
                            deselectOnClickaway>
              {
                filteredRegister && filteredRegister.map((student, index) => (
                  <TableRow className="row" key={index}>
                    {this.visibleColumn.map((column, index) => {
                      let elementContent, link

                      switch (column.name) {
                        case 'Foto':
                          elementContent = (student.avatar) ? student.avatar.path : defaultAvatar
                          break
                        case 'Nome':
                          elementContent = student.name
                          link = StudentMenu.pathWithoutParam + student._id
                          column.onClick = () => { setSelectedStudent(student) }
                          break
                        case 'Escola':
                          elementContent = student.school
                          break
                        case 'Turma':
                          elementContent = student.classNumber
                          break
                        case 'Editar':
                          link = student._id
                          column.onClick = () => { setSelectedStudent(student) }
                          break
                        case 'Excluir':
                          link = student._id
                          column.onClick = () => { setSelectedStudent(student) }
                          break
                        default:
                          break
                      }
                      
                      return makeColumn(column, elementContent, link, column.style)
                    })
                    }
                  </TableRow>
                ))}
            {/* </TableBody>
          </Table>*/}
        </TableBody>
      </ListLayout>
              {
                !filteredRegister &&
                <Alert bsStyle="warning">
                  <strong>Aviso:</strong> Nenhum aluno selecionado.
                </Alert>
              }
              </div>
    )
  }
}

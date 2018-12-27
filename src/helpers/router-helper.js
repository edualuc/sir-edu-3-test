import { browserHistory } from 'react-router';
import { StudentList } from '../routes/Student/StudentList'
import { StudentMenu } from '../routes/Student/StudentMenu'

export default class RouterHelper {
    static goToStudentsPage() {
        browserHistory.push('/alunos');
    }
    static goToStudentMenuPage(studentId) {
        browserHistory.push('/aluno/' + studentId);
    }
    static goToLoginPage() {
        browserHistory.push('/login');
    }
}

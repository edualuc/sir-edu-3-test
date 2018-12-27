import React, { PropTypes } from 'react'
import { TextField, DatePicker } from 'material-ui' //Checkbox, RaisedButton, SelectField, MenuItem, TextField, Button, DatePicker, RaisedButton, 
import Paper from 'material-ui/Paper'
import TinyMCE from 'react-tinymce'
import { setDefaultValue } from '../../../../helpers/register-helper'
import Slider from 'components/Slider'
import SliderItem from 'components/Slider/SliderItem'
import LoadingSpinner from 'components/LoadingSpinner'

const timelineCarousel = (items) => {
    return items.map((item, index) => (
        <div key={index}>
            <SliderItem item={item} editable={false} />
        </div>)
    )
}
const defaultValue = [
    { title: 'Teste tit' }
];

const paperStyle = {
    marginBotton: 400
};

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
    }

    onImageDrop = (field, file) => {
        this.addRegister({}, field, file)
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
        if (entry.lenth <= 0) {
            entry = { [key]: content }
        }
        this.register = {
            ...this.register,
            ...entry
        }
    }

    getRegister = (key) => {
        return this.register[key]
    }

    showTermOfUse = () => {
        this.openTermOfUse = true;
    }

    // componentDidMount() {
    //     const { getFiles, getJudgements, routeParams } = this.props;
    //     getFiles(routeParams.id);
    //     getJudgements(routeParams.id);
    // }

    render() {
        var timelineList = [];
        if (!this.register.title) {
            this.register = { ...this.register, ...this.props.student }
        }

// <LoadingSpinner loading={ //files.isFetching || 
// judgements.isFetching || adaptations.isFetching
// } />
        return (
            <form onSubmit={this.handleSubmit}>
            
                {this.props.step === 0 &&
                    <div className="row">
                        <div className="col-md-8">
                            <TextField
                                fullWidth
                                value={this.register.title || ''}
                                floatingLabelText="Título"
                                name="title"
                                onChange={(evt, value) => { this.handleChange(evt, 'title', value) }}
                            />
                        </div>
                        <div className="col-md-4">
                            <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                                locale="pt-br"
                                value={this.register.date || {}} 
                                name="date" 
                                onChange={(evt, value) => { this.handleChange(evt, 'date', value.toISOString()) }}
                                floatingLabelText="Data"
                            />
                        </div>
                        <div className="col-md-12 col-md-offset-3 text-area">
                            <Paper style={paperStyle} zDepth={5} name="paper">
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
                        </div>
                        <div className="col-md-12 timeline">
                            {timelineList.length > 0 &&
                                <Slider className="col-md-12">
                                    {timelineCarousel(timelineList)}
                                </Slider>
                            }
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-secundary btn-actions" label="Cancelar" onClick={this.handleCancel} />
                            <button className="btn btn-primary">Cadastrar</button>
                        </div>
                    </div>
                }
            </form>
        )
    }
}

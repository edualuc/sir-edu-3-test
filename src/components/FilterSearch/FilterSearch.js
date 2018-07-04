import React from 'react'
import { Link } from 'react-router'
import './FilterSearch.scss'

export default class FilterSearch extends React.Component {
    static propTypes = {
        handleFilter: React.PropTypes.func
    }

    render() {
        const { descriptionRegister, pathRegister } = this.props
        return (
            <div className="col-md-12">
                <div className="search-student">
                    <form onSubmit={this.props.handleFilter}>
                        <div className="input-group">
                            <input
                                type="text"
                                ref={(input) => { this.textInput = input }}
                                className="form-control input-lg"
                                placeholder={"Procurar " + descriptionRegister} />
                        </div>
                        <div className="input-group-btn">
                            <button className="btn btn-primary input-lg" type="submit">
                                <i className="glyphicon glyphicon-search" />
                            </button>
                        </div>
                        <div className="input-group">
                            <div className="btn btn-warning btn-lg">
                                <Link to={pathRegister + '0/' + 'inserir'}>Cadastrar {descriptionRegister}</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

import React from 'react'
import { FlatButton, DatePicker, TextField } from 'material-ui'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Modal } from 'react-bootstrap'

const cardTextStyle = {
    overflow: 'hidden',
    padding: '0 16px',
    height: 40
}

class MediaItem extends React.Component {
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
        const { item, editable } = this.props;
        const type = item.hasOwnProperty('contentType') ? item.contentType.split('/')[0] : '';
        const url = '/api/files/' + item._id;
        const date = new Date(item.date);
        const displayDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const data = {
            'TypeDescription' : '',
            'date' : displayDate,
            'title' : item.title,
            'description' : item.metadata.comment
        };

        return (
            <div>
            <Card style={{margin: 5}}>
                <CardMedia style={{cursor: 'pointer'}} onClick={() => { this.setState({open: true}) }}>
                { 
                    type === 'image' ? <img height="125" src={url}/> : 
                    <video height="125" preload="" src={url}></video>
                }
                </CardMedia>
                <CardTitle subtitle={data.date} style={{padding: '2px 16px 5px'}}/>
                <CardText style={cardTextStyle}>
                    {data.description}
                </CardText>
                <CardActions>
                    <FlatButton label="Editar"/>
                    { editable ? 
                        <FlatButton
                            label="Copiar" primary={true} 
                            onTouchTap={() => { this.props.actions.insert(url, data.description); }}
                        /> : <FlatButton label="Remover" secondary={true} />
                    }
                </CardActions>
            </Card>
            <Modal show={this.state.open} onHide={this.close} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>Visualizar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="item-modal">
                            <div class="text-center">
                                { 
                                type === 'image' ? <img src={url}/> : 
                                <video draggable="true" controls preload="metadata" src={url}></video>
                                }
                            </div>
                            <TextField
                                floatingLabelText="Data:"
                                floatingLabelFixed={true}
                                value={data.date}
                            />
                            <div>
                                <TextField
                                    floatingLabelText="Comentário:"
                                    floatingLabelFixed={true}
                                    multiLine={true}
                                    fullWidth={true}
                                    value={data.description}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

export default MediaItem;
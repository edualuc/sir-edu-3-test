import React from 'react'
import Dropzone from 'react-dropzone'
import IconButton from 'material-ui/IconButton';
import './Dropzone.scss'

const preventDropOnDocument = () => {
    window.addEventListener('dragover', function(e){
        e = e || event;
        e.preventDefault();
    }, false);
    window.addEventListener('drop', function(e){
        e = e || event;
        e.preventDefault();
    }, false);
}

const getFilePreview = (file) => {
    console.log(file);
    if (file && file.mimeType.includes('video')) {
        return (<video src={file.preview} className="video-thumb" controls preload="metadata"/>);
    }
    return (<img src={file.preview} className="img-thumbnail" height="100" width="230" />);
} 

export default class DropzoneComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.removeFile = this.removeFile.bind(this);
        preventDropOnDocument();
        this.file = this.props.initConfig || null;
    }

    shouldComponentUpdate(nextProps) {
        return this.props.initConfig !== nextProps.initConfig;
    }

    onOpenClick() {
        this.dropzone.open();
    }

    onDrop = (files) => {
        this.file = files[0];
        this.props.onDrop(this.props.name, files[0]);
    }

    removeFile() {
        this.file = null;
        this.props.onDrop(this.props.name, null);
    }

    render() {
        return (
            <div className="dropzone-component">
                <Dropzone ref={(dropzone) => {this.dropzone = dropzone; }}
                    className="dropzone-box"
                    activeClassName="dropzone-box-active"
                    onDrop={this.onDrop}
                    accept={this.props.accept}
                    multiple={this.props.multiple}
                    disableClick>
                    <div className="dropzone-content">
                        {
                            this.file && 
                            <div>
                                { getFilePreview(this.file) }
                                <span>
                                    <IconButton iconClassName="fa fa-times" 
                                    onTouchTap={this.removeFile}
                                    tooltip="Remover arquivo"
                                    tooltipPosition="bottom-right"
                                    />
                                </span>
                            </div> ||
                            <div>
                                <em className="fa fa-cloud-upload fa-5x" aria-hidden="true" />
                                <h5>{this.props.text}</h5>
                                <button type="button" className="btn btn-success" onClick={this.onOpenClick}>
                                    Selecionar arquivo
                                </button>
                            </div>
                        }
                    </div>
                </Dropzone>
            </div>
        );
    }
}
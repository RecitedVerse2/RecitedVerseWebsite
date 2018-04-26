import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class FileChooserForm extends Component {

    getStyles() {
        return {
            width: '0.1px',
            height: '0.1px',
            opacity: '0',
            overflow: 'hidden',
            position: 'absolute',
            zIndex: '-1'
        };
    }


    render () {
        return (
            <form action={this.props.action}>
                <input type="file"
                       name={this.props.name || ''}
                       id={this.props.name || ''}
                       className="inputfile"
                       accept={this.props.accept || '*'}
                       multiple={this.props.multiple || 'false'}
                       onChange={this.handleLoaded.bind(this)}
                       style={this.getStyles()} />
            
            <Button type="submit">Upload{this.props.children}</Button>


            </form>
        );
    };


    handleLoaded(e) {
        var file = document.getElementById(this.props.name).files[0];
        var reader  = new FileReader();
        const thisClass = this;
        reader.addEventListener("load", function () {
            if(thisClass.props.fileSelectedHandler) {
                thisClass.props.fileSelectedHandler(reader.result);
            }
         }, false);
        if (file) { reader.readAsDataURL(file); }
    };

    handleError(err) {
        return err;
    };
}

export default FileChooserForm;

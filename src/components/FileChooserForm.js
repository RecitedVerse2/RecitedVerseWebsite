import React, { Component } from 'react';


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
                       onChange={this.props.fileSelectedHandler || this.handleLoaded.bind(this)}
                       style={this.getStyles()} />

                <label htmlFor={this.props.name}
                       style={this.props.formButtonStyle}
                       id={this.props.formButtonId}
                       className={this.props.formButtonClass}>
                    {this.props.children}
                </label>

            </form>
        );
    };


    handleLoaded(urls) {
        return urls;
    };

    handleError(err) {
        return err;
    };
}

export default FileChooserForm;

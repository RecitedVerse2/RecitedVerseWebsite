import React, { Component } from 'react';
import * as firebase from 'firebase';


class FileChooserFormAndSave extends Component {

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

                <label htmlFor={this.props.name}
                       style={this.props.formButtonStyle}
                       id={this.props.formButtonId}
                       className={this.props.formButtonClass}>
                    { this.props.children}
                </label>

            </form>
        );
    };


    handleLoaded(e) {
        var file = document.getElementById(this.props.name).files[0];
        const storageRef = firebase.storage().ref();
        var reader  = new FileReader();
        const thisClass = this;
        this.props.startFileSelectedHandler()
        // reader.addEventListener("load", function () {
        //
        //
        //         //thisClass.props.fileSelectedHandler(reader.result);
        //         storageRef.child('Avatar').child('test.png').put(reader.result).then(() => {
        //             this.props.children = "Done!";
        //         });
        //
        //
        //         //thisClass.props.fileSelectedHandler("http://www.99sns.com/default_avator.png");
        //
        //  }, false);
        if (file) {
          //reader.readAsDataURL(file);
          var fileName = this.props.path + '/' + file.name
          storageRef.child(fileName).put(file).then(() => {

            storageRef.child(fileName).getDownloadURL().then(function(url) {
                   thisClass.props.fileSelectedHandler(url)
                 }).catch(function(error) {
                   // Handle any errors here
                 });
          });










        }
    };

    handleError(err) {
        return err;
    };
}

export default FileChooserFormAndSave;

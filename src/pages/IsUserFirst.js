import React, { Component } from 'react';

export default class IsUserFirst extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFirst: false,
            decision: false,
        }
    }
    componentDidMount(){
        let decision = false;
        
            this.props.originalTitles.map((originalTitle) => {
                if(this.props.title === originalTitle.label){
                    
                }
                else {
                    decision = true;
                }
            })
        this.setState({decision});

    }
    render(){
        
        return (
            <div>
                {this.state.decision === true ? (
                <p>Congratulations, you are the first user uploading this poem</p>
                ) : (
                    <p></p>
                )
                }
            </div>
        )
    }
}
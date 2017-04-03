import React, { Component } from 'react';

import _ from '../css/Login.css';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import PillButton from '../components/PillButton';

// This is where users can log into accounts on RecitedVerse.com
class Login extends Component {

    // The styling.
    getLoginBoxStyle() {
        return {
            position: 'relative',
            top: '100px',
            margin: 'auto',
            textAlign: 'center',
            borderRadius: '25px',
            borderColor: 'cornflowerblue',
            backgroundColor: 'ghostwhite',
            color: 'cornflowerblue',
            border: '1.5px solid cornflowerblue',
            width: '40%',
            height: '55%'
        };
    }
    getBtnStyle() {
        return {
            textAlign: 'center',
            borderRadius: '25px',
            borderStyle: 'none',
            padding: '10px',
            WebkitTransitionDuration: '0.4s'
        };
    }




    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>


                <ContentArea backgroundColor='rgb(242,244,248)' contentAreaContent={

                    <div style={this.getLoginBoxStyle()}>
                        <h2>Login</h2>
                        <input className="round_input" type="email" placeholder="Enter your email" />
                        <br /><br />
                        <input className="round_input" type="password" placeholder="Enter your password" />
                        <br /><br />
                        <p id="status_label" style={{color: 'red', visibility: 'hidden'}}>Incorrect Email or Password.</p>

                        <PillButton style={this.getBtnStyle()} title='Login' width='80px' height='30px' btnColor='cornflowerblue' hoverColor='royalblue'></PillButton>
                        <br /> <br />
                    </div>

                }></ContentArea>

            </div>
        );
    }











    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Login;

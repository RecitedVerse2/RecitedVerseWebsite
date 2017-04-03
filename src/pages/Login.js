import React, { Component } from 'react';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';

// This is where users can log into accounts on RecitedVerse.com
class Login extends Component {
    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>



                <ContentArea headerTitle="Login Page!" backgroundColor='lightblue'></ContentArea>
            </div>
        );
    }


    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Login;

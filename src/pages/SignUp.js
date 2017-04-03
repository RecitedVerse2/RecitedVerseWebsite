import React, { Component } from 'react';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';


// This is where users can register for accounts on RecitedVerse.com
class SignUp extends Component {
    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>

                <ContentArea headerTitle="SignUp Page!" backgroundColor='black'></ContentArea>
            </div>
        );
    }



    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default SignUp;

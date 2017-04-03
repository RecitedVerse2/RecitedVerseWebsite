import React, { Component } from 'react';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';


// The generic poem page for each recitation.
class Poem extends Component {
    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>


                <ContentArea headerTitle="Poem Page!" backgroundColor='lightcoral'></ContentArea>
            </div>
        );
    }


    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Poem;

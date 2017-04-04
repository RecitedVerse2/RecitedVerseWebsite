import React, { Component } from 'react';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import TabPane from '../components/ProfilePageComps/TabPane';

// Here is where users will view their own profiles.
class Profile extends Component {

    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>

                <ContentArea headerTitle="Profile Page!" backgroundColor='rgb(242,244,248)'>
                    <TabPane></TabPane>
                </ContentArea>
            </div>
        );
    }



    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Profile;

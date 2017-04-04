import React, { Component } from 'react';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';
import TabPane from '../components/ProfilePageComps/TabPane';


// Here is where users will view their own profiles.
class Profile extends Component {

    render() {
        return (
            <div>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>


                <ContentArea>

                    <ContentHeader top='200px' height='400px'>
                        <h1>Working</h1>
                    </ContentHeader>


                    <br/><br/><br/><br/><br/>
                    <TabPane>

                    </TabPane>
                </ContentArea>
            </div>
        );
    }



    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Profile;

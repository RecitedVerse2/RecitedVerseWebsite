import React, { Component } from 'react';

import NavigationHeader from '../components/NavigationHeaderComps/NavigationHeader';
import ContentArea from '../components/NavigationHeaderComps/ContentArea';
import ContentHeader from '../components/NavigationHeaderComps/ContentHeader';
import RectButton from '../components/RectButton';

// This is the home page.
class Home extends Component {

    /**********************
    *                     *
    *        STYLES       *
    *                     *
    ***********************/

    trendingHeaderStyles() {
        return {
            height: '200px'
        };
    }
    recentHeaderStyles() {
        return {
            top: '15px',
            height: '200px'
        };
    }
    textHeaderStyles() {
        return {
            textAlign:'center',
            color:'rgb(160,160,160)'
        };
    }
    ROTDProps() {
        return {
            top:'35px',
            width:'150px',
            height:'40px',
            fontSize:'15px',
            textColor:'rgb(9, 92, 124)',
            backgroundColor:'rgb(76, 182, 203)',
            hoverColor:'rgb(52, 153, 170)'
        };
    }
    SUProps() {
        return {
            top:'15px',
            width:'100px',
            height:'40px',
            fontSize:'15px',
            textColor:'rgb(9, 92, 124)',
            backgroundColor:'rgb(76, 182, 203)',
            hoverColor:'rgb(52, 153, 170)'
        };
    }




    render() {
        return (
            <div style={{textAlign:'center'}}>
                <NavigationHeader goToHome={()=>{this.goToPage('home')}} goToProfile={()=>{this.goToPage('profile')}} goToLogin={()=>{this.goToPage('login')}} goToSignUp={()=>{this.goToPage('signup')}}>
                </NavigationHeader>

                <ContentArea>
                    <br/><br/><br/>
                    <h4 style={this.textHeaderStyles()}>Check out what's trending on Recited Verse</h4>
                    <ContentHeader {...this.trendingHeaderStyles()}>

                    </ContentHeader>
                    <br/>
                    <RectButton {...this.ROTDProps()}>Recitation of the Day</RectButton>


                    <br/><br/><br/><br/><br/><br/><br/>
                    <h4 style={this.textHeaderStyles()}>See what people are uploading right now!</h4>
                    <ContentHeader {...this.recentHeaderStyles()}>

                    </ContentHeader>

                    <br/><br/><br/><br/><br/><br/><br/>
                    <p style={this.textHeaderStyles()}>Don't have an account? Sign up here!</p>
                    <RectButton {...this.SUProps()} clickFunction={()=>{this.props.history.push('/signup')}}>Sign Up</RectButton>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </ContentArea>
            </div>
        );
    }


    // Goes to the particular page necessary for the navigation bar.
    goToPage(page) { this.props.history.push('/'+page); }
}

export default Home;

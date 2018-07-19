import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import PageFooter from '../components/PageFooter';
import './supporting.css';

export default class Copyright extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }


    getStyles() {
        return {
            position:'absolute',
            left:'0px',
            top:'0px',
            width:'100%'
        };
    }
    getOverlay() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'0',
            backgroundColor: 'white'
        }
    }
    getImageStyles() {
        return {
            position:'absolute',
            width:'100%',
            height:'100%',
            zIndex:'-1',
        }
    }
    getBannerTextStyles() {
        return {
            position:'relative',
            top:'20px',
            color:'white',
            textAlign:'center',
            fontSize:'100px',
            fontFamily:'Monthoers'
        }
    }

    getTitleStyles(){
      return{
        marginBottom:'50px'
      }
    }

    render() {
        return (

            <div style={this.getStyles()}>
            <HomeHeader nav={this.props.nav} rStore={this.props.rStore} callbackParent={this.onChildChanged} ></HomeHeader>
            <div style={this.getOverlay()}></div>
            <div className='resultsSection'>
            <div className="rcsupport"  style={{ padding: '10px', color: 'black', textAlign: 'left', marginLeft: '25%', marginRight: '25%'}}>
            
                <h3 style={{paddingBottom: '20px', paddingTop: '20px'}}>Copyright, Copyright Infringement, and Reporting Inapropriate  Content</h3>

<p>At Recited Verse, we take claims of copyright infringement seriously. If a copyrighted poem appears erroneously on our site, then we will attempt to remove the content as soon as possible. Sometimes, our staff may not be aware that such a recording has appeared in our system. For this reason, we have implemented a community-flagging system. A flag icon can be found either beside a poem’s title or beside any user comment. By pressing on this icon, users can report any recording of a poem that violates copyright law. Flagging any content on our site – a recording, a comment, a photo – will immediately send a notification to our RV team for speedy review. </p>
<h3 style={{paddingBottom: '20px', paddingTop: '20px'}}>Reporting Claims of Copyright Infringement </h3>
<p>We will respond to notices of alleged copyright infringement that comply with applicable law. If you believe any materials accessible on or from this site infringe your copyright, you may request removal of those materials (or access to them) from the website by submitting written notification to our Copyright Agent (designated below). </p>
<p>In accordance with the Online Copyright Infringement Liability Limitation Act of the Digital Millennium Copyright Act (17 U.S.C. § 512) ("DMCA"), the written notice (the "DMCA Notice") must include the following:</p>
<ul>
    <li style={{listStyleType: 'circle' }}>Your physical or electronic signature.</li>
    <li style={{listStyleType: 'circle'}}>Identification of the copyrighted work you believe to have been infringed or, if the claim involves multiple works on the Website, a representative list of such works.</li>
    <li style={{listStyleType: 'circle'}}>Identification of the material you believe to be infringing in a sufficiently precise manner to allow us to locate that material.</li>
    <li style={{listStyleType: 'circle'}}>Adequate information by which we can contact you (including your name, postal address, telephone number, and, if available, email address).</li>
    <li style={{listStyleType: 'circle'}}>A statement that you have a good faith belief that use of the copyrighted material is not authorized by the copyright owner, its agent, or the law.</li>
    <li style={{listStyleType: 'circle'}}>A statement that the information in the written notice is accurate.</li>
    <li style={{listStyleType: 'circle'}}>A statement, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
</ul>                

<p>If you fail to comply with all of the requirements of Section 512(c)(3) of the DMCA, your DMCA Notice may not be effective.</p>
<p>Please be aware that if you knowingly misrepresent that material or activity on the Website is infringing your copyright, you may be held liable for damages (including costs and attorneys' fees) under Section 512(f) of the DMCA.</p>
<h3>Content Removed in Error</h3>
<p>If you believe that material you posted on Recited Verse was removed or access to it was disabled by mistake or misidentification, you may file a counter-notification with us (a "Counter-Notice") by submitting written notification to our copyright agent (identified below). </p>
<p>Pursuant to the Digital Millennium Copyright Act (DMCA), the Counter-Notice must include substantially the following: </p>
<ul>
    <li style={{listStyleType: 'circle'}}>Your physical or electronic signature</li>
    <li style={{listStyleType: 'circle'}}> An identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access disabled</li>
    <li style={{listStyleType: 'circle'}}>Adequate information by which we can contact you (including your name, postal address, telephone number, and, if available, email address).</li>
    <li style={{listStyleType: 'circle'}}>A statement under penalty of perjury by you that you have a good faith belief that the material identified above was removed or disabled as a result of a mistake or misidentification of the material to be removed or disabled. </li>
    <li style={{listStyleType: 'circle'}}>A statement that you will consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located (or if you reside outside the United States for any judicial district in which the Website may be found) and that you will accept service from the person (or an agent of that person) who provided the Website with the complaint at issue. </li>
</ul>        
<p>The DMCA allows us to restore the removed content if the party filing the original DMCA Notice does not file a court action against you within ten business days of receiving the copy of your Counter-Notice. Please be aware that if you knowingly materially misrepresent that material or activity on the Website was removed or disabled by mistake or misidentification, you may be held liable for damages (including costs and attorneys' fees) under Section 512(f) of the DMCA.] </p>
<h3 style={{paddingBottom: '20px', paddingTop: '20px'}}> Repeated Violations of Copyright Infringement</h3>
<p>Because we take copyright infringement seriously, it is our policy – in appropriate circumstances – to disable and/or terminate the accounts of users who are repeat infringers.</p>

            </div>
            </div>
            <PageFooter bottom="-300px" />
            </div>

        )
    }
}
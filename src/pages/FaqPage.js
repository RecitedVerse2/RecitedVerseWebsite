import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';

export default class FaqPage extends Component {
    constructor(props) {
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

    render(){
        return (
            <div style={this.getStyles()}>
            <HomeHeader nav={this.props.nav} rStore={this.props.rStore} callbackParent={this.onChildChanged} ></HomeHeader>
            <div style={this.getOverlay()}></div>
            <div className='resultsSection'>
            <div style={{ padding: '10px', color: 'black', textAlign: 'left', marginLeft: '20%', marginRight: '20%'}}>
                   
                <h3>
                    When did this project originate?
                     </h3>
                    <p>
                    This project was born in 2013 at New York University through an interdisciplinary collaboration between Literature and Computer Science students.
                    </p>

                     <h3>
                     What inspired this idea?
                     </h3>
                    <p>
                    Some people find poetry to be inaccessible or difficult. Those same individuals often feel more connected to poems when they hear them uttered aloud rather than read as written or printed language. In response to this, Recited Verse was born as a platform for experiencing the oral and aural pleasures of poetry. RV users may either listen to a vast range of recorded verse or personally record poems through our digital software. 
                    </p>

                      <h3>
                      Why is this project called “Recited Verse”?
                     </h3>
                    <p>
                    In the context of poetry, the art of recitation means to speak verse aloud from one's memory. On one level, user-generated RV content exists and can be accessed through digital memory. On another, Recited Verse draws on the ancient roots of poetry as an art form that was spoken and/or performed. It also promotes the experience of listening to poems through repetition – whether one is at home or on a commute – because of the option of creating lists of favorite recordings or playlists based on theme, mood, period, and more. By virtue of the nature of repetition, then, Recited Verse helps to aid the memory and, in turn, foster the art of recitation. 
                    </p>

                        <h3>
                        Do you have an app version of Recited Verse?
                     </h3>
                    <p>
                    We are currently working on the app version of our site and hope to launch both an Android and IOS/Apple app in 2019. 
                    </p>
                <h3>
                GENERAL GUIDELINES / TERMS OF USE
                </h3>
                
                <h3>
                Are there any specific RV rules for submitting a recording of a poem?
                     </h3>
                    <p>
                    Yes. At Recited Verse, we have four golden rules for submitting recordings of poems:<br/>
                    1. When adding a recording to the archive, you authorize for the recording to be circulated within and to be used by the entire online community.<br/>
                    2. Each poem added to our archive must be open-source material: either in the public domain (published before 1923) or your own original (usually non-published) work. If you are contributing original work, you authorize for it to be circulated in the Recited Verse archive. If your work is already published, please ensure that you are not violating any copyrights. To be on the safe side, check with your publishers for permission. <br/>
                    3. Each recording – whether created through our software or uploaded – must begin with the title and author of the poem.<br/>
                    One must begin the recording by stating, for example, ‘“Because I Could Not Stop for Death” by Emily Dickinson’ before reading the poem’s first line. <br/>
                    <b>NOTE: If a poem does not have a title, we encourage using its first line.</b>
                    4. We prohibit the use of any musical accompaniment – or any other enhancing touches. We do this in order to make the exclusive medium of all of our recordings consistent: the human voice. <br/>
                    Any recordings that violate these conditions will be promptly removed from our system.
                    </p>

                    <h3>
                    How do I ensure that I share a high-quality recording of a poem?
                    </h3>
                    <p>
                    RV allows you the option to upload an audio file or to use our own software to create your recording. If you prefer, other free recording apps exist that will allow you to create mp3 or other audio files. 
                    </p>

                    <h3>
                    Is there any limit to the number of recordings allowed per poem?
                    </h3>
                    <p>
                    No. Recited Verse resists the idea of offering a single authoritative audio recording of any poem – even if that recording was produced by its author. Instead, we intentionally welcome as many recordings of a given poem as possible. In doing so, we invite an array of readings and interpretations: we welcome the range of voices, tones, cadences, and energies that breathes life into any given poetic text. Recited Verse was intended to be an ever-growing hub of recordings for each and every poem. 
                    </p>

                    <h3>
                    If Recited Verse resists the idea of a single authoritative audio recording of a poem, then why does it offer a “like” feature to single out a top recording for any given poem?
                    </h3>
                    <p>
                    Yes, Recited Verse offers a “liking” feature that singles out a “top recording” based on the number of likes that an individual recording has received in relation to other recordings of the same poem. Such a distinction is never permanent, as any new recording of a poem can surpass any other based on user likes. We believe that this feature allows users not only the chance to discover what recordings are receiving the most attention but also the ability to compare the variety of ways a poem can be read. <br/>
                    The Recited Verse “liking” feature exists for other reasons, as well. This includes the ability for users to create lists of favorite recordings, which can be turned easily into playlists for continuous listening. It also allows the reader to know that other users are receiving the recording positively. 
                    </p>

                    <h3>
                    Can I include music or any other background effects in my recordings?
                    </h3>
                    <p>
                    No. We only accept poems read aloud with the human voice – instead of the printed page or the screen – as the optimal and only medium.
                    </p>

                     <h3>
                     Can I share video files of my personal readings of poems onto my profile and to the RV community?
                    </h3>
                    <p>
                    No. Recited Verse is strictly an audio tool. 
                    </p>

                     <h3>
                     I am a poet who wishes to share my original and non-published work on Recited Verse. Is this possible?
                    </h3>
                    <p>
                    Yes! We encourage this kind of sharing. When you share a recording of your work on Recited Verse, all of your followers will receive a notification. You may keep the work on RV as long as desired or remove it from your profile at any time. <br/>
                    By sharing original poetry on Recited Verse, you certify to us that you have not published the material elsewhere and are, therefore, not violating any copyright. Moreover, should you wish to have the work published elsewhere in the future, you must either remove the work from the RV archive or negotiate with your publisher to keep the work on our website. 
                    </p>

                    <h3>
                    What if I have original work uploaded on Recited Verse and have decided to get it published with a literary press or some other website in the future?
                    </h3>
                    <p>
                    By sharing original work on RV as a poet, you certify to us that you have not published the material elsewhere and are, therefore, not violating any copyright. Moreover, should you wish to publish this work in the future, you either remove the work from RV or negotiate with your publisher to keep the work on our website. Violation of this policy will result in having your work and/or your profile deleted from the RV site.
                    </p>
                    
                    <h3>COST / FEES:</h3>
                    <h3>
                    How much does it cost to use Recited Verse?
                    </h3>
                    <p>
                    Use of Recited Verse is entirely free. In exchange, we ask that our BETA site users contribute as many recordings of poems (published before 1923) as possible. We also seek interested donors. For donations, please email hello@recitedverse.com.
                    </p>
                    <h3>
                    COPYRIGHT FAQs:
                    </h3>

                    <h3>
                    I am a published poet and would like to share audio recordings of my poetry on RV. How do I do it?
                    </h3>
                    <p>
                    We accept both published and non-published work. If you are a poet and choose to upload recordings of your own published work, you are certifying to us that you have obtained the proper permissions from your publisher to share both the written text and the recording. In such a case, we kindly ask that you submit to us written acknowledgement that your publisher agrees to sharing your work on Recited Verse; email us the permission at hello@recitedverse.com. See our Complete Copyright Policy for more information. 
                    </p>

                     <h3>
                     I am a poet who wishes to share my original and non-published work on Recited Verse. Is this possible?
                    </h3>
                    <p>
                    Yes! We encourage this kind of sharing. When you share a recording of your work on Recited Verse, all of your followers will receive a notification. You may keep the work on RV as long as desired or remove it from your profile at any time. 
<br/>
By sharing original poetry on Recited Verse, you certify to us that you have not published the material elsewhere and are, therefore, not violating any copyright. Moreover, should you wish to have the work published elsewhere in the future, you must either remove the work from the RV archive or negotiate with your publisher to keep the work on our website. See our Complete Copyright Policy for more information.

                    </p>

                     <h3>
                     Can there be a recording of a poem on Recited Verse that is under copyright?
                    </h3>
                    <p>
                    Yes. If a copyrighted poem appears on our site, then we will make the effort to note that we have obtained proper permissions from the publisher to use the content on RV. 
<br/> 
RV users cannot submit material that is copyrighted unless the user is the owner of such rights or has permission from their rightful owner to post the material and to grant RecitedVerse.com all of the license rights granted herein. See our Complete Copyright Policy for more information.


                    </p>

                    <h3>INAPPROPRIATE CONTENT</h3>

                    <h3>How do I report inappropriate content on the site?</h3>
                    <p>We have implemented a community-flagging system on our site. A flag icon can be found either beside a poem’s title or beside any user comment. By pressing on this icon, users can report inappropriate content. Flagging any content on our site – a recording, a comment, a photo – will immediately send a notification to our team for speedy review. </p>

                    <h3>THE FUTURE OF RECITED VERSE</h3>
                    
                    <h3>What happens after the BETA site testing period?</h3>
                    <p>Recited Verse will continue to improve its website by responding to user feedback. The future of the site will depend entirely on the response of its BETA users. </p>

                    





                </div>
                </div>
                </div>

        )
    }
}
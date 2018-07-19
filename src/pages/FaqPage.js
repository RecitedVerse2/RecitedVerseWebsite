import React, { Component } from 'react';
import HomeHeader from '../components/HomePageComponents/HomeHeader';
import './supporting.css';
import PageFooter from '../components/PageFooter';

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
            <div className="rcsupport" style={this.getStyles()}>
            <HomeHeader nav={this.props.nav} rStore={this.props.rStore} callbackParent={this.onChildChanged} ></HomeHeader>
            <div style={this.getOverlay()}></div>
            <div className='resultsSection'>
            <div style={{ padding: '10px', color: 'black', textAlign: 'left', marginLeft: '25%', marginRight: '25%'}}>
            <p style={{marginBottom: '20px'}}>
    <strong style={{paddingBottom: '20px'}}>Frequently Asked Questions [FAQs]:</strong>
    <ul>
    <li><a style={{color: 'blue'}} href="#whenOriginate">When did this project originate?</a></li>
    <li><a style={{color: 'blue'}} href="#whatInspired">What inspired this idea?</a></li>
    <li><a style={{color: 'blue'}} href="#whyRecited">Why is this project called “Recited Verse”?</a></li>
    <li><a style={{color: 'blue'}} href="#specificRules">Are there any specific RV rules for submitting a recording of a poem?</a></li>
    <li><a style={{color: 'blue'}} href="#highQuality">How do I ensure that I share a high-quality recording of a poem?</a></li>
    <li><a style={{color: 'blue'}} href="#isLimit">Is there any limit to the number of recordings allowed per poem?</a></li>
    <li><a style={{color: 'blue'}} href="#ifResists">If Recited Verse resists the idea of a single authoritative audio recording of a poem, then why does it offer a “like” feature to single out a top recording for any given poem?</a></li>
    <li><a style={{color: 'blue'}} href="#music">Can I include music or any other background effects in my recordings?</a></li>
    <li><a style={{color: 'blue'}} href="#video">Can I share video files of my personal readings of poems onto my profile and to the RV community?</a></li>
    <li><a style={{color: 'blue'}} href="#originalWork">I am a poet who wishes to share my original and non-published work on Recited Verse. Is this possible?</a></li>
    <li><a style={{color: 'blue'}} href="#cost">How much does it cost to use Recited Verse?</a></li>
    <li><a style={{color: 'blue'}} href="#publishedPoet">I am a published poet and would like to share audio recordings of my poetry on RV. How do I do it?</a></li>
    <li><a style={{color: 'blue'}} href="#publishedAfter">What if I have original work uploaded on Recited Verse and have decided to get it published with a literary press or some other website?</a></li>
    <li><a style={{color: 'blue'}} href="#underCopyright">Can there be a recording of a poem on Recited Verse that is under copyright?</a></li>
    <li><a style={{color: 'blue'}} href="#report">How do I report inappropriate content on the site?</a></li>
    <li><a style={{color: 'blue'}} href="#afterBeta">What happens after the BETA site testing period?</a></li>
    <li><a style={{color: 'blue'}} href="#howWeSupport">How does RV support itself?</a></li>
    <li><a style={{color: 'blue'}} href="#howCanIDonate">How can I donate to Recited Verse?</a></li>
    <li><a style={{color: 'blue'}} href="#volunteer">How can I join the RV team as a volunteer or intern?</a></li>
    <li><a style={{color: 'blue'}} href="#intheclassroom">I teach poetry and would like to know how to integrate RV into my
        classroom.
        </a></li>
        </ul>
    
</p>
<p>
    <strong> </strong>
</p>

<p>
    <strong> </strong>
</p>
<p>
    <strong id="whenOriginate">When did this project originate?</strong>
</p>

<p>
    This project was born in 2013 at New York University through an
    interdisciplinary collaboration between Literature and Computer Science
    students.
</p>
<p>
    <strong id="whatInspired">What inspired this idea?</strong>
</p>
<p>
    Some people find poetry to be inaccessible or difficult. Those same
    individuals often feel more connected to poems when they hear them uttered
    aloud rather than read as written or printed language. In response to this,
    Recited Verse was born as a platform for experiencing the oral and aural
    pleasures of poetry. RV users may either listen to a vast range of recorded
    verse or personally record poems through our digital software.
</p>
<p>
    <strong id="whyRecited">Why is this project called “Recited Verse”?</strong>
</p>
<p>
    In the context of poetry, the art of recitation means to speak verse aloud
    from one's memory. On one level, user-generated RV content exists and can
    be accessed through digital memory. On another, Recited Verse draws on the
    ancient roots of poetry as an art form that was spoken and/or performed. It
    also promotes the experience of listening to poems through repetition –
    whether one is at home or on a commute – because of the option of creating
    lists of favorite recordings or playlists based on theme, mood, period, and
    more. By virtue of the nature of repetition, then, Recited Verse helps to
    aid the memory and, in turn, foster the art of recitation.
</p>
<p>
    <strong>Do you have an app version of Recited Verse?</strong>
</p>
<p>
    We are currently working on the app version of our site and hope to launch
    both an Android and IOS/Apple app in 2019.
</p>
<p>
    <strong>GENERAL GUIDELINES / TERMS OF USE</strong>
</p>
<p>
    <strong id="specificRules">
        Are there any specific RV rules for submitting a recording of a poem?
    </strong>
</p>
<p>
    Yes. At Recited Verse, we have <strong>four</strong> golden rules for
    submitting recordings of poems:
</p>
<p>
    1. When adding a recording to the archive, you authorize for the recording
    to be circulated within and to be used by the entire online community.
</p>
<p>
    2. Each poem added to our archive <em>must be</em> open-source material:
    either in the public domain (published before 1923) or your own original
    (usually non-published) work. If you are contributing original work, you
    authorize for it to be circulated in the Recited Verse archive. If your
    work is already published, please ensure that you are not violating any
    copyrights. To be on the safe side, check with your publishers for
    permission.
</p>
<p>
3. Each recording – whether created through our software or uploaded –    <strong><em>must</em></strong> begin with the title and author of the poem.
</p>
<p>
    One must begin the recording by stating, for example, ‘“Because I Could Not
    Stop for Death” by Emily Dickinson’ before reading the poem’s first line.
</p>
<p>
    NOTE: If a poem does not have a title, we encourage using its first line.
</p>
<p>
    4. We prohibit the use of any musical accompaniment – or any other
    enhancing touches. We do this in order to make the exclusive medium of all
    of our recordings consistent: the human voice.
</p>
<p>
    Any recordings that violate these conditions will be promptly removed from
    our system.
</p>
<p>
    <strong id="highQuality">
        How do I ensure that I share a high-quality recording of a poem?
    </strong>
</p>
<p>
    RV allows you the option to upload an audio file or to use our own software
    to create your recording. If you prefer, other free recording apps exist
    that will allow you to create mp3 or other audio files.
</p>
<p>
    <strong id="isLimit">
        Is there any limit to the number of recordings allowed per poem?
    </strong>
</p>
<p>
    No. Recited Verse resists the idea of offering a single authoritative audio
    recording of any poem – even if that recording was produced by its author.
    Instead, we intentionally welcome as many recordings of a given poem as
    possible. In doing so, we invite an array of readings and interpretations:
    we welcome the range of voices, tones, cadences, and energies that breathes
    life into any given poetic text. Recited Verse was intended to be an
    ever-growing hub of recordings for each and every poem.
</p>
<p>
    <strong id="ifResists">
        If Recited Verse resists the idea of a single authoritative audio
        recording of a poem, then why does it offer a “like” feature to single
        out a top recording for any given poem?
    </strong>
</p>
<p>
    Yes, Recited Verse offers a “liking” feature that singles out a “top
    recording” based on the number of likes that an individual recording has
    received in relation to other recordings of the same poem. Such a
    distinction is never permanent, as any new recording of a poem can surpass
    any other based on user likes. We believe that this feature allows users
    not only the chance to discover what recordings are receiving the most
    attention but also the ability to compare the variety of ways a poem can be
    read.
</p>
<p>
    The Recited Verse “liking” feature exists for other reasons, as well. This
    includes the ability for users to create lists of favorite recordings,
    which can be turned easily into playlists for continuous listening. It also
    allows the reader to know that other users are receiving the recording
    positively.
</p>
<p>
    <strong id="music">
        Can I include music or any other background effects in my recordings?
    </strong>
</p>
<p>
    No. We only accept poems read aloud with the human voice – instead of the
    printed page or the screen – as the optimal and only medium.
</p>
<p>
    <strong id="video">
        Can I share video files of my personal readings of poems onto my
        profile and to the RV community?
    </strong>
</p>
<p>
    No. Recited Verse is strictly an audio tool.
</p>
<p>
    <strong id="originalWork">
        I am a poet who wishes to share my original and non-published work on
        Recited Verse. Is this possible?
    </strong>
</p>
<p>
    Yes! We encourage this kind of sharing. When you share a recording of your
    work on Recited Verse, all of your followers will receive a notification.
    You may keep the work on RV as long as desired or remove it from your
    profile at any time.
</p>
<p>
    By sharing original poetry on Recited Verse, you certify to us that you
    have not published the material elsewhere and are, therefore, not violating
    any copyright. Moreover, should you wish to have the work published
    elsewhere in the future, you must either remove the work from the RV
    archive or negotiate with your publisher to keep the work on our website.
</p>
<p>
    <strong>COST / FEES:</strong>
</p>
<p>
    <strong id="cost">How much does it cost to use Recited Verse?</strong>
</p>
<p>
    <strong> </strong>
</p>
<p>
    Use of Recited Verse is <strong><em>entirely free</em></strong>. In
    exchange, we ask that our BETA site users contribute as many recordings of
    poems (published before 1923) as possible. We also seek interested donors.
    For donations, please email hello@recitedverse.com.
</p>
<p>
    <strong>COPYRIGHT FAQs:</strong>
</p>
<p>
    <strong id="publishedPoet">
        I am a published poet and would like to share audio recordings of my
        poetry on RV. How do I do it?
    </strong>
</p>
<p>
    We accept both published and non-published work. If you are a poet and
    choose to upload recordings of your own <em>published</em> work, you are
    certifying to us that you have obtained the proper permissions from your
    publisher to share both the written text and the recording. In such a case,
    we kindly ask that you submit to us written acknowledgement that your
    publisher agrees to sharing your work on Recited Verse; email us the
permission at    <a href="mailto:hello@recitedverse.com">hello@recitedverse.com</a>. See our
    Complete Copyright Policy for more information.
</p>
<p>
    By sharing original poetry on Recited Verse, you certify to us that you
    have not published the material elsewhere and are, therefore, not violating
    any copyright. Moreover, should you wish to have the work published
    elsewhere in the future, you must either remove the work from the RV
    archive or negotiate with your publisher to keep the work on our website.
    See our Complete Copyright Policy for more information.
</p>
<p>
    <strong id="publishedAfter">
        What if I have original work uploaded on Recited Verse and have decided
        to get it published with a literary press or some other website?
    </strong>
</p>
<p>
    By sharing original work on RV as a poet, you certify to us that you have
    not published the material elsewhere and are, therefore, not violating any
    copyright. Moreover, should you wish to publish this work in the future,
    you either remove the work from RV or negotiate with your publisher to keep
    the work on our website. See our Complete Copyright Policy for more
    information.
</p>
<p>
    <strong id="underCopyright">
        Can there be a recording of a poem on Recited Verse that is under
        copyright?
    </strong>
</p>
<p>
    Yes. If a copyrighted poem appears on our site, then we will make the
    effort to note that we have obtained proper permissions from the publisher
    to use the content on RV.
</p>
<p>
    RV users cannot submit material that is copyrighted unless the user is the
    owner of such rights or has permission from their rightful owner to post
    the material and to grant RecitedVerse.com all of the license rights
    granted herein. See our Complete Copyright Policy for more information.
</p>
<p>
    <strong>INAPPROPRIATE CONTENT</strong>
</p>
<p>
    <strong id="report">How do I report inappropriate content on the site?</strong>
</p>
<p>
    We have implemented a community-flagging system on our site. A flag icon
    can be found either beside a poem’s title or beside any user comment. By
    pressing on this icon, users can report inappropriate content. Flagging any
    content on our site – a recording, a comment, a photo – will immediately
    send a notification to our team for speedy review.
</p>
<p>
    <strong>THE FUTURE OF RECITED VERSE</strong>
</p>
<p>
    <strong id="afterBeta">What happens after the BETA site testing period?</strong>
</p>
<p>
    Recited Verse will continue to improve its website by responding to user
    feedback. The future of the site will depend entirely on the response of
    its BETA users.
</p>
<p>
    <strong>SUPPORTING US</strong>
</p>
<p>
    <strong> </strong>
</p>
<p>
    <strong id="howWeSupport">How does RV support itself?</strong>
</p>
<p>
    In the past few years, students at both New York University and the
    University of San Francisco have made the development of Recited Verse
    possible. We are currently looking for donations to be able to expand our
    team of developers. If you are interested in donating to Recited Verse,
    please send a message to <strong>hello@recitedverse.com</strong>
</p>

<p>
    <strong id="howCanIDonate">How can I donate to Recited Verse?</strong>
</p>

<p>
    If you are interested in donating to Recited Verse, please send a message
    to <strong>hello@recitedverse.com</strong>
</p>
<p>
    <strong>VOLUNTEER / INTERNSHIP OPPORTUNITIES</strong>
</p>

<p>
    <strong id="volunteer">How can I join the RV team as a volunteer or intern?</strong>
</p>
<p>
    We are currently seeking all poetry enthusiasts as volunteers to help grow
    Recited Verse. We welcome anyone, including students, instructors, and
    scholars, to help us with expanding our archive, recruitment, social media
    campaigns, and spearheading local events.
</p>
<p>
    We are also seeking the following volunteer opportunities:
</p>
<ul>
    <li style={{listStyleType: 'circle', color: '#424242'}}>
        <strong>Period Scholars Coordinator</strong>
        : As part of the Advisory Board, this person will be responsible for
        overseeing a team of Literary Period Scholars (see below), making sure
        that each of them is fulfilling their monthly goals for generating site
        content and for recruiting affiliated scholars (see below).
    </li>
</ul>
<ul>
    <li style={{listStyleType: 'circle', color: '#424242'}}>
        <strong>Period Scholars</strong>
        : Each period scholar will oversee a given literary period (e.g.,
        Medieval Britain, Early American, Renaissance, 19th Century British,
        etc.). Period scholars will also be responsible for recruiting as many
        affiliated scholars (see below) as possible and for generating as much
        content as possible within his/her area.
    </li>
</ul>
<ul>
    <li style={{listStyleType: 'circle', color: '#424242'}}>
        <strong>Affiliated Scholars</strong>
        : This person will be associated with one specific author on PRV. For
        example, the Affiliated Scholar for William Wordsworth will work to
        develop / expand the online archive of recordings of Wordsworth's
        poems. These scholars will also curate the content of each main poem
        page, including the comments section. Their photos and bio will appear
        on each Wordsworth page, and they will directly interface with the
        general public (i.e., Recited Verse users).
    </li>
</ul>
<p>
If interested in any position, please email us at    <a href="mailto:hello@recitedverse.com">hello@recitedverse.com</a> with a
    resume/CV and a cover letter. Use the subject line “Volunteer / Intern
    Application.”
</p>
<p>
    <strong>RECITED VERSE &amp; THE CLASSROOM</strong>
</p>
<p>
    <strong id="intheclassroom">
        I teach poetry and would like to know how to integrate RV into my
        classroom.
    </strong>
</p>
<p>
    Recited Verse offers an archive of recordings from which you can use
    recordings in the classroom. Instructors can play several recordings and
    have students compare them.
</p>
<p>
    Instructors can also encourage students to create their own profiles,
    contribute their own recordings of poems, and follow or generate personal
    playlists for use in the classroom or on the go.
</p>
                </div>
                </div>
                <PageFooter bottom='-300px'>
                </PageFooter>
                </div>

        )
    }
}
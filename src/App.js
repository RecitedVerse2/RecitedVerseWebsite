import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import { createStore } from 'redux';

import Landing from './pages/Landing';
import Home from './pages/Home';
import SignUp from './pages/SignUp2';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Poem from './pages/Poem';
import PoemShare from './pages/PoemShare';
import Upload2 from './pages/Upload2';
import Search from './pages/Search';
import Transcript from './pages/Transcript';
import PlaylistPage from './pages/PlaylistPage';
import User from './pages/User';
import Notifications from './pages/Notifications';
import MainPoem from './pages/MainPoem';
import AudioPlayer from './components/AudioPlayer';
import navigation from './components/navigation';
import FaqPage from './pages/FaqPage';
import About from './pages/about';
import Volunteer from './pages/volunteer';
import Donations from './pages/donations';
import Copyright from './pages/Copyright';
import Beta from './pages/Beta';
import Privacy from './pages/Privacy';

// REDUX
const defaultState = {
    currentUser:null,
    id:'',
    uploaderID:'',
    image:'',
    title:'',
    author:'',
    recitedBy:'',
    published:'',
    genre:'',
    description:'',
    likes: '',
    plays: '',
    favorites: '',
    text:'',
    recitation:null,
    audio:null,
    volume:50,
    audioPlayerOpen:false,
    loop:false,
    lastPlayed:null,
    shouldUpdatePlayCount: false
}
const audioplayer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET':
            state.id = action.id;
            state.uploaderID=action.uploaderID;
            state.image=action.image;
            state.title=action.title;
            state.author=action.author;
            state.recitedBy=action.recitedBy;
            state.published=action.published;
            state.genre=action.genre;
            state.description=action.description;
            state.likes=action.likes;
            state.plays=action.plays;
            state.favorites=action.favorites;
            state.text=action.text;
            state.recitation=action.recitation;
            state.audio=action.audio;
            state.volume = action.volume;
            state.loop = action.loop;
            state.lastPlayed=action.lastPlayed;
            //console.log(state);
            break;
        case 'CLEAR':
            state.id = '';
            state.uploaderID='';
            state.image='';
            state.title='';
            state.author='';
            state.recitedBy='';
            state.published='';
            state.genre='';
            state.description='';
            state.likes='';
            state.plays='';
            state.favorites='';
            state.text='';
            state.recitation=null;
            state.audio=null;
            state.volume = state.volume;
            state.loop = false;
            state.lastPlayed=null;
            //console.log(state);
            break;
        case 'ADJUST_VOLUME':
            state.volume = action.volume;
            break;
        case 'LOGIN':
            state.currentUser = action.currentUser;
            //console.log(state.currentUser);
            break;
        case 'LOGOUT':
            state.currentUser = null;
            //console.log(state.currentUser);
            break;
        case 'TOGGLE_AUDIOPLAYER':
            state.audioPlayerOpen = !state.audioPlayerOpen;
            break;
        case 'LOOP_AUDIO':
            state.loop = !state.loop;
            break;
        case 'UPDATE_PLAYCOUNT':
            state.shouldUpdatePlayCount = action.shouldUpdatePlayCount
            break;
        default: break;
    }

    return state;
};
const store = createStore(audioplayer);




// This component just handles the routing between pages.
class App extends Component {

    constructor() {
        super();
        this.handleAutoLogin();
    }


    /** Not a true auto login */
    handleAutoLogin(callback) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref().child('Users').child(user.uid).once('value', (snap) => {
                    var usr = snap.val();

                    store.dispatch({
                        type:'LOGIN',
                        currentUser: usr
                    });
                    //console.log(store.getState().currentUser);

                    if(callback) { callback(); }
                })
            } else {
                return;
            }
        });

        // // Try to retrieve the user id of the person who is currently logged in.
        // var user = JSON.parse(window.localStorage.getItem('currentUser'));
        // console.log(user);

        // if(user !== null) {
        //     store.dispatch({
        //         type:'LOGIN',
        //         currentUser: user
        //     });
        // }
    }



    render() {

        var cUser = JSON.parse(window.localStorage.getItem('currentUser'));


        const navObj = new navigation();
        const navComp = () => { return navObj; }
        const AudioPlayerObj = <AudioPlayer rStore={store}></AudioPlayer>;

        const LandingPage = () => {return <Landing  nav={navObj} rStore={store} />}
        const HomePage = () => {return <Home audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</Home>}
        const SignUpPage = () => {return <SignUp audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</SignUp>}
        const LoginPage = () => {return <Login audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</Login>}
        const ProfilePage = () => {return <Profile nav={navObj} audioPlayer={AudioPlayerObj} rStore={store}>{AudioPlayerObj}</Profile>}
        const EditProfilePage = () => {return <EditProfile audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</EditProfile>}
        const PoemPage = () => {return <Poem audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</Poem>}
        const PoemSharePage = () => {return <PoemShare audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</PoemShare>}
        const UploadPage2 = () => {return <Upload2 audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</Upload2>}
        const SearchPage = () => {return <Search audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</Search>}
        const TranscriptPage = () => {return <Transcript audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</Transcript>}
        const PlaylistPageComp = () => {return <PlaylistPage audioPlayer={AudioPlayerObj} nav={navObj} rStore={store}>{AudioPlayerObj}</PlaylistPage>}
        const NotificationsPage = () => {return <Notifications audioPlayer={AudioPlayerObj}  nav={navObj} rStore={store}>{AudioPlayerObj}</Notifications>}
        const UserPageComp = ({match}) => {return <User audioPlayer={AudioPlayerObj} match={match} nav={navObj} rStore={store}>{AudioPlayerObj}</User>}
        const PoemByName = ({match}) => {return <MainPoem audioPlayer={AudioPlayerObj} match={match} nav={navObj} rStore={store}>{AudioPlayerObj}</MainPoem> }

        if(!cUser){  // before login
          return (
              <BrowserRouter>
                  <div>
                  <Switch>
                      <Route exact path="/signup" component={SignUpPage}></Route>
                      <Route exact path="/login" component={LoginPage}></Route>
                      <Route exact path="/share" component={PoemSharePage}></Route>
                      <Route component={LandingPage}></Route>
                  </Switch>
                  </div>
              </BrowserRouter>
          );

        }

        return (
            <BrowserRouter>
                <div>
                    <Route path="*" component={navComp}></Route>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route exact path="/home" component={HomePage}></Route>
                    <Route exact path="/signup" component={SignUpPage}></Route>
                    <Route exact path="/login" component={LoginPage}></Route>
                    <Route exact path="/profile" component={ProfilePage}></Route>
                    <Route exact path="/accountsettings" component={EditProfilePage}></Route>
                    <Route exact path="/upload" component={UploadPage2}></Route>
                    <Route exact path="/upload2" component={UploadPage2}></Route>
                    <Route exact path="/poem" component={PoemPage}></Route>
                    <Route exact path="/search" component={SearchPage}></Route>
                    <Route exact path="/transcript" component={TranscriptPage}></Route>
                    <Route exact path="/playlist" component={PlaylistPageComp}></Route>
                    <Route exact path="/User" component={UserPageComp}></Route>
                    <Route exact path="/share" component={PoemSharePage}></Route>
                    <Route exact path="/notifications" component={NotificationsPage}></Route>
                    <Route exact path="/allrecordings" component={PoemByName}></Route>
                    <Route exact path="/faq" component={FaqPage}></Route>
                    <Route exact path="/about" component={About}></Route>
                    <Route exact path="/volunteer" component={Volunteer}></Route>
                    <Route exact path="/donations" component={Donations}></Route>
                    <Route exact path="/copyright" component={Copyright}></Route>
                    <Route exact path="/beta" component={Beta}></Route>
                    <Route exact path="/privacy" component={Privacy}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

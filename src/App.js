import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import NavigationHeader from './components/NavigationHeaderComps/NavigationHeader';
import Landing from './pages/Landing';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Poem from './pages/Poem';
import Search from './pages/Search';

import AudioPlayer from './components/AudioPlayer';


// REDUX
const defaultState = {
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
    lastPlayed:null
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
            state.lastPlayed=action.lastPlayed;
            console.log(state);
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
            state.lastPlayed=null;
            console.log(state);
            break;
        default: break;
    }

    return state;
};
import { createStore } from 'redux';
const store = createStore(audioplayer);




// This component just handles the routing between pages.
class App extends Component {
    render() {
        const NavHeader = new NavigationHeader();
        const AudioPlayerObj = <AudioPlayer rStore={store}></AudioPlayer>;
        const NavHeaderComp = () => {return NavHeader}
        const LandingPage = () => {return <Landing audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></Landing>}
        const HomePage = () => {return <Home audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></Home>}
        const SignUpPage = () => {return <SignUp audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></SignUp>}
        const LoginPage = () => {return <Login audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></Login>}
        const ProfilePage = () => {return <Profile audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></Profile>}
        const EditProfilePage = () => {return <EditProfile audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></EditProfile>}
        const PoemPage = () => {return <Poem audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></Poem>}
        const SearchPage = () => {return <Search audioPlayer={AudioPlayerObj} navHeader={NavHeader} rStore={store}></Search>}

        return (
            <BrowserRouter>
                <div>
                    {AudioPlayerObj}

                    <Route path='*' component={NavHeaderComp}></Route>
                    <Route exact path="/" component={LandingPage}></Route>
                    <Route path="/home" component={HomePage}></Route>
                    <Route path="/signup" component={SignUpPage}></Route>
                    <Route path="/login" component={LoginPage}></Route>
                    <Route path="/profile" component={ProfilePage}></Route>
                    <Route path="/editprofile" component={EditProfilePage}></Route>
                    <Route path="/poem" component={PoemPage}></Route>
                    <Route path="/search" component={SearchPage}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

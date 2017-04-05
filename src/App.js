import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import AudioPlayer from './components/AudioPlayer';

import Landing from './pages/Landing';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Poem from './pages/Poem';


// This component just handles the routing between pages.
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Landing}></Route>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/editprofile" component={EditProfile}></Route>
                    <Route path="/poem" component={Poem}></Route>
                    <AudioPlayer></AudioPlayer>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

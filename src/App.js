import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/home';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import About from './components/pages/about';
import NewPost from './components/posts/newPost';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/about' component={About} />
          <Route page='/new-post' component={NewPost} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;

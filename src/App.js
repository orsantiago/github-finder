import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/Pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  // Search GitHub users
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  // Get single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/${username}client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type }});

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;

    return (
      <Router>
      <div className='App'>
        <Navbar />
        <div className="container">
        <Alert alert={this.state.alert} />
        {/* <Routes> */}
          {/* <Route exact path='/' render={props => ( */}
              {/* <Fragment> */}
                <Search searchUsers={this.searchUsers} 
                        clearUsers={this.clearUsers} 
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert} />
                <Users loading={loading} users={users} /> 
              {/* </Fragment> */}
          {/* )} /> */}
        {/* </Routes> */}

        {/* <Routes>
          <Route exact path='/about' element={About} />
        </Routes> */}

        </div>
      </div>
      </Router>
      // component = element, render = element, switch = routes
    );
  };
}

export default App;


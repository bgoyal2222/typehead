import React, { Component } from 'react';
import './app.css';
import TypeHead from './cogoportTypeHead';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div className="parentContainer">
        <TypeHead apiName={'/api/getSearchResult'} />
      </div>
    );
  }
}

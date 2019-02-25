import React, { PureComponent } from 'react';
import './app.css';

const ListItem = ({ item, onClick }) => {
  return <div key={item} className="listitem" onClick={() => onClick(item)}>{item}</div>;
}

export default class TypeHead extends PureComponent {
  state = { result: [], text: '' };

  getResult = (val) => {
    console.log(val);
    fetch(this.props.apiName, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        val
      })
    }).then(res => res.json())
      .then(({ result }) => this.setState({ result }));
  }

  onSelect = (text) => {
    this.setState({ text, result: [] });
  }

  fastTypingOverRide = null

  onChange = (e) => {
    clearTimeout(this.fastTypingOverRide);
    let val = e.target.value;
    this.fastTypingOverRide = setTimeout(() => this.getResult(val), 500);
    this.setState({ text: e.target.value });
  }

  render() {
    const { result, text } = this.state;
    return (
      <div className="maincontainer">
        <input type="text" className="searchbar" value={text} onChange={this.onChange} />
        {result.map((item, index) => index > 4 ? null : <ListItem item={item} onClick={this.onSelect} />)}
      </div>);
  }
}

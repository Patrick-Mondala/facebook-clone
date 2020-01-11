import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      autoCompleteResults: [],
      isFocused: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.getAutoCompleteResults = this.getAutoCompleteResults.bind(this);
    this.searchContainerRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  handleClick(e) {
    if (!this.searchContainerRef.current.contains(e.target)) {
      this.setState({ isFocused: false });
    }
  }

  getAutoCompleteResults(e) {
    if (e.target.value.length > 0) {
      this.setState(
        {
          term: e.target.value
        },
        () => {
          $.getJSON("/search?q=" + this.state.term).then(response =>
            this.setState({ autoCompleteResults: response.users })
          );
        }
      );
    } else {
      this.setState(
        {
          term: ""
        },
        () => {
          this.setState({ autoCompleteResults: [] });
        }
      );
    }
  }

  render() {
    let autoCompleteList = this.state.autoCompleteResults.map(
      (response, index) => {
        return (
          <Link
            onClick={() => this.setState({ isFocused: false })}
            to={`/users/${response.id}`}
            key={index}
          >
            <li className="user-search-result-item">
              <span>{response.first_name + " " + response.last_name}</span>
            </li>
          </Link>
        );
      }
    );

    const { isFocused, autoCompleteResults } = this.state;
    return (
      <div className="user-search-container" ref={this.searchContainerRef}>
        <input
          className="user-search"
          ref={input => {
            this.searchBar = input;
          }}
          value={this.state.term}
          onFocus={() => this.setState({ isFocused: true })}
          onChange={this.getAutoCompleteResults}
          type="text"
          placeholder="Search"
        />
        {isFocused && autoCompleteResults.length > 0 ? (
          <ul className="user-search-results">{autoCompleteList}</ul>
        ) : null}
      </div>
    );
  }
}

export default Search;
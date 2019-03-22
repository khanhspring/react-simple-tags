import React, { Component } from 'react';
import SimpleTags from './components/SimpleTags';

const emailRegex = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$');

class App extends Component {

  state = {
    tags: [],
    hasError: false
  };

  onValidationFail = ()  => {
    console.log('Please enter a correct email address!');
  };

  onValueChange = (value) => {
    console.log(value);
    if (!value || !value.length) {
      this.setState({hasError: true});
    } else {
      this.setState({hasError: false});
    }
    this.setState({tags: [...value]});
  };

  handleSubmit = (e) => {
    if (!this.state.tags || !this.state.tags.length) {
      this.setState({hasError: true});
    } else {
      alert(this.state.tags);
    }
    e.preventDefault();
  };

  render() {

    return (
      <div className="page-container">
        <form>
          <SimpleTags
              regex={emailRegex}
              regexErrorMessage={'Please enter a correct email address'}
              onValidationFail={this.onValidationFail}
              hasError={this.state.hasError}
              onValueChange={this.onValueChange}
              initValue={this.state.tags}
              errorMessage={'Value must not empty'}
              placeholder={'To...'}
          />
          <button onClick={this.handleSubmit} className="btn-submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;

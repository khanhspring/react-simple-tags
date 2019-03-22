import React, { Component } from 'react';
import SimpleTags from './components/SimpleTags';

class App extends Component {

  state = {tags: ['abc@example.com', 'xyz@example.com'], hasError: false};

  onValidationFail = ()  => {
    this.setState({hasError: true});
    console.log('Please enter a correct email address!');
  };

  onValueChange = (value) => {
    console.log(value);
    this.setState({tags: [...value]});
  };

  render() {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return (
      <div className="page-container">
        <SimpleTags
            regex={emailRegex}
            onValidationFail={this.onValidationFail}
            hasError={this.state.hasError}
            onValueChange={this.onValueChange}
            initValue={this.state.tags}
            errorMessage={'Value must not empty'}
        />
      </div>
    );
  }
}

export default App;

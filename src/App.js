import React, { Component } from 'react';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';

import * as jsonforms from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    if(Object.keys(this.props.schema).length === 0)
      return null;
    return (
      <div className="App">
        <header className="App-header">
          <p>JSONForms Basic Project</p>
        </header>
        <div className="form-container">
          <JsonForms/>
        </div>
      </div>
    );
  }
  
  componentDidMount () {
    // Retrieve the schemas
    // Pass the UI Schema and the JSON Schema to create the form controls
    this.props.init(schema, uischema);
  }
}  

const mapDispatchToProps = (dispatch) => {
  return {
    init: (schema, uischema) => {
      dispatch(jsonforms.Actions.init({}, schema, uischema));
    }
  };
};

const mapStateProps = (state) => {
  return {
    schema: jsonforms.getSchema(state)
  };
}

export default connect(mapStateProps, mapDispatchToProps)(App);

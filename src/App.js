import React, { Component } from 'react';
import './App.css';
import * as uiSchema from './json-ui-schema';
import * as schema from './json-schema';

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
    const uiSchemaObj = JSON.parse(JSON.stringify(uiSchema)).default;
    const schemaObj = JSON.parse(JSON.stringify(schema)).default;
    // Pass the UI Schema and the JSON Schema to create the form controls
    this.props.init(schemaObj, uiSchemaObj);
  }
}  

const mapDispatchToProps = (dispatch) => {
  return {
    init: (jsonschema, jsonuischema) => {
      dispatch(jsonforms.Actions.init({}, jsonschema, jsonuischema));
    }
  };
};

const mapStateProps = (state) => {
  return {
    schema: jsonforms.getSchema(state)
  };
}

export default connect(mapStateProps, mapDispatchToProps)(App);

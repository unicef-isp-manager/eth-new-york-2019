import React, { Component } from 'react';

// Wrapper function to load component reducers
const withReducer = (key, reducer) => ((WrappedComponent) => {
  class Extended extends Component {
    constructor(props) {
      super(props);
      // const { store } = props;
      props.store.injectReducer(key, reducer);
    }

    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }

  return Extended;
});

export default withReducer;

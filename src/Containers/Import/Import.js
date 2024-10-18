import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Route, Link } from "react-router-dom";


class Import extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        {/* <Link to="/import/contact"> import contact |</Link>
        <Link to="/import/product"> import product |</Link> */}
        <Link to="/import/account"> import account</Link>

      </>
    );
  }
}

const mapStateToProps = ({ importReducer }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Import);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ProfileBoost extends Component {
  onclick = () => {
    alert("hello");
  };
  render() {
    const {
      user,
      user: { metaData, userType },
    } = this.props;
    console.log(user);
    return (
      <div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, team, viewport }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProfileBoost);

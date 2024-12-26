import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class AccessmentActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    return (
      <>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
 

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AccessmentActionRight)


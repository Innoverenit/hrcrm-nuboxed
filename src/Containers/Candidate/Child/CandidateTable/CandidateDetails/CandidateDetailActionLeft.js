import React from "react";


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

class CandidateDetailActionLeft extends React.Component {
  render() {
    return (
      <div class=" flex items-center" >
        <KeyboardReturnIcon
          style={{ marginRight: "0.3rem",color: "#1890ff" }}
          iconType="rollback"
          tooltipTitle="Back"
         
         
          onClick={() => this.props.history.goBack()}
        />{" "}
      </div>
    );
  }
}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetailActionLeft)


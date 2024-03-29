import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option = StyledSelect.Option;

class LeadsActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {}
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleLeadsModal, user} = this.props;
    return (
      <>
        {user.leadsCreateInd === true && user.crmInd === true &&(
        <div class=" flex  items-center">
          {/* {user.customerFullListInd === true &&(  */}
        {/* <LeadShareForm
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      /> */}
      {/* )} */}
          <Button type="primary"  onClick={() => handleLeadsModal(true)}>
            Add
          </Button>
        </div>
        )} 
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({user: auth.userDetails,});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadsActionRight)
);

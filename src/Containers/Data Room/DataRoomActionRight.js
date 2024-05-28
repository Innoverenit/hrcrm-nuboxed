

import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { StyledSelect } from "../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const Option = StyledSelect.Option;

class DataRoomActionRight extends React.Component {
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
    const { handleDataroomModal, user } = this.props;
    return (
      <>
       
        <div class=" flex  items-center">
          {/* {user.customerFullListInd === true &&(  */}
        {/* <LeadShareForm
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      /> */}
      {/* )} */}
          {/* <Button type="primary" 
           onClick={() => this.props.handlePitchModal(true)}
           className="hover:bg-[#8eca9af2] focus:outline-none focus:shadow-outline"
          >
                    <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          </Button> */}
           {this.props.user.dataRoomCreateInd ===true && user.imInd === true &&(
<Button
  type="primary"
  onClick={() => this.props.handleDataroomModal(true)}
>
  <FormattedMessage id="app.add" defaultMessage="Add" />
</Button>
   )} 
        </div>
    
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({ user: auth.userDetails,});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataRoomActionRight)
);

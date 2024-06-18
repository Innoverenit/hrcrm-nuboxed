

import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const Option = StyledSelect.Option;

class PitchActionRight extends React.Component {
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
    const { handleLeadsModal, user } = this.props;
    return (
      <>
        {this.props.viewType === "card" && user.imInd === true  &&  user.pitchCreateInd === true && (
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
<Button
  type="primary"
  onClick={() => this.props.handlePitchModal(true)}
  className="focus:outline-none focus:shadow-outline transition bg-[#ff7158bf] border-[1px solid #8eca9a] text-white px-3 py-1 rounded-md"
  onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(142, 202, 154, 0.95)')}
  onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(255, 113, 88, 0.75)')}
>
  <FormattedMessage id="app.add" defaultMessage="Add" />
</Button>
        </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({ user: auth.userDetails,});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PitchActionRight)
);

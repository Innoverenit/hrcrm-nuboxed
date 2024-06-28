

import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import {handleUploadPitchModal} from "../PitchAction";
import UploadPitch from "./UploadPitch";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
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
      <div>
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
<DataSaverOnIcon/><FormattedMessage id="app.add" defaultMessage="Add" />
</Button>
<Tooltip placement="left" title="Create">
        <Button
          type="primary"
          ghost
          onClick={() => this.props.handleUploadPitchModal(true)}>
          Upload
        </Button>
      </Tooltip>
        </div>
       
        )}
          {/* <Tooltip placement="left" title="Create">
            <Button
              type="primary"
              ghost
              onClick={() => this.props.handleUploadPitchModal(true)}
            >
              Upload
            </Button>
          </Tooltip> */}
          </div>
          <UploadPitch
          handleUploadPitchModal={this.props.handleUploadPitchModal}
          uploadPitchList={this.props.uploadPitchList}
        />
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account,pitch }) =>
   ({ 
    user: auth.userDetails,
    uploadPitchList: pitch.uploadPitchList
  });
const mapDispatchToProps = (dispatch) => bindActionCreators({
  handleUploadPitchModal
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PitchActionRight)
);

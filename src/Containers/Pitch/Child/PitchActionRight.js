

import React, { lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { BundleLoader, } from "../../../Components/Placeholder";

import {handleUploadPitchModal} from "../PitchAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';
const UploadPitch=lazy(()=> import("./UploadPitch"));
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
          <div class=" flex  items-center">
            <Button
              type="primary"
              onClick={() => this.props.handlePitchModal(true)}
              className="focus:outline-none focus:shadow-outline transition bg-[#ff7158bf] border-[1px solid #8eca9a] text-white px-3 py-1 rounded-md"
              onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(142, 202, 154, 0.95)')}
             onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(255, 113, 88, 0.75)')}
            >
            <DataSaverOnIcon className=" !text-icon"/>Add
                        </Button>
          </div>
          <div><Tooltip placement="left" title="Create">
        <Button
          type="primary"
          ghost
          onClick={() => this.props.handleUploadPitchModal(true)}>
          <UploadIcon className=" !text-icon"/>Upload
        </Button>
      </Tooltip></div>

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
          <Suspense fallback={<BundleLoader />}>
          <UploadPitch
          handleUploadPitchModal={this.props.handleUploadPitchModal}
          uploadPitchList={this.props.uploadPitchList}
        /></Suspense>
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
export default connect(mapStateToProps, mapDispatchToProps)(PitchActionRight)


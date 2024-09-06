import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { Button } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import UploadIcon from '@mui/icons-material/Upload';
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
       
      {this.props.viewType==="teams" || this.props.viewType ==="all" ?  "" :
      <>

          <Button type="primary"  onClick={() => handleLeadsModal(true)}>
          <DataSaverOnIcon className="!text-icon"/>
          Add
          </Button>
          
          </>
        }
        <div className="max-sm:hidden">
          <Button type="primary"  
        onClick={() => this.props.handleLeadsImportModal(true)}
        >
            <UploadIcon className=" !text-icon"/>
            Import
          </Button>
          </div>
        </div>
  
        )} 
         
       
      </>
    );
  }
}

const mapStateToProps = ({ auth, team,leads, account }) => ({
  user: auth.userDetails,
  // addLeadsImportModal:leads.addLeadsImportModal,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // handleLeadsImportModal
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadsActionRight)
);

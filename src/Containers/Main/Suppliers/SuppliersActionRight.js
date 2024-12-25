import React,{lazy,Suspense} from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";

import { Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import HistoryIcon from '@mui/icons-material/History';
import { handleSuppliersModal,handleRecall } from "../../Main/Suppliers/SuppliersAction";
import AddRecallModal from "./AddRecallModal"

const AddSuppliersModal =lazy(()=>import("./Child/AddSuppliersModal"));


class SuppliersActionRight extends React.Component {
  render() {
    const { handleSuppliersModal, addSuppliersModal,handleRecall,addRecallModal, user, viewType } = this.props;

    return (
      <>
        <div className="flex">
      <div className="flex">
       <Tooltip title="Recall">
        <Button
         type="primary"
         onClick={() => handleRecall(true)}>
            <HistoryIcon className="!text-icon"/>
           Recall
           {/* {this.props.translatedMenuItems[9]} */}
            </Button>  
          </Tooltip>
          </div>
        {user.functionName === "Production" && user.designation === "Manager" &&
          viewType === "grid" ?
          <Tooltip 
          title={this.props.translatedMenuItems[11]}>
            <Button
              //type="primary"
              className="export"
              href={`${base_url}/export/supplier/${user.userId}`}
            >

              <i class="fas fa-download"></i>
            </Button>
          </Tooltip>
          : null}
        <Tooltip placement="left" title={this.props.translatedMenuItems[12]}>
          <Button
            type="primary"
            // ghost
            onClick={() => handleSuppliersModal(true)}
          ><DataSaverOnIcon className=" !text-icon"/>
           {/* Add */}
            {this.props.translatedMenuItems[9]}
          </Button>
        </Tooltip>
        </div>
  {/* } */}
<Suspense fallback={"Loading"}>
<AddSuppliersModal
          handleSuppliersModal={handleSuppliersModal}
          addSuppliersModal={addSuppliersModal}
          translatedMenuItems={this.props.translatedMenuItems}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
        <AddRecallModal
          handleRecall={handleRecall}
          addRecallModal={addRecallModal}
          translatedMenuItems={this.props.translatedMenuItems}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
</Suspense>
        
      </>
    );
  }
}

const mapStateToProps = ({ suppliers, auth }) => ({
  addSuppliersModal: suppliers.addSuppliersModal,
  addRecallModal:suppliers.addRecallModal,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSuppliersModal,
      handleRecall
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersActionRight)


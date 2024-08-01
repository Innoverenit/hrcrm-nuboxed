import React,{lazy,Suspense} from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { handleSuppliersModal } from "../../Main/Suppliers/SuppliersAction";

const AddSuppliersModal =lazy(()=>import("./Child/AddSuppliersModal"));


class SuppliersActionRight extends React.Component {
  render() {
    const { handleSuppliersModal, addSuppliersModal, user, viewType } = this.props;

    return (
      <>
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
          ><DataSaverOnIcon/>
           {/* Add */}
            {this.props.translatedMenuItems[9]}
          </Button>
        </Tooltip>
  {/* } */}
<Suspense fallback={"Loading"}>
<AddSuppliersModal
          handleSuppliersModal={handleSuppliersModal}
          addSuppliersModal={addSuppliersModal}
          translatedMenuItems={this.props.translatedMenuItems}
        />
</Suspense>
        
      </>
    );
  }
}

const mapStateToProps = ({ suppliers, auth }) => ({
  addSuppliersModal: suppliers.addSuppliersModal,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSuppliersModal,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SuppliersActionRight)
);

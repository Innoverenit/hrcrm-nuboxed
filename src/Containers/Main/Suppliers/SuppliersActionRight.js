import React,{lazy,Suspense} from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { handleSuppliersModal } from "../../Main/Suppliers/SuppliersAction";
import { FormattedMessage } from "react-intl";

const AddSuppliersModal =lazy(()=>import("./Child/AddSuppliersModal"));


class SuppliersActionRight extends React.Component {
  render() {
    const { handleSuppliersModal, addSuppliersModal, user, viewType } = this.props;

    return (
      <>
        {user.functionName === "Production" && user.designation === "Manager" &&
          viewType === "grid" ?
          <Tooltip 
          title={<FormattedMessage id="app.exportSupplier" defaultMessage="Export Supplier" />}>
            <Button
              //type="primary"
              className="export"
              href={`${base_url}/export/supplier/${user.userId}`}
            >

              <i class="fas fa-download"></i>
            </Button>
          </Tooltip>
          : null}
        {/* {user.functionName === "Production" && user.designation === "Manager" && viewType === "all" ?
          <Tooltip title="Download Suppliers Library">
            <Button
              type="primary"
              href={`${base_url}/export/supplier`}
            >
              <i class="fas fa-download"></i>
            </Button>
          </Tooltip>
          :null} */}
            {/* { viewType === "not approved" && */}
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            // ghost
            onClick={() => handleSuppliersModal(true)}
          ><DataSaverOnIcon/>
            <FormattedMessage id="app.add" defaultMessage="Add" />
            
            {/* <i class="fas fa-plus"></i> */}
          </Button>
        </Tooltip>
  {/* } */}
<Suspense fallback={"Loading"}>
<AddSuppliersModal
          handleSuppliersModal={handleSuppliersModal}
          addSuppliersModal={addSuppliersModal}
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

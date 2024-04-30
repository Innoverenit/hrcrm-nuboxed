import React,{useState} from "react";
import { Switch,Popconfirm,Modal } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCellwithProduct } from "../../../Event/Child/Location/LocationAction";

function ProductCellToggle (props) {
  const [toggle, setToggle] = useState(props.usedInd);
  const [confirmVisible, setConfirmVisible] = useState(false);
 
  const handleToggle = () => {
    setConfirmVisible(true);
  };

  const handleConfirm = (confirmed) => {
    if (props.usedInd) {
      props.linkCellwithProduct({
        // cellChamberLinkId: props.item.cellChamberLinkId,
        // productId:  props.particularDiscountData.productId,
        // locationDetailsId: props.locationId,
        // userId: props.userId,
        // orgId: props.organizationId,
        cellId:props.cellId,
        usedInd:props.usedInd?false:true,
        cellChamberLinkId:props.cellChamberLinkId,
        productId:props.particularDiscountData.productId,

      } 
    );
      setToggle(!toggle);
    }else{
      props.linkCellwithProduct({
        // cellChamberLinkId: props.item.cellChamberLinkId,
        // productId:  props.particularDiscountData.productId,
        // locationDetailsId: props.locationId,
        // userId: props.userId,
        // orgId: props.organizationId,
        cellId:props.cellId,
        usedInd:props.usedInd?false:true,
        cellChamberLinkId:props.cellChamberLinkId,
        productId:props.particularDiscountData.productId,

      } 
    );
    }
    // setConfirmVisible(false);
  };

  function handleCancel() {
    if (props.userInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
      <>
          <div>
              <Popconfirm
                  title="Confirm status change?"
                  onConfirm={() => handleConfirm()}
                  onCancel={() => handleCancel()}
                  okText="Ok"
                  cancelText="Cancel"
              >
                  <Switch
                      checked={props.usedInd||toggle}
                      onChange={handleToggle}
                      isLoading={true}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                  />
              </Popconfirm>

              {/* <Modal
        title="Confirm Action"
        visible={confirmVisible}
        onOk={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
      >
        <p>Are you sure you want to perform this action?</p>
      </Modal> */}
          </div>
      </>
  );
}
   

const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            linkCellwithProduct
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ProductCellToggle);

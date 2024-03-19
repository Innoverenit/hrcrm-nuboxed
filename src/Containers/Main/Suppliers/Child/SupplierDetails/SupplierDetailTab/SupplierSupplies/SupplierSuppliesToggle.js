import React,{useState} from "react";
import { Switch,Popconfirm} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSupplierSuppliesType  } from "../../../../SuppliersAction";

function SupplierSuppliesToggle (props) {
  const [toggle, setToggle] = React.useState(props.item.supplierSuppliesInd)

  function handleToggleCollection(item) {
      if (props.item.supplierSuppliesInd) {
        props.setSupplierSuppliesType(
          {
              suppliesId:props.item.suppliesId,
              supplierId:props.supplierId, 
              supplierSuppliesInd: props.item.supplierSuppliesInd ? false : true,
            },
       
          );
          setToggle( props.item.supplierSuppliesInd ? false : true);
      } else {
          props.setSupplierSuppliesType(
              {
                suppliesId:props.item.suppliesId,
                supplierId:props.supplierId, 
                supplierSuppliesInd: props.item.supplierSuppliesInd ? false : true,
              },
             
          );
          setToggle( props.item.supplierSuppliesInd ? false : true);
      }
  }

  function handleCancel() {
      if (props.item.supplierSuppliesInd) {
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
                  onConfirm={() => handleToggleCollection()}
                  onCancel={handleCancel}
                  okText="Ok"
                  cancelText="Cancel"
              >
                  <Switch
                      checked={toggle || props.item.supplierSuppliesInd}
                      // disabled={props.status}
                      isLoading={true}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                  />
              </Popconfirm>
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
            setSupplierSuppliesType
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierSuppliesToggle);

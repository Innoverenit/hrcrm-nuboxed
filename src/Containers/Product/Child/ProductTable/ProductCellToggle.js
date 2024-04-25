import React,{useState} from "react";
import { Switch,Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCellwithProduct } from "../../../Event/Child/Location/LocationAction";

function ProductCellToggle (props) {
  const [toggle, setToggle] = React.useState(false)


  function handleToggleCollection(item) {
      if (props.item.supplierSuppliesInd) {
        props.linkCellwithProduct(
          {
              supplierId:props.item.supplierId,
              suppliesId:props.suppliesId,
            //   supplierSuppliesInd: props.item.supplierSuppliesInd ? false : true,
            },
       
          );
        //   setToggle( props.item.supplierSuppliesInd ? false : true);
      } else {
          props.linkCellwithProduct(
              {
                supplierId:props.item.supplierId,
              suppliesId:props.suppliesId,
            //   supplierSuppliesInd: props.item.supplierSuppliesInd ? false : true,
              },
             
          );
        //   setToggle( props.item.supplierSuppliesInd ? false : true);
      }
  }

  function handleCancel() {
    //   if (props.item.supplierSuppliesInd) 
    if (false)
      {
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
                    //   checked={toggle || props.item.supplierSuppliesInd}
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
            linkCellwithProduct
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ProductCellToggle);

import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addingLocationToggle } from "./LocationAction";


function RefurbishToggle(props) {
  
  const [toggle, setToggle] = React.useState(props.productionInd);
  console.log(props.productionInd)

  function handleRefurbishClick(item) {
    if (props.productionInd) {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.productionInd ? false : true,
        type: "production"
         
      },props.orgId);
 
    } else {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.productionInd ? false : true,
        type: "production",
      },props.orgId);
    }
  }

  function handleCancel() {
    if (props.productionInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleRefurbishClick()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.productionInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "4em",
              // backgroundColor: props.productionInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}


const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addingLocationToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishToggle);



// function RefurbishToggle(props) {
//   const [refurbish,Setrefurbish]=React.useState(props.productionInd);
//   const value = refurbish || props.productionInd; 
//   function handleRefurbishClick(item) {
//     props.addingLocationToggle(
//       {
//         locationId:props.locationDetailsId,
//         value: value,
//         type: "production"
//       },
//       props.locationDetailsId,
      
//     );
//   }

//   return (
//     <>
//       <div>
//         <Popconfirm
//           title=" Do you wish to reinstate?"
//           onConfirm={() => handleRefurbishClick()}
//           onCancel={null}
//           okText="Ok"
//           cancelText="Cancel"
//         >
//           <Switch
//             checked={refurbish || props.productionInd}
//            //checked={refurbish}
//            onChange={(checked) => Setrefurbish(checked)}
//             isLoading={true}
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//           />
//         </Popconfirm>
//       </div>
//     </>
//   );
// }

import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMaterialFifoToggle } from "../Supplies/SuppliesAction";

function MaterialFifoToggle(props) {
  const[data,setData]=useState(props.purchaseList)
  useEffect(()=>{
    setData(props.purchaseList)
  },[props.purchaseList])
  const [toggle, setToggle] = React.useState(props.fifoInd);
  console.log(props.fifoInd)

  function handleToggleCollection(item) {
    if (props.fifoInd) {
      props.linkMaterialFifoToggle({
        suppliesId: props.suppliesId,
        fifoInd: props.fifoInd ? false : true,
         
      },props.suppliesId);
      setToggle( props.fifoInd ? false : true);
 
    } else {
      props.linkMaterialFifoToggle({
        suppliesId: props.suppliesId,
        fifoInd: props.fifoInd ? false : true,
      },props.suppliesId);
      setToggle( props.fifoInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.fifoInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.fifoInd || toggle}
            // disabled={props.status}
            isLoading={true}
         
            checkedChildren="LIFO"
            unCheckedChildren="FIFO"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  purchaseList: supplies.purchaseList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkMaterialFifoToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialFifoToggle);




// import React, { useState } from "react";
// import { Switch, Popconfirm } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { linkMaterialFifoToggle } from "../Supplies/SuppliesAction";

// function MaterialFifoToggle(props) {
//   const [toggle, setToggle] = useState(props.fifoind);

//   function handleToggleClick(value) {
//     setToggle(value);
//     props.linkMaterialFifoToggle(props.suppliesId, value);
//   }

//   return (
//     <div>
//       <Popconfirm
//         title="Are you sure you want to change the status?"
//         onConfirm={() => handleToggleClick(!toggle)}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Switch
//           checked={toggle}
//           onChange={() => {}}
//           checkedChildren="LIFO"
//           unCheckedChildren="FIFO"
//         />
//       </Popconfirm>
//     </div>
//   );
// }

// const mapStateToProps = ({ auth, supplies }) => ({
//   userId: auth.userDetails.userId,
//   orgId: auth.userDetails.organizationId,
//   purchaseList: supplies.purchaseList,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         linkMaterialFifoToggle,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(MaterialFifoToggle);

// import React, {  } from "react";
// import { Switch,  Popconfirm, } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { linkDocumentToggle } from "../../Documents/DocumentsAction";

// function DocumentStatusToggle(props) {
  
//   const [toggle, setToggle] = React.useState(props.editInd);
//   console.log(props.editInd)

//   function handleToggleCollection(item) {
//     if (props.editInd) {
//       props.linkDocumentToggle({
//         documentTypeId: props.documentTypeId,
//         editInd: props.editInd ? false : true,
         
//       });
 
//     } else {
//       props.linkDocumentToggle({
//         documentTypeId: props.documentTypeId,
//         editInd: props.editInd ? false : true,
//       });
//     }
//   }

//   function handleCancel() {
//     if (props.editInd) {
//       setToggle(true);
//     } else {
//       setToggle(false);
//     }
//   }
//   return (
//     <>
      
//         <Popconfirm
//           title="Confirm status change?"
//           onConfirm={() => handleToggleCollection()}
//           onCancel={handleCancel}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             className="toggle-clr"
//             checked={props.editInd || toggle}
//             // disabled={props.status}
//             isLoading={true}
//             style={{
//               width: "9em",
//               backgroundColor: props.editInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
//             }}
//             checkedChildren="Not Mandatory"
//             unCheckedChildren="Mandatory"
//           />
//         </Popconfirm>
      
//     </>
//   );
// }

// const mapStateToProps = ({ auth, candidate }) => ({
//   userId: auth.userDetails.userId,
//   orgId: auth.userDetails.organizationId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       linkDocumentToggle,
//     },
//     dispatch
//   );
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DocumentStatusToggle);


import React, { useEffect,useState } from "react";
import { Switch,  Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkDocumentToggle } from "../../Documents/DocumentsAction";

function DocumentStatusToggle(props) {
  
  const[data,setData]=useState(props.documents)
  useEffect(()=>{
    setData(props.documents)
  },[props.documents])

  const [toggle, setToggle] = React.useState(props.editInd);
  console.log(props.editInd)

  function handleToggleCollection(item) {
    if (props.editInd) {
      props.linkDocumentToggle({
        documentTypeId: props.documentTypeId,
        editInd: props.editInd ? false : true,
         
      });
      setToggle( props.editInd ? false : true);
    } else {
      props.linkDocumentToggle({
        documentTypeId: props.documentTypeId,
        editInd: props.editInd ? false : true,
      });
      setToggle( props.editInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.editInd) {
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
            checked={props.editInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "9em",
              backgroundColor: props.editInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
            checkedChildren="Not Mandatory"
             unCheckedChildren="Mandatory"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
   documents: document.documents,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkDocumentToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentStatusToggle);

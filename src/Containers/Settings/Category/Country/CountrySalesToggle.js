import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCountrySalesToggle } from "../Country/CountryAction";

function CountrySalesToggle(props) {
  const[data,setData]=useState(props.country)
  useEffect(()=>{
    setData(props.country)
  },[props.country])
  const [toggle, setToggle] = React.useState(props.salesInd);
  console.log(props.salesInd)

  function handleToggleCollection(item) {
    if (props.salesInd) {
      props.linkCountrySalesToggle({
        country_id: props.country_id,
        salesInd: props.salesInd ? false : true,
         
      },props.country_id);
      setToggle( props.salesInd ? false : true);
 
    } else {
      props.linkCountrySalesToggle({
        country_id: props.country_id,
        salesInd: props.salesInd ? false : true,
      },props.country_id);
      setToggle( props.salesInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.salesInd) {
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
            checked={props.salesInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{width: "5em"}}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, countrys }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  country:countrys.country,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkCountrySalesToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySalesToggle);










// import React, { useEffect,useState } from "react";
// import { Switch, Popconfirm, } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { linkCountryToggle } from "../Country/CountryAction";

// function CountryStatusToggle(props) {
//   // const[data,setData]=useState(props.country)
//   // useEffect(()=>{
//   //   setData(props.country)
//   // },[props.country])
//   const [toggle, setToggle] = React.useState(props.mandatoryInd);
//   console.log(props.mandatoryInd)

//   function handleToggleCollection(item) {
//     if (props.mandatoryInd) {
//       props.linkCountryToggle({
//         country_id: props.country_id,
//         mandatoryInd: props.mandatoryInd ? false : true,
         
//       },props.country_id);
//       setToggle( props.mandatoryInd ? false : true);
 
//     } else {
//       props.linkCountryToggle({
//         country_id: props.country_id,
//         mandatoryInd: props.mandatoryInd ? false : true,
//       },props.country_id);
//       setToggle( props.mandatoryInd ? false : true);
//     }
//   }

//   function handleCancel() {
//     if (props.mandatoryInd) {
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
//             checked={props.mandatoryInd || toggle}
//             // disabled={props.status}
//             isLoading={true}
//             style={{width: "9em"}}
//             checkedChildren="Required"
//             unCheckedChildren="Not Required"
//           />
//         </Popconfirm>
      
//     </>
//   );
// }

// const mapStateToProps = ({ auth, countrys }) => ({
//   userId: auth.userDetails.userId,
//   orgId: auth.userDetails.organizationId,
//   country:countrys.country,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         linkCountryToggle,
//     },
//     dispatch
//   );
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CountryStatusToggle);








// // import React, {useEffect,useState  } from "react";
// // import { Switch, Popconfirm, } from "antd";
// // import { connect } from "react-redux";
// // import { bindActionCreators } from "redux";
// // import { linkCountryToggle } from "../../../../Containers/Settings/Category/Country/CountryAction";

// // function CountryStatusToggle(props) {
// //   const[data,setData]=useState(props.country)
// //   useEffect(()=>{
// //     setData(props.country)
// //   },[props.country])
// //   const [toggle, setToggle] = React.useState(props.mandatoryInd);
// //   console.log(props.mandatoryInd)

// //   function handleToggleCollection(item) {
// //     if (props.mandatoryInd) {
// //       props.linkCountryToggle({
// //         countryId: props.countryId,
// //         mandatoryInd: props.mandatoryInd ? false : true,
         
// //       },props.countryId);
 
// //     } else {
// //       props.linkCountryToggle({
// //         countryId: props.countryId,
// //         mandatoryInd: props.mandatoryInd ? false : true,
// //       },props.countryId);
// //     }
// //   }

// //   function handleCancel() {
// //     if (props.mandatoryInd) {
// //       setToggle(true);
// //     } else {
// //       setToggle(false);
// //     }
// //   }
// //   return (
// //     <>
      
// //         <Popconfirm
// //           title="Confirm status change?"
// //           onConfirm={() => handleToggleCollection()}
// //           onCancel={handleCancel}
// //           okText="Yes"
// //           cancelText="No"
// //         >
// //           <Switch
// //             className="toggle-clr"
// //             checked={props.mandatoryInd || toggle}
// //             // disabled={props.status}
// //             isLoading={true}
// //             style={{width: "9em"}}
// //             checkedChildren="Mandatory"
// //             unCheckedChildren="Not Mandatory"
// //           />
// //         </Popconfirm>
      
// //     </>
// //   );
// // }

// // const mapStateToProps = ({ auth, candidate }) => ({
// //   userId: auth.userDetails.userId,
// //   orgId: auth.userDetails.organizationId,
// // });

// // const mapDispatchToProps = (dispatch) =>
// //   bindActionCreators(
// //     {
// //         linkCountryToggle,
// //     },
// //     dispatch
// //   );
// // export default connect(
// //   mapStateToProps,
// //   mapDispatchToProps
// // )(CountryStatusToggle);

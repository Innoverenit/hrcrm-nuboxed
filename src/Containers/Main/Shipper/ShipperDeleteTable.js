import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import {
  getDeletedShipper,
  handleShipperActivityTableModal,
} from "./ShipperAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { Link } from "../../../Components/Common";
import { FormattedMessage } from "react-intl";

function ShipperDeleteTable(props) {
  useEffect(() => {
    props.getDeletedShipper();
  }, []);

  const {
    handleUpdateShipperModal,
    updateShipperModal,
    deletedShipper,
  } = props;

  const [currentShipperId, setCurrentShipperId] = useState("");

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }

  return (
    <>
<div className=' flex justify-end sticky top-28 z-auto'>
<OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
<div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
        <div className=" md:w-[5.1rem]"><FormattedMessage id="app.phones" defaultMessage="Phones #"/></div>
        <div className=" md:w-[6.8rem] "><FormattedMessage id="app.email" defaultMessage="Email"/></div>
        <div className="md:w-[5.9rem]"><FormattedMessage id="app.shipby" defaultMessage="Ship By"/></div>
        <div className="md:w-[7.8rem]"><FormattedMessage id="app.address" defaultMessage="Address"/></div>
        <div className="md:w-[7.9rem]"><FormattedMessage id="app.city" defaultMessage="City"/></div>
        <div className="md:w-[5.2rem]"><FormattedMessage id="app.pinCode" defaultMessage="Pin Code"/></div>
        <div className="w-[3.8rem]"></div>
        </div>
        {/* <InfiniteScroll
        dataLength={props.shipperByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingShipperByUserId?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      > */}
{deletedShipper.map((item) => {
  return (
    <>
     <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3"               >
 <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">



<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
<Link
          toUrl={`shipper/${item.shipperId}`}
          title={`${item.name}`}
        >{item.name}</Link>
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.emailId} 
</div>

</div>

<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.shipByName} 
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{`${(item.addresses && item.addresses.length && item.addresses[0].address1) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].state) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].street) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].city) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].pinCode) || ""}`}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{(item.addresses &&
           item.addresses.length &&
           item.addresses[0].city) ||
          ""}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{(item.addresses &&
          item.addresses.length &&
          item.addresses[0].pinCode) ||
          ""}
</div>

</div>
<div class="flex flex-col w-[3%] max-sm:flex-row max-sm:w-[10%]">
 <div>
 <Tooltip title="Activity">
            <span>
              <i
                class="fab fa-connectdevelop"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.handleShipperActivityTableModal(true);
                  handleSetCurrentShipperId(item.shipperId);
                }}
              ></i>
            </span>
          </Tooltip>
          </div>
            </div>


 </div>




                </div>
    </>
  )
})}
  </OnlyWrapCard>
  </div>

    </>
  );
}
const mapStateToProps = ({ shipper, auth }) => ({
  fetchingDeletedShipper: shipper.fetchingShipper,
  fetchingDeletedShipperError: shipper.fetchingShipperError,
  deletedShipper: shipper.deletedShipper,
  userId: auth.userDetails.userId,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedShipper,
      handleShipperActivityTableModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDeleteTable);

// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { Tooltip } from "antd";
// import { Spacer } from "../../../Components/UI/Elements";
// import {
//   getDeletedShipper,
//   handleShipperActivityTableModal,
// } from "./ShipperAction";
// import ShipperDetailsView from "./ShipperDetailsView";
// import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";

// function ShipperDeleteTable(props) {
//   useEffect(() => {
//     props.getDeletedShipper();
//   }, []);

//   const {
//     handleUpdateShipperModal,
//     updateShipperModal,
//     deletedShipper,
//   } = props;

//   const [currentShipperId, setCurrentShipperId] = useState("");

//   function handleSetCurrentShipperId(shipperId) {
//     setCurrentShipperId(shipperId);
//   }

//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },
//     {
//       title: "Name",
//       // width: "15%",
//       defaultSortOrder: "descend",
//       // sorter: (a, b) => a.name - b.name,
//       render: (name, item, i) => (
//         <ShipperDetailsView shipperId={item.shipperId} name={item.name} />
//       ),
//     },

//     {
//       title: "Phone #",
//       dataIndex: "phoneNo",
//       render: (name, item, i) => {
//         return (
//           <>
//             {item.dialCode} {item.phoneNo}
//           </>
//         );
//       },
//     },
//     {
//       title: "Email",
//       dataIndex: "emailId",
//     },

//     {
//       title: "Mobile No",
//       dataIndex: "mobileNo",
//     },

//     {
//       title: "Ship By",
//       dataIndex: "shipBy",
//     },
//     {
//       title: "Address",
//       //  dataIndex: "addressId",
//       render: (name, item, i) => {
//         return `${(item.addresses &&
//           item.addresses.length &&
//           item.addresses[0].address1) ||
//           ""},
//                       ${(item.addresses &&
//                         item.addresses.length &&
//                         item.addresses[0].state) ||
//                         ""},
//                       ${(item.addresses &&
//                         item.addresses.length &&
//                         item.addresses[0].street) ||
//                         ""},
//                       ${(item.addresses &&
//                         item.addresses.length &&
//                         item.addresses[0].city) ||
//                         ""},
//                       ${(item.addresses &&
//                         item.addresses.length &&
//                         item.addresses[0].pinCode) ||
//                         ""}`;
//       },
//     },

//     {
//       title: "Pin Code",
//       render: (name, item, i) => {
//         return `${(item.addresses &&
//           item.addresses.length &&
//           item.addresses[0].pinCode) ||
//           ""}`;
//       },
//     },
//     {
//       title: "City",
//       render: (name, item, i) => {
//         return `${(item.addresses &&
//           item.addresses.length &&
//           item.addresses[0].city) ||
//           ""}`;
//       },
//     },
//     {
//       title: props.recriutmentInd ? "Status" : "",
//       width: props.recriutmentInd ? "10%" : "",
//     },
//     // {
//     //     title: "",
//     //     dataIndex: "documentId",
//     //     render: (name, item, i) => {
//     //         return (
//     //             <Tooltip title="Order">
//     //                 <ShoppingCartOutlined

//     //                     style={{ marginLeft: "35px" }}
//     //                     // style={{ cursor: "pointer", fontSize: "12px" }}
//     //                     onClick={() => {
//     //                         props.handleShipperOrderModal(true);
//     //                         handleSetCurrentShipperId(item.ShipperId);
//     //                     }}
//     //                 />
//     //             </Tooltip>
//     //         );
//     //     },
//     // },
//     {
//       title: "",
//       dataIndex: "documentId",
//       render: (name, item, i) => {
//         return (
//           <Tooltip title="Activity">
//             <span>
//               <i
//                 class="fab fa-connectdevelop"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                   props.handleShipperActivityTableModal(true);
//                   handleSetCurrentShipperId(item.shipperId);
//                 }}
//               ></i>
//             </span>
//           </Tooltip>
//         );
//       },
//     },
//   ];
//   if (props.fetchingDeletedShipperError) {
//     return <APIFailed />;
//   }

//   return (
//     <>
//       <StyledTable
//         rowKey=""
//         columns={columns}
//         dataSource={deletedShipper}
//         loading={
//           props.fetchingDeletedShipper || props.fetchingDeletedShipperError
//         }
//         pagination={false}
//         scroll={{ y: 320 }}
//       />
//       {/* <AddShipperActivityModal
//         addShipperActivityTableModal={props.addShipperActivityTableModal}
//         handleShipperActivityTableModal={props.handleShipperActivityTableModal}
//         shipperId={currentShipperId}
//         handleSetCurrentShipperId={handleSetCurrentShipperId}
//       /> */}
//       <Spacer />
//     </>
//   );
// }
// const mapStateToProps = ({ shipper, auth }) => ({
//   fetchingDeletedShipper: shipper.fetchingShipper,
//   fetchingDeletedShipperError: shipper.fetchingShipperError,
//   deletedShipper: shipper.deletedShipper,
//   userId: auth.userDetails.userId,
//   // addShipperOrderModal: shipper.addShipperOrderModal,
//   addShipperActivityTableModal: shipper.addShipperActivityTableModal,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getDeletedShipper,
//       handleShipperActivityTableModal,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(ShipperDeleteTable);

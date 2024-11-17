import React, { useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Tooltip, Button } from "antd";
import {
  getInventoryConsumptionList,
  setEditInventory,
  setEditInventoryConsumption,
  handleConsumptionReasonModal,
} from "../../../InventoryAction";
import { OnlyWrapCard } from "../../../../../../Components/UI/Layout";


const ConsumptionReasonModal =lazy(()=>import("./ConsumptionReasonModal"));

function InventoryConsumptionTable(props) {
  useEffect(() => {
    props.getInventoryConsumptionList(props.locationDetailsId);
  }, [props.locationDetailsId]);


  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
      <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         <div className=" flex justify-between w-[100%]  px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]"><FormattedMessage id="app.suppliesid" defaultMessage="Supplies ID"/></div>
        <div className=" md:w-[5.2rem] "><FormattedMessage id="app.subcategory" defaultMessage="Sub Category"/></div>
        <div className="md:w-[5.8rem]"><FormattedMessage id="app.attribute" defaultMessage="Attribute"/></div>
        <div className="md:w-[5.2rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
        <div className="md:w-[8.5rem]"><FormattedMessage id="app.batchNo" defaultMessage="Batch No" /></div>
        <div className="md:w-[8.5rem]"><FormattedMessage id="app.opening" defaultMessage="Opening"/></div>
        <div className="md:w-[5.2rem]"><FormattedMessage id="app.closing" defaultMessage="Closing"/></div>
        <div className=" md:w-[6.1rem]"><FormattedMessage id="app.mfg" defaultMessage="Mfg"/></div>
        <div className="w-12"></div>
            </div>
       
             {props.allInventoryConsumption.map((item) => {
              
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
   
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
    {item.suppliesId}
                            </div>
    </div>
 
 
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
                      {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {item.attributeName || ""} {item.subAttributeName}
                    </div>
    </div>
    

    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {item.name}
             </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {item.batchNumber}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {item.openingInventory}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {item.quantity}
             </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {dayjs(item.deliveryDate).format("DD/MM/YYYY")}
             </div>
    </div>
    <div class="flex md:items-center"> 

</div>
<div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                   <div>
                   <Tooltip title="Reason">
          <div class="cursor-pointer text-base text-green"
            onClick={() => {
              props.setEditInventoryConsumption(item);
              props.handleConsumptionReasonModal(true);
            }}
          >
            <i class="fas fa-cart-plus"></i>
          </div>
        </Tooltip>
                   </div>
                   
                   {/* <div>
                   <Tooltip title={item.salesExecutiveEmail}>
               <span>
                 <i class="far fa-envelope"></i>
               </span>
             </Tooltip>
                        </div> */}
            </div>

</div>
</div>
          );
        })}
  
              </div>
              </div>
              <Suspense fallback={"Loading..."}>
      <ConsumptionReasonModal
        handleConsumptionReasonModal={props.handleConsumptionReasonModal}
        consumptionReasonModal={props.consumptionReasonModal}
      />
      </Suspense>
    </>
  );
}

const mapStateToProps = ({ inventory, auth }) => ({
  userId: auth.userDetails.userId,
  allInventoryConsumption: inventory.allInventoryConsumption,
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  fetchingAllInventoryConsumption: inventory.fetchingAllInventoryConsumption,
  fetchingAllInventoryConsumptionError:
    inventory.fetchingAllInventoryConsumptionError,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  consumptionReasonModal: inventory.consumptionReasonModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventoryConsumptionList,
      setEditInventory,
      setEditInventoryConsumption,
      handleConsumptionReasonModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryConsumptionTable);




// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../../../Components/UI/Antd";
// import dayjs from "dayjs";
// import { Tooltip, Button } from "antd";
// import {
//   getInventoryConsumptionList,
//   setEditInventory,
//   setEditInventoryConsumption,
//   handleConsumptionReasonModal,
// } from "../../../InventoryAction";
// import ConsumptionReasonModal from "./ConsumptionReasonModal";
// import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";

// function InventoryConsumptionTable(props) {
//   useEffect(() => {
//     props.getInventoryConsumptionList(props.locationDetailsId);
//   }, [props.locationDetailsId]);

//   const columns = [
//     {
//       title: "Supplies ID",
//       dataIndex: "suppliesId",
//       width: "14%",
//     },
//     {
//       title: "Category",
//       width: "9%",
//       dataIndex: "categoryName",
//       onFilter: (value, record) => record.categoryName.indexOf(value) === 0,
//       sorter: (a, b) => {
//         const categoryNameA = a.categoryName && a.categoryName.toLowerCase();
//         const categoryNameB = a.categoryName && a.categoryName.toLowerCase();
//         if (categoryNameA < categoryNameB) {
//           return -1;
//         }
//         if (categoryNameA > categoryNameB) {
//           return 1;
//         }
//         //names must be equal
//         return 0;
//       },
//     },

//     {
//       title: "Sub Category",
//       dataIndex: "subCategoryName",
//       width: "9%",
//     },
//     {
//       title: "Attribute",

//       render: (name, item, i) => {
//         return `${item.attributeName || ""} ${item.subAttributeName} `;
//       },
//       width: "11%",
//     },

//     {
//       title: "Name",
//       dataIndex: "name",
//       width: "15%",
//     },
//     // {
//     //   title: "Mfg ID",
//     //   dataIndex: "",
//     //   width: "14%",
//     // },
//     {
//       title: "Batch No",
//       dataIndex: "batchNumber",
//       width: "8%",
//     },
//     {
//       title: "Opening",
//       dataIndex: "openingInventory",
//       width: "5%",
//     },
//     {
//       title: "Closing",
//       dataIndex: "quantity",
//       width: "5%",
//     },
//     {
//       title: " Mfg",
//       dataIndex: "deliveryDate",
//       render: (name, item, i) => {
//         return dayjs(item.deliveryDate).format("l");
//       },
//       sorter: (a, b) => {
//         var nameA = a.deliveryDate; // ignore upper and lowercase
//         var nameB = b.deliveryDate; // ignore upper and lowercase
//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }

//         return 0;
//       },
//       width: "8%",
//     },
//     {
//       title: "",
//       dataIndex: "",
//       width: "2%",
//       render: (name, item, i) => {
//         return (
//           <Tooltip title="Reason">
//             <span
//               style={{
//                 cursor: "pointer",
//                 fontSize: "12px",
//                 color: "green",
//               }}
//               onClick={() => {
//                 props.setEditInventoryConsumption(item);
//                 props.handleConsumptionReasonModal(true);
//               }}
//             >
//               <i class="fas fa-cart-plus"></i>
//             </span>
//           </Tooltip>
//         );
//       },
//     },
//   ];

//   // if (props.fetchingAllInventoryConsumptionError) {
//   //   return <APIFailed />;
//   // }
//   return (
//     <>
//       <StyledTable
//         columns={columns}
//         dataSource={props.allInventoryConsumption}
//         loading={
//           props.fetchingAllInventoryConsumption ||
//           props.fetchingAllInventoryConsumptionError
//         }
//         pagination={false}
//         scroll={{ y: 240 }}
//         onChange={console.log("task onChangeHere...")}
//       />
//       <ConsumptionReasonModal
//         handleConsumptionReasonModal={props.handleConsumptionReasonModal}
//         consumptionReasonModal={props.consumptionReasonModal}
//       />
//     </>
//   );
// }

// const mapStateToProps = ({ inventory, auth }) => ({
//   userId: auth.userDetails.userId,
//   allInventoryConsumption: inventory.allInventoryConsumption,
//   role: auth.userDetails.role,
//   department: auth.userDetails.department,
//   user: auth.userDetails,
//   fetchingAllInventoryConsumption: inventory.fetchingAllInventoryConsumption,
//   fetchingAllInventoryConsumptionError:
//     inventory.fetchingAllInventoryConsumptionError,
//   locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
//   consumptionReasonModal: inventory.consumptionReasonModal,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getInventoryConsumptionList,
//       setEditInventory,
//       setEditInventoryConsumption,
//       handleConsumptionReasonModal,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(InventoryConsumptionTable);

// function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
//   console.log(role);
//   console.log(type);
//   if (role === type) {
//     size = "22px";
//   } else {
//     size = "16px";
//   }
//   return (
//     <Tooltip title={tooltip}>
//       <Button
//         style={{
//           padding: "6px",
//           borderColor: "transparent",
//           color: role === type ? "#1890ff" : "grey",
//         }}
//         ghost={role !== type}
//         onClick={onClick}
//       >
//         <i className={`${iconType}`} style={{ fontSize: "20px" }}></i>
//       </Button>
//     </Tooltip>
//   );
// }

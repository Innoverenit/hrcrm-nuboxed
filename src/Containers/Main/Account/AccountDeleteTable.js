import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { Spacer } from "../../../Components/UI/Elements";
import {
    getDeletedDistributors,
    handleDistributorActivityTableModal,
} from "./AccountAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import moment from "moment";

function AccountDeleteTable(props) {
    useEffect(() => {
        props.getDeletedDistributors();
    }, []);

    const { handleUpdateDistributorModal, updateDistributorModal, deletedDistributors } = props;

    const [currentDistributorId, setCurrentDistributorId] = useState("");

    function handleSetCurrentDistributorId(distributorId) {
        setCurrentDistributorId(distributorId);
    }



    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
         <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Name</div>
        <div className=" md:w-[6.1rem]">Mobile</div>
        <div className=" md:w-[4.2rem] ">Website</div>
        <div className="md:w-[5.8rem]">Address</div>
        <div className="md:w-[8.5rem]">City</div>
                <div className="md:w-[5.2rem]">Pin Code</div>
                <div className="md:w-[2.2rem]"></div>
                <div className="md:w-[2.2rem]"></div>
        <div className="w-12"></div>
            </div>
  
             {deletedDistributors.map((item) => {
               const currentdate = moment().format("DD/MM/YYYY");
                       const date = moment(item.creationDate).format("DD/MM/YYYY");
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
    // style={{
    //     borderBottom: "3px dotted #515050"
    // }}
    >
       <div class="flex">
   
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">

        {item.name}
                            </h4>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <h4 class=" text-xs text-cardBody font-poppins">
    {item.dialCode} {item.phoneNo} 
                    </h4>
    
    </div> 
 
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs text-cardBody font-poppins">
                      
                      {item.url}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
        {item.address[0].address1 || ""} {item.address[0]
          .address2 || ""} {item.address[0].street || ""} 
                {item.address[0].city || ""}  
                    </h4>
    </div>
    
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">


        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
        {item.address[0].city || ""}
             </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
        {item.address[0].pinCode || ""}
             </h4>
    </div>
    

    <div class="flex md:items-center"> 

</div>
<div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                   <div>
                   <Tooltip title="Activity">
                        <span>
                            <i
                                class="fab fa-connectdevelop"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    props.handleDistributorActivityTableModal(true);
                                    handleSetCurrentDistributorId(item.distributorId);
                                }}
                            ></i>
                        </span>
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
        
              </OnlyWrapCard>
              </div>

            {/* <AddDistributorActivityModal
                addDistributorActivityTableModal={props.addDistributorActivityTableModal}
                handleDistributorActivityTableModal={props.handleDistributorActivityTableModal}
                distributorId={currentDistributorId}
                handleSetCurrentDistributorId={handleSetCurrentDistributorId}
            /> */}
            <Spacer />
        </>
    );
}
const mapStateToProps = ({ distributor, auth }) => ({
    fetchingDeletedDistributors: distributor.fetchingDistributors,
    fetchingDeletedDistributorsError: distributor.fetchingDistributorsError,
    deletedDistributors: distributor.deletedDistributors,
    userId: auth.userDetails.userId,
    addDistributorActivityTableModal: distributor.addDistributorActivityTableModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDeletedDistributors,
            handleDistributorActivityTableModal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDeleteTable);


// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { Tooltip } from "antd";
// import { Spacer } from "../../../Components/UI/Elements";
// import {
//     getDeletedDistributors,
//     handleDistributorActivityTableModal,
// } from "./AccountAction";
// // import DistributorDetailsView from "./DistributorDetailView";
// // import AddDistributorActivityModal from "../DistributorDetail/DistributorDetailsTab/AddDistributorActivityModal";
// import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";

// function AccountDeleteTable(props) {
//     useEffect(() => {
//         props.getDeletedDistributors();
//     }, []);

//     const { handleUpdateDistributorModal, updateDistributorModal, deletedDistributors } = props;

//     const [currentDistributorId, setCurrentDistributorId] = useState("");

//     function handleSetCurrentDistributorId(distributorId) {
//         setCurrentDistributorId(distributorId);
//     }

//     const columns = [
//         {
//             title: "",
//             width: "2%",
//         },
//         {
//             title: "Name",
//             // width: "15%",
//             defaultSortOrder: "descend",
//             // sorter: (a, b) => a.name - b.name,
//             // render: (name, item, i) => (
//             //     <DistributorDetailsView
//             //         distributorId={item.distributorId}
//             //         name={item.name}
//             //     />
//             // ),
//         },

//         {
//             title: "Mobile",
//             dataIndex: "phoneNo",
//             render: (name, item, i) => {
//                 return (
//                     <>
//                         {item.dialCode} {item.phoneNo}
//                     </>
//                 )
//             }
//         },
//         {
//             title: "Website",
//             width:"15%",
//             dataIndex: "url",
//         },
//         {
//             title: "Address",
//             width:"20%",
//             render: (name, item, i) => {
//                 return `${item.addresses[0].address1 || ""} ${item.addresses[0]
//                     .address2 || ""} ${item.addresses[0].street || ""} 
//                 ${item.addresses[0].city || ""}
//                     `;
//             },
//         },        
//         {
//             title: "City",
//             render: (name, item, i) => {
//                 return `${item.addresses[0].city || ""}`;
//             },
//         },
//         {
//             title: "Pin Code",
//             render: (name, item, i) => {
//                 return `${item.addresses[0].pinCode || ""}`;
//             },
//         },
//         {
//             title: props.recriutmentInd ? "Status" : "",
//             width: props.recriutmentInd ? "10%" : "",
//         },

//         {
//             title: "",
//             dataIndex: "documentId",
//             render: (name, item, i) => {
//                 return (
//                     <Tooltip title="Activity">
//                         <span>
//                             <i
//                                 class="fab fa-connectdevelop"
//                                 style={{ cursor: "pointer" }}
//                                 onClick={() => {
//                                     props.handleDistributorActivityTableModal(true);
//                                     handleSetCurrentDistributorId(item.distributorId);
//                                 }}
//                             ></i>
//                         </span>
//                     </Tooltip>
//                 );
//             },
//         },

//     ];
//     if (props.fetchingDeletedDistributorsError) {
//         return <APIFailed />
//     }

//     return (
//         <>
//             <StyledTable
//                 rowKey=""
//                 columns={columns}
//                 dataSource={deletedDistributors}
//                 loading={props.fetchingDeletedDistributors || props.fetchingDeletedDistributorsError}
//                 pagination={false}
//                 scroll={{ y: 320 }}
//             />
//             {/* <AddDistributorActivityModal
//                 addDistributorActivityTableModal={props.addDistributorActivityTableModal}
//                 handleDistributorActivityTableModal={props.handleDistributorActivityTableModal}
//                 distributorId={currentDistributorId}
//                 handleSetCurrentDistributorId={handleSetCurrentDistributorId}
//             /> */}
//             <Spacer />
//         </>
//     );
// }
// const mapStateToProps = ({ distributor, auth }) => ({
//     fetchingDeletedDistributors: distributor.fetchingDistributors,
//     fetchingDeletedDistributorsError: distributor.fetchingDistributorsError,
//     deletedDistributors: distributor.deletedDistributors,
//     userId: auth.userDetails.userId,
//     addDistributorActivityTableModal: distributor.addDistributorActivityTableModal
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getDeletedDistributors,
//             handleDistributorActivityTableModal,
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(AccountDeleteTable);

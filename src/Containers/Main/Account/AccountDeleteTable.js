import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";

import {
    getDeletedDistributors,
    handleDistributorActivityTableModal,
} from "./AccountAction";
import dayjs from "dayjs";

function AccountDeleteTable(props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    'Name', // 0
    'Mobile', // 1
    'Website', // 2
    'Address', // 3
    'City', // 4
    'Pin Code', // 5
  
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
    

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
            <div className=' flex  sticky  z-auto'>
            <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
         <div className=""></div>
         <div className=" md:w-[7%]"> {translatedMenuItems[0]}
            {/* Name */}
            </div>
        <div className=" md:w-[6.1rem]"> {translatedMenuItems[1]}
            {/* Mobile */}
            </div>
        <div className=" md:w-[4.2rem] "> {translatedMenuItems[2]}
            {/* Website */}
            </div>
        <div className="md:w-[5.8rem]"> {translatedMenuItems[3]}
            {/* Address */}
            </div>
        <div className="md:w-[8.5rem]"> {translatedMenuItems[4]}
            {/* City */}
            </div>
                <div className="md:w-[5.2rem]"> {translatedMenuItems[5]}
                  {/* Pin Code */}
                    </div>
                <div className="md:w-[2.2rem]"></div>
                <div className="md:w-[2.2rem]"></div>
        <div className="w-12"></div>
            </div>
  
             {deletedDistributors.map((item) => {
               const currentdate = dayjs().format("DD/MM/YYYY");
                       const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          return (
<div>
<div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
    >
       <div class="flex">
   
    <div className=" flex  md:w-[6.1rem] max-sm:w-full  ">
    <h4 class="text-sm  font-semibold  font-poppins cursor-pointer">

        {item.name}
                            </h4>
    </div>

    <div className=" flex   md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <h4 class=" text-xs  font-poppins">
    {item.dialCode} {item.phoneNo} 
                    </h4>
    
    </div> 
 
    </div>
    
    <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs  font-poppins">
                      
                      {item.url}
                    </h4>
    </div>
    <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs  font-semibold  font-poppins">
        {item.address[0].address1 || ""} {item.address[0]
          .address2 || ""} {item.address[0].street || ""} 
                {item.address[0].city || ""}  
                    </h4>
    </div>
    
    <div className=" flex  md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">


        <h4 class=" text-xs  font-semibold  font-poppins">
        {item.address[0].city || ""}
             </h4>
    </div>
    <div className=" flex  md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <h4 class=" text-xs  font-semibold  font-poppins">
        {item.address[0].pinCode || ""}
             </h4>
    </div>
    

    <div class="flex md:items-center"> 

</div>
<div class="flex  w-[2%] max-sm:flex-row max-sm:w-[6%]">
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
                                   
            </div>
</div>
</div>
          );
        })}
        
              </div>
              </div>

            {/* <AddDistributorActivityModal
                addDistributorActivityTableModal={props.addDistributorActivityTableModal}
                handleDistributorActivityTableModal={props.handleDistributorActivityTableModal}
                distributorId={currentDistributorId}
                handleSetCurrentDistributorId={handleSetCurrentDistributorId}
            /> */}
            <div class=" mt-3" />
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
// 
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
//             <div class=" mt-3" />
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

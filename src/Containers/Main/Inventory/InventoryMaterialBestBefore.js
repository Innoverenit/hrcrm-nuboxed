// import React, { useEffect, useState,  } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//     getMaterialBestBefore,
//     addToWaste,
//     addAsileInbest
  
// } from "../Inventory/InventoryAction";
// import TermsnConditionModal from "../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal"
// import { TerminalSharp } from "@mui/icons-material";
// import {handleTermsnConditionModal} from "../Suppliers/SuppliersAction"
// import dayjs from "dayjs";
// import { withRouter } from "react-router";

// import { Tooltip, Select, Button,Input } from "antd";
// import { base_url2 } from "../../../Config/Auth";
// import CategoryIcon from '@mui/icons-material/Category'
// import FactoryIcon from '@mui/icons-material/Factory';

// const { Option } = Select;

// const InventoryMaterialBestBefore = (props) => {
//   const [rowsBest, setRowBest] = useState(props.materialBestBefore)
//   const [selectedZones, setSelectedZones] = useState(null);
//   const [asile, setAsile] = useState("");
//   const [rowDetails, setRowDetails] = useState({}); 
//     const [zone, setZone] = useState([]);
//     const [rack, setRack] = useState([]);
//     const [isLoadingZone, setIsLoadingZone] = useState(false);
//     const [isLoadingRack, setIsLoadingRack] = useState(false);
//     const[selectedAisle,setSelectedAisle]= useState(false)
//     const [selectedRack, setSelectedRack] = useState(null);
//     const [selectedZone, setSelectedZone] = useState(null);
//     const [touchedZone, setTouchedZone] = useState(false)
//     const [row, setRow] = useState({})



//     const [aisle, setAisle] = useState([]);
//     const [isLoadingAisle, setIsLoadingAisle] = useState(false);
    
//     useEffect(() => {
//       fetchZone();
//         props.getMaterialBestBefore(props.locationId);
//         //props.getRoomRackByLocId(props.locationId, props.orgId);
//     }, [])


//     useEffect(() => {
//       // Check if data is available
//       if (props.materialBestBefore.length > 0) {
//         // Update activeTab when data is available
//         setRowBest(props.materialBestBefore);
//       }
//     }, [props.materialBestBefore]);


//     // useEffect(() => {
//     //   rowsBest.forEach((user, index) => {
//     //     if (user.roomRackId) {
//     //       fetchAisle(user.roomRackId, index);
//     //     }
//     //   });
//     // }, []);



//     const handleRow = (item) => {
//         setRow(item)
//     }


//     // const handleZoneChange = (value) => {
//     //   console.log(zone)
//     //   console.log(value)
//     //   const selectedZoneData = zone.find(zone => zone.roomRackId === value);
//     //   console.log(selectedZoneData)
//     //   if (selectedZoneData) {
//     //     setAsile(selectedZoneData.aisle);
//     //     setSelectedZones(value);
//     //   } else {
//     //     setAsile("");
//     //   }
//     //     // setSelectedZone(roomRackId);
//     //     fetchRack(value);
//     //   };
//     const handleZoneChange = (roomRackId, index) => {
//       const updatedAisleData = [...rowsBest];
//       updatedAisleData[index].roomRackId = roomRackId;
//       updatedAisleData[index].zone = `Zone ${roomRackId}`;
//       // updatedAisleData[index].fruitId = null;
//       updatedAisleData[index].aisle = null;
//       updatedAisleData[index].roomRackChamberLinkId = null;
//       // updatedAisleData[index].country = null;
//       setRowBest(updatedAisleData);
    
//       fetchAisle(roomRackId, index);
//     };
//       // const handleSelectZoneFocus = () => {
//       //   if (!touchedZone) {
//       //     fetchZone();
//       //     // fetchSector();
    
//       //     setTouchedZone(true);
//       //   }
//       // };
//       const fetchZone = async () => {
//         setIsLoadingZone(true);
//         try {
       
//           const apiEndpoint = `${base_url2}/roomrack/notUsed/roomAndRackDetails/${props.locationId}/${props.orgId}`;
//           const response = await fetch(apiEndpoint,{
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${props.token}`,
//               'Content-Type': 'application/json',
//               // Add any other headers if needed
//             },
//           });
//           const data = await response.json();
//           setZone(data);
//         } catch (error) {
//           console.error('Error fetching customers:', error);
//         } finally {
//           setIsLoadingZone(false);
//         }
//       };



//       const handleAisleChange=(value,index,)=>{
        
//         const updatedAisleData = [...rowsBest];
//         aisle|| null;
//         updatedAisleData[index].aisle = value;
       
      
   
       
//       }


//       const handleRackChange=(value,poSupplierSuppliesId)=>{
//         setSelectedRack(value);
//         console.log(rowsBest)
//         console.log(rowDetails)
//         let data={
//           roomRackId:rowDetails.roomRackId,
//           roomRackChamberLinkId:value
//         }
//         props.addAsileInbest(data,poSupplierSuppliesId)
//       }
// console.log(aisle)
//       const fetchAisle = async (roomRackId,index) => {
//         //setIsLoadingAisle(true);
//         try {
         
//           const apiEndpoint = `${base_url2}/roomrack/notUesedAisle/${roomRackId}`;
//           const response = await fetch(apiEndpoint,{
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${props.token}`,
//               'Content-Type': 'application/json',
//               // Add any other headers if needed
//             },
//           });
//           const data = await response.json();
//           setAisle(data);
//           // setAisle((prev) => ({
//           //   ...prev,
//           //   [index]: data,
//           // }));
//         } catch (error) {
//           console.error('Error fetching contacts:', error);
//         } finally {
//           //setIsLoadingAisle(false);
//         }
//       };

// console.log(rowsBest)


//       const fetchRack = async (roomRackId) => {
//         setIsLoadingRack(true);
//         try {
         
//           const apiEndpoint = `${base_url2}/roomrack/notUesedChamber/${roomRackId}`;
//           const response = await fetch(apiEndpoint,{
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${props.token}`,
//               'Content-Type': 'application/json',
//               // Add any other headers if needed
//             },
//           });
//           const data = await response.json();
//           setRack(data);
//         } catch (error) {
//           console.error('Error fetching contacts:', error);
//         } finally {
//           setIsLoadingRack(false);
//         }
//       };
   
// console.log(selectedZones)

   
//     return (
//         <>
//             <div className=' flex sticky  z-auto h-[79vh]'>
//                 <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
//                     <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
//                         <div className=""></div>
                        
//                         <div className="text-[#00A2E8] text-base w-[11.52rem]" >
//                         {props.translatedMenuItems[38]}   {/* Item  */}
//                         </div>
             
                       
               
//                         <div className=" w-[12.122rem]" >       
//                         <FactoryIcon className='!text-base  text-[#e4eb2f]' /> {props.translatedMenuItems[36]} {props.translatedMenuItems[0]}  
//                          {/* Supplier Name */}
//                         </div>

//                         <div className=" w-[4.122rem]">       
//                       HSN
//                         </div>

//                         <div className=" w-[8.12rem]">       
//                         <CategoryIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[36]} Id

//                         </div>   
//                         <div className=" w-[5.12rem]" >       
//                    {/* Country */} {props.translatedMenuItems[1]} 

//                         </div>
//                         <div className=" w-[8.12rem]" >       
//                    Best Use Date
//                    {/* {props.translatedMenuItems[1]}  */}

//                         </div>               
//                         <div className=" w-[5.12rem]" >       
//                     {/* Units */}{props.translatedMenuItems[26]} 

//                         </div>
//                         <div className=" w-[9.2rem]" >       
//                     {/* Zone */}{props.translatedMenuItems[32]} 

//                         </div>
//                         <div className=" w-[13.2rem]">       
//                     Aisle

//                         </div>
//                         <div className=" w-[7.12rem]">       
//                     {/* Rack */}{props.translatedMenuItems[33]} 

//                         </div>
                   

//                         <div className=" w-[3.22rem]">Discount</div>
//                     </div>
//                     {/* <InfiniteScroll
//                         dataLength={props.materialReceiveData.length}
//                         next={handleLoadMore}
//                         hasMore={hasMore}
//                         loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
//                         height={"67vh"}
//                         style={{ scrollbarWidth:"thin"}}
//                     > */}
//                          {rowsBest.map((item,index) => {
//                             const currentdate = dayjs().format("DD/MM/YYYY");
//                             const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//                             return (
//                                 <div>
//                                     <div className="flex rounded py-1 mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                      

//                                             {/* <div className=" flex items-center  w-[10.1rem] max-sm:w-full ">
//                                                 <div class="flex ml-gap text-xs font-bold  font-poppins cursor-pointer underline text-blue-600 border-l-2 border-green-500 bg-[#eef2f9]">
//                                                     <div
                                                     
//                                                     >
//                                                         {item.newPoNumber}
//                                                     </div>
                                                  
//                                                 </div>
//                                             </div> */}
                                     

//                                         <div className=" flex w-[18.12rem] items-center border-l-2  h-8 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

//                                             <div class=" text-xs  ml-gap font-poppins" >
                                               
//                                                 {item.suppliesFullName}  
//                                             </div>

//                                         </div>

                                       
//                                         <div className=" flex w-[11.02rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
//                                         <div className="  text-xs  ml-gap font-poppins " >

//                                             {item.supplierName}

//                                         </div>
//                                         </div>
//                                         <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[4.25rem] max-sm:flex-row  max-sm:justify-between  ">

//                                             <div class=" text-xs ml-gap font-poppins">
//                                                 {item.hsn}
//                                             </div>
//                                         </div>
                                      
//                                         <div className=" flex  md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
//                                         <div class=" text-xs ml-gap font-poppins">
//                                         {item.newSuppliesNo}
//                                             </div>
                                          
//                                         </div>
//                                         <div className=" flex  md:w-[3.8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
//                                         <div class=" text-xs  font-poppins">
//                                         {item.remainingCorrectUnit}
//                                             </div>
                                       
//                                         </div>

//                                         <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[5.6rem] max-sm:flex-row w-full max-sm:justify-between ">
//                                         <Button
//                                         onClick={() => {
//                                           props.addToWaste({
//                                             poSupplierSuppliesId:item.poSupplierSuppliesId,
//                                             poSupplierDetailsId:item.poSupplierDetailsId,
//                                             suppliesId:item.suppliesId,
//                                             userId:item.userId,
//                                             locationId:item.locationId,
//                                             orgId:props.orgId,
//                                             moveToWasteInd:true
//                                           },
//                                           item.poSupplierSuppliesId
//                                         );
                                          
//                                         }}
                         
//                                         >To Waste</Button>
//                                         </div>
//                                         <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[24.023rem] max-sm:flex-row w-full max-sm:justify-between ">
//                                                     <div class="flex text-xs  font-semibold  font-poppins" >
                                                        
//                                                     <Select placeholder="Select zone" 
//                                                     style={{ width: 119 }}
//                                                     loading={isLoadingZone}
//                                                     value={item.roomRackId}
//                                                     //onFocus={handleSelectZoneFocus}
//                                                     onChange={(value) => handleZoneChange(value, index)}
//                                                     >
      
//         {zone.map((zone) => (
//           <Option key={zone.roomRackId} value={zone.roomRackId}>
//             {zone.zone}
//           </Option>
//         ))}
//       </Select>

//     {/* <Input
//         placeholder="Aisle"
//         style={{ width: 100 }}
//         value={item.aisle}
//         disabled
//       /> */}


// <Select placeholder="Select zone" 
//                                                     style={{ width: 119 }}
//                                                     //loading={isLoadingAisle}
//                                                     value={item.aisle||null}
//                                                     disabled={!aisle[index] || aisle[index].length === 0}
                                                   
//                                                    onChange={(value) => handleAisleChange( value, index)}
//                                                     >
      
//         {aisle.map((aisle) => (
//           <Option key={aisle.aisel} value={aisle.aisel}>
//             {aisle.aisel}
//           </Option>
//         ))}
//       </Select>

//     <Select placeholder="Select rack" 
//       style={{ width: 119 }}
//       loading={isLoadingRack}
//    value={item.chamber}
//       onChange={(value) => handleRackChange(value, item.poSupplierSuppliesId)}
//       // disabled={!selectedZone} 
//       >
      
//       {rack.map((rack) => (
//         <Option key={rack.roomRackChamberLinkId} value={rack.roomRackChamberLinkId}>
//           {rack.chamber}
//         </Option>
//       ))}
//     </Select>
//                                                     </div>
//                                                 </div>
//                                         <div className=" flex  items-center justify-end h-8 ml-gap bg-[#eef2f9] w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
//                                                         <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs items-center font-poppins">
//                                                             <Tooltip title="Terms and conditions">
//                                                                 <TerminalSharp className="!text-icon text-[#c3b20b]"
//                                                                     onClick={() => {
//                                                                     handleRow(item)
//                                                                         props.handleTermsnConditionModal(true)
//                                                                     }}
//                                                                 />
//                                                             </Tooltip>
//                                                         </div>
//                                                     </div>                                  
//                                     </div>

//                                 </div>
//                             );
//                         })} 
//                     {/* </InfiniteScroll> */}
//                 </div>
//             </div>
//             <TermsnConditionModal
//                 rowData={row}
//                 addTermsnCondition={props.addTermsnCondition}
//                 handleTermsnConditionModal={props.handleTermsnConditionModal}
//                 translateText={props.translateText}
//                 selectedLanguage={props.selectedLanguage}
//             />
//         </>
//     );
// }


// const mapStateToProps = ({ inventory,suppliers, auth }) => ({
//     userId: auth.userDetails.userId,
//     locationId: auth.userDetails.locationId,
//     orgId: auth.userDetails.organizationId,
//     token: auth.token,
//     locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
//     materialBestBefore:inventory.materialBestBefore,
//     addTermsnCondition: suppliers.addTermsnCondition,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getMaterialBestBefore,
//             handleTermsnConditionModal,
//             addToWaste,
//             addAsileInbest
            
//             // getMaterialReceiveData,
//             // handleMaterialReceived,
//             // handlegrnlistmodal,
//             // getRackList,
//             // getRoomRackByLocId,
//         },
//         dispatch
//     );

// export default withRouter(
//     connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialBestBefore)
// );





// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   getMaterialBestBefore,
//   addToWaste,
//   addAsileInbest,
// } from "../Inventory/InventoryAction";
// import { handleTermsnConditionModal } from "../Suppliers/SuppliersAction";
// import dayjs from "dayjs";
// import { withRouter } from "react-router";
// import { TerminalSharp } from "@mui/icons-material";
// import { Tooltip, Select, Button, Input } from "antd";
// import { base_url2 } from "../../../Config/Auth";
// import CategoryIcon from "@mui/icons-material/Category";
// import FactoryIcon from "@mui/icons-material/Factory";

// const { Option } = Select;

// const InventoryMaterialBestBefore = (props) => {
//   const [rowsBest, setRowBest] = useState(props.materialBestBefore);
//   const [zone, setZone] = useState([]);
//   const [aisle, setAisle] = useState([]);
//   const [rack, setRack] = useState([]);
//   const [isLoadingZone, setIsLoadingZone] = useState(false);
//   const [isLoadingAisle, setIsLoadingAisle] = useState(false);
//   const [isLoadingRack, setIsLoadingRack] = useState(false);

//   useEffect(() => {
//     fetchZone();
//     props.getMaterialBestBefore(props.locationId);
//   }, []);

//   useEffect(() => {
//     if (props.materialBestBefore.length > 0) {
//       setRowBest(props.materialBestBefore);
//     }
//   }, [props.materialBestBefore]);

//   useEffect(() => {
//     rowsBest.forEach((row, index) => {
//       if (row.roomRackId) {
//         // If roomrackId exists, fetch Aisle and Rack
//         fetchAisle(row.roomRackId);
//         fetchRack(row.roomRackId);
//       }
//     });
//   }, [rowsBest]);

//   const fetchZone = async () => {
//     setIsLoadingZone(true);
//     try {
//       const apiEndpoint = `${base_url2}/roomrack/notUsed/roomAndRackDetails/${props.locationId}/${props.orgId}`;
//       const response = await fetch(apiEndpoint, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${props.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       setZone(data);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//     } finally {
//       setIsLoadingZone(false);
//     }
//   };

//   const fetchAisle = async (roomRackId, index) => {
//     setIsLoadingAisle(true);
//     try {
//       const apiEndpoint = `${base_url2}/roomrack/notUesedAisle/${roomRackId}`;
//       const response = await fetch(apiEndpoint, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${props.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       setAisle(data);
//     } catch (error) {
//       console.error("Error fetching aisle data:", error);
//     } finally {
//       setIsLoadingAisle(false);
//     }
//   };

//   const fetchRack = async (roomRackId) => {
//     setIsLoadingRack(true);
//     try {
//       const apiEndpoint = `${base_url2}/roomrack/notUesedChamber/${roomRackId}`;
//       const response = await fetch(apiEndpoint, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${props.token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       setRack(data);
//     } catch (error) {
//       console.error("Error fetching rack data:", error);
//     } finally {
//       setIsLoadingRack(false);
//     }
//   };

//   const handleZoneChange = (value, index) => {
//     const updatedRows = [...rowsBest];
//     updatedRows[index].roomRackId = value;
//     setRowBest(updatedRows);
//     // fetchAisle(value, index);
//   };

//   const handleAisleChange = (value, index) => {
//     const updatedRows = [...rowsBest];
//     updatedRows[index].aisle = value;
//     setRowBest(updatedRows);
//     console.log(updatedRows[index])

//   };

//   const handleRackChange = (value, index) => {
//     const updatedRows = [...rowsBest];
//     updatedRows[index].chamber = value;
//     setRowBest(updatedRows);
//     let data={
//                 roomRackId:updatedRows[index].roomRackId,
//                 roomRackChamberLinkId:updatedRows[index].roomRackChamberLinkId
//               }
//            props.addAsileInbest(data,updatedRows[index].poSupplierSuppliesId)
//     console.log(`Zone at index ${index}:`, updatedRows[index]);
//   };

//   return (
//     <div className="flex sticky z-auto h-[79vh]">
//       <div className="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
//         <div className="flex w-[100%] p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
//           <div className="text-[#00A2E8] text-base w-[11.52rem]">
//             {props.translatedMenuItems[38]} {/* Item */}
//           </div>
//           <div className="w-[12.122rem]">
//             <FactoryIcon className="!text-base text-[#e4eb2f]" /> {props.translatedMenuItems[36]} {props.translatedMenuItems[0]}
//             {/* Supplier Name */}
//           </div>
//           <div className="w-[4.122rem]">HSN</div>
//           <div className="w-[8.12rem]">
//             <CategoryIcon className="!text-base text-[#e4eb2f]" /> {props.translatedMenuItems[36]} Id
//           </div>
//           <div className="w-[5.12rem]">
//             {/* Country */} {props.translatedMenuItems[1]}
//           </div>
//           <div className="w-[8.12rem]">Best Use Date</div>
//           <div className="w-[5.12rem]">{props.translatedMenuItems[26]}</div>
//           <div className="w-[9.2rem]">{props.translatedMenuItems[32]}</div>
//           <div className="w-[13.2rem]">Aisle</div>
//           <div className="w-[7.12rem]">{props.translatedMenuItems[33]}</div>
//           <div className="w-[3.22rem]">Discount</div>
//         </div>

//         {rowsBest.map((item, index) => {
//           const currentdate = dayjs().format("DD/MM/YYYY");
//           const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//           return (
//             <div
//               key={item.poSupplierSuppliesId}
//               className="flex rounded py-1 mt-1 bg-white items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
//             >
//               <div className="flex w-[18.12rem] items-center border-l-2 h-8 border-green-500 bg-[#eef2f9] max-sm:flex-row max-sm:justify-between">
//                 <div className="text-xs ml-gap font-poppins">{item.suppliesFullName}</div>
//               </div>

//               <div className="flex w-[11.02rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:justify-between">
//                 <div className="text-xs ml-gap font-poppins">{item.supplierName}</div>
//               </div>

//               <div className="flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[4.25rem] max-sm:flex-row max-sm:justify-between">
//                 <div className="text-xs ml-gap font-poppins">{item.hsn}</div>
//               </div>

//               <div className="flex md:w-[6.4rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
//                 <div className="text-xs ml-gap font-poppins">{item.newSuppliesNo}</div>
//               </div>

//               <div className="flex md:w-[3.8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
//                 <div className="text-xs font-poppins">{item.remainingCorrectUnit}</div>
//               </div>

//               <div className="flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[8.22rem] w-full max-sm:justify-between">
//                 <div className="text-xs ml-gap font-poppins">{date}</div>
//               </div>

//               <div className="flex items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:justify-between w-[5.2rem]">
//                 <div className="text-xs ml-gap font-poppins">{item.itemDiscount}%</div>
//               </div>

//               {/* Zone Dropdown */}
//               <div className="w-[13.2rem]">
//                 <Select
//                   placeholder="Select Zone"
//                   value={item.roomRackId}
//                   onChange={(value) => handleZoneChange(value, index)}
//                   loading={isLoadingZone}
//                   style={{ width: "55%" }}
//                 >
//                   {zone.map((zoneItem) => (
//                     <Option key={zoneItem.roomRackId} value={zoneItem.roomRackId}>
//                       {zoneItem.zone}
//                     </Option>
//                   ))}
//                 </Select>
//               </div>

//               {/* Aisle Dropdown */}
//               <div className="w-[17.2rem]">
//                 <Select
//                   placeholder="Select Aisle"
//                   value={item.aisle}
//                   onChange={(value) => handleAisleChange(value, index)}
//                   loading={isLoadingAisle}
//                   style={{ width: "55%" }}
//                 >
//                   {aisle.map((aisleItem) => (
//                     <Option key={aisleItem.aisel} value={aisleItem.aisel}>
//                       {aisleItem.aisel}
//                     </Option>
//                   ))}
//                 </Select>
//               </div>

//               {/* Rack Dropdown */}
//               <div className="w-[13.22rem]">
//                 <Select
//                   placeholder="Select Rack"
//                   value={item.chamber}
//                   onChange={(value) => handleRackChange(value, index)}
//                   loading={isLoadingRack}
//                   style={{ width: "55%", }}
//                 >
//                   {rack.map((rackItem) => (
//                     <Option key={rackItem.roomRackChamberLinkId} value={rackItem.roomRackChamberLinkId}>
//                       {rackItem.chamber}
//                     </Option>
//                   ))}
//                 </Select>
//               </div>
//               <div className=" flex  items-center justify-end h-8 ml-gap bg-[#eef2f9] w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
//                                                         <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs items-center font-poppins">
//                                                             <Tooltip title="Terms and conditions">
//                                                                 <TerminalSharp className="!text-icon text-[#c3b20b]"
//                                                                     onClick={() => {
//                                                                     // handleRow(item)
//                                                                         props.handleTermsnConditionModal(true)
//                                                                     }}
//                                                                 />
//                                                             </Tooltip>
//                                                         </div>
//                                                     </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = ({ inventory,suppliers, auth }) => ({
//     userId: auth.userDetails.userId,
//     locationId: auth.userDetails.locationId,
//     orgId: auth.userDetails.organizationId,
//     token: auth.token,
//     locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
//     materialBestBefore:inventory.materialBestBefore,
//     addTermsnCondition: suppliers.addTermsnCondition,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getMaterialBestBefore,
//             handleTermsnConditionModal,
//             addToWaste,
//             addAsileInbest
            
//             // getMaterialReceiveData,
//             // handleMaterialReceived,
//             // handlegrnlistmodal,
//             // getRackList,
//             // getRoomRackByLocId,
//         },
//         dispatch
//     );

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialBestBefore));




import React, { useEffect, useState,lazy,Suspense  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PinIcon from '@mui/icons-material/Pin';
import CategoryIcon from '@mui/icons-material/Category'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TerminalSharp from "@mui/icons-material/TerminalSharp";
import DateRangeIcon from '@mui/icons-material/DateRange';
import FactoryIcon from '@mui/icons-material/Factory';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RepartitionIcon from '@mui/icons-material/Repartition'; 

import {
  getMaterialBestBefore,
  addToWaste,
  addAsileInbest,
} from "../Inventory/InventoryAction";
import { handleTermsnConditionModal } from "../Suppliers/SuppliersAction";
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { Tooltip, Select, Button } from "antd";
import { base_url2 } from "../../../Config/Auth";

const TermsnConditionModal = lazy(() =>import("../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal") );
const EmptyPage = lazy(() =>import("../EmptyPage") );
const { Option } = Select;

const InventoryMaterialBestBefore = (props) => {
  const [row, setRow] = useState({})
  const [rowsBest, setRowBest] = useState(props.materialBestBefore);
  const [zone, setZone] = useState([]);
  const [aisleData, setAisleData] = useState([]);
  const [rackData, setRackData] = useState([]);
  const [isLoadingZone, setIsLoadingZone] = useState(false);
  const [isLoadingAisle, setIsLoadingAisle] = useState(false);
  const [isLoadingRack, setIsLoadingRack] = useState(false);

  useEffect(() => {
    // Fetch zones initially
    fetchZone();
    props.getMaterialBestBefore(props.locationId);
  }, []);

  useEffect(() => {
    if (props.materialBestBefore.length > 0) {
      setRowBest(props.materialBestBefore);
    }
  }, [props.materialBestBefore]);

  useEffect(() => {
    rowsBest.forEach((row) => {
      if (row.roomRackId) {
        fetchAisle(row.roomRackId);
        fetchRack(row.roomRackId);
      }
    });
  }, [rowsBest]);

    const handleRow = (item) => {
        setRow(item)
    }
  const fetchZone = async () => {
    setIsLoadingZone(true);
    try {
      const apiEndpoint = `${base_url2}/roomrack/notUsed/roomAndRackDetails/${props.locationId}/${props.orgId}`;
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setZone(data);
    } catch (error) {
      console.error("Error fetching zone data:", error);
    } finally {
      setIsLoadingZone(false);
    }
  };

  const fetchAisle = async (roomRackId) => {
    setIsLoadingAisle(true);
    try {
      const apiEndpoint = `${base_url2}/roomrack/notUesedAisle/${roomRackId}`;
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAisleData(data);
    } catch (error) {
      console.error("Error fetching aisle data:", error);
    } finally {
      setIsLoadingAisle(false);
    }
  };

  const fetchRack = async (roomRackId) => {
    setIsLoadingRack(true);
    try {
      const apiEndpoint = `${base_url2}/roomrack/notUesedChamber/${roomRackId}`;
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRackData(data);
    } catch (error) {
      console.error("Error fetching rack data:", error);
    } finally {
      setIsLoadingRack(false);
    }
  };

  const handleZoneChange = (value, index) => {
    const updatedRows = [...rowsBest];
    updatedRows[index].roomRackId = value;
    setRowBest(updatedRows);

    // Fetch aisle and rack for the selected zone
    // fetchAisle(value);
    // fetchRack(value);
  };

  const handleAisleChange = (value, index) => {
    const updatedRows = [...rowsBest];
    updatedRows[index].aisle = value;
    setRowBest(updatedRows);
  };

  const handleRackChange = (value, index) => {
    const updatedRows = [...rowsBest];
    updatedRows[index].chamber = value;
    setRowBest(updatedRows);

    const payload = {
      roomRackId: updatedRows[index].roomRackId,
      roomRackChamberLinkId: value,
    };
    props.addAsileInbest(payload, updatedRows[index].poSupplierSuppliesId);
  };

  return (
    <>
    <div className="flex sticky z-auto h-[79vh]">
      <div className="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className="flex w-[100%] p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
          <div className="w-[14.9rem] text-sm text-[#00A2E8] truncate max-md:w-[11.52rem]"> 
            <AddShoppingCartIcon className="!text-icon "/>{props.translatedMenuItems[38]}</div>
          <div className="w-[10.122rem] truncate max-md:w-[12.122rem]">
              <FactoryIcon className='!text-base  text-[#e4eb2f]' />{props.translatedMenuItems[36]} {props.translatedMenuItems[0]} </div>
          <div className="w-[5.122rem] truncate max-md:w-[4.122rem]">
            <PinIcon className=" !text-base"/>HSN</div>
          <div className="w-[6.12rem] truncate max-md:w-[8.12rem]"> 
             <CategoryIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[36]}  Id</div>
          <div className="w-[4.12rem] truncate max-md:w-[5.12rem]">{props.translatedMenuItems[1]}</div>
          <div className="w-[6.66rem] truncate max-md:w-[8.12rem]"><DateRangeIcon className="!text-icon "/>{props.translatedMenuItems[42]}</div>
          <div className="w-[5.6rem] truncate max-md:w-[8.12rem]"></div>
          <div className="w-[7.7rem] truncate max-md:w-[9.2rem]">< ShareLocationIcon className=" !text-icon"/>{props.translatedMenuItems[32]}</div>
          <div className="w-[7.8rem] truncate max-md:w-[9.2rem]">< MeetingRoomIcon className=" !text-icon"/>{props.translatedMenuItems[44]}</div>
          <div className="w-[7.12rem] truncate max-md:w-[7.12rem]">< RepartitionIcon className=" !text-icon"/>{props.translatedMenuItems[33]}</div>
          <div className="w-[7.22rem] truncate max-md:w-[3.22rem]">{props.translatedMenuItems[41]}</div>
        </div>

        {rowsBest.map((item, index) => (
          <div
            key={item.poSupplierSuppliesId}
            className="flex rounded py-ygap mt-1 bg-white items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
          >
            <div className="flex w-[18.12rem] items-center justify-start truncate h-8 border-l-2 border-green-500 bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">
              {item.suppliesFullName}
              </div>
              </div>
            <div className=" flex w-[12.02rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.supplierName}
              </div>
            </div>
            <div className="flex w-[5.25rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.hsn}
              </div>
            </div>
            <div className="flex w-[7.4rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.newSuppliesNo}</div></div>
            <div className="flex w-[7.4rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.countryName}</div></div>
            <div className=" flex w-[4.8rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins max-sm:text-sm  ">{item.remainingCorrectUnit}</div></div>
            <div className="  flex w-[8.22rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins max-sm:text-sm  ">{dayjs(item.creationDate).format("DD/MM/YYYY")}</div>
            </div>
            <div className=" flex items-center  justify-center h-8 ml-gap bg-[#eef2f9] md:w-[5.6rem] max-sm:flex-row w-full max-sm:justify-between ">
                                       <Button 
                                       type="primary"
                                        onClick={() => {
                                          props.addToWaste({
                                            poSupplierSuppliesId:item.poSupplierSuppliesId,
                                            poSupplierDetailsId:item.poSupplierDetailsId,
                                            suppliesId:item.suppliesId,
                                            userId:item.userId,
                                            locationId:item.locationId,
                                            orgId:props.orgId,
                                            moveToWasteInd:true
                                          },
                                          item.poSupplierSuppliesId
                                        );
                                          
                                        }}
                         
                                        >To Waste</Button>
                                        </div>
            <div className=" flex w-[9.2rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              <Select
                placeholder="Select Zone"
                value={item.roomRackId}
                onChange={(value) => handleZoneChange(value, index)}
                loading={isLoadingZone}
                style={{ width: "55%" }}
              >
                {zone.map((zoneItem) => (
                  <Option key={zoneItem.roomRackId} value={zoneItem.roomRackId}>
                    {zoneItem.zone}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" flex w-[9.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              <Select
                placeholder="Select Aisle"
                value={item.aisle}
                onChange={(value) => handleAisleChange(value, index)}
                loading={isLoadingAisle}
                style={{ width: "55%" }}
              >
                {aisleData.map((aisleItem) => (
                  <Option key={aisleItem.aisel} value={aisleItem.aisel}>
                    {aisleItem.aisel}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" flex w-[9.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              <Select
                placeholder="Select Rack"
                value={item.chamber}
                onChange={(value) => handleRackChange(value, index)}
                loading={isLoadingRack}
                style={{ width: "55%" }}
              >
                {rackData.map((rackItem) => (
                  <Option
                    key={rackItem.roomRackChamberLinkId}
                    value={rackItem.roomRackChamberLinkId}
                  >
                    {rackItem.chamber}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" flex w-[6.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              {/* Discount */}
              </div>
            <div className=" flex  items-center justify-end h-8 ml-gap bg-[#eef2f9] truncate w-[2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs items-center font-poppins">
                                                            <Tooltip title="Terms and conditions">
                                                               <TerminalSharp className="!text-icon text-[#c3b20b]"
                                                                    onClick={() => {
                                                                    handleRow(item)
                                                                        props.handleTermsnConditionModal(true)
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div> 
          </div>
        ))}
      </div>
    </div>
    <Suspense fallback={"Loading..."}>
    <TermsnConditionModal
                rowData={row}
                addTermsnCondition={props.addTermsnCondition}
                handleTermsnConditionModal={props.handleTermsnConditionModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            </Suspense>
            </>

  );
};

const mapStateToProps = ({ inventory, suppliers, auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,
  orgId: auth.userDetails.organizationId,
  token: auth.token,
  materialBestBefore: inventory.materialBestBefore,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialBestBefore,
      handleTermsnConditionModal,
      addToWaste,
      addAsileInbest,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialBestBefore)
);



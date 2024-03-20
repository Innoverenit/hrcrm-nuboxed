import React, { useEffect, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Avatar } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  deleteCall,
  getCallListRangeByUserId,
  handleCallModal,
  setEditNote,
  handleCallNotesDrawerModal,
  getNotesListByCallId,
  emptyCall
} from "../../CallAction";
import { MultiAvatar2, } from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
const AddCallNotesDrawerModal = lazy(() => import("../AddCallNotesDrawerModal"));

function CallTable(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
const [currentNameId, setCurrentNameId] = useState("");
const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const {
      getCallListRangeByUserId,
      userDetails: { employeeId },
    } = props;
    getCallListRangeByUserId(employeeId, page);
    setPage(page + 1);
  }, []);

  useEffect(() => {
    return () => props.emptyCall();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLoadMore = () => {
    const callPageMapd = props.callListRangeByUserId && props.callListRangeByUserId.length &&props.callListRangeByUserId[0].pageCount
    setTimeout(() => {
      const {
        getCallListRangeByUserId,
        userDetails: { employeeId },
      } = props;
      if  (props.callListRangeByUserId)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
        getCallListRangeByUserId(employeeId, page);
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  function handleSetCallNameId(item) {
    setCurrentNameId(item);
  }


  const {
    fetchingCallListRangeByUserId,
    callListRangeByUserId,
    deleteCall,
    handleCallNotesDrawerModal,
    userDetails: { employeeId },
  } = props;

  if (isMobile){
    return (
      <>
         <div className=' flex justify-end sticky top-28 z-auto'>
         <div class="rounded-lg  p-2 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         
        <InfiniteScroll
          dataLength={callListRangeByUserId.length}
          next={handleLoadMore}
        hasMore={hasMore}
          loader={fetchingCallListRangeByUserId?<div class="flex items-center">Loading...</div>:null}
          height={"75vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
        
            {callListRangeByUserId.map((item) => {
              const incdata =item.included
              const findEmp = incdata.map(item => ({
                empName: item.empName
                  ? item.empName
                      .split(' ')
                      .map(word => (word ? word.charAt(0).toUpperCase() : '')) 
                      .slice(0,2)
                  : ''
              }));
               return (
                <div>
              <div
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem]  p-3"
                >
               <div class="flex items-center  justify-between">
               
              <div> {item.callType}</div>
              
              
              <p> {item.callPurpose}</p>
               
                </div>
                <div class="flex items-center  justify-between">
              
        
                <MultiAvatar2
                      primaryTitle={item.contactName}
                      // imageId={item.ownerImageId}
                      imageURL={item.imageURL}
                      imgWidth={"1.8em"}
                      imgHeight={"1.8em"}
                    />
                
     
               
               
                <p> {dayjs(item.startDate).format('YYYY-MM-DD')}</p>
                
                
               
                <div>
             
                <Avatar.Group
                     maxCount={7}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                      {item.included &&
                    item.included.map((candidate, i) => {
                      
                      const data1 = candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : "No data"
                      return (
                        <Tooltip title={candidate.empName} key={i}>
                        <Avatar style={{ backgroundColor: "#f56a00" }}>
                        {data1}
                      
                      </Avatar>
                      </Tooltip>
                       
  
                     
                      );
                    })}
                    
              </Avatar.Group>
          
          
                </div>
                
                </div>
                
                <div class="flex items-center  justify-between">
               
               <span>
                {item.assignedTo === null ? (
                  "Not available"
                ) : (
                  <>
                  {item.assignedTo === item.woner ? (
                    
                    null
                  ) : (
                  <MultiAvatar2
                    primaryTitle={item.assignedTo}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
                  )}
                  </>
                )}
              </span>
                {/* <p> {item.assignedTo || "Unassigned"}</p> */}
                
                
               
               <MultiAvatar2
                     primaryTitle={item.woner}
                     //imageId={item.ownerImageId}
                     imageURL={item.imageURL}
                     imgWidth={"1.8em"}
                     imgHeight={"1.8em"}
                   />
              
               
                
             
                <p> {item.completionInd ? "Yes" : "No"}</p>
               
              
                
               
                
                      <div>
                      <Tooltip title="Notes">
         <NoteAltIcon
                  onClick={() => {
                    handleCallNotesDrawerModal(true);
                    handleSetCallNameId(item);
                  }}
                  className="!text-base cursor-pointer text-[green]"
                />
             </Tooltip>
                      </div>
                      <div>
                      <Tooltip title="Delete">
                      <DeleteOutlined  type="delete" 
                      className="!text-base cursor-pointer text-[red]"
                  onClick={() => deleteCall(item.callId, employeeId)}
                />
                  </Tooltip>
                      </div>
                    
                </div>
              </div>
              </div>
             )
            })}
     
        </InfiniteScroll>
        </div>
        </div>
        <AddCallNotesDrawerModal
  handleSetCallNameId={handleSetCallNameId}
  handleCallNotesDrawerModal={props.handleCallNotesDrawerModal}
  addDrawerCallNotesModal={props.addDrawerCallNotesModal}
    currentNameId={currentNameId}
    // taskName={currentprocessName.taskName} // Pass taskName as a prop
  
  />
      </>
    );
  }

  return (
    <>
       <div className=' flex justify-end sticky top-28 z-auto'>
       <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
       <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[7.1rem]"><FormattedMessage
                  id="app.type"
                  defaultMessage="type"
                /></div>
        <div className=" md:w-[10.1rem]"><FormattedMessage
                  id="app.subject"
                  defaultMessage="subject"
                /></div>
        <div className=" md:w-[7.11rem] "><FormattedMessage
                  id="app.contact"
                  defaultMessage="contact"
                /></div>
        <div className=" md:w-[7.2rem]"><FormattedMessage
                  id="app.date"
                  defaultMessage="date"
                /></div>
        <div className="md:w-[6.2rem]"><FormattedMessage
                  id="app.include"
                  defaultMessage="include"
                /></div>
        <div className="md:w-[6.2rem]"><FormattedMessage
                  id="app.assignedto"
                  defaultMessage="assignedto"
                /></div>
                 <div className="md:w-[6.21rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        <div className="md:w-[9.2rem]"><FormattedMessage
                  id="app.completed"
                  defaultMessage="completed"
                /></div>
       
        <div className="w-12"></div>
      </div>
      <InfiniteScroll
        dataLength={callListRangeByUserId.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingCallListRangeByUserId?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      
          {callListRangeByUserId.map((item) => {
            const incdata =item.included
            const findEmp = incdata.map(item => ({
              empName: item.empName
                ? item.empName
                    .split(' ')
                    .map(word => (word ? word.charAt(0).toUpperCase() : '')) 
                    .slice(0,2)
                : ''
            }));
             return (
              <div>
            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
           >
              <div class="flex">
              <div class="flex  flex-col md:w-[8.23rem] max-sm:flex-row max-sm:justify-between w-full">
            <div> {item.callType}</div>
            </div>
            <div class="flex  flex-col md:w-[8.24rem] max-sm:flex-row max-sm:justify-between w-full">
            <p> {item.callPurpose}</p>
              </div>
              </div>
              <div class="flex md:w-[22rem]">
              <div class="flex  flex-col md:w-[7.12rem] max-sm:flex-row max-sm:justify-between w-full">
      
              <MultiAvatar2
                    primaryTitle={item.contactName}
                    // imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              
   
              </div>
              <div class="flex  flex-col justify-center md:w-[11.35rem] max-sm:flex-row max-sm:justify-between w-full">
              <p> {dayjs(item.startDate).format('YYYY-MM-DD')}</p>
              </div>
              <div class="flex  flex-col md:w-[2.2rem] max-sm:flex-row max-sm:justify-between w-full">
             
              <div>
           
              <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                    {item.included &&
                  item.included.map((candidate, i) => {
                    
                    const data1 = candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : "No data"
                    return (
                      <Tooltip title={candidate.empName} key={i}>
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                    </Tooltip>
                     

                   
                    );
                  })}
                   {/* {findEmp.map((item, index) => {
return (
  <Tooltip title={item.empName}>
  <Avatar style={{ backgroundColor: "#f56a00" }}>
              <p key={index}>{item.empName}</p>
              </Avatar>
              </Tooltip>
                     );
                   })} */}
            </Avatar.Group>
        
        
              </div>
              </div>
              </div>
              
              <div class="flex items-center md:w-[29rem]">
             <div class="flex  flex-col md:w-[8.35rem] max-sm:flex-row max-sm:justify-between w-full">
             <span>
              {item.assignedTo === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedTo === item.woner ? (
                  
                  null
                ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                )}
                </>
              )}
            </span>
              {/* <p> {item.assignedTo || "Unassigned"}</p> */}
              </div>
              <div class="flex  flex-col md:w-[8.38rem] max-sm:flex-row max-sm:justify-between w-full mt-1 mb-1">
             
             <MultiAvatar2
                   primaryTitle={item.woner}
                   //imageId={item.ownerImageId}
                   imageURL={item.imageURL}
                   imgWidth={"1.8em"}
                   imgHeight={"1.8em"}
                 />
            
             </div>
              <div class="flex  flex-col md:w-[10.35rem] max-sm:flex-row max-sm:justify-between w-full">
           
              <p> {item.completionInd ? "Yes" : "No"}</p>
              </div>
            
              
             
              <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleCallNotesDrawerModal(true);
                  handleSetCallNameId(item);
                }}
                className="!text-base cursor-pointer text-[green]"
              />
           </Tooltip>
                    </div>
                    <div>
                    <Tooltip title="Delete">
                    <DeleteOutlined  type="delete" 
                    className="!text-base cursor-pointer text-[red]"
                onClick={() => deleteCall(item.callId, employeeId)}
              />
                </Tooltip>
                    </div>
                  </div>
              </div>
            </div>
            </div>
           )
          })}
   
      </InfiniteScroll>
      </div>
      </div>
      <AddCallNotesDrawerModal
handleSetCallNameId={handleSetCallNameId}
handleCallNotesDrawerModal={props.handleCallNotesDrawerModal}
addDrawerCallNotesModal={props.addDrawerCallNotesModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>
    </>
  );
}
const mapStateToProps = ({ auth, call, employee }) => ({
  userDetails: auth.userDetails,
  fetchingCallListRangeByUserId: call.fetchingCallListRangeByUserId,
  fetchingCallListRangeByUserIdError: call.fetchingCallListRangeByUserIdError,
  callListRangeByUserId: call.callListRangeByUserId,
  addDrawerCallNotesModal:call.addDrawerCallNotesModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallListRangeByUserId,
      emptyCall,
      deleteCall,
      handleCallModal,
      setEditNote,
      getNotesListByCallId,
      handleCallNotesDrawerModal
    },
    dispatch
  );

  export default connect(mapStateToProps, mapDispatchToProps)(CallTable);





// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import moment from "moment";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { SearchOutlined } from "@ant-design/icons";
// import { Tooltip, Button, Empty, Input, Avatar } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
// import "../../../../App.css";
// import { getEmployeelist } from "../../../Employees/EmployeeAction";
// import {
//   deleteCall,
//   getCallListRangeByUserId,
//   handleCallModal,
//   setEditNote,
//   getNotesListByCallId,
// } from "../../CallAction";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
// import Highlighter from "react-highlight-words";
// import { MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";

// function CallTable(props) {
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     const {
//       getCallListRangeByUserId,
//       userDetails: { employeeId },
//     } = props;
//     getCallListRangeByUserId(employeeId, page);
//     setPage(page + 1);
//     props.getEmployeelist();
//   }, []);

//   const handleLoadMore = () => {
//     setTimeout(() => {
//       const {
//         getCallListRangeByUserId,
//         userDetails: { employeeId },
//       } = props;
//       getCallListRangeByUserId(employeeId, page);
//       setPage(page + 1);
//       props.getEmployeelist();
//     }, 100);
//   };

//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   function getColumnSearchProps(dataIndex) {
//     return {
//       filterDropdown: ({
//         setSelectedKeys,
//         selectedKeys,
//         confirm,
//         clearFilters,
//       }) => (
//         <div style={{ padding: 8 }}>
//           <Input
//             placeholder={`Search ${dataIndex}`}
//             value={selectedKeys[0]}
//             onChange={(e) =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             style={{ width: 240, marginBottom: 8, display: "block" }}
//           />

//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             //icon="search"
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//         </div>
//       ),
//       filterIcon: (filtered) => (
//         <SearchOutlined
//           type="search"
//           style={{ color: filtered ? "#1890ff" : undefined }}
//         />
//       ),
//       onFilter: (value, record) =>
//         record[dataIndex]
//           .toString()
//           .toLowerCase()
//           .includes(value.toLowerCase()),
//       onFilterDropdownVisibleChange: (visible) => {
//         if (visible) {
//         }
//       },
//       render: (text) =>
//         searchedColumn === dataIndex ? (
//           <Highlighter
//             highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//             searchWords={[searchText]}
//             autoEscape
//             textToHighlight={text.toString()}
//           />
//         ) : (
//           text
//         ),
//     };
//   }

//   function handleSearch(selectedKeys, confirm, dataIndex) {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   }

//   function handleReset(clearFilters) {
//     clearFilters();
//     setSearchText("");
//   }

//   const {
//     fetchingCallListRangeByUserId,
//     fetchingCallListRangeByUserIdError,
//     callListRangeByUserId,
//     deleteCall,
//     userDetails: { employeeId },
//     setEditNote,
//   } = props;
//   const assignToTypeOption = props.employees.map((item) => {
//     return {
//       text: item.assignToName,
//       value: item.assignToName,
//     };
//   });
//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },
//     {
//       // title: "Type",
//       title: <FormattedMessage id="app.type" defaultMessage="Type" />,
//       dataIndex: "callType",
//       width: "10%",
//       render: (name, item, i) => {
//         console.log(item);
//         return (
//           <span>
//             {item.callType === "Inbound" && (
//               <Tooltip title="Inbound">
//                 <span>
//                   <i className="fas fa-sign-in-alt"></i>
//                 </span>
//               </Tooltip>
//             )}
//             {item.callType === "Outbound" && (
//               <Tooltip title="Outbound">
//                 <span>
//                   <i className="fas fa-sign-out-alt"></i>
//                 </span>
//               </Tooltip>
//             )}
//             {item.callType === "Conference" && (
//               <Tooltip title="Conference">
//                 <span>
//                   <i className="fas fa-network-wired"></i>
//                 </span>
//               </Tooltip>
//             )}
//           </span>
//         );
//       },
//       onFilter: (value, record) => record.callType.indexOf(value) === 0,
//       sorter: (a, b) => a.callType > b.callType,
//     },
//     {
//       title: <FormattedMessage id="app.subject" defaultMessage="Subject" />,
//       dataIndex: "callPurpose",
//       width: "10%",
//       render: (name, item, i) => {
//         return <span>{` ${item.callPurpose}`}</span>;
//       },
//       onFilter: (value, record) => record.callPurpose.indexOf(value) === 0,
//       sorter: (a, b) =>
//         a.callPurpose &&
//         a.callPurpose.toLowerCase() > b.callPurpose &&
//         b.callPurpose.toLowerCase()
//           ? 1
//           : -1,
//     },
//     {
//       // title: "Contact",
//       title: <FormattedMessage id="app.contact" defaultMessage="Contact" />,
//       dataIndex: "contactName",
//       width: "10%",
//       defaultSortOrder: "descend",
//       ...getColumnSearchProps("contactName"),
//       render: (name, item, i) => {
//         return (
//           <>
//             {/* <Tooltip title={item.contactName}> */}
//             <span>
//               {item.contactName === null ? (
//                 ""
//               ) : (
//                 <MultiAvatar2
//                   primaryTitle={item.contactName}
//                   imageId={item.ownerImageId}
//                   imageURL={item.imageURL}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
//               )}
//             </span>
//             {/* </Tooltip> */}
//           </>
//         );
//       },
//     },
//     {
//       // title: "Start",
//       title: <FormattedMessage id="app.datetime" defaultMessage="Date" />,
//       dataIndex: "startDate",
//       width: "13%",
//       defaultSortOrder: "descend",
//       render: (text, item) => {
//         const startDate = moment(item.startDate).format("LLL");
//         return <span>{startDate}</span>;
//       },
//     },
//     {
//       title: <FormattedMessage id="app.team" defaultMessage="Team" />,
//       dataIndex: "candidateName",
//       width: "10%",
//       ...getColumnSearchProps("candidateName"),
//     },
//     {
//       title: <FormattedMessage id="app.included" defaultMessage="Included" />,
//       dataIndex: "included",
//       width: "10%",
//       render: (name, item, i) => {
//         return {
//           children: (
//             <>
//               <Avatar.Group
//                 maxCount={2}
//                 maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
//               >
//                 {item.included &&
//                   item.included.map((candidate, i) => {
//                     const data1 = candidate.fullName.split("")[0].toUpperCase();
//                     console.log("datas", data1);
//                     return (
//                       <Tooltip title={candidate.fullName}>
//                         <Avatar style={{ backgroundColor: "#f56a00",fontFamily:"poppins" }}>
//                           {data1}
//                         </Avatar>
//                       </Tooltip>
//                     );
//                   })}
//               </Avatar.Group>
//             </>
//           ),
//         };
//       },
//     },
//     {
//       title: "",
//       dataIndex: "completionInd",
//       width: "3%",
//       render: (text, item) => {
//         return (
//           <>
//             {item.completionInd === false ? (
//               <CheckCircleOutlineIcon
//                 style={{
//                   color: "#eeeedd",
//                   fontSize: "1.5em",
//                 }}
//               />
//             ) : (
//               <span>
//                 <CheckCircleOutlineIcon
//                   style={{ color: "#67d239", fontSize: "1.5em" }}
//                 />
//               </span>
//             )}
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "rating",
//       width: "5%",
//       render: (name, item, i) => {
//         return (
//           <>
//             {item.rating === 0 ? (
//               <StarBorderIcon style={{ color: "#eeeedd", fontSize: "1.5em" }} />
//             ) : (
//               <span>
//                 {item.rating}
//                 {
//                   <StarBorderIcon
//                     style={{ color: "#FFD700", fontSize: "1.5em" }}
//                   />
//                 }
//               </span>
//             )}
//           </>
//         );
//       },
//     },
//     {
//       title: (
//         <FormattedMessage id="app.assignedTo" defaultMessage="Assigned To" />
//       ),
//       dataIndex: "assignedTo",
//       width: "10%",
//       filters: assignToTypeOption,
//       onFilter: (value, record) => {
//         return record.assignedTo === value;
//       },
//       render: (name, item, i) => {
//         return (
//           // <Tooltip title={item.assignedTo}>
//           <SubTitle>
//             <span>
//               {item.assignedTo === null ? (
//                 ""
//               ) : (
//                 <MultiAvatar2
//                   primaryTitle={item.assignedTo}
//                   imageId={item.imageId}
//                   imageURL={item.imageURL}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
//               )}
//             </span>
//           </SubTitle>
//           // </Tooltip>
//         );
//       },
//     },
//     {
//       title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
//       dataIndex: "woner",
//       width: "10%",
//       render: (name, item, i) => {
//         return (
//           <>
//             <span>
//               <MultiAvatar2
//                 primaryTitle={item.woner}
//                 imageId={item.ownerImageId}
//                 imageURL={item.imageURL}
//                 imgWidth={"1.8em"}
//                 imgHeight={"1.8em"}
//               />
//             </span>
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "callId",
//       render: (name, item, i) => {
//         return (
//           <StyledPopconfirm
//             title={
//               <FormattedMessage
//                 id="app.doyouwanttodelete?"
//                 defaultMessage="Do you want to delete?"
//               />
//             }
//             onConfirm={() => deleteCall(item.callId, employeeId)}
//           >
//             <DeleteIcon
//               type="delete"
//               style={{ cursor: "pointer", color: "red", fontSize: "0.8rem" }}
//             />
//           </StyledPopconfirm>
//         );
//       },
//     },
//   ];

//   if (fetchingCallListRangeByUserIdError) {
//     return <APIFailed />;
//   }
//   const tab = document.querySelector(".ant-layout-sider-children");
//   const tableHeight = tab && tab.offsetHeight * 0.75;
//   return (
//     <>
//       <InfiniteScroll
//         dataLength={callListRangeByUserId.length}
//         next={handleLoadMore}
//         hasMore={true}
//         endMessage={
//           <p style={{ textAlign: "center" }}>
//             <b>Yay! You have seen it all</b>
//           </p>
//         }
//         height={600}
//       >
//         <StyledTable
//           rowKey="callId"
//           columns={columns}
//           dataSource={callListRangeByUserId}
//           loading={
//             fetchingCallListRangeByUserId || fetchingCallListRangeByUserIdError
//           }
//           pagination={false}
//           expandedRowRender={(record) => {
//             return (
//               <>
//                 <p>{record.callDescription || ""}</p>
//               </>
//             );
//           }}
//           locale={{
//             emptyText: (
//               <Empty
//                 description={
//                   <NoDataComponent
//                     description="No calls "
//                     buttonText="Create call"
//                     onClick={() => props.handleCallModal(true)}
//                   />
//                 }
//               />
//             ),
//           }}
//         />
//       </InfiniteScroll>
//     </>
//   );
// }

// const mapStateToProps = ({ auth, call, employee }) => ({
//   userDetails: auth.userDetails,
//   fetchingCallListRangeByUserId: call.fetchingCallListRangeByUserId,
//   fetchingCallListRangeByUserIdError: call.fetchingCallListRangeByUserIdError,
//   callListRangeByUserId: call.callListRangeByUserId,
//   employees: employee.employees,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getCallListRangeByUserId,
//       deleteCall,
//       handleCallModal,
//       setEditNote,
//       getNotesListByCallId,
//       getEmployeelist,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(CallTable);

// function NoDataComponent(props) {
//   const { description, onClick, buttonText } = props;
//   return (
//     <div>
//       <div class=" flex justify-center items-center flex-col">
//         <p>{description || "We couldn't find relevant data"}</p>
//       </div>
//     </div>
//   );
// }




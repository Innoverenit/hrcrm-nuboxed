// // import React, { Component } from 'react'

// // export class ProspectQuotationSectorListData extends Component {
// //   render() {
// //     return (
// //       <div>ProspectQuotationSectorListData</div>
// //     )
// //   }
// // }

// // export default ProspectQuotationSectorListData




// import React, { useEffect,useState,lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import Highlighter from "react-highlight-words";
// import { Link } from 'react-router-dom';
// import dayjs from "dayjs";
// import InfoIcon from '@mui/icons-material/Info';
// import {
//   MultiAvatar,
// } from "../../Components/UI/Elements";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import {
//   SearchOutlined,
// } from "@ant-design/icons";
// import {getProspectSectorOpenData} from "./DataRoomAction"
// import { CurrencySymbol } from "../../Components/Common";

// import { Tooltip,Button,Input,Progress } from "antd";
// import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
// import { BundleLoader } from "../../Components/Placeholder";
// //const AddCustomerUpdateOpportunityModal =lazy(()=>import("../Customer/Child/CustomerDetail/CustomerTab/OpportunityTab/AddCustomerUpdateOpportunityModal")); 
// function ProspectQuotationSectorListData(props) {
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   console.log(props.selectedPersonData)
//   useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         const itemsToTranslate = [
//               "213",  //  "Quotation",//0
//               "176", //   "Start Date",//1
//               "126",   //   "End Date",//2      
//               "218", //   "Value",//3
//               "142",//   "Status",//4
//               "216",  //   "Sponsor",//5
//                   "1305",    // Search
//                   "1307",  // Reset
//                   "1306",      // Filter
//         ];

//         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
//         setTranslatedMenuItems(translations);
//       } catch (error) {
//         console.error('Error translating menu items:', error);
//       }
//     };

//     fetchMenuTranslations();
//   }, [props.selectedLanguage]);
//   useEffect(() => {
//     if(props.selectedPropsectSector){
//         setPage(page + 1);
//     props.getProspectSectorOpenData(
//         // props.customer.customerId
//     props.selectedPropsectSector.sectorId,page
//     );
// }
//   }, [props.selectedPropsectSector]);
//   const handleLoadMore = () => {
//     const callPageMapd = props.prospectSectorOpen && props.prospectSectorOpen.length &&props.prospectSectorOpen[0].pageCount
//     setTimeout(() => {  
//       if  (props.prospectSectorOpen)
//       {
//         if (page < callPageMapd) {    
//     setPage(page + 1);
//     props.getProspectSectorOpenData( props.selectedPropsectSector.sectorId,page);
//             }
//               if (page === callPageMapd){
//                 setHasMore(false)
//               }
//             }
//             }, 100);
//   }
// //   console.log(props.selectedPersonData.name);
//   const [currentOpportunityId, setCurrentOpportunityId] = useState("");

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
//         <div className="p-8">
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
//             // icon="search"
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//           {translatedMenuItems[6]}  {/* Search */}
//           </Button>
//           <Button className="w-[90%]"
//             onClick={() => handleReset(clearFilters)}
//             size="small"
            
//           >
//           {translatedMenuItems[7]}  {/* Reset */}
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
//             {translatedMenuItems[8]}{/* Filter */}
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
//           ? record[dataIndex]
//               .toString()
//               .toLowerCase()
//               .includes(value.toLowerCase())
//           : "",
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
//             textToHighlight={text ? text.toString() : ""}
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
  
//   function handleSetCurrentOpportunityId(opportunityId) {
//     setCurrentOpportunityId(opportunityId);
//     console.log(opportunityId);
//   }
//   const {
//     // customer: { customerId, name },
//     user,
//     handleUpdateCustomerOpportunityModal,
//     fetchingCustomerOpportunity,
//     opportunityByCustomerId,
//     fetchingCustomerOpportunityError,
//     addUpdateCustomerOpportunityModal,
//     setEditCustomerOpportunity,
//   } = props;

// if (props.fetchingProspectSectorOpen) return <BundleLoader/>;
//   const tab = document.querySelector(".ant-layout-sider-children");
//     const tableHeight = tab && tab.offsetHeight * 0.75;
//   return (
//     <>
//    {/* <div className=' flex rounded w-[15%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '> */}
     
//    <div className="flex flex-wrap"> {/* Parent container with flex layout */}
//   {props.prospectSectorOpen.length===0?<NodataFoundPage/>:props.prospectSectorOpen.map((item) => {
//     return (
//       <div className="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
//                       text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100 
//                       border-solid p-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" 
//            style={{ display: "flex" }}>
//         <div className="flex items-center h-16">
//           <div className="flex basis-[15%] mr-[0.2rem] h-15">
//             <MultiAvatar
//               primaryTitle={item.opportunityName}
//               imgWidth={"1.8rem"}
//               imgHeight={"1.8rem"}
//             />
//           </div>
//           <div className="flex basis-[100%] overflow-hidden">
//             <div className="font-semibold text-[#337df4] cursor-pointer text-xs">
//               {item.opportunityName}
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col max-sm:justify-between">
//           <div className="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
//             {item.customer}
//           </div>
//           <div className="font-medium text-xs">
//             <div className="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center"></div>
//           </div>
//         </div>
//       </div>
//     );
//   })}
// </div>

      
//         {/* </div> */}
//     </>
//   );
// }
// // }
// const mapStateToProps = ({ customer,auth,datRoom }) => ({
//   user: auth.userDetails,
//   prospectSectorOpen:datRoom.prospectSectorOpen,
//   fetchingProspectSectorOpen:datRoom.fetchingProspectSectorOpen,
//   fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
//   fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
//   //customerId: customer.customer.customerId,
//   opportunityByCustomerId: customer.opportunityByCustomerId,
//   addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
  
//         getProspectSectorOpenData,
     
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(ProspectQuotationSectorListData);





// import React, { useEffect,useState,lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import Highlighter from "react-highlight-words";
// import { Link } from 'react-router-dom';
// import dayjs from "dayjs";
// import InfoIcon from '@mui/icons-material/Info';
// import {
//   MultiAvatar,
// } from "../../Components/UI/Elements";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import {
//   SearchOutlined,
// } from "@ant-design/icons";
// import {getProspectOppOpenTask} from "./DataRoomAction"
// import { CurrencySymbol } from "../../Components/Common";
// import { getOpportunityListByCustomerId,handleUpdateCustomerOpportunityModal,
//   setEditCustomerOpportunity} from "../Customer/CustomerAction";
// import { Tooltip,Button,Input,Progress } from "antd";
// import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
// import { BundleLoader } from "../../Components/Placeholder";
// const AddCustomerUpdateOpportunityModal =lazy(()=>import("../Customer/Child/CustomerDetail/CustomerTab/OpportunityTab/AddCustomerUpdateOpportunityModal")); 
// function ProspectQuotationListData(props) {
//   const [loading, setLoading] = useState(true);
//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   console.log(props.selectedPersonData)
//   useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         const itemsToTranslate = [
//               "213",  //  "Quotation",//0
//               "176", //   "Start Date",//1
//               "126",   //   "End Date",//2      
//               "218", //   "Value",//3
//               "142",//   "Status",//4
//               "216",  //   "Sponsor",//5
//                   "1305",    // Search
//                   "1307",  // Reset
//                   "1306",      // Filter
//         ];

//         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
//         setTranslatedMenuItems(translations);
//       } catch (error) {
//         console.error('Error translating menu items:', error);
//       }
//     };

//     fetchMenuTranslations();
//   }, [props.selectedLanguage]);
//   useEffect(() => {
//     if(props.selectedPersonData){
//     props.getProspectOppOpenTask(
//         // props.customer.customerId
//         props.selectedPersonData.customerId
//     );
// }
//   }, [props.selectedPersonData]);
//   console.log(props.selectedPersonData.name);
//   const [currentOpportunityId, setCurrentOpportunityId] = useState("");

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
//         <div className="p-8">
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
//             // icon="search"
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//           {translatedMenuItems[6]}  {/* Search */}
//           </Button>
//           <Button className="w-[90%]"
//             onClick={() => handleReset(clearFilters)}
//             size="small"
            
//           >
//           {translatedMenuItems[7]}  {/* Reset */}
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
//             {translatedMenuItems[8]}{/* Filter */}
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
//           ? record[dataIndex]
//               .toString()
//               .toLowerCase()
//               .includes(value.toLowerCase())
//           : "",
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
//             textToHighlight={text ? text.toString() : ""}
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
  
//   function handleSetCurrentOpportunityId(opportunityId) {
//     setCurrentOpportunityId(opportunityId);
//     console.log(opportunityId);
//   }
//   const {
//     // customer: { customerId, name },
//     user,
//     handleUpdateCustomerOpportunityModal,
//     fetchingCustomerOpportunity,
//     opportunityByCustomerId,
//     fetchingCustomerOpportunityError,
//     addUpdateCustomerOpportunityModal,
//     setEditCustomerOpportunity,
//   } = props;

// if (props.fetchingProspectOppOpenTask) return <BundleLoader/>;
//   const tab = document.querySelector(".ant-layout-sider-children");
//     const tableHeight = tab && tab.offsetHeight * 0.75;
//   return (
//     <>
//    {/* <div className=' flex rounded w-[15%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '> */}
     
//    <div className="flex flex-wrap"> {/* Parent container with flex layout */}
//   {props.prospectOppOpenTask.map((item) => {
//     return (
//       <div className="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
//                       text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100 
//                       border-solid p-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" 
//            style={{ display: "flex" }}>
//         <div className="flex items-center h-16">
//           <div className="flex basis-[15%] mr-[0.2rem] h-15">
//             <MultiAvatar
//               primaryTitle={item.opportunityName}
//               imgWidth={"1.8rem"}
//               imgHeight={"1.8rem"}
//             />
//           </div>
//           <div className="flex basis-[100%] overflow-hidden">
//             <div className="font-semibold text-[#337df4] cursor-pointer text-xs">
//               {item.opportunityName}
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col max-sm:justify-between">
//           <div className="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
//             {item.customer}
//           </div>
//           <div className="font-medium text-xs">
//             <div className="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center"></div>
//           </div>
//         </div>
//       </div>
//     );
//   })}
// </div>

      
//         {/* </div> */}
//     </>
//   );
// }
// // }
// const mapStateToProps = ({ customer,auth,datRoom }) => ({
//   user: auth.userDetails,
//   prospectOppOpenTask:datRoom.prospectOppOpenTask,
//   fetchingProspectOppOpenTask:datRoom.fetchingProspectOppOpenTask,
//   fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
//   fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
//   //customerId: customer.customer.customerId,
//   opportunityByCustomerId: customer.opportunityByCustomerId,
//   addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getProspectOppOpenTask,
//       handleUpdateCustomerOpportunityModal,
//       setEditCustomerOpportunity,
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(ProspectQuotationListData);







import React, { useEffect, useMemo, useState, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import StageColumns1  from "../../Containers/Opportunity/Child/StageColumns1"
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StyledTabs, } from "../../Components/UI/Antd";
import { MainWrapper } from "../../Components/UI/Layout";
import {
    getProcessForOpportunity,
    getProcessStagesForOpportunity,
} from "../../Containers/Settings/SettingsAction";
import {getProspectSourceOpenData,updateOpportunitydragstage} from "./DataRoomAction"
//import {getAllOpportunityListByUserId,updateOpportunitydragstage,emptyOpportunity} from "../OpportunityAction"
import { Spin} from "antd";
const TabPane = StyledTabs.TabPane;


const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  position: absolute;
height:26rem;
  // overflow-x: auto;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StageColumn = styled.div`
  background-color: whitesmoke;
  color: ${(props) => props.theme.color};
  float: left;
  overflow-x: scroll;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 26rem;
  width: 250px;
  margin-top: 3.75em;
  overflow-y: auto;
  border-right: 0.06em solid #d2cfcf;
  /* background-color: ${(props) => props.theme.applicationBackground}; */
  /* color: ${(props) => props.theme.color}; */
  /* min-height: 43.12em; */
`;


const StageHeader = styled.div`
  background-color: rgb(14, 149, 144);
  color: white;
  font-size: 0.93em;
  width: 250px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.06em solid ${(props) => props.theme.backgroundColor};
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;


function ProspectSourceListData(props) {
  const { udatingOpp } = props;

  const processData = useMemo(() => {
    if (!props.opportunityProcess) return null;

    const publishIndTrueItem = props.opportunityProcess.find(item => item.publishInd === true);
console.log("publishIndTrueItem",publishIndTrueItem)
    return publishIndTrueItem ? publishIndTrueItem : null;
}, [props.opportunityProcess]);

let type="Quotation"
console.log(props.selectedPropsectSource)

  useEffect(() => {
    if(props.selectedPropsectSource){
    props.getProcessForOpportunity(props.orgId,type);
     props.getProspectSourceOpenData( props.selectedPropsectSource.sourceId)
    }
  }, [props.selectedPropsectSource]);

  useEffect(() => {
    if (!processData) return;
    console.log("processData",processData)
    props.getProcessStagesForOpportunity(props.orgId,processData.workflowDetailsId);
  }, [processData]);   

  const [isDragging, setIsDragging] = useState(false);
  const [currentProcess, setCurrentProcess] = useState({});

  function onDragEnd(result) {
    console.log(result);
    setIsDragging(false);

    if (!navigator.onLine) {
      return;
    }

    if (!result.destination) {
      return;
    }

    const { draggableId, destination, source } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const {
      updateOpportunitydragstage,

    } = props;
    let data={
      opportunityStagesId:destination.droppableId,
      opportunityId:result.draggableId,
    }
    updateOpportunitydragstage(data,
      source.droppableId,
      destination.droppableId,
      draggableId,

    );
  }

  function dragStart() {
    setIsDragging(true);
  }
  function dragUpdate() {
    setIsDragging(false);
  }


  function handleProcessClick(item) {
    setCurrentProcess(item);
    props.getProcessStagesForOpportunity(props.orgId,item.workflowDetailsId);
  }

  return (
    <div class=" flex flex-no-wrap" >
      <MainWrapper
        style={{
          width: "100%",
          color: "#FFFAFA",
          height: "100vh",
        }}
      >
        <div class="flex" >
          <StyledTabs type="card">
            {props.opportunityProcess
    .filter(item => item.publishInd === true)
    .map((item, i) => {
              return (
                <TabPane
                  key={i}
                  tab={
                    <span onClick={() => handleProcessClick(item)}>
                      {item.workflowName}
                      
                    </span>
                  }
                ></TabPane>
              );
            })}
          </StyledTabs>
        </div>

        <div class="flex flex-no-wrap justify-center" >
              <DragDropContext
                 onDragEnd={onDragEnd}
                type="stage"
                 onDragStart={dragStart}
              >
                <Container style={{ marginTop: "0.75em",width:"78em" }}>
                  <>
                    {props.opportunityProcessStages &&props.opportunityProcessStages
                      
                     
                      .map((stage, index) => (
                        <Droppable
                          key={index}
                          droppableId={stage.stagesId}
                          type="stage"
                        
                        >
                          {(provided, snapshot) => (
                            <>
                            
                            <div class=" flex"
                                >
                                  <StageHeader style={{ position: "absolute" }}>
                                    <div>{stage.stageName}</div>
                                    <div>
                                    </div>
                                  </StageHeader>
                                  <Spin
                                    tip="Loading..."
                                    spinning={udatingOpp ? true : false}
                                  >
                                    <StageColumn
                                      ref={provided.innerRef}
                                      isDraggingOver={snapshot.isDraggingOver}
                                      {...provided.droppableProps}
                                      droppableProps={{ hello: "world" }}
                                      className="scrollbar"
                                      id="style-3"
                                      style={{scrollbarWidth:"thin"}}
                                    >
                                      {props.prospectSourceOpen
                                        .filter(
                                          (opp, index) =>
                                            opp.opportunityStagesId === stage.stagesId
                                        )
                                        .map((opp, index) => {
                                          return (
                                            <StageColumns1
                                              key={index}
                                              opportunity={opp}
                                              index={index}
                                              history={props.history}
                                            />
                                          );
                                        })}
                                         {props.prospectSourceOpen.length === 0 && (
    <div className="loader-container">
      <Spin/>
    </div>
  )}
                                    </StageColumn>
                                  </Spin>
                                </div>
                              
                            </>
                          )}
                        </Droppable>
                      ))}
                  </>
                </Container>
              </DragDropContext>
            </div>
      </MainWrapper>
    </div>
  );
}

const mapStateToProps = ({
  opportunity,
  datRoom,
  auth,
  settings,
  
}) => ({
    opportunityProcess: settings.opportunityProcess,
    orgId: auth.userDetails && auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
   prospectSourceOpen:datRoom.prospectSourceOpen,
   opportunityByUserId:opportunity.opportunityByUserId,
opportunityProcessStages: settings.opportunityProcessStages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProcessForOpportunity,
        getProcessStagesForOpportunity,
        
        updateOpportunitydragstage,
        getProspectSourceOpenData
        // getAllOpportunityListByUserId,
        // emptyOpportunity,
        // updateOpportunitydragstage
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProspectSourceListData)
);




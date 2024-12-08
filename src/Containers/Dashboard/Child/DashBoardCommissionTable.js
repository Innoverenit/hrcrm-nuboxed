
 import React, { useEffect, useState } from "react";
 import { connect } from "react-redux";
 import { bindActionCreators } from "redux";
 
 import { Tooltip, Icon,Input,Button, Table,  InputNumber, Popconfirm, Form, Typography  } from "antd";
 import Highlighter from 'react-highlight-words';
 import { CurrencySymbol } from "../../../Components/Common";
 import dayjs from "dayjs";
 import { StyledTable, StyledPopconfirm } from "../../../Components/UI/Antd";
 import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
 import { BundleLoader } from "../../../Components/Placeholder";
 import {
   getDashBoardCommissionTable,
  
 } from "../DashboardAction";
 // import OpportunityDetailView from "./OpportunityDetailView";
 // import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
 import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { dashboardReducer } from "../DashboardReducer";
import SearchIcon from '@mui/icons-material/Search';;
 
 function onChange(pagination, filters, sorter) {
   console.log("params", pagination, filters, sorter);
 }
 
 
 
 function DashBoardCommissionTable(props) {
    // useEffect(() => {
    //    props.getDashBoardCommissionTable()      
    //   }, []);

   const [currentOpportunityId, setCurrentOpportunityId] = useState("");
 
 
   function handleSetCurrentOpportunityId(opportunityId) {
     setCurrentOpportunityId(opportunityId);
     console.log(opportunityId);
   }
  
 
   const [searchText, setSearchText] = useState("");
   const [searchedColumn, setSearchedColumn] = useState("");
 
   function getColumnSearchProps(dataIndex) {
     return {
       filterDropdown: ({
         setSelectedKeys,
         selectedKeys,
         confirm,
         clearFilters,
       }) => (
         <div style={{ padding: 8 }}>
           <Input
             // ref={node => {
             //   this.searchInput = node;
             // }}
             placeholder={`Search ${dataIndex}`}
             value={selectedKeys[0]}
             onChange={(e) =>
               setSelectedKeys(e.target.value ? [e.target.value] : [])
             }
             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
             style={{ width: 240, marginBottom: 8, display: "block" }}
           />
           
             <Button
               type="primary"
               onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchIcon />}
               //icon="search"
               size="small"
               style={{ width: 90 }}
             >
               Search
             </Button>
             <Button
               onClick={() => handleReset(clearFilters)}
               size="small"
               style={{ width: 90 }}
             >
               Reset
             </Button>
             <Button
               type="link"
               size="small"
               onClick={() => {
                 confirm({ closeDropdown: false });
                 setSearchText(selectedKeys[0]);
                 setSearchedColumn(dataIndex);
               }}
             >
               Filter
             </Button>
           
         </div>
       ),
       filterIcon: (filtered) => (
         // <SearchIcon style={{ color: filtered ? "#1890ff" : undefined }} />
         <SearchIcon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
       ),
       onFilter: (value, record) =>
         record[dataIndex]
         ? record[dataIndex]
           .toString()
           .toLowerCase()
           .includes(value.toLowerCase()) : "",
       onFilterDropdownVisibleChange: (visible) => {
         if (visible) {
           // setTimeout(() => this.searchInput.select());
         }
       },
       render: (text) =>
         searchedColumn === dataIndex ? (
           <Highlighter
             highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
             searchWords={[searchText]}
             autoEscape
             textToHighlight={text ? text.toString(): ""}
           />
         ) : (
           text
         ),
     };
   }
 
   function handleSearch(selectedKeys, confirm, dataIndex) {
     confirm();
     setSearchText(selectedKeys[0]);
     setSearchedColumn(dataIndex);
   }
 
   function handleReset(clearFilters) {
     clearFilters();
     setSearchText("");
   }
 //   const {
 //     fetchingOpportunity,
 //     fetchingRecruiterList,
 //     fetchingRecruiterListError,
 //     user,
 //     fetchingOpportunityError,
 //     opportunityByUserId,
 //     recruiterList,
 //     handleUpdateOpportunityModal,
 //     updateOpportunityModal,
 //     deleteOpportunityData,
 //      data,
 //   } = props;
   // if (fetchingOpportunity) {
   //   return <BundleLoader />;
   // }
   const columns = [
     {
       title: "",
       width: "2%",
     },
 
     {
       //title: "Name",
       title: "Month(Year)"
      
     ,
       width:"14%",
 
       dataIndex: "requirement",
    
     },
     {
       //title: "Currency",
       title:"Amount"
      ,
 
       dataIndex: "jobId",
     //   ...getColumnSearchProps('customer'),
        width: "13%",
     },
     {
        //title: "Currency",
        title: "Highest Onboarded"
      ,
  
        dataIndex: "sponsor",
      //   ...getColumnSearchProps('customer'),
         width: "10%",
      },
    
 ];
 //   if (fetchingOpportunityError) {
 //     return <APIFailed />;
 //   }
 
   const tab = document.querySelector(".ant-layout-sider-children");
   const tableHeight = tab && tab.offsetHeight - 100;
 
   
 
   return (
     <>
       <StyledTable
         // rowSelection={rowSelection}
         
         // bordered
         rowKey="opportunityId"
         columns={columns}
         // dataSource={
         //   user.department === "Recruiter"
         //   ? recruiterList
         //   : opportunityByUserId
         // }
         onChange={onChange}
         // Loading={fetchingOpportunity || fetchingOpportunityError}
         // pagination={{
         //   defaultPageSize: 10,
         // }}
         // scroll={{ y: 460 }}
         
         // pagination={false
         //   // defaultPageSize: 15,
         //   // showSizeChanger: true,
         //   // pageSizeOptions: ["15", "25", "40", "50"],
         // }
 
         scroll={{ y: tableHeight }}
        
         pagination={false}
       />
       
 
       {/* <UpdateOpportunityModal
         opportunityId={currentOpportunityId}
         updateOpportunityModal={updateOpportunityModal}
         handleUpdateOpportunityModal={handleUpdateOpportunityModal}
         handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
       /> */}
     </>
   );
 }
 
 // }
 const mapStateToProps = ({ auth, account, opportunity,dashboard }) => ({
 //   userId: auth.userDetails.userId,
 //   user: auth.userDetails,
 //   role: auth.userDetails.role,
 //   recruiterList:opportunity.recruiterList,
 //   fetchingRecruiterList:opportunity.fetchingRecruiterList,
 //   fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
 //   fetchingOpportunity: opportunity.fetchingOpportunity,
 //   fetchingOpportunityError: opportunity.fetchingOpportunityError,
 //   opportunityByUserId: opportunity.opportunityByUserId,
 //   updateOpportunityModal: opportunity.updateOpportunityModal,
 //   recruiterId:auth.userDetails.userId,
 //tableDashboard2:dashboard.tableDashboard2
 });
 const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
     {
     //   getOpportunityListByUserId,
     //getDashBoardCommissionTable
     //   getRecruiterList,
     //   handleUpdateOpportunityModal,
     //   setEditOpportunity,
     //   deleteOpportunityData,
     },
     dispatch
   );
 export default connect(mapStateToProps, mapDispatchToProps)(DashBoardCommissionTable);
 
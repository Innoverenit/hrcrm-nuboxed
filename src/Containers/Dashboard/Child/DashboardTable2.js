



 import React, { useEffect, useState,lazy } from "react";
 import { connect } from "react-redux";
 import { bindActionCreators } from "redux";
 import { FormattedMessage } from "react-intl";
 import { Suspense } from "react";
 import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
 import { Tooltip,Input,Button,Badge, } from "antd";
 import Highlighter from 'react-highlight-words';
 import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
 import { StyledTable, } from "../../../Components/UI/Antd";
 import {
   getDashboardTable2,
   handleAddJobDetailtModal
  
 } from "../DashboardAction";
 import dayjs from "dayjs";
 import SchoolIcon from '@mui/icons-material/School';
 import AccountBoxIcon from '@mui/icons-material/AccountBox';
 import {getCandidateRequirement} from "../../Opportunity/OpportunityAction"
import { SearchOutlined } from "@ant-design/icons";
const AddJobDetailModal = lazy(() => import("../Child/AddJobDetailModal"));
 
 function onChange(pagination, filters, sorter) {
   console.log("params", pagination, filters, sorter);
 }
 
 
 
 function DashboardTable2(props) {
  useEffect(() => {
   
    props.getDashboardTable2(props.orgId);
   
    //props.getOpportunitySKill()   
  }, []);
 
 
  
 
   
   const [currentprocessName, setCurrentprocessName] = useState("");
 
 
   function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
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
               icon={<SearchOutlined />}
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
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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

  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      //title: "Currency",
      title: <FormattedMessage
        id="app.jobId"
        defaultMessage="Job ID"
      />,
     dataIndex: "jobOrder",
      width: "13%",
      ...getColumnSearchProps('jobOrder'),
      render: (name, item, i) => {
       return {
         props: {
         },
         children: (
           <>
             <Badge count={item.number} style={{ right: "1px" }}>
               <span   
                onClick={() => {
                  props.handleAddJobDetailtModal(true);
                  props.getCandidateRequirement(item.recruitmentId);
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                style={{
                  cursor: "pointer",
                  color: "#042E8A",
                }}          
               >

                 {`${item.jobOrder} `} &nbsp;


               </span>
             </Badge>
           </>
         ),
       };
      
     },
  
    },
    {
     title: <FormattedMessage
       id="app.customer"
       defaultMessage="Customer"
     />,
     dataIndex: "customerName",
     ...getColumnSearchProps('customerName'),
      width: "16%",
   },
    {
       title: <FormattedMessage
         id="app.sponsor"
         defaultMessage="Sponsor"
       />,
 
       dataIndex: "sponserName",
       ...getColumnSearchProps('sponserName'),
        width: "12%",
     },
     {
      title:"Ageing",
 
       // dataIndex: "sponserName",
       // ...getColumnSearchProps('sponserName'),
        width: "10%",
     },
   {
     title: <FormattedMessage
       id="app.created"
       defaultMessage="Created"
     />,

     dataIndex: "creationDate",
     sorter: (a, b) => {
       var nameA = a.creationDate; // ignore upper and lowercase
       var nameB = b.creationDate; // ignore upper and lowercase
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }

       return 0;
     },
      width: "10%",
      render: (text, item) => {
       const creationDate = dayjs(item.creationDate).format("DD/MM/YYYY");
       return <>
       {item.creationDate === null ? "None" :
         <span>
           {dayjs(item.creationDate).format("DD/MM/YYYY")}
         </span>
       }
     </>
     },
   },
   {
     width: "4%",

render: (name, item, i) => {   
   console.log(item.offered);
 return {
   props: {
   
   },
   children: (
     <>
     <Tooltip 
     title={<FormattedMessage
      id="app.submitted"
      defaultMessage="Submitted"
    />}
     >
     <Badge count={item.offered}  style={{ right: "1px" }}>
   <span
     style={{
       cursor: "pointer",
       fontSize: "1.3em",
       color:"black"
     }}
   >
     <ArrowUpwardIcon 
      />
    </span>
    </Badge>
    </Tooltip>
     </>
   )
 }   
},
},
 {
   width: "4%",

render: (name, item, i) => {   
 console.log(item.rejected);
return {
 props: {
 
 },
 children: (
   <>
   <Tooltip 
    title={<FormattedMessage
      id="app.dropped"
      defaultMessage="Dropped"
    />}
  >
   <Badge count={item.rejected}  style={{ right: "1px" }}>
 <span
   style={{
     cursor: "pointer",
     fontSize: "1.3em",
     color:"#e50b0b99"
   }}
 >
         <ArrowCircleDownIcon 
 />
  </span>
  </Badge>
  </Tooltip>
   </>
 )
} 
},
},
{
     title: <FormattedMessage
       id="app.progress"
       defaultMessage="Progress"
     />,
     dataIndex: "selectedCandidate",
     width: "15%",
     
     render: (name, item, i) => {        
       return (
         <div class=" flex justify-start mt-[0.42rem]" >
         {item.stageList&&item.stageList.map((data)=>{
           return(
             <>
              <div>
              <Tooltip
                   title={data.stageName}
               >
               <Badge count={data.candidateNo} style={{ right: "1px" }}>  
              
               <svg
               
                   width="20"
                   height="20"
                   xmlns="http://www.w3.org/2000/svg"
                 vertical-align="-webkit-baseline-middle" 
               >
                    <g>
                       <title>ram</title>
                       <rect
                           fill="#fff"
                           id="canvas_background"
                           height="19"    
                       width="23"
                       y="-1"
                       x="-1"
                       />
                       <g
                           display="none"
                           overflow="visible"
                           y="0"
                           x="0"
                           height="100%"
                           width="100%"
                           id="canvasGrid"
                       >
                           <rect
                               fill="url(#02D1A5)"
                               stroke-width="0"
                               y="0"
                               x="0"
                               height="100%"
                               width="100%"
                           />
                       </g>
                   </g>
                   <g>
                   <title>{item.candidateNo}</title>
                       <path
                           id="svg_1"
                           d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
                           stroke-width="0.5"
                           stroke="#000"
                           // value={item.candidateNo}
                           fill="#3a855b"
                       />
                   </g>
               </svg>
               </Badge>
               </Tooltip>
           </div>
             </>
           )
         })}
         </div>
       );
       
     },
   },
   {
     width: "4%",
render: (name, item, i) => {   
   console.log(item.closedPosition);
 return {
   props: {
   
   },
   children: (
     <>
      <Tooltip
          title={<FormattedMessage
            id="app.selected"
            defaultMessage="Selected"
          />}
    >
     <Badge count={item.closedPosition}  style={{ right: "1px" }}>
   <span
     style={{
       cursor: "pointer",
       fontSize: "1.2em",
       color:"#10bd10"
     }}
   >
      <SchoolIcon  />
    </span>
    </Badge>
    </Tooltip>
     </>
   )
 }
},
},
   {
     width: "4%",

render: (name, item, i) => {   
   console.log(item.onBoardNo);
 return {
   props: {
   
   },
   children: (
     <>
     <Tooltip 
        title={<FormattedMessage
          id="app.onBoarded"
          defaultMessage="OnBoarded"
        />}
>
     <Badge count={item.onBoardNo}  style={{ right: "1px" }}>
   <span
     style={{
       cursor: "pointer",
       fontSize: "1.2em",
       color:"#61a5bf"
     }}
   >
        <AccountBoxIcon />
    </span>
    </Badge>
    </Tooltip>
     </>
   )
 }
},
},
    
  ];
   const tab = document.querySelector(".ant-layout-sider-children");
   const tableHeight = tab && tab.offsetHeight * 0.4;
 
  
   return (
     <>
      {/* <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
      getRowId={(row) => row.recruitmentId}
        rows={ props.tableDashboard2}
        loading={props.fetchingdashboardTable2}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{Toolbar:GridToolbar}}
      />
    </Box> */}
       <StyledTable
         rowKey="opportunityId"
         columns={columns}
         dataSource={
          props.tableDashboard2
         // [{Recruitment:"react",jobid:"1",sponsor:"anc",recruiter:"abc",candidate:"20",selectedCandidate:"5",listOfProgress:["21","25","3"]}]
         }
         onChange={onChange}
         scroll={{ y: tableHeight }}
         pagination={false}
       />

<Suspense fallback={"Loading"}>
        
<AddJobDetailModal
        candidateRequirement={props.candidateRequirement}
        item={currentprocessName}
        addjobDetailModal={props.addjobDetailModal}
        handleAddJobDetailtModal={props.handleAddJobDetailtModal}
        
        />
         
        </Suspense>
     </>
   );
 }
 
 // }
 const mapStateToProps = ({ auth, account, opportunity,dashboard }) => ({
//     userId: auth.userDetails.userId,
//    user: auth.userDetails,
orgId:auth.userDetails.organizationId,
candidateRequirement:opportunity.candidateRequirement,
//     role: auth.userDetails.role,
//     recruiterId:auth.userDetails.userId,
 tableDashboard2:dashboard.tableDashboard2,
 addjobDetailModal:dashboard.addjobDetailModal,
 fetchingdashboardTable2:dashboard.fetchingdashboardTable2
 });
 const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
     {
     getDashboardTable2,
     getCandidateRequirement,
     handleAddJobDetailtModal
     },
     dispatch
   );
 export default connect(mapStateToProps, mapDispatchToProps)(DashboardTable2);
 
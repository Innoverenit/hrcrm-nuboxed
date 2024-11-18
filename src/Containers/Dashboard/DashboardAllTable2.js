import React, { useEffect,lazy, useState } from "react";
import { connect } from "react-redux";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Suspense } from "react";
import { bindActionCreators } from "redux";

import { Tooltip,Input,Button,Badge, } from "antd";
import Highlighter from 'react-highlight-words';
import dayjs from "dayjs";
import { StyledTable } from "../../Components/UI/Antd";
import SchoolIcon from '@mui/icons-material/School';
import {
  getAllDashboardTable2,
  handleAddJobDetailtModal
} from "../Dashboard/DashboardAction";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {getCandidateRequirement} from "../Opportunity/OpportunityAction"
import SearchIcon from '@mui/icons-material/Search';;
const AddJobDetailModal=lazy(() => import("../Dashboard/Child/AddJobDetailModal"));

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}



function DashboardAllTable2(props) {
   useEffect(() => {
     if(props.role==="USER"&&props.user.department==="Recruiter"){
       props.getAllDashboardTable2(props.userId,"Recruiter");     
     }else{
       props.getAllDashboardTable2(props.userId,"Sales");
     }  
     }, []);
  // useEffect(() => {
  //   if((props.role==="ADMIN"||props.role==="USER")&& user.department==="Sales"){
  //     props.getOpportunityListByUserId(props.userId);
  //   }else
  //   if(props.role==="USER"&&user.department==="Recruiter"){
  //     props.getRecruiterList(props.recruiterId);

  //   }
    
  // }, []);
//   useEffect(() => {
//     if(props.role==="USER"&&user.department==="Recruiter"){
//       props.getRecruiterList(props.recruiterId);     
//     }else{
//       props.getOpportunityListByUserId(props.userId);
//     }      
//   }, []);

 

  
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");

  const [currentprocessName, setCurrentprocessName] = useState("");
 
 
   function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
   }
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
             
              size="small"
              style={{ width: 90 }}
            >
            <SearchIcon ClassName="!text-icon" />  Search
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
      //title: "Currency",
      title: "Job ID"
    ,
     dataIndex: "jobOrder",
      width: "10%",
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
      title: "Role"
     ,
  
      dataIndex: "role",
       width: "10%",
    },
    {
     title: "Customer"
    ,
     dataIndex: "customerName",
     ...getColumnSearchProps('customerName'),
      width: "12%",
   },
 
    {
       title: "Sponsor",
 
       dataIndex: "sponserName",
       ...getColumnSearchProps('sponserName'),
        width: "7%",
     },
     {
      title: "Ageing"
  ,
      // title:"Ageing",
      width: "11%",
       // dataIndex: "sponserName",
       // ...getColumnSearchProps('sponserName'),
       render: (text, item) => {
        // const lastRequirementOn = dayjs(item.lastRequirementOn ).format("ll");
        const diff = Math.abs(dayjs().diff(dayjs(item.creationDate), 'days'));
        const date = diff + 1
        return <>
          {item.creationDate === null ? "None" :
            <span class=" cursor-pointer mr-[0.5rem] text-[12px] "
              style={{
                color: date >= 30 && "red",
              
              }}

            >
              {date} days ago
            </span>
          }
        </>
      },
        
     },
    // {
    //          field: "creationDate",
    //          title:"Ageing",
    //          width: "10%",
    //          editable: true,
    //         renderCell: (cellValues,row) => {
    //            console.log("cell",cellValues)
    //             const data=cellValues.row
    //             const diff = Math.abs(dayjs().diff(dayjs(data.creationDate), 'days'));
              
    //                    return (
    //                      <>
    //                 {data.creationDate === null ? "None" :
    //             <span
    //              style={{
    //                marginRight: "0.5rem",
    //                color: diff >=30 && "red",
    //                fontSize: "12px",
    //                cursor: "pointer",
    //              }}
    //              >
    //                {diff} days 
    //                </span>
    //          }
                   
    //                    </>
    //                  );
    //                },
    //        },
      
   {
     title: "Created"
  ,

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
     <Tooltip title="Submitted">
     <Badge count={item.offered}  style={{ right: "1px" }}>
   <span class=" cursor-pointer text-[1.3em] text-black "
   >
       <UploadFileIcon
         style={{fontSize:"1.2rem"}}  />
     {/* <FontAwesomeIcon icon={solid('file-arrow-up')} /> */}
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
   <Tooltip title="Dropped"
     >
   <Badge count={item.rejected}  style={{ right: "1px" }}>
 <span class=" cursor-pointer "
   style={{
     fontSize: "1.3em",
     color:"#e50b0b99"
   }}
 >
    <ArrowCircleDownIcon 
      style={{fontSize:"1.2rem"}}
    // icon={solid('circle-chevron-down')}
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
     title: "Progress"
  ,
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
      <Tooltip title="Selected">
     <Badge count={item.closedPosition}  style={{ right: "1px" }}>
   <span class=" cursor-pointer "
     style={{
       fontSize: "1.2em",
       color:"#10bd10"
     }}
   >
       <SchoolIcon
       style={{fontSize:"1.2rem"}}
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
   console.log(item.onBoardNo);
 return {
   props: {
   
   },
   children: (
     <>
     <Tooltip title="OnBoarded">
     <Badge count={item.onBoardNo}  style={{ right: "1px" }}>
   <span class=" cursor-pointer "
     style={{
       fontSize: "1.2em",
       color:"#61a5bf"
     }}
   >
       <AccountBoxIcon 
         style={{fontSize:"1.2rem"}} />
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
      <StyledTable
        rowKey="opportunityId"
        columns={columns}
        dataSource={
         props.tableallDashboard2
        // [{Recruitment:"react",jobid:"1",sponsor:"anc",recruiter:"abc",candidate:"20",selectedCandidate:"5",listOfProgress:["21","25","3"]}]
        }
        loading={props.fetchingalldashboardTable2}
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
   userId: auth.userDetails.userId,
  user: auth.userDetails,
  tableallDashboard2:dashboard.tableallDashboard2,
   role: auth.userDetails.role,
   addjobDetailModal:dashboard.addjobDetailModal,
   fetchingalldashboardTable2:dashboard.fetchingalldashboardTable2,
   recruiterId:auth.userDetails.userId,
   candidateRequirement:opportunity.candidateRequirement,
// tableDashboard2:dashboard.tableDashboard2
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    // getDashboardTable2,
    getAllDashboardTable2,
    handleAddJobDetailtModal,
    getCandidateRequirement
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DashboardAllTable2);







 import React, { useEffect, useState } from "react";
 import { connect } from "react-redux";
 import { bindActionCreators } from "redux";
 
 import { Tooltip, Icon,Input,Button, Table,  InputNumber, Popconfirm, Form, Typography  } from "antd";
 import Highlighter from 'react-highlight-words';
 import { CurrencySymbol } from "../../../Components/Common";
 import dayjs from "dayjs";
 import { StyledTable, StyledPopconfirm } from "../../../Components/UI/Antd";
 import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
 import { FlexContainer } from "../../../Components/UI/Layout";
 import { BundleLoader } from "../../../Components/Placeholder";
 import {
   getDashboardTable,
   getRecruiterDashboardList,
  
 } from "../DashboardAction";
 // import OpportunityDetailView from "./OpportunityDetailView";
 // import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
 import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { candidateReducer } from "../../Candidate/CandidateReducer";
import { SearchOutlined } from "@ant-design/icons";
 
 function onChange(pagination, filters, sorter) {
   console.log("params", pagination, filters, sorter);
 }
 
 
 
 function DashboardTable(props) {
    useEffect(() => {
      if(props.role==="USER"&&props.user.department==="Recruiter"){
        props.getRecruiterDashboardList(props.recruiterId);     
      }else{
        props.getDashboardTable(props.userId);
      } 
      //  props.getDashboardTable(props.recruiterId)      
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
       title: <FormattedMessage
         id="app.jobId"
         defaultMessage="Job ID"
       />,
 
       dataIndex: "jobOrder",
     //   ...getColumnSearchProps('opportunityName'),
     //   defaultSortOrder: "ascend",
     //   width: "20%",
     //   render: (name, item, i) => {
     //     const fullName = ` ${item.salutation || ""} ${item.firstName ||
     //       ""} ${item.middleName || ""} ${item.lastName || ""}`;
 
     //     const currentdate = dayjs().format("DD/MM/YYYY");
     //     const date = dayjs(item.creationDate).format("DD/MM/YYYY");
     //     console.log(date, currentdate, currentdate === date);
     //     return (
     //       <>
     //       <OpportunityDetailView
     //         opportunityId={item.opportunityId}
     //         opportunityName={item.opportunityName}
     //       />
     //         &nbsp;&nbsp;
     //         {date === currentdate ? (
     //           <span
     //             style={{
     //               color: "tomato",
     //               fontWeight: "bold",
     //             }}
     //           >
     //             New
     //           </span>
     //         ) : null}
     //       </>
     //     );
     //   },
     },
     {
       //title: "Currency",
       title: <FormattedMessage
         id="app.requirement"
         defaultMessage="Requirement"
       />,
 
       dataIndex: "requirementName",
     //   ...getColumnSearchProps('customer'),
        width: "13%",
     },
     {
        //title: "Currency",
        title: <FormattedMessage
          id="app.createdOn"
          defaultMessage="Created On"
        />,
  
        dataIndex: "creationDate",
      //   ...getColumnSearchProps('customer'),
         width: "12%",
         render: (text, item) => {
          const startDate = dayjs(item.creationDate).format("ll");
          return <span>{startDate}</span>;
        }, 
      },
     {
       //title: "Start Date",
       title: <FormattedMessage
         id="app.start"
         defaultMessage="Start"
       />,
 
       dataIndex: "avilableDate",
       width:"12%",
       render: (text, item) => {
        const startDate = dayjs(item.avilableDate).format("ll");
        return <span>{startDate}</span>;
      },
       //defaultSortOrder: "descend",
     //   sorter: (a, b) => {
     //     var nameA = a.startDate; // ignore upper and lowercase
     //     var nameB = b.startDate; // ignore upper and lowercase
     //     if (nameA < nameB) {
     //       return -1;
     //     }
     //     if (nameA > nameB) {
     //       return 1;
     //     }
   
     //     return 0;
     //   },
     //   render: (text, item) => {
     //     const startDate = dayjs(item.startDate).format("ll");
     //     return <span>{startDate}</span>;
     //   },
     },
     {
       //title: "End Date",
       title: <FormattedMessage
         id="app.billing"
         defaultMessage="Billing"
       />,
       dataIndex: "billing",
       width:"8%",
       //defaultSortOrder: "descend",
     //   sorter: (a, b) => {
     //     var nameA = a.endDate; // ignore upper and lowercase
     //     var nameB = b.endDate; // ignore upper and lowercase
     //     if (nameA < nameB) {
     //       return -1;
     //     }
     //     if (nameA > nameB) {
     //       return 1;
     //     }
   
     //     return 0;
     //   },
     //   render: (text, item) => {
     //     const endDate = dayjs(item.endDate).format("ll");
     //     return <span>{endDate}</span>;
     //   },
     },
     {
       //title: "Value",
       title: <FormattedMessage
         id="app.stages"
         defaultMessage="Stages"
       />,
      //  dataIndex: "stageList",
       width: "7%",
       render: (name, item, i) => {
        return (
          <>
           <FlexContainer justifyContect="space-evenly">
              {item.stageList && item.stageList.map((item, i) => {
                console.log(item)
                return (
                  
                  <Tooltip
                  title={item.stageName}
              >
                  <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
                      <MultiAvatar
                        primaryTitle={item.stageName||""}
                        // imageId={item.imageId}
                        // imageURL={item.imageURL}
                        imgWidth={"2.1em"}
                        imgHeight={"2.1em"}
                      />
                    </div>
                    </Tooltip>

                );                 
              })}              
             </FlexContainer>
          </>
        );
      }
      //  onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
     //   render: (name, item, i) => {        
     //     return (
     //       <>
     //         {item.proposalAmount} {item.currency} 
     //         {/* <span>
     //         <CurrencySymbol currencyType={item.currency} />
     //         {item.proposalAmount}
     //       </span> */}
     //       </>
     //     );
     //   },
     },
     {
       title:"Skill Set",
       width: "12%",
        dataIndex: "skillName",
     //    render: (text, item) => {
     //    return <>
     //    {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
     //    <Tooltip title={item.assignedTo}>
     //       <span>
     //         <MultiAvatar
     //           primaryTitle={item.assignedTo}
     //           // imageId={item.ownerImageId}
     //           //  imageURL={item.imageURL}
     //           imgWidth={"2.1em"}
     //           imgHeight={"2.1em"}
     //         />
     //         </span>
     //        </Tooltip>      
        
     //    </>
     //   },
        
     },
     {
        title: "Candidate",
        dataIndex: "candidateName",
       width: "12%",
       render: (name, item, i) => {
        // const candidateName = [{ name: "t", id: "1" },
        // { name: "t", id: "2" },
        // { name: "t", id: "3" },
        // { name: "test", id: "4" },
        // { name: "test", id: "5" },
        // { name: "test", id: "6" }]
        // const totalNumber = candidateName.reduce((acc, item, i) => {
        //   acc = i++;
        //   return acc
        // }, 0)
        // console.log("totalNumber", totalNumber)
        // return (
        //   <div style={{ display: "flex" }} 
        //   onClick={this.handleClickCandidateName}>
        //     {/* <Link
        //       toUrl={`/candidate/${item.candidateId}`}
        //       title={`${item.candidateName || ""} `}
        //     /> */}
        //     {candidateName.slice(0, 3).map((item) => {
        //       return (
        //         <div style={{
        //           width: "36px",
        //           height: "32px",
        //           borderRadius: "54px",
        //           border: "1px solid",
        //           alignItems: "center",
        //           textAlign: "center",
        //           padding: "4px"
        //         }}>
        //           <p>{item.name}</p>
        //         </div>
        //       )

        //     })}
        //     ...{totalNumber - 3} others

        //   </div>
        // );

        return (
          <span>
            {/* <CandidateLoadMore
            candidatetList={item.candidatetList}
            handleClickCandidateName={this.handleClickCandidateName}
            candidateNo={item.candidateNo}
            fullName={item.fullName}
            /> */}
             <FlexContainer justifyContect="space-evenly">
              {item.candidatetList && item.candidatetList.map((candidate, i) => {
                console.log(candidate)
                return (
                  
                  <Tooltip
                  title={candidate.fullName}
              >
                  <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
               
                  >
                    
                      <MultiAvatar
                         primaryTitle={candidate.fullName||""}
                        // imageId={item.imageId}
                        // imageURL={item.imageURL}
                        imgWidth={"30"}
                        imgHeight={"30"}
                      />
                    </div>
                     </Tooltip>

                );                 
              })} 
              <div
              style={{ 
                margin: "2px", 
                borderRadius: "50%",
                cursor:"pointer" ,
               
              }}
                  //  onClick={() => {
                  //   this.handleClickCandidateName(item.candidateNo)
                  //   this.props.getCandidateRequirement(
                  //      item.recruitmentId, 

                  //   );
                  //   }}
              >   
             {item.candidateNo} 
             </div>           
             </FlexContainer>
          </span>
        );
      },
      //  ...this.getColumnSearchProps('candidateName'),
     },
    
    //  {
    //     title:"Cost",
    //     width: "7%",
    //      dataIndex: "cost",
    //  },
    
     {
       //title: "Email",
       title: <FormattedMessage id="app.sponsor" defaultMessage="Sponsor" />,
       dataIndex: "sponserName",
     //   ...getColumnSearchProps('ownerName'),
     //   render: (name, item, i) => {
     //     return (
     //       <>
     //        <Tooltip title={item.ownerName}>
     //       <span>
     //         <MultiAvatar
     //           primaryTitle={item.ownerName}
     //           imageId={item.ownerImageId}
     //            imageURL={item.imageURL}
     //           imgWidth={"2.1em"}
     //           imgHeight={"2.1em"}
     //         />
     //         </span>
     //        </Tooltip>
           
     //        </>
     //     );
     //   },
        width: "10%",
     },
    
 
     // {
     //   //title: "Email",
     //   title: <FormattedMessage id="app.recruiter" defaultMessage="Recruiter" />,
     //   dataIndex: "fullName",
     //   // ...getColumnSearchProps('recruiterDetails'),
     //   render: (name, item, i) => {
         
          
     //     //     return {
     //     //     children: `${item.recruiterDetails.fullName || ""} `,
     //     //     };
           
     //     // },
         
     //     return (
     //       <>
     //        <Tooltip title={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].fullName||""}>
     //       <span>
     //         <MultiAvatar
     //           primaryTitle={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].fullName||""}
     //           imageId={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].imageId||""}
     //            imageURL={item.imageURL}
     //           imgWidth={"2.1em"}
     //           imgHeight={"2.1em"}
     //         />
     //         </span>
     //        </Tooltip>
           
     //        </>
     //     );
     //   },
     //    width: "12%",
     // },
 
 
     // {
     //   title: "",
     //   dataIndex: "documentId",
     //   width: "2%",
     //   render: (name, item, documentId,i) => {
     //     // documentId &&
     //     // documentId.map((documentId) => (
     //     //   <a className="documentId" href>
     //     //     {documentId}
     //     //   </a>
     //     // ));
       
     //     return (
     //       // <Tooltip title="Edit">
     //       <Tooltip
     //       title={
     //         <FormattedMessage
     //           id="app.edit"
     //           defaultMessage="Edit"
     //         />
     //       }
     //     >
     //        {user.userType !== "USER" && user.department !== "Recruiter" && ( 
     //         <Icon
     //           type="edit"
     //           style={{ cursor: "pointer", color: "blue" }}
     //           onClick={() => {
     //             props.setEditOpportunity(item);
     //             handleUpdateOpportunityModal(true);
     //             handleSetCurrentOpportunityId(item.opportunityId);
     //           }}
     //         />
     //        )}
     //       </Tooltip>
     //     );
     //   },
     //   // className: "documentId",
     // },
 
     // {
     //   title: "",
     //   dataIndex: "id",
     //   width: "2%",
     //   render: (name, item, i) => {
     //     return (
     //       <StyledPopconfirm
     //         title="Do you want to delete?"
     //         onConfirm={() => deleteOpportunityData(item.opportunityId)}
     //       >
     //          {user.userType !== "USER" && user.department !== "Recruiter" && ( 
     //         <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
     //          )}
     //       </StyledPopconfirm>
     //     );
     //   },
     // },
 
     
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
        //    props.tableDashboard
        //  } 
        dataSource={
          props.user.department === "Recruiter"
          ? props.listRecruiterDashboard
          : props.tableDashboard
        }
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
 const mapStateToProps = ({ dashboard,auth }) => ({
  recruiterId:auth.userDetails.userId,
 tableDashboard:dashboard.tableDashboard,
 user: auth.userDetails,
  role: auth.userDetails.role,
  userId:auth.userDetails.userId,
  employeeId:auth.userDetails.userId,
  recruiterId:auth.userDetails.userId,
  listRecruiterDashboard:dashboard.listRecruiterDashboard
 });
 const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
     {
     //   getOpportunityListByUserId,
     getDashboardTable,
     getRecruiterDashboardList
     //   getRecruiterList,
     //   handleUpdateOpportunityModal,
     //   setEditOpportunity,
     //   deleteOpportunityData,
     },
     dispatch
   );
 export default connect(mapStateToProps, mapDispatchToProps)(DashboardTable);
 
import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import InfiniteScroll from "react-infinite-scroll-component"
import { FormattedMessage } from "react-intl";
import OpportunitySelectStages from "../OpportunityTable/OpportunitySelectStages"
import styled from 'styled-components';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, Input, Button, Select, Menu, Dropdown, Progress } from "antd";
import Highlighter from 'react-highlight-words';
import { CurrencySymbol } from "../../../../Components/Common";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import {
  getOpportunityListByUserId,
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  getOpportunityInitiativeSKillDetails,
  updateOwneroppById,
      getAllSalesList,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         LinkClosedOpportunity,
         getOpportunitySKill,
         StatusRecruit,
         lostStatusRecruit,
         LinkStageOpportunity,
         getOpportunityForecast
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "../../Child/OpportunityTable/AddOpportunityDrawerModal"
import OpportunityDetailView from "./OpportunityDetailView";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
const Option =Select;

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {

  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
      props.getOpportunityListByUserId(props.userId,page);
      setPage(page + 1);
    } 
    props.getAllSalesList();  
  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
     
        if(props.role==="USER"&&user.department==="Recruiter"){
          props.getRecruiterList(props.recruiterId);     
        }else{
          props.getOpportunityListByUserId(props.userId,page);
          setPage(page + 1);
        } 
        props.getAllSalesList();  
    }, 100);
  
  }


  const salelist=props.sales.map((item)=> {
    return {label:item.fullName,
            value:item.employeeId,
    }
  })
  const recruiterlist=props.recruiterName.map((item)=> {
    return {label:item.fullName,
            value:item.employeeId,
    }
  })

  const mergedlist=salelist.concat(recruiterlist)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  //const [currentOpportunity, setCurrentOpportunity] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [visibleselect, setvisibleselect]=useState(false);
  const [selectedValue,setselectedValue]=useState("");
  const [loading, setLoading] = useState(false);

function handleTransferClick (){
  setvisibleselect(true)
}

const start = () => {
  setLoading(true); // ajax request after empty completing

  setTimeout(() => {
    setSelectedRowKeys([]);
    setLoading(false);
  }, 1000);
};

const onSelectChange = (newSelectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  setSelectedRowKeys(newSelectedRowKeys);
};

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
const hasSelected = selectedRowKeys.length > 0;

function handleSelected (value){
  setselectedValue(value)
  console.log(value)
}

function handleSend (){
  let data={   
    opportunityIds:selectedRowKeys
  }
  setselectedValue(props.updateOwneroppById(selectedValue,data));
  console.log(selectedValue,selectedRowKeys)
}

  function handleSetCurrentOpportunityId(item) {
    setCurrentOpportunityId(item);
    // console.log("opp",item);
  }

 

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

  const ownerlistType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]); 

  const SalesRepType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]); 

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
               icon={<SearchIcon style={{fontSize:"0.8rem"}}  />}            
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
        <SearchIcon  type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
  const {
    fetchingOpportunity,
    user,
    opportunityId,
    fetchingOpportunityError,
    opportunityByUserId,
    recruiterList,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
  } = props;

  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      //title: "Name",
      title: <FormattedMessage
        id="app.name"
        defaultMessage="Name"    
      />,
      width: "20%",
      dataIndex: "opportunityName",
      ...getColumnSearchProps('opportunityName'),
      defaultSortOrder: "ascend",
      width: "20%",
      render: (name, item, i) => {     
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        return (
          <>
          <OpportunityDetailView
            opportunityId={item.opportunityId}
            opportunityName={item.opportunityName}
          />
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },
    {
      //title: "Currency",
      title: <FormattedMessage
        id="app.customer"
        defaultMessage="Customer"
      />,
      dataIndex: "customer",
      ...getColumnSearchProps('customer'),
       width: "15%",
    },
    {
      //title: "Sponsor",
      title: <FormattedMessage
        id="app.sponsor"
        defaultMessage="Sponsor"
      />,
      dataIndex: "contactName",
      ...getColumnSearchProps('contactName'),
       width: "8%",
       render: (name, item, i) => {
        return (
          // <Tooltip title={item.contactName}>
            <SubTitle>
            {item.contactName === null ? "None" :
              <MultiAvatar2
                primaryTitle={item.contactName}
                imageId={item.imageId}
                 imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            }
            </SubTitle>
          // </Tooltip>
        );
      },
    },
    {
      //title: "Start Date",
      title: <FormattedMessage
        id="app.startdate"
        defaultMessage="Start Date"
      />,
      dataIndex: "startDate",
      width:"9%",
      //defaultSortOrder: "descend",
      sorter: (a, b) => {
        var nameA = a.startDate; // ignore upper and lowercase
        var nameB = b.startDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
      render: (text, item) => {
        const startDate = dayjs(item.startDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    
    {
      //title: "Value",
      title: <FormattedMessage
        id="app.proposalamount"
        defaultMessage="Value"
      />,
      width: "10%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
            {/* {item.proposalAmount} {item.currency}  */}
            <span>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}
          </span>
          </>
        );
      },
    },
{
  title: "Stages",
  //dataIndex:"oppStage",
  width: "7%",
  sorter: (a, b) => {
    var nameA = a; // ignore upper and lowercase
    var nameB = b; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  },
  render: (name, item, i) => {
    var findProbability = item.probability;
    item.stageList.forEach((element) => {
      if (element.oppStage === item.oppStage) {
        findProbability = element.probability;
      }
    });
    return (
      <span>
        <Dropdown
          overlay={
            <div>
              <Menu mode="horizontal">
                <Menu.Item
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <OpportunitySelectStages
                    rec={item}
                    oppStage={item.oppStage}
                    // recruitOwner={item.recruitOwner}
                    // candidateName={item.candidateName}
                    // approveInd={item.approveInd}
                    // rejectInd={item.rejectInd}
                    stageClick={(opportunityStagesId) => {
                      props.LinkStageOpportunity(
                        {
                          opportunityId: item.opportunityId,
                          //oppStage: item.oppStage,
                          opportunityStagesId:opportunityStagesId
                          // recruitmentProcessId: item.recruitmentProcessId,
                          // recruitmentId: item.recruitmentId,
                          // profileId: item.profileId,
                        },
                       
                      );
                    }}
                  />{" "}
                </Menu.Item>
              </Menu>
            </div>
          }
          trigger={["click"]}
        >
          <Tooltip title={item.oppStage}>
            {" "}
            <Progress
              type="circle"
              style={{ cursor: "pointer",color:"red" }}
              percent={findProbability}
              //disable={true}
              width={30}
               strokeColor={"#005075"}
             
            />
             {/* )}  */}
          </Tooltip>
        </Dropdown>
      </span>
    );
  },
},
  
{
  title: "",
  dataIndex: "callType",
  width: "6%",
  render: (name, item, i) => {
    return (
      <span>
        {/* {item.candidateName ? ( */}
          <>
            {item.approveInd&&item.opportunityOwner ? (
              <>
                <Tooltip //title={"Offer rolled out"}
                  title={<FormattedMessage
                    id="app.Own"
                    defaultMessage="Own"
                  />}

                >
                  <CheckCircleTwoTone
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#24D8A7"
                    style={{fontSize:"0.8rem" 
                    // cursor:
                    // props.recruitOwner ===props.fullName
                     
                    // ? "not-allowed"
                    // : "pointer",
                   }}
                  />
                </Tooltip>
              </>
            ) : item.rejectInd&&item.opportunityOwner ? (
              <>
                <Tooltip title={"Lost"}>
                  {" "}
                  <StopTwoTone
                    type="stop"
                    theme="twoTone"
                    twoToneColor="red"         
                    style={{ fontSize:"0.8rem" , marginLeft: "0.875em" }}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip //title={"Offer"}
                  title={<FormattedMessage
                    id="app.Own"
                    defaultMessage="Won"
                  />}

                >
                  <CheckCircleTwoTone
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#24D8A7"
                    size={140}
                    style={{ fontSize:"0.8rem" 
                    // cursor:
                    // item.opportunityOwner !=props.fullName
                     
                    // ? "not-allowed"
                    //   : "pointer",
                   }}
                    onClick={() =>                                        
                      props.StatusRecruit(
                        item.opportunityId,
                      
                        {
                         wonInd:true
                        },

                       
                      )
                      
                    }
                  />
                </Tooltip>

                &nbsp; &nbsp;
                <Tooltip //title={"Drop"}
                  title={<FormattedMessage
                    id="app.drop"
                    defaultMessage="Lost"
                  />}

                >
                  <StopTwoTone
                    type="stop"
                    theme="twoTone"
                    twoToneColor="red"
                    size={140}
                    style={{fontSize:"0.8rem" 
                    // cursor:
                    // item.opportunityOwner !=props.fullName
                     
                    // ? "not-allowed"
                    //   : "pointer",
                   }}
                   onClick={() => 
                  props.lostStatusRecruit(
                    item.opportunityId,
                        {
                         lostInd:true
                        },
                        // (data) =>
                        //   this.handleCallBack(
                        //     data,

                        //     item.opportunityId,
                        //     item.profileId
                        //   )
                      )
                    }
                  />
                </Tooltip>
              </>
            )}
          </>
        {/* ) : null} */}
      </span>
    );
  },
},
    {
      title:"Sales Rep",
      width: "9%",
       dataIndex: "assignedTo",
       filters: SalesRepType,
      onFilter: (value, record) => {
        return record.assignedTo === value;
      },
       render: (text, item) => {
       return <>
       {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
       {/* <Tooltip title={item.assignedTo}> */}
          <span>
            <MultiAvatar2
              primaryTitle={item.assignedTo}
              // imageId={item.ownerImageId}
              //  imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
            </span>
           {/* </Tooltip>       */}
       </>
      },
       
    },
   
    {
      //title: "Email",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      //...getColumnSearchProps('ownerName'),
      filters:ownerlistType,
      render: (name, item, i) => {
        return (
          <>
           <Tooltip title={item.ownerName}>
          <span>
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
            </span>
           </Tooltip>
           </>
        );
      },
       width: "6%",
    },

    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
         // props.openRecruitment === 0 ? (
          <Tooltip title='Click to Close'>
         
          <span
           onClick={() => {
            props.LinkClosedOpportunity(
              item.opportunityId,
              {
                closeInd:true,
              }
              //props.handleCallback           
            );         
          }}         
            style={{            
              fontSize: "0.9em",
              cursor: "pointer",
            }}
          >
            <LockOpenIcon  style={{fontSize:"0.8rem" }}/>
             </span>
      </Tooltip> 
     //  ) : null  
        );
      },
    },  
    
    {
      title: "",
      dataIndex: "documentId",
      width:"2%",
      render: (name, item, i) => {          
        return (
        <>
          {/* {user.talentUpdateInd ===true && ( */}
          <span
         
            style={{ cursor: "pointer" }}
            onClick={() => {
             props.getAllRecruitmentByOppId(item.opportunityId );
                          props.getAllRecruitmentPositionByOppId(item.opportunityId );
                        props.getAllRecruitmentAvgTimeByOppId(item.opportunityId );
                        props.getAllRecruitmentPositionFilledByOppId(item.opportunityId );
                        props.getAllRecruitmentDetailsByOppId(item.opportunityId)
                        props.handleOpportunityDrawerModal(true);
                        props.getOpportunitySKill(item.oppInnitiative)
                        props.getOpportunityInitiativeSKillDetails(item.opportunityId)
                        props.getOpportunityForecast(item.opportunityId)
                        handleSetCurrentOpportunityId(item);
                        // handleSetOpportunityId(item.opportunityId)
                        handleSetCurrentItem(item);
            }}
            >{user.pulseAccessInd ===true && ( 
              <MonitorHeartIcon style={{fontSize:"0.8rem"  ,color: "#df9697"}}/>
               )}
            </span>                 
          </>                
        );                      
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, documentId,i) => {
        // documentId &&
        // documentId.map((documentId) => (
        //   <a className="documentId" href>
        //     {documentId}
        //   </a>
        // ));
        return (
          // <Tooltip title="Edit">
          <Tooltip
          title={
            <FormattedMessage
              id="app.edit"
              defaultMessage="Edit"
            />
          }
        >
            {user.opportunityUpdateInd ===true && (
              
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                 <BorderColorIcon  style={{fontSize:"0.8rem" }}/>
              </span>
           )}
          </Tooltip>
        );
      },
      // className: "documentId",
    },

    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteOpportunityData(item.opportunityId)}
          >
             {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
             {user.opportunityDeleteInd ===true && (
            <DeleteIcon
            type="delete" style={{ cursor: "pointer", color: "red",fontSize:"0.8rem"  }} />
             )}
          </StyledPopconfirm>
        );
      },
    },
    
  ];
  if (fetchingOpportunityError) {
    return <APIFailed />;
  }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;

  return (
    <>
     {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
     <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
     Clear
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Button type="primary" onClick={handleTransferClick} disabled={!hasSelected}>
          Select
        </Button>
        {visibleselect && hasSelected && (
          <>
        <Select  style={{ width: 120 }} onChange={handleSelected}>
          {mergedlist.map((item)=>{
            return <Option value={item.value}>{item.label}</Option>
          }
          )}
    </Select>
    <Button type="primary" 
    onClick={handleSend} 
    >
    Transfer
  </Button>
  </>
)}

<InfiniteScroll
                dataLength={props.opportunityByUserId.length}
                next={handleLoadMore}
                hasMore={true}
                // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={400}
            >
      <StyledTable
        rowSelection={rowSelection}
        rowKey={(record) => record.opportunityId}
        // bordered
        // rowKey="opportunityId"
        columns={columns}
        dataSource={
          user.department === "Recruiter"
          ? recruiterList
          : opportunityByUserId
        }
        onChange={onChange}
        loading={fetchingOpportunity || fetchingOpportunityError || fetchingAllOpportunities}
        // scroll={{ y: tableHeight }}     
        pagination={false}
      />
      </InfiniteScroll>
      
      <UpdateOpportunityModal
        updateOpportunityModal={updateOpportunityModal}
        opportunityData={currentOpportunityId}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<AddOpportunityDrawerModal
 opportunityData={currentOpportunityId}
opportunityForecast={props.opportunityForecast}
opportunityInitiativesSkillsDetails={props.opportunityInitiativesSkillsDetails}
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
//  opportunityName={currentOpportunityId}
 
 fetchingOpportunitySkills={props.fetchingOpportunitySkills}
 item={currentItem}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
             // candidateByUserId={props.candidateByUserId}
      />
    </>
  );
}

// }
const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  opportunityId :opportunity.opportunityId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  opportunityInitiativesSkillsDetails:opportunity.opportunityInitiativesSkillsDetails,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    opportunityForecast:opportunity.opportunityForecast,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    fetchingOpportunitySkills:opportunity.fetchingOpportunitySkills
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByUserId,
      getOpportunityInitiativeSKillDetails,
      getRecruiterList,
      getOpportunitySKill,
      getOpportunityForecast,
      getAllSalesList,
      handleUpdateOpportunityModal,
      handleOpportunityDrawerModal,
      setEditOpportunity,
      deleteOpportunityData,
      updateOwneroppById,
      getAllRecruitmentByOppId,
         getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         LinkClosedOpportunity,
         StatusRecruit,
         lostStatusRecruit,
         LinkStageOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);
const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;


const AppIcon1 = (props) => (
  
  <BorderColorIcon
  // className={`pen-to-square ${props.className}`}

  />


);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;

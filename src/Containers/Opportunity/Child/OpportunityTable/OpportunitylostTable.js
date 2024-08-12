import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component"
import styled from 'styled-components';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Tooltip, Input, Button, Select, Menu, Dropdown, Progress } from "antd";
import Highlighter from 'react-highlight-words';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import { CurrencySymbol } from "../../../../Components/Common";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import ReinstateToggleForLost from "../../Child/OpportunityTable/ReinstateToggleForLost"
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import {

  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  updateOwneroppById,
      getAllSalesList,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         getlostOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal"
import OpportunityDetailView from "./OpportunityDetailView";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";

const Option =Select;

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunitylostTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props.getAllSalesList();
    props. getlostOpportunity(props.userId,page);
    setPage(page + 1);
  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
     
      if(props.role==="USER"&&user.department==="Recruiter"){
        props.getRecruiterList(props.recruiterId);     
      }else{
       
      } 
      props.getAllSalesList();
      props. getlostOpportunity(props.userId,page);
      setPage(page + 1);
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

  function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
    setCurrentOpportunityId(opportunityId,opportunityName);
    console.log("opp",opportunityId);
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
          text: sales.assignedTo || "",
          value: sales.assignedTo,
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
               icon={<SearchIcon 
                // icon={solid('magnifying-glass')}
                />}            
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
        <SearchIcon 
         type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
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
    fetchingOpportunityError,
    opportunityByUserId,
    recruiterList,
    fetchinglostOpportunity,
    fetchinglostOpportunityError,
    deleteLostOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
     lostOpportunity,
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
      width: "18%",
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
              <MultiAvatar2
                primaryTitle={item.contactName}
                imageId={item.imageId}
                 imageURL={item.imageURL}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
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
    var findProbability = 0;

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
                  
                </Menu.Item>
              </Menu>
            </div>
          }
          trigger={["click"]}
        >
          <Tooltip title={item.stageName}>
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
           {/* <Tooltip title={item.ownerName}> */}
          <span>
            <MultiAvatar2
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
            </span>
           {/* </Tooltip> */}
           </>
        );
      },
       width: "6%",
    },


    {
      title: "",
     // dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip title='Click to Close'>
          <span
           onClick={() => {
            props.LinklostdOpportunity(
              item.opportunityId,
              {
                closeInd:true,
              }        
            );         
          }}         
          
          >
            <LockOpenIcon   style={{            
              fontSize: "0.8rem",
              cursor: "pointer",
            }} />
             </span>
      </Tooltip>   
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
                        handleSetCurrentOpportunityId(item.opportunityName);
            }}
            >{user.pulseAccessInd ===true && ( 
              <MonitorHeartIcon style={{fontSize:"0.8rem",color: "#df9697"}}/>
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
            <BorderColorIcon 
              type="edit"
              style={{ cursor: "pointer", color: "blue" ,fontSize:"0.8rem"}}
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item.opportunityName,item.opportunityId);
              }}
            />
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
            onConfirm={() => deleteLostOpportunity(item.opportunityId)}
          >
             {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
             {user.opportunityDeleteInd ===true && (
            <DeleteIcon
            type="delete" style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }} />
             )}
          </StyledPopconfirm>
        );
      },
    },
    {
      title: "Reinstate",
      margin: "10%",
      render: (name, item, i) => {
        return (
          <>
            <ReinstateToggleForLost 
            opportunityId={item.opportunityId} 
            
            
            />

          </>
        );
      },
    },
    
    
  ];
  if (fetchinglostOpportunityError) {
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
                dataLength={props.lostOpportunity.length}
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
        columns={columns}
        dataSource={
          lostOpportunity
        }
        onChange={onChange}
        loading={fetchinglostOpportunity || fetchinglostOpportunityError }  
        pagination={false}
      />
      </InfiniteScroll>
      
      <UpdateOpportunityModal
        opportunityId={currentOpportunityId}
        opportunityName={currentOpportunityId}
        opportunityData={currentOpportunityId}
        updateOpportunityModal={updateOpportunityModal}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<AddOpportunityDrawerModal
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
 opportunityName={currentOpportunityId}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
             // candidateByUserId={this.props.candidateByUserId}
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
  fetchinglostOpportunity:opportunity.fetchinglostOpportunity,
  fetchinglostOpportunityError:opportunity.fetchinglostOpportunityError,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    lostOpportunity:opportunity.lostOpportunity
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecruiterList,
      getOpportunitySKill,
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
         getlostOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunitylostTable);

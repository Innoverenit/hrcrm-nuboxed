import React, {  useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component"
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WalletIcon from '@mui/icons-material/Wallet';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button,Select, Tooltip, Input } from "antd";
import {
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import {getCandidateDollarTable} from "../../CandidateAction"
import styled from "styled-components";
import Highlighter from "react-highlight-words";
const Option = Select;
const AddDonotCallModal = lazy(() =>
  import("../CandidateTable/AddDonotCallModal")
);
const SkillsLoadMore = lazy(() =>
  import("../CandidateTable/SkillsLoadMore")
);

const StatusToggle = lazy(() =>
  import("../CandidateTable/StatusToggle")
);
const AddPlayerModal = lazy(() =>
  import("../CandidateTable/AddPlayerModal")
);
const CandidateRowEmailModal = lazy(() =>
  import("../CandidateRowEmailModal")
);
const AddChoiceCandidateModal = lazy(() =>
  import("../CandidateTable/AddChoiceCandidateModal")
);
const AddCandidateDrawerModal = lazy(() =>
  import("../../AddCandidateDrawerModal")
);
const UpdateCandidateResumeModal = lazy(() =>
  import("../CandidateTable/UpdateCandidateResumeModal")
);
const UpdateCandidateModal = lazy(() =>
  import("../UpdateCandidate/UpdateCandidateModal")
);


function CandidateDollarTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");

  const [page, setPage] = useState(0);

  function handleTransferClick() {
    setvisibleselect(true);
  }
  function handlePreview() {
    props.handleContactDrawer();
  }

  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }
  function handleSend() {
    let data = {
      // userId:selectedValue,
      candidateIds: selectedRowKeys,
    };
    setselectedValue(props.updateOwnershipById(selectedValue, data));
    console.log(selectedValue, selectedRowKeys);
  }
  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    props.getCandidateDollarTable(props.userId,page);
    setPage(page + 1);

  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
      props.getCandidateDollarTable(props.userId,page);
    setPage(page + 1);
       
    }, 100);
  
  }

  const [currentCandidateId, setCurrentCandidateId] = useState("");
  
  const [currentVideo, setCurrentVideoId] = useState("");
  function handleSetCurrentVideoId(videoClipsId) {
    setCurrentVideoId(videoClipsId
      );
    // console.log(candidateId);
  }

  function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    console.log(candidateId);
  }
  const newSkill =
    props.skillList &&
    props.skillList.map((item) => {
      return { skillName: item };
    });

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
        <SearchIcon
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
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
            textToHighlight={text.toString()}
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



  const designationTypeOption = useMemo(() => {
    if (!props.designations) return [];
    return (
      props.designations.length &&
      props.designations.map((designations) => {
        return {
          text: designations.designationType || "",
          value: designations.designationType,
        };
      })
    );
  }, [props.designations]);

  const roleTypeOption = useMemo(() => {
    if (!props.roles) return [];
    return (
      props.roles.length &&
      props.roles.map((roles) => {
        return {
          text: roles.roleType || "",
          value: roles.roleType,
        };
      })
    );
  }, [props.roles]);

  const {
    // candidateByUserId: {address },
    user,
    fetchingContactsLazyLoading,
    contactsLazyLoading,
    fetchingCandidates,
    fetchingCandidatesError,
    setEditCandidate,
    handleUpdateCandidateModal,
    handleupdateCandidateResumeModal,
    candidateByUserId,
    updateCandidateModal,
    handleChoiceCandidateModal,
    updateCandidateResumeModal,
    handleCandidateRowEmailModal,
    addCandidateRowEmailModal,
  } = props;


  // console.log(address)
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <div >
            <MultiAvatar
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
          </div >
        );
      },
    },
    {
title:"",
width:"1%"
    },
    {
      title: "Name",
  
      dataIndex: "fullName",
      width: "13%",
      ...getColumnSearchProps("fullName"),
      render: (name, item, i) => {
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
          <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`candidate/${item.candidateId}`} title={item.candidateName}>
      {item.fullName}
    </Link>
            {/* <CandidateDetailsView
              candidateId={item.candidateId}
              candidateName={item.fullName}
            /> */}
            &nbsp;&nbsp;
            {date === currentdate ? <span className="blink">New</span> : null}
          </>
        );
      },
    },
    {
     
      dataIndex: "category",
      width: "3%",
      render: (name, item, i) => {
        //debugger;
        return (
          <div>
          
              <Tooltip title={item.category}>
              <div
                style={{
                  borderRadius: "45%",
                  height: "1.1em",
                  width: "1.1em",
                  // backgroundColor: "blue",
                  backgroundColor:
                  item.category === "White" ?"bisque":item.category === "Blue" ?  "#00afff":item.category==="Both"&&"grey",
                }}
              >
              </div>
              </Tooltip>
          
          
          
         
          
          </div>
        );
      },
      filters: [
        { text: "Both", value: "Both" },
        { text: "White", value: "White" },
        { text: "Blue", value: "Blue" },
      ],
      onFilter: (value, record) => {
        return (record.category = value);
      },
    },
    {
      title: "",

      width: "3%",
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title="Video">
              {item.videoClipsId!==null&&(
              <span>
                <PlayCircleIcon 
                 style={{ fontSize: "0.8rem", }}
                onClick={() => {
                  props.handlePlayerModal(true);
                  handleSetCurrentVideoId(item.videoClipsId)
                }}
                 />
              </span>
      )}
            </Tooltip>
          </>
        );
      },
    },


    {
      title:"Vendor" ,
      dataIndex: "partnerName",
      width: "10%",
      ...getColumnSearchProps("partnerName"),
    },
    {
      title:"Role" ,
      dataIndex: "roleType",
      width: "8%",
      filters: roleTypeOption,

      onFilter: (value, record) => {
        return record.roleType === value;
      },
    },

   
    {
      title:"",
      width:"1%"
          },
    {
      title: "Country" ,
      dataIndex: "country",
      align: "left",
      width: "9%",
      sorter: (a, b) => {
        var nameA = a.country; // ignore upper and lowercase
        var nameB = b.country; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Skills" ,
      // dataIndex: "skillList",
      width: "17%",
      ...getColumnSearchProps("skillList"),
      render: (name, item, i) => {
          const data =
              item.skillList === null
                  ? []
                  : item.skillList.filter((skill) => skill !== null && skill !== "");
  
          return (
              data.length === 0 ? (
                  "None"
              ) : (
                  <span>
                      <SkillsLoadMore skillList={data} />
                  </span>
              )
          );
      },
  },

    {
      title:"Experience",
      width:"9%"
          },
          {
            title:"Billing",
            width:"6%"
                },
                {
                  title:"Start Date",
                  width:"9%"
                      },
                      {
                        title:"End Date",
                        width:"9%"
                            },
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        const newSkill =
          item.skillList === null
            ? []
            : item.skillList.map((item) => {
                return { skillName: item };
              });
        const SkillTitle =
          newSkill &&
          newSkill.map((option, i) => {
            return (
              <>
                <div
                  key={i}
                  style={{
                    /// border: `2px solid ${option.color}`,
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}
                >
                  {option.skillName}
                </div>
              </>
            );
          });
        console.log("Title", SkillTitle);
        return (
          <>
            <Tooltip overlayStyle={{ maxWidth: "300px" }} title={SkillTitle}>
              <span
                style={{
                  cursor: "pointer",
                }}
              >
                <BuildCircleIcon style={{color:"blue",fontSize: "0.8rem",}}/>
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Expectation" ,
      dataIndex: "billing",
      align: "left",
      width: "8%",
      render: (name, item, i) => {
        // const data1= item.currency
        const data = item.billing + item.benifit;
        console.log("dff", data);
        return (
          <>
            {/* {item.billing} {item.currency} */}
            <Tooltip title={data}>
              <span>
                <WalletIcon style={{fontSize: "0.8rem",}} />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Available" ,
      dataIndex: "availableDate",
      width: "7%",
      render: (text, item) => {
        const availableDate = dayjs(item.availableDate).format("ll");
        return (
          <>
            {item.availableDate === null ? (
              "None"
            ) : (
              <span>{dayjs(item.availableDate).format("l")}</span>
            )}
          </>
        );
      },
    },
    {
      title:"Owner" ,
      // dataIndex: "ownerName",
      width: "6%",
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
    },
    {
      title: "Active" ,
      // dataIndex: "active",
      width: "6%",
      render: (name, item, i) => {
        return (
          <StatusToggle
            type={props.active ? "primary" : "danger"}
            candidateId={item.candidateId}
            active={item.active}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip title= {item.countryDialCode.concat(item.mobileNumber)}>
            {item.doNotCallInd !== true && (
              <span
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(item.candidateId);
                }}
                style={{
                  marginRight: "0.5rem",
                  //color: props.viewType === "dashboard" && "#1890ff",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
              <PhoneInTalkIcon style={{fontSize: "0.8rem",}}/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(item.candidateId);
                }}
                style={{
                  marginRight: "0.5rem",
                  color: item.doNotCallInd === true && "red",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >
               <PhoneDisabledIcon style={{fontSize: "0.8rem"}}/>
              </span>
            )}
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            {user.talentUpdateInd === true && (
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.handleCandidateRowEmailModal(true);
                }}
              />
            )}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            {/* {user.talentUpdateInd ===true && ( */}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.getCandidateById(item.candidateId);
                props.getCandidateDocument(item.candidateId);
                props.getCandidateTreeMap(item.candidateId);
                props.handleCandidateDrawerModal(true);
              }}
            >{user.pulseAccessInd ===true && ( 
              <MonitorHeartIcon style={{fontSize: "0.8rem" ,color: "#df9697"}}/>
              )}
            </span>
          </>
        );
      },
    },
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        //  console.log(props.candidateByUserId.address&&props.candidateByUserId.address.length&&props.candidateByUserId.address[0].address1)
        const dataLoc = ` Address : ${item.address &&
          item.address.length &&
          item.address[0].address1} 
         Street : ${item.address &&
           item.address.length &&
           item.address[0].street}   
        State : ${item.address && item.address.length && item.address[0].state}
       Country : ${(item.address &&
         item.address.length &&
         item.address[0].country) ||
         ""} 
         PostalCode : ${item.address &&
           item.address.length &&
           item.address[0].postalCode} `;
        return (
          <Tooltip
            // className="ant-tooltip-inner"
            // placement="rightTop"
            overlayStyle={{ maxWidth: "300px" }}
            title={dataLoc}
          >
            <span
              // onClick={() => handleReasonOfDelete(item.orderId)}
              style={{
                // color:
                //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            {user.talentUpdateInd === true && (

              <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                     props.setEditCandidate(item);
                   handleupdateCandidateResumeModal(true);
                     handleSetCurrentCandidateId(item.candidateId);
                   }}
              >
                <EditIcon1></EditIcon1>
              </span>

            
            )}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <StyledPopconfirm
            title="Do you want to blacklist?"
            onConfirm={() => props.getBlackListCandidate(item.candidateId)}
          >
            <ArrowCircleUpIcon
              type="up-circle"
              theme="filled"
              style={{ cursor: "pointer" }}
            />
          </StyledPopconfirm>
        );
      },
    },
  ];
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 100;
  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
      <Button
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Clear
      </Button>
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>
      <Button
        type="primary"
        onClick={handleTransferClick}
        disabled={!hasSelected}
      >
        Select
      </Button>
      &nbsp;&nbsp;
      {/* emailCustomerInd */}
      {visibleselect && hasSelected && (
        <>
          <Select style={{ width: 120 }} onChange={handleSelected}>
         
          </Select>
          &nbsp;&nbsp;
          <Button type="primary" onClick={handleSend}>
            Transfer
          </Button>
          &nbsp;&nbsp;
          {user.emailCustomerInd !== false && (
            <Button type="primary" onClick={props.handleChoiceCandidateModal}>
              Email
            </Button>
          )}
        </>
      )}

<InfiniteScroll
                dataLength={props.candidateDollarTable.length}
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
        rowKey={(record) => record.candidateId}
        rowSelection={rowSelection}
        columns={columns}
        loading={fetchingCandidates || fetchingCandidatesError}
        //scroll={{ y: tableHeight }}
        pagination={false}
        dataSource={props.candidateDollarTable}
      />
      </InfiniteScroll>
      <UpdateCandidateModal
        candidateId={currentCandidateId}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
    
      <AddDonotCallModal
        addDonotCallModal={props.addDonotCallModal}
        candidateId={currentCandidateId}
        handleDonotCallModal={props.handleDonotCallModal}
      />
      <AddChoiceCandidateModal
        selectedValue={selectedValue}
        selectedRowKeys={selectedRowKeys}
        addCandidateChoiceModal={props.addCandidateChoiceModal}
        handleCandidateEmailModal={props.handleCandidateEmailModal}
        handleChoiceCandidateModal={handleChoiceCandidateModal}
      />
        <AddPlayerModal
         videoClipsId={currentVideo}
        addPlayerModal={props.addPlayerModal}
        handlePlayerModal={props.handlePlayerModal}
        // selectedValue={selectedValue}
        // selectedRowKeys={selectedRowKeys}
        // addCandidateChoiceModal={props.addCandidateChoiceModal}
        // handleCandidateEmailModal={props.handleCandidateEmailModal}
        // handleChoiceCandidateModal={handleChoiceCandidateModal}
      />
      <UpdateCandidateResumeModal
        handleResponseData={props.handleResponseData}
        responseData={props.responseData}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        updateCandidateResumeModal={updateCandidateResumeModal}
        handleupdateCandidateResumeModal={handleupdateCandidateResumeModal}
      />
      <CandidateRowEmailModal
        addCandidateRowEmailModal={addCandidateRowEmailModal}
        handleCandidateRowEmailModal={handleCandidateRowEmailModal}
      />
      <AddCandidateDrawerModal
        candidate={props.candidate}
        candidateTreeMap={props.candidateTreeMap}
        documentsByCandidateId={props.documentsByCandidateId}
        addDrawerCandidateModal={props.addDrawerCandidateModal}
        handleCandidateDrawerModal={props.handleCandidateDrawerModal}
        // candidateByUserId={this.props.candidateByUserId}
      />
    </>
  );
}
const mapStateToProps = ({ auth,
  role,
  candidate,
  account,
  designations,
  opportunity,}) => ({
  candidateDollarTable:candidate.candidateDollarTable,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  candidateEmailDrawerProps:candidate.candidateEmailDrawerProps,
  talentUpdateInd: auth.userDetails.talentUpdateInd,
  candidateId: candidate.candidateByUserId.candidateId,
  addDonotCallModal: candidate.addDonotCallModal,
  candidateByUserId: candidate.candidateByUserId,
  fetchingCandidates: candidate.fetchingCandidates,
  fetchingCandidatesError: candidate.fetchingCandidatesError,
  updateCandidateModal: candidate.updateCandidateModal,
  designations: designations.designations,
  addCandidateChoiceModal: candidate.addCandidateChoiceModal,
  roles: role.roles,
  addPlayerModal:candidate.addPlayerModal,
  updateCandidateResumeModal: candidate.updateCandidateResumeModal,
  organizationId: auth.userDetails.organizationId,
  sales: opportunity.sales,
  candidate: candidate.candidate,
  candidateTreeMap: candidate.candidateTreeMap,
  countries:auth.countries,
  documentsByCandidateId: candidate.documentsByCandidateId,
  recruiterName: opportunity.recruiterName,
  addDrawerCandidateModal: candidate.addDrawerCandidateModal,
  addCandidateEmailModal: candidate.addCandidateEmailModal,
  addCandidateRowEmailModal: candidate.addCandidateRowEmailModal,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
      getCandidateDollarTable
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateDollarTable);
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
  
  <BorderColorIcon  style={{fontSize: "0.8rem",}}
  className={`pen-to-square ${props.className}`}

  />


);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  font-size:1rem;
  &:hover {
    // background: yellow;
    color: blue;
  
  }
`;

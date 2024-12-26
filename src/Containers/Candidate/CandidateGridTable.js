import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from '@mui/icons-material/Search';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import WalletIcon from '@mui/icons-material/Wallet';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import CandidateRowEmailModal from "./Child/CandidateRowEmailModal";
import SkillsLoadMore from "../Candidate/Child/CandidateTable/SkillsLoadMore";
import AddChoiceCandidateModal from "./Child/CandidateTable/AddChoiceCandidateModal";
import {  StyledPopconfirm } from "../../Components/UI/Antd";
import { Button,Select, Tooltip, Input } from "antd";
import {
  MultiAvatar,SubTitle, MultiAvatar2,
} from "../../Components/UI/Elements";

import InfiniteScroll from "react-infinite-scroll-component";
import AddCandidateDrawerModal from "./AddCandidateDrawerModal";
import {
  getCandidateListByUserId,
  getCandidateById,
  getCandidateDocument,
  getCandidateTreeMap,
  handleUpdateCandidateModal,
  handleupdateCandidateResumeModal,
  handleChoiceCandidateModal,
  setEditCandidate,
  updateOwnershipById,
  getBlackListCandidate,
  handleCandidateEmailModal,
  handleDonotCallModal,
  handleCandidateRowEmailModal,
  handleCandidateDrawerModal,
  handlePlayerModal,
  emptyCandidate
} from "./CandidateAction";
import AddDonotCallModal from "./Child/CandidateTable/AddDonotCallModal";
import AddPlayerModal from "./Child/CandidateTable/AddPlayerModal"
import { getRoles } from "../Settings/Category/Role/RoleAction";
import { getCountries } from "../Auth/AuthAction";
import UpdateCandidateResumeModal from "./Child/CandidateTable/UpdateCandidateResumeModal";
import StatusToggle from "./Child/CandidateTable/StatusToggle";
import styled from "styled-components";
import Highlighter from "react-highlight-words";
import AddEmailCandidateModal from "./Child/CandidateTable/AddEmailCandidateModal";
import {
  getAllSalesList,
 // getRecruiterName,
} from "../Opportunity/OpportunityAction";
const Option = Select;

const UpdateCandidateModal = lazy(() =>
  import("./Child/UpdateCandidate/UpdateCandidateModal")
);
const CandidateDetailsView = lazy(() =>
  import("../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailsView")
);

function CandidateGridTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");

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

  const checkboxSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const [page, setPage] = useState(0);

  useEffect(()=>{
    return()=>props.emptyCandidate();
  },[] );

  useEffect(() => {
    props.getCandidateListByUserId(props.userId,page);
    setPage(page + 1);
    //props.getDesignations();
    props.getRoles(props.organizationId);
    props.getAllSalesList();
    //props.getRecruiterName();
    props.getCountries();
  }, []);


  const handleLoadMore = () => {
    setTimeout(() => {
      props.getRoles(props.organizationId);
    props.getAllSalesList();
            setPage(page + 1);
            // props.getCandidateListByUserId(props.currentUser,page);
            // if(props.currentUser === "all"){
            //   props.shareCandidatePermission(page);
            //   }
            //   else{
                props.getCandidateListByUserId(props.currentUser?props.currentUser:props.userId,page);
              // }
            // props.getCandidatePagination(props.userId,page);
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

  const salelist = props.sales.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const recruiterlist = props.recruiterName.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const mergedlist = salelist.concat(recruiterlist);

  console.log("SlR", salelist, recruiterlist);

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

  const CountryTypeOption = props.countries.map((item) => {
    return {
      text: item.countryAlpha3Code || "",
      value: item.countryAlpha3Code,
    };
  });

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
  console.log("Talent", user.talentUpdateInd);
  const columns = [
    {
        headerName: "",
        field: "imageId",
      width: 20,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        return (
          <SubTitle>
            <MultiAvatar2
              primaryTitle={data.firstName}
              imageId={data.imageId}
              imageURL={data.imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          </SubTitle>
        );
      },
    },
//     {
//         headerName: "",
// width:10
//     },
    {
        headerName: "Name",
    
      field: "fullName",
      width: 120,
      //...getColumnSearchProps("fullName"),
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        // const fullName = ` ${item.salutation || ""} ${item.firstName ||
        //   ""} ${item.middleName || ""} ${item.lastName || ""}`;
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(data.creationDate).format("DD/MM/YYYY");
        //   console.log(date, currentdate, currentdate === date);
        return (
          <>
            <CandidateDetailsView
              candidateId={data.candidateId}
              candidateName={data.fullName}
            />
            &nbsp;&nbsp;
            {date === currentdate ? <span className="blink">New</span> : null}
          </>
        );
      },
    },
    {
      
      headerName: "",
      field: "category",
      width: 20,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        //debugger;
        return (
          <div>
          
              <Tooltip title={data.category}>
              <div
                style={{
                  borderRadius: "45%",
                  height: "1.1em",
                  width: "1.1em",
                  // backgroundColor: "blue",
                  backgroundColor:
                  data.category === "White" ?"bisque":data.category === "Blue" ?  "#00afff":data.category==="Both"&&"grey",
                }}
              >
              </div>
              </Tooltip>
          
          
          
         
          
          </div>
        );
      },
    //   filters: [
    //     { text: "Both", value: "Both" },
    //     { text: "White", value: "White" },
    //     { text: "Blue", value: "Blue" },
    //   ],
    //   onFilter: (value, record) => {
    //     return (record.category = value);
    //   },
    },
    {
        headerName: "",
        field:"video",
      //  dataIndex: "billing",
      // align: "left",
      width: 20,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        return (
          <>
            <Tooltip title="Video">
              {data.videoClipsId!==null&&(
              <span>
      
                <PlayCircleIcon 
                onClick={() => {
                  props.handlePlayerModal(true);
                  handleSetCurrentVideoId(data.videoClipsId)
                  // this.handleYoutubeIconClick(item.youtubeLink);
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
        headerName: "Vendor",
      field: "partnerName",
      width: 90,
      //...getColumnSearchProps("partnerName"),
    },
    {
        headerName: "Role",
      field: "roleType",
      width: 80,
    //   filters: roleTypeOption,

    //   onFilter: (value, record) => {
    //     return record.roleType === value;
    //   },
    },

    
    {
        headerName: "Country",
      field: "country",
      //align: "left",
      width: 80,
    },
    {
      headerName: "Skills",
      field: "skill",
      width: 150,
      renderCell: (params) => {
          console.log("cell", params);
          const data1 = params.row;
          const data = data1.skillList === null ? [] : data1.skillList.filter((skill) => skill !== null && skill !== "");
  
          return (
              <>
                  {data.length === 0 ? (
                      "None"
                  ) : (
                      <span>
                          <SkillsLoadMore skillList={data} />
                      </span>
                  )}
              </>
          );
      },
  },
    {
        headerName: "",
        field: "skilll",
      width: 30,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        const newSkill =
        data.skillList === null
            ? []
            : data.skillList.map((item) => {
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
                <BuildCircleIcon 
                // icon={solid("screwdriver-wrench")}
                 style={{color:"blue"}}/>
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
   
    headerName: "Expectation",
      field: "billing",
      //align: "left",
      width: 100,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data1=cellValues.row
        // const data1= item.currency
        const data = data1.billing + data1.benifit;
        console.log("dff", data);
        return (
          <>
            {/* {item.billing} {item.currency} */}
            <Tooltip title={data}>
              <span>
                <WalletIcon  />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
        headerName: "Available",
      field: "availableDate",
      width: 70,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        const availableDate = dayjs(data.availableDate).format("ll");
        return (
          <>
            {data.availableDate === null ? (
              "None"
            ) : (
              <span>{dayjs(data.availableDate).format("l")}</span>
            )}
          </>
        );
      },
    },
    {
        headerName: "Owner",
        field: "ownerName",
      width: 80,
     
    renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        return (
          <>
            <Tooltip title={data.ownerName}>
              <span>
                <MultiAvatar
                  primaryTitle={data.ownerName}
                  imageId={data.ownerImageId}
                  imageURL={data.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {

        headerName: "Active",
        field: "active",
      width: 70,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        return (
          <StatusToggle
            type={props.active ? "primary" : "danger"}
            candidateId={data.candidateId}
            active={data.active}
          />
        );
      },
    },
    {
        headerName: "",
      field: "id",
      width: 30,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        return (
          <Tooltip title= {data.countryDialCode.concat(data.mobileNumber)}>
            {data.doNotCallInd !== true && (
              <span
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(data.candidateId);
                }}
                style={{
                  marginRight: "0.5rem",
                  //color: props.viewType === "dashboard" && "#1890ff",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <VolumeUpIcon  />
              </span>
            )}
            {data.doNotCallInd === true && (
              <span
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(data.candidateId);
                }}
                style={{
                  marginRight: "0.5rem",
                  color: data.doNotCallInd === true && "red",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >
                <PhoneDisabledIcon 
                // icon={solid("phone-slash")}
                 />
              </span>
            )}
          </Tooltip>
        );
      },
    },
    {
        headerName: "",
      field: "mail",
      width: 30,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
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
        headerName: "",
        field: "pulse",
      width: 30,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        //debugger
        return (
          <>
            {/* {user.talentUpdateInd ===true && ( */}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.getCandidateById(data.candidateId);
                props.getCandidateDocument(data.candidateId);
                props.getCandidateTreeMap(data.candidateId);
                props.handleCandidateDrawerModal(true);
              }}
            >{user.pulseAccessInd ===true && ( 
              <PulseIcon></PulseIcon>
              )}
            </span>
          </>
        );
      },
    },
    {
        headerName: "",
        field: "address",
        width:30,
        renderCell: (cellValues,row) => {
            console.log("cell",cellValues)
             const data=cellValues.row
        //  console.log(props.candidateByUserId.address&&props.candidateByUserId.address.length&&props.candidateByUserId.address[0].address1)
        const dataLoc = ` Address : ${data.address &&
            data.address.length &&
            data.address[0].address1} 
         Street : ${data.address &&
            data.address.length &&
            data.address[0].street}   
        State : ${data.address && data.address.length && data.address[0].state}
       Country : ${(data.address &&
        data.address.length &&
        data.address[0].country) ||
         ""} 
         PostalCode : ${data.address &&
            data.address.length &&
            data.address[0].postalCode} `;
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
        headerName: "",
        field: "edit",
      width: 5,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        //debugger
        return (
          <>
            {user.talentUpdateInd === true && (

              <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                     props.setEditCandidate(data);
                   handleupdateCandidateResumeModal(true);
                     handleSetCurrentCandidateId(data.candidateId);
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
        headerName: "",
      field: "up",
      width: 5,
      renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
        //debugger
        return (
          <StyledPopconfirm
            title="Do you want to blacklist?"
            onConfirm={() => props.getBlackListCandidate(data.candidateId)}
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
      {/* <Button
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Clear
      </Button> */}
      <span
        style={{
          marginLeft: 8,
        }}
      >
        { `Selected ${selectedRowKeys.length} items` }
      </span>
      <Button
        type="primary"
        onClick={handleTransferClick}
        disabled={!hasSelected}
      >
        Select
      </Button>
      &nbsp;&nbsp;
      
      {visibleselect && hasSelected && (
        <>
          <Select style={{ width: 120 }} onChange={handleSelected}>
            {mergedlist.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            })}
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
                dataLength={props.candidateByUserId.length}
                next={handleLoadMore}
                hasMore={true}
                // loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={400}
            >
    
                   <div>
               
              
        <DataGrid
      getRowId={(row) => row.candidateId}
      onSelectionModelChange={(row) =>{setSelectedRowKeys(row)} }
      scrollbarSize={false}
      
        rows={ candidateByUserId}
        columns={columns}
       
       // paginationModel={paginationModel}
        // pageSizeOptions={[5]}
        // rowCount={100}
        // paginationMode="server"
       
       // hideFooter
        loading={fetchingCandidates }
        checkboxSelection
        //disableSelectionOnClick
        //experimentalFeatures={{ newEditingApi: true }}
        components={{Toolbar:GridToolbar}}
      />
          
      </div>
      </InfiniteScroll>
  
      {/* <StyledTable
        rowKey={(record) => record.candidateId}
        rowSelection={rowSelection}
        columns={columns}
        loading={fetchingCandidates }
        //scroll={{ y: tableHeight }}
        pagination={false}
        dataSource={candidateByUserId}
      /> */}
    
      <UpdateCandidateModal
        candidateId={currentCandidateId}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
      <AddEmailCandidateModal
        selectedValue={selectedValue}
        selectedRowKeys={selectedRowKeys}
        candidateEmailDrawerProps={props.candidateEmailDrawerProps}
        addCandidateEmailModal={props.addCandidateEmailModal}
        handleCandidateEmailModal={props.handleCandidateEmailModal}
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
const mapStateToProps = ({
  auth,
  role,
  candidate,
  account,
  designations,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,

  user: auth.userDetails,
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
      getCandidateListByUserId,
      handleDonotCallModal,
      handlePlayerModal,
      handleupdateCandidateResumeModal,
      handleUpdateCandidateModal,
      handleCandidateDrawerModal,
      getBlackListCandidate,
      emptyCandidate,
      setEditCandidate,
      getCandidateById,
      getCandidateDocument,
      getCandidateTreeMap,
      handleChoiceCandidateModal,
     // getDesignations,
      getRoles,
      getAllSalesList,
     // getRecruiterName,
      updateOwnershipById,
      handleCandidateEmailModal,
      handleCandidateRowEmailModal,
      getCountries,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateGridTable);
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
  
  <EditIcon
  // icon={solid("pen-to-square")}
  className={`pen-to-square ${props.className}`}

  />



);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;








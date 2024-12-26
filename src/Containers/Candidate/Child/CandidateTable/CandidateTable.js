import React, {  useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import WalletIcon from "@mui/icons-material/Wallet";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button, Select, Tooltip, Input } from "antd";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import InfiniteScroll from "react-infinite-scroll-component";
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
  emptyCandidate,
} from "../../CandidateAction";
import { getRoles } from "../../../Settings/Category/Role/RoleAction";
import { getCountries } from "../../../Auth/AuthAction";
import StatusToggle from "./StatusToggle";
import styled from "styled-components";
import Highlighter from "react-highlight-words";
import { getAllSalesList } from "../../../Opportunity/OpportunityAction";
const Option = Select;
const AddEmailCandidateModal = lazy(() =>
  import("../CandidateTable/AddEmailCandidateModal")
);
const CountryFlag1 = lazy(() =>
  import("../../../Settings/Category/Country/CountryFlag1")
);
const SkillsLoadMore = lazy(() =>
  import("../CandidateTable/SkillsLoadMore")
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
const AddPlayerModal = lazy(() =>
  import("../CandidateTable/AddPlayerModal")
);
const AddDonotCallModal = lazy(() =>
  import("../CandidateTable/AddDonotCallModal")
);
const UpdateCandidateResumeModal = lazy(() =>
  import("../CandidateTable/UpdateCandidateResumeModal")
);
const UpdateCandidateModal = lazy(() =>
  import("../UpdateCandidate/UpdateCandidateModal")
);


function CandidateTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");
  const [translatedContent, setTranslatedContent] = useState('');
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("trans5",translatedContent)

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
      "110",//Name
           "824",//supplier
           "980",//Role
           "1109",// Country
           "1191",// Skills
           "",//Expectation
           "1225 ",// Available
           "77",//Owner
          "",//Active
      ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

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
  const [page, setPage] = useState(0);

  useEffect(() => {
    return () => props.emptyCandidate();
  }, []);

  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getCandidateListByUserId(props.userId, page);
    setPage(page + 1);
    props.getRoles(props.organizationId);
    props.getAllSalesList();
    props.getCountries();
  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
      props.getRoles(props.organizationId);
      props.getAllSalesList();
      setPage(page + 1);
      props.getCandidateListByUserId(
        props.currentUser ? props.currentUser : props.userId,
        page
      );
    }, 100);
  };

  const [currentCandidateId, setCurrentCandidateId] = useState("");

  const [currentVideo, setCurrentVideoId] = useState("");
  function handleSetCurrentVideoId(videoClipsId) {
    setCurrentVideoId(videoClipsId);
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
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <div >
            <MultiAvatar2
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
      title: "",
      width: "1%",
    },
    {
       title:"Name",
 
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
                    item.category === "White"
                      ? "bisque"
                      : item.category === "Blue"
                      ? "#00afff"
                      : item.category === "Both" && "#77dd77",
                }}
              ></div>
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
      //  dataIndex: "billing",
      // align: "left",
      width: "3%",
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title="Video">
              {item.videoClipsId !== null && (
                <span>
                  <PlayCircleIcon
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => {
                      props.handlePlayerModal(true);
                      handleSetCurrentVideoId(item.videoClipsId);
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
       title:"Supplier",
     
      dataIndex: "partnerName",
      width: "10%",
      ...getColumnSearchProps("partnerName"),
    },
    {
       title:"Role",
      dataIndex: "roleType",
      width: "8%",
      filters: roleTypeOption,

      onFilter: (value, record) => {
        return record.roleType === value;
      },
    },

    {
      title: "",
      width: "1%",
    },
    {
     
      dataIndex: "country",
      align: "left",
      width: "4%",
      filters: CountryTypeOption,
      onFilter: (value, record) => {
        return record.country === value;
      },
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
      render: (name, item, i) => {
     

        return (
          <>
  <CountryFlag1 countryCode={ item.address && item.address.length && item.address[0].country_alpha2_code} />
  &nbsp;&nbsp;
    { item.address && item.address.length && item.address[0].country_name}
          </>
        );
      },
    },
    {
       title:"Skills",
      // dataIndex: "skillList",
      width: "17%",
      ...getColumnSearchProps("skillList"),
      render: (name, item, i) => {
        const data =
          item.skillList === null
            ? []
            : item.skillList.filter((skill) => {
                return skill !== null && skill !== "";
              });

        return (
          <>
            {/* {item.skillList === [] ? (
              "None"
            ) : ( */}
              <span>
                <SkillsLoadMore skillList={data} />
              </span>
            {/* )} */}
          </>
        );
      },
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
                <BuildCircleIcon
                  style={{ color: "blue", fontSize: "0.8rem" }}
                />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
       title:"Expectation",
     
      dataIndex: "billing",
      align: "left",
      width: "8%",
      render: (name, item, i) => {
        const data = item.billing + item.benifit;
        console.log("dff", data);
        return (
          <>
            <Tooltip title={data}>
              <span>
                <WalletIcon style={{ fontSize: "0.8rem" }} />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
       title:"Available",
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
       title:"Owner",
      // dataIndex: "ownerName",
      width: "6%",
      filters: ownerlistType,
      onFilter: (value, record) => {
        return record.fullName === value;
      },
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
      title:"Active",
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
          <Tooltip title={item.countryDialCode.concat(item.mobileNumber)}>
            {item.doNotCallInd !== true && (
              <span
                class=" mr-2 cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(item.candidateId);
                }}
              >
                <PhoneInTalkIcon style={{ fontSize: "0.8rem" }} />
              </span>
            )}
            {item.doNotCallInd === true && (
              <span
                class=" mr-2 cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(item.candidateId);
                }}
                style={{
                  color: item.doNotCallInd === true && "red",
                }}
              >
                <PhoneDisabledIcon sryle={{ fontSize: "0.8rem" }} />
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
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
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
            >
              {user.pulseAccessInd === true && (
                <MonitorHeartIcon
                  style={{ fontSize: "0.8rem", color: "#df9697" }}
                />
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
        const dataLoc =
         ` 
         Street : ${
           item.address && item.address.length && item.address[0].street
         }   
         City : ${
          item.address && item.address.length && item.address[0].city
        }  
        State : ${item.address && item.address.length && item.address[0].state}
       Country : ${
         (item.address && item.address.length && item.address[0].country) || ""
       } 
         PostalCode : ${
           item.address && item.address.length && item.address[0].postalCode
         } `;
        return (
          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
            
            >
              <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
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
                <BorderColorIcon style={{ fontSize: "0.8rem" }} />
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
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // height={400}
      >
        <StyledTable
          rowKey={(record) => record.candidateId}
          rowSelection={rowSelection}
          columns={columns}
          scroll={{ y: 700 }}
          loading={fetchingCandidates}
          pagination={false}
          dataSource={candidateByUserId}
        />
      </InfiniteScroll>
      <UpdateCandidateModal
        candidateId={currentCandidateId}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        handleSetCurrentCandidateId={handleSetCurrentCandidateId}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
      />
      <AddEmailCandidateModal
        selectedValue={selectedValue}
        selectedRowKeys={selectedRowKeys}
        candidateEmailDrawerProps={props.candidateEmailDrawerProps}
        addCandidateEmailModal={props.addCandidateEmailModal}
        handleCandidateEmailModal={props.handleCandidateEmailModal}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
      />
      <AddDonotCallModal
        addDonotCallModal={props.addDonotCallModal}
        candidateId={currentCandidateId}
        handleDonotCallModal={props.handleDonotCallModal}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
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
      />
      <UpdateCandidateResumeModal
        // handleResponseData={props.handleResponseData}
        // responseData={props.responseData}
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
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
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
  candidateEmailDrawerProps: candidate.candidateEmailDrawerProps,
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
  addPlayerModal: candidate.addPlayerModal,
  updateCandidateResumeModal: candidate.updateCandidateResumeModal,
  organizationId: auth.userDetails.organizationId,
  sales: opportunity.sales,
  candidate: candidate.candidate,
  candidateTreeMap: candidate.candidateTreeMap,
  countries: auth.countries,
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
      getRoles,
      getAllSalesList,
      updateOwnershipById,
      handleCandidateEmailModal,
      handleCandidateRowEmailModal,
      getCountries,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateTable);





import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import HelpIcon from "@mui/icons-material/Help";
import SkillBarChatModal from "../../OpportunityTab/Recruitment/Child/SkillBarChartModal";
import AddRequirementModal from "./AddRequirementModal";
import DeleteIcon from '@mui/icons-material/Delete';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { MultiAvatar2 } from "../../../../../../Components/UI/Elements";
import AddRequirementDetailModal from "../Recruitment/AddRequirementDetailModal";
import {
  StyledTable,
  StyledPopconfirm,
  StyledModal,
  StyledDrawer,
} from "../../../../../../Components/UI/Antd";
import RecruitmentFilter from "./RecruitmentFilter";
import AddRecruiterModal from "./AddRecruiterModal";
import {
  getRecruitByOpportunityId,
  LinkSkillsRecruit,
  getskillsetList,
  getRecruiter,
  getSkillsCount,
  LinkStageRecruit,
  LinkStatusRecruit,
  setCurrentOpportunityRecruitMentData,
  getCandidateRequirement,
  setCurrentRecruiterData,
  handleRecruitmentEmailDrawerModal,
  handleSponsorModal,
  handleRecruiterModal,
  handleAddRequirementModal,
  setAddRequirement,
  getRecruiterRequiremnt,
  handleAddRequiremenDetailtModal,
  LinkClosedRequirement,
  handleBarChartOrderModal,
  getRequirementOwner,
  emailSendStage,
} from "../../../../OpportunityAction";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { Tooltip, Input, Button, Badge, Avatar } from "antd";
import RecruitmentDetails from "./Child/RecruitmentDetails";
import {
  getCandidateById,
  getTopicsByCandidateId,
} from "../../../../../Candidate/CandidateAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../../../../Components/Common";
import EditRecruitForm from "./EditRecruitForm";
import { Suspense } from "react";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import SelectSponsorForm from "./SelectSponsorForm";
import {
  addRecruitProProfile,
  deleteRequirementData,
} from "../../../../OpportunityAction";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import SubTableClickCandidate from "../Recruitment/SubTableClickCandidate";
import VisibilityIcon from '@mui/icons-material/Visibility';
  import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Highlighter from "react-highlight-words";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RecruitmentEmailDrawerModal from "./Child/RecruitmentEmailDrawerModal";

class RecruitmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show1: false,
      profileId: "",
      contactId: "",
      candidateId: "",
      editModal: false,
      stageList: [],
      recruitmentId: "",
      customerId:"",
      jobOrder: "",
      skillSetData: "",
      candidatePostData: {},
      searchText: "",
      searchedColumn: "",
      subTableVisible: false,
    };
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />

        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchIcon />}
          //icon="search"
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
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
            this.setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex,
            });
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
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleClickCandidateName = (recruitmentId, jobOrder) => {
    this.setState({
      subTableVisible: !this.state.subTableVisible,
      recruitmentId: recruitmentId,
      jobOrder: jobOrder,
    });
  };
  handleClick = (customerId) => {
    this.setState({
      customerId:customerId,
    });
  };
  handleCandidateDataSet = (data) => {
    this.setState({ candidatePostData: data });
  };
  handleSkillsetChoose = (data) => {
    this.setState({ skillSetData: data });
  };
  handleCallback = () => {
    if (
      this.props.role === "USER" &&
      this.props.user.department === "Recruiter"
    ) {
      this.props.getRecruiterRequiremnt(this.props.recruiterId);
    } else {
      this.props.getRecruitByOpportunityId(this.props.opportunityId);
    }
    // this.props.getRecruitByOpportunityId(this.props.opportunityId);
  };
  handleCopy = (
    recruitmentId,
    recruitmentProcessId,
    stageId,
    opportunityId
  ) => {
    const value = {
      recruitmentId: recruitmentId,
      recruitmentProcessId: recruitmentProcessId,
      stageId: stageId,
      opportunityId: opportunityId,
    };
    this.props.addRecruitProProfile(value, this.handleCallback);
  };

  handleEditModal = (data) => {
    this.setState({ editModal: data });
  };
  handleError = (recruitmentId, profileId) => {
    debugger;
    this.setState({ recruitmentId: recruitmentId, profileId: profileId });
    this.props.handleSponsorModal(true);
  };
  handleIconClick = (profileId, candidateId, stageList, recruitmentId) => {
    debugger;
    this.setState({
      show: true,
      profileId,
      candidateId,
      stageList,
      recruitmentId,
    });
    this.props.getCandidateById(candidateId);
    this.props.getTopicsByCandidateId(candidateId);
  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };

  handlenameIconClick = (item) => {
    this.setState({ item });
  };

  handleReasonOfDelete() {
    this.setshow(false);
    this.setshowHis(false);
    this.setshowFeed(false);
    this.setshowPayment(false);
    this.setshowRes(true);
    // setorderId(orderId);
  }

  componentDidMount() {
    // alert(this.props.opportunityId)
    if (
      this.props.role === "USER" &&
      this.props.user.department === "Recruiter"
    ) {
      this.props.getRecruiterRequiremnt(this.props.recruiterId);
    } else {
      this.props.getRecruitByOpportunityId(this.props.opportunityId);
    }
    // this.props.getskillsetList();
    //this.props.getSkillsCount(this.state.recruitmentId,this.props.organizationId,)
  }

  handleCallBack = (status, opportunityId, profileId) => {
    if (status === "success") {
      // message.success("Candidate Selected");
      this.props.emailSendRecruitment({
        opportunityId: opportunityId,
        userId: this.props.userId,
        profileId: profileId,
      });
    }
  };

  render() {
    console.log("Don", this.props.candidateId);
    console.log("recruit", this.props.recruiterRequirement);
    const { recruitByOpportunityId } = this.props;
    console.log("Best", this.props.recruitmentId);
    console.log("Best1", this.state.candidatePostData);

    console.log("?>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<", this.state.stageList);
    console.log(
      this.props.recruitByOpportunityId.length &&
        this.props.recruitByOpportunityId[0].recruiterNames
    );
    const columns = [
      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          const data = ` 
           Requirement ID : ${item.recruitmentId}`;
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <Tooltip
                // className="ant-tooltip-inner"
                // placement="rightTop"
                overlayStyle={{ maxWidth: "300px" }}
                title={data}
              >
                <span
                  // onClick={() => handleReasonOfDelete(item.orderId)}
                  style={{
                    // color:
                    //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                    cursor: "pointer",
                  }}
                >
                  <i class="fa fa-info-circle"></i>
                </span>
              </Tooltip>
            ),
          };
        },
      },
      {
        title: "Job ID",
        width: "11%",
        dataIndex: "jobOrder",
        ...this.getColumnSearchProps("topic"),
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <>
                <Badge count={item.number} style={{ right: "1px" }}>
                  <span>{`${item.jobOrder} `} &nbsp;</span>
                </Badge>
              </>
            ),
          };
        },
      },

      // {
      //   title:"",
      //     width: "8%",
      //   dataIndex:"number",

      // },
      {
        //title: "Requirement",
        title: "Requirement"
        ,
        dataIndex: "requirementName",
        ...this.getColumnSearchProps("topic"),
        width: "13%",
        render: (name, item, i) => {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          console.log(item);

          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <>
                <span
                  onClick={() => {
                    this.props.handleAddRequiremenDetailtModal(true);
                    this.props.setCurrentOpportunityRecruitMentData(item);
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#042E8A",
                  }}
                >
                  {/* {`${item.requirementName} `} */}

                  <Tooltip title={item.requirementName}>
                    {elipsize(item.requirementName, 20)}
                  </Tooltip>
                </span>
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
            ),
          };
        },
      },
      {
        // title: "Category",
        dataIndex: "category",
        width: "5%",
        render: (name, item, i) => {
         
          return (
            <div>
              {item.category === "Blue" && (
                <Tooltip title={item.category}>
                  <div
                    style={{
                      borderRadius: "45%",
                      height: "1.1875em",
                      width: "1.1875em",
                      backgroundColor: "#00afff",
                    }}
                  ></div>
                </Tooltip>
              )}
              {item.category === "White" && (
                <Tooltip title={item.category}>
                  <div
                    style={{
                      borderRadius: "45%",
                      height: "1.1875em",
                      width: "1.1875em",
                      backgroundColor: "bisque",
                    }}
                  ></div>
                </Tooltip>
              )}
              {item.category === "Both" && (
                <Tooltip title={item.category}>
                  <div
                    style={{
                      borderRadius: "45%",
                      height: "1.1875em",
                      width: "1.1875em",
                      backgroundColor: "grey",
                    }}
                  ></div>
                </Tooltip>
              )}
              {item.category === null && (
                <Tooltip title={item.category}>
                  <div
                    style={{
                      borderRadius: "45%",
                      height: "1.1875em",
                      width: "1.1875em",
                      backgroundColor: "grey",
                    }}
                  ></div>
                </Tooltip>
              )}
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
        title: "Created",
        width: "7%",
        dataIndex: "ownerName ",
        render: (text, item) => {
          return (
            <>
              {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
              {/* <Tooltip title={item.ownerName}> */}
              <span>
                <MultiAvatar2
                  primaryTitle={item.ownerName}
                  // imageId={item.ownerImageId}
                  //  imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
              </span>
              {/* </Tooltip> */}
            </>
          );
        },
      },

      {
        title: "Created On",
        width: "10%",
        dataIndex: "creationDate",
        sorter: (a, b) => {
          if (a.creationDate < b.creationDate) {
            return -1;
          }
          if (a.creationDate > b.creationDate) {
            return 1;
          }
          return 0;
        },
        render: (text, item) => {
          const creationDate = dayjs(item.creationDate).format("YYYY/MM/DD");

          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },

            children: <span>{creationDate}</span>,
          };
        },
      },

      {
        title: "Recruiter",
        width: "11%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <>
              
             <Avatar.Group
  maxCount={7}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {item.recruiterList &&
    item.recruiterList.map((recruiter, i) => {
     
      const recruit =
        recruiter.fullName &&
        recruiter.fullName
        .slice(0, 2)
        .toUpperCase();
          // .slice(0, 2)
          // // .split("")[0]
          // .toUpperCase();

      console.log("datas", recruit);

      return (
        <Tooltip title={recruiter.fullName}>
          <Avatar style={{ backgroundColor: "#f56a00" }}>
            {recruit}
          </Avatar>
        </Tooltip>
      );
    })}
</Avatar.Group>

              </>
            ),
          };
        },
      },
      

      {
        title: "Start",
        dataIndex: "avilableDate",
        width: "9%",
        render: (name, item, i) => {
          console.log(item);
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },

            children: <span>{dayjs(item.avilableDate).format("YYYY/MM/DD")}</span>,
          };
        },
        sorter: (a, b) => {
          if (a.avilableDate < b.avilableDate) {
            return -1;
          }
          if (a.avilableDate > b.avilableDate) {
            return 1;
          }
          return 0;
        },
      },
      {
        title: "Duration",
        width: "8%",
        render: (text, item) => {
          //const getDate = (date) => dayjs(date, 'DD/MM/YYYY').startOf('month')
          const diff = Math.abs(
            dayjs(item.availableDate).diff(dayjs(item.endDate), "months")
          );
          const date = diff + 1;
          // const availableDate = dayjs(item.availableDate).subtract(item.endDate);
          return (
            <>
              {/* {item.availableDate === null ? "None" : */}
              <span>
                {/* {dayjs(item.availableDate).subtract(item.endDate).month()} */}
                {date} months
              </span>
              {/* } */}
            </>
          );
        },
      },
      {
        //title: "Rate/hr",
        title:"Billing",
        dataIndex: "billing",
        width: "8%",
        //   defaultSortOrder: "descend",
        // sorter: (a, b) => a.billing - b.billing,
        render: (name, item, i) => {
          console.log(item);
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },

            children: (
              <span>
                <CurrencySymbol currencyType={item.currency} />
                &nbsp;
                {item.billing}
              </span>
            ),
          };
        },
      },
      {
        title: "Skill Set",
        
        width: "15%",
        render: (name, item, i) => {
          console.log(this.props.SkillList);
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },

            children: (
              <span>
                <RecruitmentFilter
                  handleSkillsetChoose={this.handleSkillsetChoose}
                  // topicsByCandidateId={this.props.topicsByCandidateId}
                  SkillList={item.skillSetList}
                  name={this.state.skillSetData}
                  skillName={item.skillName}
                  candidatetList={item.candidatetList}
                  fullName={item.fullName}
                />
              </span>
            ),
          };
        },
      },

      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },

            children: (
              <span>
                <Tooltip
                  // title={text}
                  style={{ whiteSpace: "pre-line" }}
                >
                  <span
                    style={{
                      // color:
                      //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                      cursor: "pointer",
                      marginLeft: "-4px",
                      fontSize: "large",
                    }}
                    onClick={() => {
                      this.props.getSkillsCount(
                        item.recruitmentId,
                        this.props.organizationId
                      );
                      this.props.handleBarChartOrderModal(true);
                    }}
                  >
                    <HelpIcon 
                    // style={{ fontSize: "1rem" }} 
                    className="cursor-pointer !text-icon text-[blue]"
                    />
                  </span>
                </Tooltip>
              </span>
            ),
          };
        },
      },
      {
        title: "",
        width: "3%",
        render: (name, item, i) => {
          console.log(this.state.skillSetData);
          // const IconShow = this.state.skillSetData.skillName !== {} ? true : false;
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },

            children: (
              <>
                {(this.state.skillSetData || item.skillName) && (
                  <span
                    // type="edit"
                    style={{
                      cursor: "pointer",
                      color: "tomato",
                      fontSize: "15px",
                    }}
                    onClick={() => {
                      this.props.LinkSkillsRecruit({
                        // opportunityId: item.opportunityId,
                        stageId: item.stageId,
                        recruitmentProcessId: item.recruitmentProcessId,
                        skillName: this.state.skillSetData || item.skillName,
                        recruitmentId: item.recruitmentId,
                        profileId: item.profileId,
                      });
                      this.props.getRecruiter(
                        this.state.skillSetData || item.skillName,
                        item.recruitmentId,
                        // item.opportunityId
                      );
                      this.handleCandidateDataSet(item);
                      this.props.handleRecruiterModal(true);
                    }}
                  >
                    <InterpreterModeIcon 
                  className="cursor-pointer !text-icon text-[orange]"
                    />
                  </span>
                )}
              </>
            ),
          };
        },
      },

      {
        title: "Talent",
        dataIndex: "candidatetList",
        width: "14%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <>
                <div
                  style={{
                    margin: "2px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.handleClickCandidateName(
                      item.recruitmentId,
                      item.jobOrder,
                    );
                    this.handleClick(item.customerId);
                    this.props.getCandidateRequirement(item.recruitmentId);
                    this.props.getRequirementOwner(item.recruitmentId);
                    //this.props.handlenameIconClick(item);
                  }}
                >
                  <Avatar.Group
                    maxCount={7}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {item.candidatetList &&
                      item.candidatetList.map((candidate, i) => {
                        const data1 = candidate.fullName
                          .slice(0, 2)
                          .split("")[0]
                          .toUpperCase();
                        console.log("datas", data1);
                        return (
                          <Tooltip title={candidate.fullName}>
                            <Avatar style={{ backgroundColor: "#94b3e4" }}>
                              {data1}
                            </Avatar>
                          </Tooltip>
                        );
                      })}
                    <div
                      style={{ placeSelf: "center" }}
                      onClick={() => {
                        this.handleClickCandidateName(
                          item.recruitmentId,
                          item.jobOrder,
                        );
                        this.handleClick(item.customerId);
                        this.props.getCandidateRequirement(item.recruitmentId);
                        // this.props.handlenameIconClick(item);
                      }}
                    >
                      {item.candidateNo}
                    </div>
                  </Avatar.Group>
                </div>
              </>
            ),
          };
        },
      },

      {
        title: "Sponsor",
        dataIndex: "sponserName",
        ...this.getColumnSearchProps("sponserName"),
        width: "10%",
        render: (text, item) => {
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },

            children: (
              <Tooltip title={`${item.sponserName}`}>
                <span>
                  <MultiAvatar2
                    primaryTitle={item.sponserName || ""}
                    imgWidth={"2.1em"}
                    imgHeight={"2.1em"}
                  />
                </span>
              </Tooltip>
            ),
          };
        },
      },

      {
        title: "",
        dataIndex: "callType",
        width: "2%",
        render: (name, item, i) => {
          const close =
            this.state.show === true && this.state.profileId === item.profileId;

          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <>
                {item.candidateName ? (
                  <>
                    {close ? (
                      <Tooltip title="Close Details"
                      >
                        <VisibilityOffIcon
                          type="eye-invisible"
                          onClick={() => this.handleCloseIconClick()}
                          style={{
                            fontSize: "1.125em",
                            color:
                              this.state.show === true &&
                              this.state.profileId === item.profileId &&
                              "#1890ff",
                          }}
                          size="30"
                        />
                      </Tooltip>
                    ) : (
                      <>
                        <Tooltip title="Access Details"
                        >
                          <VisibilityIcon
                            type="eye"
                            onClick={() =>
                              this.handleIconClick(
                                item.profileId,
                                item.candidateId,
                                item.stageList
                              )
                            }
                            style={{
                              fontSize: "1.125em",
                              color:
                                this.state.show === true &&
                                this.state.profileId === item.profileId &&
                                "#1890ff",
                            }}
                            size="30"
                          />
                        </Tooltip>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ),
          };
        },
      },
      {
        width: "6%",
        render: (name, item, i) => {
          return (
            <>
              {this.props.user.sequenceAvailableInd === true && (
                <Button
                  style={{ marginLeft: "-30px" }}
                  // onClick={() => {
                  //   handleMonsterModal(true);
                  //   this.handleIconClick(item.recruitmentId);
                  // }}
                >
                  Sequence
                </Button>
              )}
            </>
          );
        },
      },

      {
        width: "4%",
        render: (name, item, i) => {
          return (
            <>
              <Tooltip title={item.email}>
                {this.props.user.candiPipelineEmailInd === true && (
                  <MailOutlineIcon
                    type="mail"
                    style={{ cursor: "pointer", fontSize: "0.8rem" }}
                    onClick={() => {
                      // props.getCustomerById(item.customerId );
                      this.props.handleRecruitmentEmailDrawerModal(true);
                    }}
                  />
                )}
              </Tooltip>
            </>
          );
        },
      },
      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <>
                {/* {item.approveInd || item.rejectInd ? null : ( */}
                {this.props.user.userType !== "USER" &&
                  this.props.user.department !== "Recruiter" && (
                    <BorderColorIcon
                      type="edit"
                      style={{ cursor: "pointer", fontSize: "0.8rem" }}
                      onClick={() => {
                        this.props.handleAddRequirementModal(true);
                        this.props.setCurrentOpportunityRecruitMentData(item);
                      }}
                    />
                  )}
                {/* )} */}
              </>
            ),
          };
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <Tooltip title="Click to Close">
              <span
                onClick={() => {
                  this.props.LinkClosedRequirement(
                    item.recruitmentId,
                    this.handleCallback
                    // this.props.organizationId,
                  );
                  // item.opportunityId
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                <LockOpenIcon style={{ fontSize: "0.8rem" }} />
              </span>
            </Tooltip>
          );
        },
      },

      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                  this.state.subTableVisible &&
                  this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,
              },
            },
            children: (
              <StyledPopconfirm
                title="Do you want to delete?"
                onConfirm={() =>
                  this.props.deleteRequirementData(item.recruitmentId)
                }
              >
                {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
                {this.props.user.userType !== "USER" &&
                  this.props.user.department !== "Recruiter" && (
                    <DeleteIcon
                      type="delete"
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontSize: "0.8rem",
                      }}
                    />
                  )}
                {/* )} */}
              </StyledPopconfirm>
            ),
          };
        },
      },
    ];

    // if (this.props.fetchingRecruitToOpportunity) {
    //   return <BundleLoader />;
    // }else{
    // if (this.props.fetchingRecruiterRequirement)
    //   return <BundleLoader />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <>
        <StyledTable
          rowKey="profileId"
          scroll={{ y: 220 }}
          pagination={false}
          columns={columns}
          dataSource={
            this.props.user.department === "Recruiter"
              ? this.props.recruiterRequirement
              : this.props.recruitByOpportunityId
          }
          loading={
            this.props.user.department === "Recruiter"
              ? this.props.fetchingRecruiterRequirement ||
                this.props.fetchingRecruiterRequirementError
              : this.props.fetchingRecruitToOpportunity ||
                this.props.fetchingRecruitToOpportunityError
          }
          onChange={console.log("call onChangeHere...")}
          // expandedRowRender={(record) => {
          //   return (
          //     <div style={{ height: "20vh", overflow: "scroll" }}>
          //       <p style={{ fontWeight: "bold", margin: 0 }}>Type</p>
          //       <p>{`${record.type}`}</p>

          //       <p style={{ fontWeight: "bold", margin: 0 }}>Workflow</p>
          //       <p>{` ${record.processName}`}</p>

          //       <p style={{ fontWeight: "bold", margin: 0 }}>Sponsor</p>
          //       <p style={{ margin: 0 }}>{` ${record.sponserName || ""}`}</p>
          //       <p style={{ fontWeight: "bold", margin: 0 }}>
          //         Sponsor Approved on
          //       </p>
          //       <p>{`${record.sponserInd
          //         ? dayjs(record.sponserOfferDate).format("lll")
          //         : ""
          //         }`}</p>
          //       <p style={{ fontWeight: "bold", margin: 0 }}>
          //         Candidate Approved on
          //       </p>
          //       <p>{`${record.candidateOfferAccept} ${record.candidateInd
          //         ? dayjs(record.candidateOfferDate).format("lll")
          //         : ""
          //         }`}</p>
          //       <p style={{ fontWeight: "bold", margin: 0 }}>Description</p>
          //       <p>{record.description}</p>
          //     </div>
          //   );
          // }}
        />
        <StyledDrawer
          title={this.state.jobOrder}
          width="58rem"
          visible={this.state.subTableVisible}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() =>
            this.handleClickCandidateName(this.state.recruitmentId)
          }
        >
          <Suspense fallback={"Loading"}>
            <SubTableClickCandidate
            customerId={this.state.customerId}
              requirementOwner={this.props.requirementOwner}
              fetchingCandidateRequirement={
                this.props.fetchingCandidateRequirement
              }
              candidateRequirement={this.props.candidateRequirement}
            />
            {/* )} */}
          </Suspense>
        </StyledDrawer>
        {/* )} */}
        {this.state.show && (
          <RecruitmentDetails
            candidateId={this.state.candidateId}
            candidate={this.props.candidate}
            profileId={this.state.profileId}
            stageList={this.state.stageList}
          />
        )}
        <SkillBarChatModal
          skillsCount={this.props.skillsCount}
          candidatePostData={this.state.candidatePostData}
          showBarChartModal={this.props.showBarChartModal}
          handleBarChartOrderModal={this.props.handleBarChartOrderModal}
          //particularRowData={particularRowData}
        />
        <RecruitmentEmailDrawerModal
          addDrawerRecruitmentEmailModal={
            this.props.addDrawerRecruitmentEmailModal
          }
          handleRecruitmentEmailDrawerModal={
            this.props.handleRecruitmentEmailDrawerModal
          }
        />
        <StyledModal
          title="Position"
          width="24%"
          visible={this.state.editModal}
          maskClosable={false}
          destroyOnClose
          // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => this.handleEditModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EditRecruitForm />
          </Suspense>
        </StyledModal>
        <StyledModal
          title="Select Sponsor"
          width="20%"
          visible={this.props.addSponsorModal}
          maskClosable={false}
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => this.props.handleSponsorModal(false)}
          footer={null}
        >
          <SelectSponsorForm
            handleSponsorModal={this.props.handleSponsorModal}
            recruitmentId={this.state.recruitmentId}
            profileId={this.state.profileId}
          />
        </StyledModal>
        <Suspense fallback={"Loading..."}>
          <AddRecruiterModal
            addRecruiterModal={this.props.addRecruiterModal}
            handleRecruiterModal={this.props.handleRecruiterModal}
            recruiter={this.props.recruiter}
            //recruitmentId={this.state.recruitmentId}
            candidatePostData={this.state.candidatePostData}
            opportunityId={this.props.opportunityId}
          />
        </Suspense>
        <Suspense fallback={"Loading..."}>
          {/* {this.setshow &&( */}
          <AddRequirementModal
            handleAddRequirementModal={this.props.handleAddRequirementModal}
            addRequirementModal={this.props.addRequirementModal}
            // requirementName={this.props.requirementName}
          />
          <AddRequirementDetailModal
            handleAddRequiremenDetailtModal={
              this.props.handleAddRequiremenDetailtModal
            }
            addRequirementDetailModal={this.props.addRequirementDetailModal}
            // requirementName={this.props.requirementName}
          />
          {/* )} */}
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ opportunity, contact, auth, candidate }) => ({
  user: auth.userDetails,
  opportunityId: opportunity.opportunity.opportunityId,
  recruitByOpportunityId: opportunity.recruitByOpportunityId,
  recruitmentId: opportunity.opportunity.recruitmentId,
  fetchingRecruitToOpportunity: opportunity.fetchingRecruitToOpportunity,
  topicsByCandidateId: candidate.topicsByCandidateId,
  fetchingRecruiterRequirement: opportunity.fetchingRecruiterRequirement,
  fetchingSkillSetList: opportunity.fetchingSkillSetList,
  candidate: candidate.candidate,
  userId: auth.userDetails.userId,
  fetchingCandidateRequirement: opportunity.fetchingCandidateRequirement,
  role: auth.userDetails.role,
  recruiter: opportunity.recruiter,
  fetchingRecruiter: opportunity.fetchingRecruiter,
  skillsCount: opportunity.skillsCount,
  recruiterRequirement: opportunity.recruiterRequirement,
  SkillList: opportunity.SkillList,
  fetchingRecruiterRequirementError:
    opportunity.fetchingRecruiterRequirementError,
  addRequirementDetailModal: opportunity.addRequirementDetailModal,
  organizationId: auth.userDetails.organizationId,
  addSponsorModal: opportunity.addSponsorModal,
  addRecruiterModal: opportunity.addRecruiterModal,
  addRequirementModal: opportunity.addRequirementModal,
  recruiterId: auth.userDetails.userId,
  user: auth.userDetails,
  requirementOwner: opportunity.requirementOwner,
  showBarChartModal: opportunity.showBarChartModal,
  candidateRequirement: opportunity.candidateRequirement,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addRecruitProProfile,
      getRecruitByOpportunityId,
      handleSponsorModal,
      LinkSkillsRecruit,
      setAddRequirement,
      getSkillsCount,
      handleAddRequirementModal,
      // handleRecruitModal,
      // LinkCandidateRecruit,
      LinkStageRecruit,
      LinkStatusRecruit,
      // emailSendRecruitment,
      getCandidateById,
      getTopicsByCandidateId,
      getskillsetList,
      getRecruiter,
      // getContactDocument,

      setCurrentRecruiterData,
      handleRecruiterModal,
      deleteRequirementData,
      getRequirementOwner,
      setCurrentOpportunityRecruitMentData,
      handleRecruitmentEmailDrawerModal,
      emailSendStage,
      getRecruiterRequiremnt,
      getCandidateRequirement,
      handleAddRequiremenDetailtModal,
      LinkClosedRequirement,
      handleBarChartOrderModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentTable);

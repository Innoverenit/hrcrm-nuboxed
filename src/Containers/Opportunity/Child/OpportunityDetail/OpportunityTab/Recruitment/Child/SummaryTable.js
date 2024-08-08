import React, { Component, Suspense } from "react";
import { StyledTable } from "../../../../../../../Components/UI/Antd";
import {
  getAllRecruitmentDetailsByOppId,
  addWebsite,
  getRecruiter,
  handleRecruiterModal,
  handleMonsterModal,
} from "../../../../../OpportunityAction";
import LockIcon from '@mui/icons-material/Lock';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddRecruiterModal from "../AddRecruiterModal";
import AddMonsterModal from "../AddMonsterModal";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { Button, Progress, Tooltip, Avatar } from "antd";
import { FileExcelOutlined, } from "@ant-design/icons";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import {
  MultiAvatar,
} from "../../../../../../../Components/UI/Elements";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styled from "styled-components";
import { base_url } from "../../../../../../../Config/Auth";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
function onChange(pagination, filters, sorter) {
  console.log("Clicked", pagination, filters, sorter);
}
async function getDataUrl(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = function(e) {
      throw new Error("Cannot load image");
    };
  });
}
class SummaryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProcess: [],
      publish: false,
      skillSetData: "",
      recruitmentId: "",
      candidatePostData: {},
    };
  }
  handleIconClick = (recruitmentId) => {
    debugger;
    this.setState({ recruitmentId });
  };

  componentDidMount() {
    this.props.getAllRecruitmentDetailsByOppId(this.props.opportunityId);
  }

  // handleWebsite = (
  //    recruitmentId,
  //   // recruitmentProcessId,
  //   // stageId,
  //   //  opportunityId,
  //   //  organizationId,
  //   //  userId
  // ) => {
  // //   const value = {
  // //       recruitmentId: recruitmentId,
  // //     // recruitmentProcessId: recruitmentProcessId,
  // //     // stageId: stageId,
  // //       opportunityId: this.props.opportunityId,
  // //       organizationId:this.props.organizationId,
  // //       userId:this.props.userId
  // //   };
  // //    this.props.addWebsite(value, );
  // // };
  // toggle=()=>{
  //   this.setState({ state:null})
  // }
  handleCandidateDataSet = (data) => {
    this.setState({ candidatePostData: data });
  };
  handleSkillsetChoose = (data) => {
    this.setState({ skillSetData: data });
  };

  handleDownloadPdf = async () => {
    const { allRecruitmentDetailsByOppId, opportunityName } = this.props;
    console.log(allRecruitmentDetailsByOppId);
    const {
      userDetails: {
        metaData: {
          organization: { imageId: organizationImageId },
        },
      },
    } = this.props;
    console.log(organizationImageId);
    let imgeUrl = `${base_url}/image/${organizationImageId || ""}`;
    console.log(imgeUrl);
    const pdfSummary =
      allRecruitmentDetailsByOppId.length &&
      allRecruitmentDetailsByOppId.map((summary) => ({
        requirementName: `${summary.requirementName || ""}`,
        number: `${summary.number || ""}`,
        sponserName: summary.sponserName,
        openedPosition: summary.closedPosition || "",
        closedPosition: summary.openedPosition || "",
        offered: summary.offered || "",
        rejected: summary.rejected || "",
      }));
    let result = pdfSummary.length && pdfSummary.map(Object.values);
    var doc = new jsPDF();
    doc.autoTable({ html: "#my-table", margin: { top: 30 } });
    var totalPagesExp = "{total_pages_count_string}";
    var base64Img = !organizationImageId
      ? null
      : await getDataUrl(imgeUrl || "");
    doc.autoTable({
      head: [
        [
          "Requirement",
          "# Positions",
          "Sponsor",
          "Filled",
          "Unfilled",
          "Submitted",
          "Rejected",
        ],
      ],
      body: result,

      tableWidth: "100%",

      headStyles: {
        cellPadding: 2,
        fontSize: 12,
        cellWidth: "wrap",
        // minCellWidth: "5",
      },
      columnStyles: {
        0: { minCellWidth: "10", fontSize: 10 },
        1: { fontSize: 10 },
        2: { fontSize: 10 },
        3: { fontSize: 10 },
        4: { fontSize: 10 },
        5: { fontSize: 10 },
      },
      theme: "grid",

      didDrawPage: function(data) {
        // Header
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.setFontStyle("normal");
        if (base64Img) {
          doc.addImage(
            base64Img,
            "JPEG",

            data.settings.margin.left,
            5,
            20,
            20,
            data.settings.margin.top,
            10
          );
        }

        doc.text(
          `${opportunityName && opportunityName} Summary `,
          data.settings.margin.left + 70,
          20
        );
        var before = `Published on ${dayjs().format("Do MMM YYYY")}`;
        doc.text(before, 75, 30);

        // Footer
        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: { top: 35 },
    });
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save(
      `${opportunityName && opportunityName} Requirement ${dayjs().format(
        "L"
      )}`
    );
  };

  render() {
    const { addMonsterModal, handleMonsterModal } = this.props;
    console.log("GGG", this.props.candidatePostData);
    console.log(
      "publish",
      this.props.allRecruitmentDetailsByOppId.length &&
        this.props.allRecruitmentDetailsByOppId[0].publishInd
    );
    const columns = [
      {
        title: "",

        width: "2%",
      },
      {
        title: "Job ID",
        width: "7%",
        dataIndex: "jobOrder",
      },
      {
        //title: "Requirement",
        title: (
          <FormattedMessage
            id="app.requirementName"
            defaultMessage="Requirement"
          />
        ),
        dataIndex: "recruiterName",
        width: "7%",
      },

      {
        title: (
          <FormattedMessage id="app.sponserName" defaultMessage="Sponsor" />
        ),
        dataIndex: "sponserName",
        width: "8%",
        render: (text, item) => {
          return (
            <>
              <Tooltip title={item.sponserName}>
                <span>
                  <MultiAvatar
                    primaryTitle={item.sponserName}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                </span>
              </Tooltip>
            </>
          );
        },
      },

      {
        //title: "# Positions",
        title: (
          <FormattedMessage id="app.number" defaultMessage="# Positions" />
        ),
        dataIndex: "number",
        width: "6%",
      },

      {
        //title: "Submitted",
        title: <FormattedMessage id="app.offered" defaultMessage="Submitted" />,
        dataIndex: "offered",
        width: "6%",
      },

      {
        title: <FormattedMessage id="app.selected" defaultMessage="Selected" />,
        dataIndex: "closedPosition",
        width: "5%",
      },

      {
        title: "OnBoarded",
        dataIndex: "onBoardNo",
        width: "7%",
      },

      {
        title: "Recruiter",
        width: "9%",
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
                  maxCount={2}
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
                        <Tooltip title={item.fullName}>
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
      // {
      //   title: "",
      //   width: "3%",
      //   render: (name, item, i) => {
      //     console.log(this.state.skillSetData)
      //     // const IconShow = this.state.skillSetData.skillName !== {} ? true : false;
      //     return (
      //       <>

      //           <span
      //             // type="edit"
      //             style={{ cursor: "pointer", color: "tomato" }}
      //             onClick={() => {
      //               // this.props.LinkSkillsRecruit({
      //               //   opportunityId: item.opportunityId,
      //               //   stageId: item.stageId,
      //               //   recruitmentProcessId: item.recruitmentProcessId,
      //               //   skillName: this.state.skillSetData || item.skillName,
      //               //   recruitmentId: item.recruitmentId,
      //               //   profileId: item.profileId,
      //               // });
      //               this.props.getRecruiter(
      //                item.skillName,
      //                 item.recruitmentId,
      //                 this.props.opportunityId,

      //               );
      //               this.handleCandidateDataSet(item);
      //               this.props.handleRecruiterModal(true);
      //             }}
      //           >
      //             <FontAwesomeIcon icon={solid('person-circle-question')} />
      //           </span>

      //       </>
      //     )
      //   }
      // },

      {
        title: "Talent",
        dataIndex: "candidatetList",
        width: "12%",
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
                >
                  <Avatar.Group
                    maxCount={7}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {item.candidatetList &&
                      item.candidatetList.map((candidate, i) => {
                        const data1 = candidate.fullName
                          .split("")[0]
                          .toUpperCase();
                        console.log("datas", data1);
                        return (
                          <Tooltip title={candidate.fullName}>
                            <Avatar style={{ backgroundColor: "#f56a00" }}>
                              {data1}
                            </Avatar>
                          </Tooltip>
                        );
                      })}
                    <div
                style={{ placeSelf: "center" }}
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

      // {
      //   title:"",
      //   render: (name, item, i) => {
      //     return(
      //       // <span>
      //       //   {/* <FontAwesomeIcon icon={solid("firefox-browser")} /> */}
      //       //   <FontAwesomeIcon icon={solid('circle-question')} />

      //       // </span>
      //       <Icon type="chrome"
      //       onClick={() =>
      //         this.handleWebsite(
      //           item.recruitmentId,
      //           // this.props.opportunityId,
      //           // this.props.organizationId,
      //           // this.props.userId

      //         )}
      //       // style={{
      //       //   backgroundColor:
      //       //     this.state.priority === "High"
      //       //       ? "red"
      //       //       : "white",
      //       // }}

      //       />

      //     //   <Icon
      //     //   type="edit"
      //     //   style={{ cursor: "pointer", color: "blue" }}

      //     // />
      //     )}

      // },

      {
        title: "Website",
        width: "5%",
        render: (name, item, i) => {
          return (
            // <span>
            //   {/* <FontAwesomeIcon icon={solid("firefox-browser")} /> */}
            //   <FontAwesomeIcon icon={solid('circle-question')} />

            // </span>

            <Button
              style={{ marginLeft: "-12px" }}
              onClick={() =>
                this.props.addWebsite({
                  recruitmentId: item.recruitmentId,
                  opportunityId: this.props.opportunityId,
                  orgId: this.props.orgId,
                  userId: this.props.userId,
                  profileId: item.profileId,
                  //publishInd:publishInd ? false: true
                })
              }
            >
              {item.publishInd === true ? "Unpublish" : "Publish"}
              {/* Publish */}
            </Button>
          );
        },
      },
      {
        title: "Monster",
        width: "6%",
        render: (name, item, i) => {
          return (
            <Button
              onClick={() => {
                handleMonsterModal(true);
                this.handleIconClick(item.recruitmentId);
              }}
            >
              {item.monsterInd === true ? "Unpublish" : "Monster"}
              {/* Publish */}
            </Button>
          );
        },
      },

      {
        title: "",
        width: "6%",
        render: (name, item, i) => {
          const data = (item.onBoardNo / item.number) * 100;
          return (
            <Progress
              type="circle"
              style={{ cursor: "pointer" }}
              percent={parseInt(data)}
              width={40}
              strokeColor={"#005075"}
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
            <Tooltip title="Close Requirement">
              <span
                onClick={() => {
                  this.props.LinkClosedRequirement(
                    item.recruitmentId,
                    this.handleCallback
                    // this.props.organizationId,
                  );
                  // item.opportunityId
                }}
              
              >
                <LockIcon style={{ fontSize: "0.8rem" }} />
               
              </span>
            </Tooltip>
          );
        },
      },
    ];
    if (this.props.fetchingAllRecruitmentDetailsByOppId) {
      return <BundleLoader />;
    }
    return (
      <>
        <div
          style={{
            borderBottom: "0.5em solid silver",
            padding: "0.625em 0em 0.625em 0em",
          }}
        ></div>
        <FlexContainer>
          <PDFPreviewTable>
            <StyledTable
              columns={columns}
              dataSource={this.props.allRecruitmentDetailsByOppId}
              scroll={{ y: 240 }}
              // pagination={{
              //   defaultPageSize: 15,
              //   showSizeChanger: true,
              //   pageSizeOptions: ["15", "25", "40", "50"],
              // }}
              pagination={false}
            />
            <Suspense fallback={"Loading..."}>
              <AddRecruiterModal
                addRecruiterModal={this.props.addRecruiterModal}
                handleRecruiterModal={this.props.handleRecruiterModal}
                recruiter={this.props.recruiter}
                candidatePostData={this.state.candidatePostData}
                opportunityId={this.props.opportunityId}
              />

              <AddMonsterModal
                recruitmentId={this.state.recruitmentId}
                addMonsterModal={this.props.addMonsterModal}
                candidatePostData={this.state.candidatePostData}
                handleMonsterModal={this.props.handleMonsterModal}
              />
            </Suspense>
            <div class=" mt-3" />
            <FlexContainer
              justifyContent="flex-end"
              style={{ padding: "0em 1.25em" }}
            >
              <Tooltip // title={"Generate PDF"}
                title={
                  <FormattedMessage
                    id="app.generatepdf"
                    defaultMessage="Generate PDF"
                  />
                }
              >
                <Button
                  // icon="file-pdf"
                  // icon={<FilePdfOutlined />}
                  
                  type="primary"
                  //  onClick={this.handleDownloadPdf}
                  style={{
                    color: "white",
                    border: "0.125em solid red",
                    fontSize: "1.125em",
                    backgroundColor: "red",
                  }}
                >
                  <PictureAsPdfIcon />
                </Button>
              </Tooltip>
              &nbsp;&nbsp;
              <Tooltip //title={"Generate XL"}
                title={
                  <FormattedMessage
                    id="app.generatexl"
                    defaultMessage="Generate XL"
                  />
                }
              >
                <Button
                  icon={<FileExcelOutlined />}
                  type="primary"
                  //  href={`${base_url}/report/recruitment?oppId=${this.props.opportunityId}`}
                  style={{
                    color: "white",
                    border: "0.125em solid green",
                    fontSize: "1.125em",
                    // padding: "0.4375em",
                    backgroundColor: "green",
                  }}
                ></Button>
              </Tooltip>
            </FlexContainer>
          </PDFPreviewTable>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({ opportunity, auth }) => ({
  opportunityId: opportunity.opportunity.opportunityId,
  recruiter: opportunity.recruiter,
  fetchingAllRecruitmentDetailsByOppId:
    opportunity.fetchingAllRecruitmentDetailsByOppId,
  allRecruitmentDetailsByOppId: opportunity.allRecruitmentDetailsByOppId,
  userDetails: auth.userDetails,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  addRecruiterModal: opportunity.addRecruiterModal,
  opportunityName: opportunity.opportunity.opportunityName,
  opportunityId: opportunity.opportunity.opportunityId,
  addMonsterModal: opportunity.addMonsterModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllRecruitmentDetailsByOppId,
      addWebsite,
      handleRecruiterModal,
      getRecruiter,
      handleMonsterModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SummaryTable);
const PDFPreviewTable = styled.div`
  width: 100%;
`;

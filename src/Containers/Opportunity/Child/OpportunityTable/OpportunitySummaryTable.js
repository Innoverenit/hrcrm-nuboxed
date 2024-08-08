import React, { Component, Suspense } from "react";
import { StyledTable } from "../../../../Components/UI/Antd";
import {
  getAllRecruitmentDetailsByOppId,
  addWebsite,
  getRecruiter,
  handleRecruiterModal,
  handleMonsterModal,
} from "../../OpportunityAction";
import LockIcon from "@mui/icons-material/Lock";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddRecruiterModal from "../OpportunityDetail/OpportunityTab/Recruitment/AddRecruiterModal";
import AddMonsterModal from "../OpportunityDetail/OpportunityTab/Recruitment/AddMonsterModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Button, Progress, Tooltip, Avatar, Input, Badge } from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../Components/UI/Elements";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styled from "styled-components";
import { base_url } from "../../../../Config/Auth";
import { FormattedMessage } from "react-intl";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";
function onChange(pagination, filters, sorter) {
  console.log("Clicked", pagination, filters, sorter);
}
async function getDataUrl(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = function (e) {
      throw new Error("Cannot load image");
    };
  });
}
class OpportunitySummaryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProcess: [],
      publish: false,
      skillSetData: "",
      candidatePostData: {},
      searchText: "",
      searchedColumn: "",
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
          icon={<SearchOutlined />}
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
      <SearchOutlined
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

  componentDidMount() {
    this.props.getAllRecruitmentDetailsByOppId(this.props.opportunityId);
  }

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

      didDrawPage: function (data) {
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
        //title: "Currency",
        title: <FormattedMessage id="app.jobId" defaultMessage="Job ID" />,
        dataIndex: "jobOrder",
        width: "9%",
        render: (name, item, i) => {
          return {
            props: {},
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
      {
        //title: "Requirement",
        title: (
          <FormattedMessage
            id="app.requirementName"
            defaultMessage="Requirement"
          />
        ),
        dataIndex: "recruiterName",
        width: "13%",
        // ...this.getColumnSearchProps("recruiterName"),
      },

      {
        // title: "Sponsor",
        title: (
          <FormattedMessage id="app.sponserName" defaultMessage="Sponsor" />
        ),
        dataIndex: "sponserName",
        width: "9%",
        render: (name, item, i) => {
          return (
            <Tooltip title={item.sponserName}>
              <SubTitle>
                <MultiAvatar
                  primaryTitle={item.sponserName}
                  // imageId={item.imageId}
                  //  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </SubTitle>
            </Tooltip>
          );
        },
      },
  
      {
        title: <FormattedMessage id="app.selected" defaultMessage="Selected" />,
        dataIndex: "closedPosition",
        width: "9%",
      },

      {
        title: "OnBoarded",
        dataIndex: "onBoardNo",
        width: "12%",
      },

      {
        title: "Recruiter",
        width: "10%",
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
                    item.recruiterList.map((item, i) => {
                      const data = item.fullName.split("")[0].toUpperCase();
                      console.log("datas", data);
                      return (
                        <Tooltip title={item.fullName}>
                          <Avatar style={{ backgroundColor: "#f56a00" }}>
                            {data}
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
        title: "",
        width: "2%",
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
                  );
                }}
                style={{
                  //color: props.viewType === "dashboard" && "#1890ff",
                  fontSize: "0.95em",
                  cursor: "pointer",
                }}
              >
                <LockIcon />
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
 <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          <PDFPreviewTable>
            <StyledTable
              columns={columns}
              dataSource={this.props.allRecruitmentDetailsByOppId}
              scroll={{ y: 240 }}
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
                addMonsterModal={this.props.addMonsterModal}
                candidatePostData={this.state.candidatePostData}
                handleMonsterModal={this.props.handleMonsterModal}
              />
            </Suspense>
            <div class="mt-3" />
            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto p-[ 0rem 1.25] ">
           
              <Tooltip // title={"Generate PDF"}
                title={
                  <FormattedMessage
                    id="app.generatepdf"
                    defaultMessage="Generate PDF"
                  />
                }
              >
                <Button
                  type="primary"
                  //  onClick={this.handleDownloadPdf}
                  style={{
                    color: "white",
                    border: "0.125em solid red",
                    fontSize: "1.125em",
                    backgroundColor: "#ae2704c7",
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
                  type="primary"
                  //  href={`${base_url}/report/recruitment?oppId=${this.props.opportunityId}`}
                  style={{
                    color: "white",
                    border: "0.125em solid green",
                    fontSize: "1.125em",
                    // padding: "0.4375em",
                    backgroundColor: "#04ae0da1",
                  }}
                >
                  <PictureAsPdfIcon />
                </Button>
              </Tooltip>
            </div>
          </PDFPreviewTable>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunitySummaryTable);
const PDFPreviewTable = styled.div`
  width: 100%;
`;

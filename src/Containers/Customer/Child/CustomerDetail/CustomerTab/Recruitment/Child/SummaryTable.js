import React, { Component } from "react";
import { StyledTable } from "../../../../../../../Components/UI/Antd";
// import { getAllRecruitmentDetailsByOppId } from "../../../../../OpportunityAction";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button, Progress, Tooltip } from "antd";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { MultiAvatar,SubTitle } from "../../../../../../../Components/UI/Elements";
import jsPDF from "jspdf";
import "jspdf-autotable";

import styled from "styled-components";
import { base_url, base_url2 } from "../../../../../../../Config/Auth";
import dayjs from "dayjs";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
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
class SummaryTable extends Component {
  // componentDidMount() {
  //   this.props.getAllRecruitmentDetailsByOppId(this.props.opportunityId);
  // }
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
    const columns = [
      {
        title: "",

        width: "2%",
      },
      {
        title: "Requirement",
        title: "Requirement",
        dataIndex: "requirementName",
      },
      {
        title: "# Positions",
        title: "# Positions"
     ,
        dataIndex: "number",
      },
      {
        title: "Sponsor",
        title: "Sponsor",
        dataIndex: "sponserName",
        render: (name, item, i) => {
          return (
            <Tooltip title={item.sponserName}>
              <SubTitle>
                <MultiAvatar
                  primaryTitle={item.sponserName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </SubTitle>
            </Tooltip>
          );
        },
      },
      {
        title: "Filled",
        title: "Filled",
        dataIndex: "closedPosition",
      },
      {
        title: "Unfilled",
      
        dataIndex: "openedPosition",
      },
      {
        title: "Submitted",
      
        dataIndex: "offered",
      },
      {
        title: "Rejected",
        
        dataIndex: "rejected",
      },
      {
        title: "",
        width: "6%",
        render: (name, item, i) => {
          const data = (item.closedPosition / item.number) * 100;
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
    ];
    if (this.props.fetchingAllRecruitmentDetailsByOppIdError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <div
          style={{
            borderBottom: "0.5em solid silver",
            padding: "0.625em 0em 0.625em 0em",
          }}
        ></div>
        <div>
          <PDFPreviewTable>
            <StyledTable
              columns={columns}
              dataSource={this.props.allRecruitmentDetailsByOppId}
              Loading={
                this.props.fetchingAllRecruitmentDetailsByOppId ||
                this.props.fetchingAllRecruitmentDetailsByOppIdError
              }
              scroll={{ y: tableHeight }}
          pagination={false}
            />
            <div class=" mt-3" />
            <div class=" justify-end"
              style={{ padding: "0em 1.25em" }}
            >
              <Tooltip title={"Generate PDF"}>
              <a
              href={`${base_url2}/customer/pdf/${"id"}`}
            target="_blank"
            >
                <Button
                  type="primary"
                  // onClick={this.handleDownloadPdf}
                  style={{
                    color: "white",
                    border: "0.125em solid red",
                    fontSize: "1.125em",
                    backgroundColor: "red",
                  }}
                >
                   <PictureAsPdfIcon 
                   />
                </Button>
                </a>
              </Tooltip>
              <Tooltip title={"Generate XL"}>
                <Button
                  icon="file-excel"
                  type="primary"
                  // href={`${base_url}/report/recruitment?oppId=${this.props.opportunityId}`}
                  style={{
                    color: "white",
                    border: "0.125em solid green",
                    fontSize: "1.125em",
                    backgroundColor: "green",
                  }}
                ></Button>
              </Tooltip>
            </div>
          </PDFPreviewTable>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ opportunity, auth }) => ({
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAllRecruitmentDetailsByOppId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SummaryTable);
const PDFPreviewTable = styled.div`
  width: 100%;
`;

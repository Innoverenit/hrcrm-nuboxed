import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { Empty, Button, Tooltip, Modal } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledTable } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getSalesReports } from "../../ReportAction";
import styled from "styled-components";
import TableHeader from "./TableHeader";
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
class Selected extends React.Component {
  constructor() {
    super();

    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    this.state = {
      date: date,
    };
  }
  componentDidMount() {

    // if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
    //   const { myViewReport, recruiterId, startDate, endDate } = this.props;
    // myViewReport(recruiterId,"selected", startDate, endDate); 

    // }else{
    const { getSalesReports, userId, startDate, endDate } = this.props;
    getSalesReports(userId, "selected", startDate, endDate);

    // } 

    // const { myViewReport, userId, startDate, endDate } = this.props;
    // myViewReport(userId, "Recruitment", startDate, endDate);

  }
  componentWillReceiveProps(nextProps) {
    if (

      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate

    ) {

      //   if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
      //     const { myViewReport, recruiterId, startDate, endDate } = nextProps;
      //   myViewReport(recruiterId,"selected", startDate, endDate); 

      //   }else{
      const { getSalesReports, userId, startDate, endDate } = nextProps;
      getSalesReports(userId, "selected", startDate, endDate);

      // } 
    }

  }
  render() {
     const exportPDF = async (checkedList) => {
      //const registerAddress = this.props.organizationDetails.addresses;
      const {
        imageId: organizationImageId,
        userId,
        addresses
      } = this.props
      // let address = `
      // ${registerAddress && registerAddress[0].address1},${registerAddress && registerAddress[0].street},
      //  ${registerAddress && registerAddress[0].city}, ${registerAddress && registerAddress[0].state}, ${registerAddress && registerAddress[0].pinCode}`
      
      let imgeUrl = `${base_url}/image/${organizationImageId || ""}`;

      const data = this.props.reportsSales.length && this.props.reportsSales.map(elt => [

        elt.requirementName,
        elt.jobOrder,
        elt.creationDate,
        elt.avilableDate,
        elt.sponserName,
        elt.skillName,
        elt.offered,
        elt.closedPosition,
        elt.onBoardNo,
        `${(elt.addresses &&
          elt.addresses.length &&
          elt.addresses[0].address1) ||
        ""} 
        ${(elt.addresses &&
          elt.addresses.length &&
          elt.addresses[0].address2) ||
        ""}
         ${(elt.addresses &&
          elt.addresses.length &&
          elt.addresses[0].street) ||
        ""} 
        ${(elt.addresses && elt.addresses.length && elt.addresses[0].city) ||
        ""}`,
        elt.salesExecutive,



      ]);

      let result = data.length && data.map(Object.values);
      var doc = new jsPDF('l', 'mm', [1000,500]);
      doc.setFontSize(0)
      doc.autoTable({ html: "#my-table", margin: { top: 40 } });
      var totalPagesExp = "{total_pages_count_string}";

      var base64Img = !organizationImageId
        ? null
        : await getDataUrl(imgeUrl || "");
      doc.autoTable({
        head: [["Requirement", "Job ID", "Created On", "Start Date", "Sponsor", "Skill Set","Submitted","Selected","Onboarded"]],
        body: result,
        tableWidth: "100%",

        headStyles: {
          cellPadding: 3,
          fontSize: 12,
          cellWidth: "wrap",
          minCellWidth: "5",
        },
        columnStyles: {
          0: { fontSize: 10 },
          1: { minCellWidth: "30", fontSize: 10 },
          2: { fontSize: 10 },
          3: { fontSize: 10 },
          4: { fontSize: 10 },
          5: { fontSize: 10 },
        },
        theme: "grid",

        didDrawPage: function (data) {
          // Header
          doc.setFontSize(10);
          doc.setTextColor("rgb(0, 119, 179)");
          doc.setFontStyle("normal");
          if (base64Img) {
            doc.addImage(
              base64Img,
              "JPEG",

              data.settings.margin.left,
              7,
              25,
              25,
              data.settings.margin.top,
              10
            );
          }

          //doc.text(address, 120, 10);
          var before = `REPORTS  LIST   DATED :- ${dayjs().format("DD-MM-YYYY")}`;
          doc.text(before, 73, 40);
          var str = "Page " + doc.internal.getNumberOfPages();
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === "function") {
            str = str + " of " + totalPagesExp;
          }
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
      doc.save(`Reports ${dayjs().format("L")}`);


    }
    const { myViewReportData, fetchingMyViewReport } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Job ID",
        dataIndex: "jobOrder",
      },
      {
        title: "Requirement",
        dataIndex: "requirementName",
      },
      {
        title: "Customer",
        dataIndex: "customerName",
      },
      {
        title: "Sponsor",
        dataIndex: "sponserName",
      },

      {
        title: "Created On ",
        dataIndex: "creationDate",
        render: (text, item) => {
          const endDate = dayjs(item.creationDate).format("ll");
          return <span>{endDate}</span>;
        },
      },
      {
        title: "Start Date",
        dataIndex: "avilableDate",
        render: (text, item) => {
          const startDate = dayjs(item.avilableDate).format("ll");
          return <span>{startDate}</span>;
        },
      },
      {
        title: "Sponsor",
        dataIndex: "sponserName",
      },
      {
        title: "Skill Set",
        dataIndex: "skillName",
        //   defaultSortOrder: "descend",
        //   sorter: (a, b) => a.designation - b.designation,
      },
      {
        title: "Submitted",
        dataIndex: "offered",
      },
      {
        title: "Selected",
        dataIndex: "closedPosition",
      },
      {
        title: "Onboarded",
        dataIndex: "onBoardNo",
      },
    ];
    if (fetchingMyViewReport) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <div class=" flex">
        <PDFPreviewTable>
          <StyledTable
            // rowSelection={rowSelection}
            rowKey="recruitmentId"
            columns={columns}
            // Loading={fetchingAllLatestContacts}
            dataSource={
              this.props.user.department === "Recruiter"
                ? myViewReportData
                : this.props.reportsSales
            }
            onChange={this.onChange}
            locale={{
              emptyText: (
                <Empty description={"We couldn't find relevant data"} />
              ),
            }}
            pagination={false}
            scroll={{ y: tableHeight }}
          />
       
          <div class=" flex justify-end mt-3"
         
            style={{ padding: "0em 1.25em" }}
          >
            {/* <Tooltip title={"Generate PDF"}>
              <Button
                icon="file-pdf"
                style={{
                  color: "white",

                  border: "0.125em solid red",
                  fontSize: "1.125em",
                  backgroundColor: "red",
                  padding: "0.125em",
                }}
              ></Button>
            </Tooltip> */}
           <Tooltip title={"Generate Pdf "}>
              <Button
                 type="primary"
                // onClick={this.showModal}
                onClick={() => exportPDF()}
    
              >
                <PictureAsPdfIcon style={{ fontSize: "large", color: "#AA0000" }} />
              </Button>
              <Modal
              title="Select your Header for Download Report"
              open={this.state.isModalOpen}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              //onCancel={() => props.handleCancel(false)}
              okText="Download"
            >
               <TableHeader
                checkedList={this.checkedList}
                indeterminate={this.indeterminate}
                checkAll={this.checkAll}
                onChange={this.onChange}
                onCheckAllChange={this.onCheckAllChange}
                plainOptions={this.plainOptions}
              />
              </Modal>
            </Tooltip>
        
          
            <span class=" ml-4 mr-2 cursor-pointer text-4"
            href={`${base_url}/excel/export/user/${this.props.userId
            }?type=${"expense"}&startDate=${this.props.startDate}&endDate=${this.props.endDate
            }=${this.props.userId}
          `}
           // onClick={() => props.setCandidateViewType("table")}
         
          >
            <InsertDriveFileIcon />
          </span>
            {/* <Tooltip title={"Generate XL"}>
              <Button
                icon="file-excel"
                // type="primary"
                href={`${base_url}/excel/export/user/${this.props.userId
                  }?type=${"expense"}&startDate=${this.props.startDate}&endDate=${this.props.endDate
                  }=${this.props.userId}
                `}
                style={{
                  color: "white",
                  border: "0.125em solid green",
                  fontSize: "1.125em",
                  // padding: "0.4375em",
                  backgroundColor: "green",
                }}
              ></Button>
            </Tooltip> */}
        
        <span class=" ml-4 mr-2 cursor-pointer text-4"
           // onClick={() => props.setCandidateViewType("table")}
         
          >
           <InsertDriveFileIcon/>
          </span>
            {/* <Tooltip title={"Generate CSV"}>
              <Button
                icon="file-text"
                target="blank"
                style={{
                  color: "white",
                  border: "0.125em solid green",
                  fontSize: "1.125em",
                  // padding: "0.4375em",
                  backgroundColor: "blue",
                }}
              ></Button>
            </Tooltip> */}
          </div>
        </PDFPreviewTable>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, report, contact, dashboard }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  recruiterId: auth.userDetails.userId,
  userId: auth.userDetails.userId,
  fetchingMyViewReport: report.fetchingMyViewReport,
  fetchingSalesReports: report.fetchingSalesReports,
  startDate: report.startDate,
  myViewReportData: report.myViewReportData,
  reportsSales: report.reportsSales,
  endDate: report.endDate,
  myViewReportSelectedData: report.myViewReportSelectedData,
  selectedReportsSales: report.selectedReportsSales,
  fetchingMyViewReportSelected: report.fetchingMyViewReportSelected,
  fetchingSalesSelectedReports: report.fetchingSalesSelectedReports,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

      getSalesReports
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Selected);
const PDFPreviewTable = styled.div`
  width: 100%;
`;

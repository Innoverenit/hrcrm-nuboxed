import React, {useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../../Config/Auth";
import { Empty } from "antd";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import "jspdf-autotable";
import { StyledTable } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getSalesReports } from "../../ReportAction";
import styled from "styled-components";
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
const plainOptions = ["Requirement", "Job ID", "Created On", "Start Date", "Sponsor", 
"Skill Set","Submitted","Selected","Onboarded"];

const defaultCheckedList = ["Requirement"];
function Requirement(props) {

  let today = new Date()
let day = today.getDate();
let month = today.getMonth()+1;
let year = today.getFullYear();

let fullDate = `${day}.${month}.${year}.`;
console.log(fullDate);
 
  const [visible, setVisible] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    const { getSalesReports, userId, startDate, endDate } = props;
    getSalesReports(userId, "Recruitment", startDate, endDate);
  }, []);
  useEffect(() => {
    // if (
    //   props.startDate !== props.startDate ||
    //   props.endDate !== props.endDate
    // ) {
      const { getSalesReports, userId, startDate, endDate } = props;
      getSalesReports(userId, "Recruitment", startDate, endDate);

    // }
  }, [props.startDate, props.endDate]);

  function onChange (list)  {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  function onCheckAllChange (e) {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  function showModal() {
    setVisible(true);
  };

  function handleOk (){
    setVisible(false);
    console.log(checkedList);
    setCheckedList(defaultCheckedList);
    exportPDF(checkedList);
    };
  function handleCancel() {
    setVisible(false);
    console.log("hey");
  };
  

    const exportPDF = async (checkedList) => {
     // const registerAddress = props.organizationDetails.addresses;
      const {
        imageId: organizationImageId,
        userId,
        addresses
      } = props
      // let address = `
      // ${registerAddress && registerAddress[0].address1},${registerAddress && registerAddress[0].street},
      //  ${registerAddress && registerAddress[0].city}, ${registerAddress && registerAddress[0].state}, ${registerAddress && registerAddress[0].pinCode}`
      
      let imgeUrl = `${base_url}/image/${organizationImageId || ""}`;

      const data = props.reportsSales.length && props.reportsSales.map(elt => [

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
        head: [checkedList],
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

         // doc.text(address, 120, 10);
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
    const { myViewReportData, fetchingMyViewReport } = props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Requirement",
        dataIndex: "requirementName",
      },
      {
        title: "Job ID",
        dataIndex: "jobOrder",
      },
      {
        title: "Created On",
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
          const endDate = dayjs(item.avilableDate).format("ll");
          return <span>{endDate}</span>;
        },
        
      },
      {
        title: "Sponsor",
        dataIndex: "sponserName",
        //   defaultSortOrder: "descend",
        //   sorter: (a, b) => a.designation - b.designation,
      },
      {
        title: "Skill Set",
        dataIndex: "skillName",
      },

      {
        title: "Submitted",
        dataIndex: "offered",
        //   defaultSortOrder: "descend",
        //   sorter: (a, b) => a.designation - b.designation,
      },
      {
        title: "Selected",
        dataIndex: "closedPosition",
        //   defaultSortOrder: "descend",
        //   sorter: (a, b) => a.designation - b.designation,
      },
      {
        title: "Onboarded",
        dataIndex: "onBoardNo",
        //   defaultSortOrder: "descend",
        //   sorter: (a, b) => a.designation - b.designation,
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
              props.user.department === "Recruiter"
                ? myViewReportData
                : props.reportsSales
            }

            onChange={props.onChange}
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
{/*           
          <Tooltip title={"Generate Pdf "}>
        <Button
            type="primary"
            onClick={showModal}

          >
            
            <PictureAsPdfIcon
              style={{ fontSize: "large" }} />
          </Button>
          <Modal
              title="Select your Header for Download Report"
              open={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Download"
            >
              <TableHeader
                checkedList={checkedList}
                indeterminate={indeterminate}
                checkAll={checkAll}
                onChange={onChange}
                onCheckAllChange={onCheckAllChange}
                plainOptions={plainOptions}
              />
            </Modal>
        </Tooltip>
         */}
         
            {/* <span class=" ml-4 mr-2 text-4 cursor-pointer"
            href={`${base_url}/excel/export/user/${props.userId
            }?type=${"expense"}&startDate=${props.startDate}&endDate=${props.endDate
            }=${props.userId}
          `}
        
         
          >
            <InsertDriveFileIcon className="!text-icon text-[#b288c0]"/>
          </span> */}
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
           
            {/* <span class=" ml-4 mr-2 text-4 cursor-pointer"    
           // onClick={() => props.setCandidateViewType("table")}
          
          >
           <InsertDriveFileIcon className="!text-icon text-[#b288c0]"/>
          </span> */}
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

const mapStateToProps = ({ auth, report, contact, dashboard }) => ({
  myViewReportData: report.myViewReportData,
  user: auth.userDetails,
  role: auth.userDetails.role,
  userId: auth.userDetails.userId,
  startDate: report.startDate,
  recruiterId: auth.userDetails.userId,
  endDate: report.endDate,
  reportsSales: report.reportsSales,
  fetchingMyViewReport: report.fetchingMyViewReport,
  fetchingSalesReports: report.fetchingSalesReports,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSalesReports

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Requirement);
const PDFPreviewTable = styled.div`
  width: 100%;
`;

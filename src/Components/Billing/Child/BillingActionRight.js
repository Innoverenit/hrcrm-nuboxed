import React, {  } from "react";
import { connect } from "react-redux";
import TimeInterval from "../../../Utils/TimeInterval";
import { setSelectedTimeIntervalReport } from "../BillingAction";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {  StyledSelect } from "../../../Components/UI/Antd";

import { base_url } from "../../../Config/Auth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Tooltip, Tag } from "antd";
import { setBillingByDesignation } from "../BillingAction"
async function getDataUrl(url) {
  return new Promise((resolve,) => {
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

const Option = StyledSelect.Option;

class BillingActionRight extends React.Component {
  componentDidMount() {
    // this.props.getRequirementByDateRange();
  }
  render() {
    const exportPDF = async () => {
      const {
        imageId: organizationImageId,
        addresses
      } = this.props
      let address = `
      ${addresses && addresses[0].address1},${addresses && addresses[0].street},
       ${addresses && addresses[0].city}, ${addresses && addresses[0].state}, ${addresses && addresses[0].pinCode}`
      console.log(address)
      console.log(organizationImageId);
      let imgeUrl = `${base_url}/image/${organizationImageId || ""}`;

      const data = this.props.tableProvider.map(elt => [
        elt.name,
        elt.kvkNo,
        elt.mobileNo,
        elt.address,
        elt.city,
      
      ]);
      let result = data.length && data.map(Object.values);
      var doc = new jsPDF('l', 'mm', [1000, 500]);
      doc.setFontSize(0)
      doc.autoTable({ html: "#my-table", margin: { top: 40 } });
      var totalPagesExp = "{total_pages_count_string}";

      var base64Img = !organizationImageId
        ? null
        : await getDataUrl(imgeUrl || "");

      doc.autoTable({
        head: [["Name", "KVK #", " Mobile #", "Address", "City", "Join Date", "Last Payment"]],
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
        
        margin: { top: 35 },
      });

      if (typeof doc.putTotalPages === "function") {
        doc.putTotalPages(totalPagesExp);
      }
      doc.save(`Provider ${dayjs().format("L")}`);
    }
    const {
      setSelectedTimeIntervalReport,
      dateRangeList,
      setBillingByDesignation,
      departmentType
    } = this.props;
    return (
      <div class=" flex flex-row flex-wrap items-center self-start justify-evenly grow shrink h-auto mr-auto "> 
        {(this.props.department === "Management" && this.props.viewType === "list") &&
          <Tag
            color={departmentType === "Management" ? "#FFA500" : "orange"}
            style={{
              cursor: "pointer",
              fontWeight: departmentType === "Management" ? "bold" : null,
              textAlign: "center",
              borderColor: "orange",
            }}
            onClick={() => setBillingByDesignation("Management")}
          >
            Management
          </Tag >
        }
        {this.props.viewType === "list" &&
          <Tag
            color={departmentType === "Recruit" ? "#FFA500" : "orange"}
            style={{
              cursor: "pointer",
              fontWeight: departmentType === "Recruit" ? "bold" : null,
              textAlign: "center",
              borderColor: "orange",
            }}
            onClick={() => setBillingByDesignation("Recruit")}
          >
            RecruitWoner
          </Tag>
        }
        {((this.props.department === "Management" || this.props.department === "Sales")
          && this.props.viewType === "list") &&
          <Tag
            color={departmentType === "Sales" ? "#FFA500" : "orange"}
            style={{
              cursor: "pointer",
              fontWeight: departmentType === "Sales" ? "bold" : null,
              textAlign: "center",
              borderColor: "orange",
            }}
            onClick={() => setBillingByDesignation("Sales")}
          >
            SalesWoner
          </Tag>
        }
        <TimeInterval
        
          times={dateRangeList}
          handleClick={setSelectedTimeIntervalReport}
        />


        <div>
          <Tooltip title={"Generate Pdf "}>
            <Button
              type="primary"
              onClick={() => exportPDF()}
            >
              <FileCopyIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ billings, auth }) => ({
  dateRangeList: billings.dateRangeList,
  departmentType: billings.departmentType,
  department: auth.userDetails.department,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
      setBillingByDesignation
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BillingActionRight)


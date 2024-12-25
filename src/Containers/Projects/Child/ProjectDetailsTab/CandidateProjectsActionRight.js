import React, { } from "react";
import { connect } from "react-redux";
import TimeInterval from "../../../../Utils/TimeInterval";
import { setSelectedTimeIntervalReport } from "../../ProjectsAction";
// 
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { StyledRangePicker, StyledSelect } from "../../../../Components/UI/Antd";

import { base_url } from "../../../../Config/Auth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Tooltip } from "antd";


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

const Option = StyledSelect.Option;

class CandidateProjectsActionRight extends React.Component {
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
        // elt.emailId,
        // elt.city,
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
    
      departmentType
    } = this.props;
    return (
      <div class=" flex flex-row flex-wrap items-center self-start justify-evenly grow shrink h-auto mr-auto ">
    
        <TimeInterval
          // tableBadgeCount={this.props.tableBadgeCount}
          // showBadgeCount
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

const mapStateToProps = ({ projects, auth }) => ({
  dateRangeList: projects.dateRangeList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateProjectsActionRight)


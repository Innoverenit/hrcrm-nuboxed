import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import TimeInterval from "../../../../Utils/TimeInterval";
import { setSelectedTimeIntervalReport } from "../../ProjectsAction";
// import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { StyledRangePicker, StyledSelect } from "../../../../Components/UI/Antd";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../../Config/Auth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Tooltip, Popover, Icons, Badge, Tag } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";

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
        //  elt.url,
        // elt.category,
        // elt.subCategory,

        // `${elt.name}${dayjs(elt.creationDate).format("lll")}`,
        // `${elt.approvedBy}${dayjs(elt.approvedDate).format("lll")}`,
        // `${elt.indentData && elt.indentData.map((n) => {
        //     console.log(n.approvedBy)
        //     return (
        //         <>{n.approvedBy}</>
        //     )
        // })}${dayjs(elt.indentData.approvedDate).format("lll")}`,
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

        // didDrawPage: function (data) {
        //     // Header
        //     doc.setFontSize(10);
        //     doc.setTextColor("rgb(0, 119, 179)");
        //     doc.setFontStyle("normal");
        //     if (base64Img) {
        //         doc.addImage(
        //             base64Img,
        //             "JPEG",

        //             data.settings.margin.left,
        //             7,
        //             25,
        //             25,
        //             data.settings.margin.top,
        //             10
        //         );
        //     }

        //     doc.text(address, 120, 10);
        //     var before = `PROVIDER LIST   DATED :- ${dayjs().format("DD-MM-YYYY")}`;
        //     doc.text(before, 73, 40);
        //     var str = "Page " + doc.internal.getNumberOfPages();
        //     // Total page number plugin only available in jspdf v1.0+
        //     if (typeof doc.putTotalPages === "function") {
        //         str = str + " of " + totalPagesExp;
        //     }
        //     var pageSize = doc.internal.pageSize;
        //     var pageHeight = pageSize.height
        //         ? pageSize.height
        //         : pageSize.getHeight();
        //     doc.text(str, data.settings.margin.left, pageHeight - 10);
        // },
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
      <FlexContainer alignItems="center" style={{ justifyContent: "space-evenly" }}>
    
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
              {/* <FontAwesomeIcon icon={solid("file-excel")} /> */}
            </Button>
          </Tooltip>
        </div>
      </FlexContainer>
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CandidateProjectsActionRight)
);

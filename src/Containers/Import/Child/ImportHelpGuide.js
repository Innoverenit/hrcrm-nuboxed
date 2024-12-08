import React from "react";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { MainWrapper } from "../../../Components/UI/Layout";
import { HeaderText, SubTitle } from "../../../Components/UI/Elements";
import { StyledCollapse } from "../../../Components/UI/Antd";
const Panel = StyledCollapse.Panel;

export default function ImportHelpGuide(props) {
  return (
    <>
      <MainWrapper style={{ minHeight: 485 }}>
        <HeaderText>Uploading a CSV / XLSX file</HeaderText>
        <StyledCollapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <ArrowDropDownCircleIcon rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel header="What file formats can I import?" key="1" style={{}}>
            <p>
              {" "}
              The import tool accepts CSV, XLS, or XLSX files with single tab,
              <b> files with multiple tabs/worksheets cannot be uploaded</b>.
            </p>
          </Panel>
          <Panel
            header="Important points to check before before importing a spreadsheet: "
            key="2"
            style={{}}
          >
            <p>
              Header text in columns Should Not contain any<b>blank spaces</b>{" "}
              at the end.
            </p>
            <p>
              Fields Should Not contain any <b>special characters</b>.
            </p>
          </Panel>
          <Panel
            header="How many rows can I include in the CSV import file? "
            key="2"
            style={{}}
          >
            <p>There is a limit of 450 rows per CSV import.</p>
          </Panel>
        </StyledCollapse>
      </MainWrapper>
    </>
  );
}

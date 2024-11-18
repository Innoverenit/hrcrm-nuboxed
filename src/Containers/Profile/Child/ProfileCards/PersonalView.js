import React, { Component } from "react";
import {
  SubTitle,
} from "../../../../Components/UI/Elements";
import { StyledCollapse } from "../../../../Components/UI/Antd";
import dayjs from "dayjs";
import { CaretRightOutlined} from "@ant-design/icons";
import VisibilityIcon from '@mui/icons-material/Visibility';
const Panel = StyledCollapse.Panel;
class PersonalView extends Component {
  render() {
    const {
      user: { bloodGroup, dob },
      toggleViewType,
    } = this.props;
    console.log("***************", this.props);
    return (
      <>
        <div class=" flex justify-end" >
          <VisibilityIcon
            tooltipTitle="Edit"
            iconType="edit"
            handleIconClick={toggleViewType}
            size="1em"
          />
        </div>
        <StyledCollapse
          bordered={false}
          defaultActiveKey={["0"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined type="caret-right" rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel header={"Personal"} key="1" style={{}}>
            <ProfileItemRow label="Blood Group" value={bloodGroup} />
            <ProfileItemRow
              label="Date Of Birth"
              value={dob ? dayjs(dob).format("YYYY-MM-DD") : ""}
            />
          </Panel>
        </StyledCollapse>

        {/* <ProfileItemRow label="Role" value={role} /> */}
      </>
    );
  }
}

export default PersonalView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-no-wrap m-2"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.125em" }}>{value}</SubTitle>
    </div>
  );
};

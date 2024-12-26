import React, { Component } from "react";
import { StyledCollapse } from "../../../../Components/UI/Antd";
import dayjs from "dayjs";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
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
            <ArrowDropDownCircleIcon type="caret-right" rotate={isActive ? 90 : 0} />
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
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{value}</div>
    </div>
  );
};

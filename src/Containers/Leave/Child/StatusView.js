import React, { Component } from "react";
import { Divider, Tooltip } from "antd";
// import { elipsize } from "../../../../Helpers/Function/Functions";
import {
    Title,
    SubTitle,
    MultiAvatar    
} from "../../../Components/UI/Elements";
import { FlexContainer } from "../../../Components/UI/Layout";

class StatsView extends Component {
    render() {
        const {
            leaveFetching: {
                employeeId,
                employeeName,
                imageId,
                leaveBalance,
                totalAppliedLeaves,
                totalLeaves,
                totalPendingLeaves,
            },
            toggleViewType
        } = this.props;

        return (
            <>
            
                <ProfileItemRow label="Maximum Leaves" value={totalLeaves} />
                <ProfileItemRow label="Total Leaves Applied" value={totalAppliedLeaves} />

                <ProfileItemRow label="Pending" value={totalPendingLeaves} />
                <ProfileItemRow label="Leave Balance" value={leaveBalance} />
            </>
        );
    }
}

export default StatsView;

const ProfileItemRow = ({ label, value }) => {
    return (
        <FlexContainer
            alignItems="center"
            flexWrap="nowrap"
            style={{ margin: "0.4rem" }}
            width="2.5em"
        >
            <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
            <SubTitle
                overflow="hidden"
                textOverflow="ellipsis"
                style={{ marginLeft: "0rem" }}
            >
                <Tooltip title={value} placement="topLeft">
                    {/* {elipsize(value, 27)} */}
                    {value}
                </Tooltip>
            </SubTitle>
        </FlexContainer>
    );
};

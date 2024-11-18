import React, { Component } from "react";

import { StyledCollapse } from "../../../../../../Components/UI/Antd";
import dayjs from "dayjs";
import { CaretRightOutlined } from "@ant-design/icons";
const Panel = StyledCollapse.Panel;
class EmployeePersonalView extends Component {
    render() {
        const {
            singleEmployee: {
                bloodGroup,
                dob,
            },
            toggleViewType,
        } = this.props;
        console.log("***************", this.props);
        return (
            <>
                <div class=" flex justify-end" >
                 
                </div>
                <StyledCollapse
                    bordered={false}
                    defaultActiveKey={["0"]}
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined type="caret-right" rotate={isActive ? 90 : 0} />
                    )}
                >
                    <Panel
                        header={"Personal"}
                        key="1"
                        style={{}}
                    >
                        <ProfileItemRow 
                        label="Blood Group" 

                            value={bloodGroup} />
                        <ProfileItemRow 
                        label="Date Of Birth" 
                            value={dayjs(dob).format("YYYY-MM-DD")} />
                    </Panel>
                </StyledCollapse>





                {/* <ProfileItemRow label="Role" value={role} /> */}
            </>
        );
    }
}

export default EmployeePersonalView;

const ProfileItemRow = ({ label, value }) => {
    return (
        <div class=" flex items-center flex-no-wrap m-2"
        >
             <div class=" text-[#444] font-semibold" >{label}</div>
             <div className="overflow-hidden truncate ml-2">{value}</div>
        </div>
    );
};

















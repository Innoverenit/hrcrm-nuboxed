

import React from "react";
import { withRouter } from "react-router";
import { Title, } from "../../../../../Components/UI/Elements";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { RollbackOutlined } from "@ant-design/icons";

class InventoryDetailActionRight extends React.Component {
    render() {
        const {
            inventory: { locationName, address },
            toggleViewType,
        } = this.props;
        const addressdata1 = address && address && address[0].street;
        const addressdata2 = address && address && address[0].city;
        const addressdata3 = address && address && address[0].state;
        const addressdata4 = address && address && address[0].postalCode;
        const addressdata5 = address && address && address[0].country;
        return (
            <>
                <div class=" flex items-center" >

                    <div class=" flex justify-between" >

                        <div class=" flex flex-row w-[36rem] items-center"  >
                            <Title width="25%">
                                <label class=" text-base font-medium"> {` ${locationName || ""} `}</label>
                            </Title>

                            <div class=" flex w-[70%] justify-center ml-[1rem]"  >
                                {`${addressdata1 || ""} ${addressdata2 || ""} ${addressdata3 || ""} ${addressdata4 || ""} ${addressdata5 || ""}`}
                            </div>




                        </div>
                    </div>
                    <Tooltip title="Back">
                        <RollbackOutlined
                            class="text-[#1890ff]"
                            onClick={() => {
                                this.props.history.goBack();
                                this.props.handleResetTab();
                            }}
                        />
                    </Tooltip>
                </div>

            </>
        );
    }
}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InventoryDetailActionRight)
);

const InventoryItemRow = ({ label, value }) => {
    return (
        <div class=" flex items-center flex-no-wrap m-[0.4rem]"
        >
            <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
            <SubTitle style={{ marginLeft: "-30px", textOverflow: "ellipsis" }}>
                {value}
            </SubTitle>
        </div>
    );
};



import React from "react";
import { withRouter } from "react-router";
import { Title, } from "../../../../../Components/UI/Elements";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { RollbackOutlined } from "@ant-design/icons";
import { emptyInventory } from "../../InventoryAction"

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

                        <div class=" flex flex-row w-[50rem] items-center justify-between"  >
                            <Title width="25%">
                                <label class=" text-sm font-medium"> {` ${locationName || ""} `}</label>
                            </Title>

                            <div class=" flex  justify-center ml-[1rem]"  >
                                {`${addressdata1 || ""} ${addressdata2 || ""} ${addressdata3 || ""} ${addressdata4 || ""} ${addressdata5 || ""}`}
                            </div>




                        </div>
                    </div>
                    {/* <Tooltip title="Back">
                        <RollbackOutlined
                            style={{ marginRight: "0.3rem", color: "#1890ff" }}
                            onClick={() => {
                                this.props.history.goBack();
                                this.props.emptyInventory()
                            }}
                        />
                    </Tooltip> */}
                </div>

            </>
        );
    }
}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    emptyInventory
}, dispatch);

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

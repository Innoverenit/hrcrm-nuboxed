import React from "react";

import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { emptyDistributor } from "../AccountAction"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

class AccountDetailsHeaderLeft extends React.Component {
    render() {
        return (
            <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
                <Tooltip title="Back">
                    <KeyboardReturnIcon
                        style={{ marginRight: "0.3rem", color: "#1890ff" }}
                        // iconType="rollback"
                        // tooltipTitle="Back"

                        onClick={() => {
                            this.props.emptyDistributor()
                            this.props.history.goBack();
                        }}

                    />
                </Tooltip>
                <div>
                    <b>
                        {this.props.distributorData.name || ""}
                    </b>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    emptyDistributor
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsHeaderLeft)


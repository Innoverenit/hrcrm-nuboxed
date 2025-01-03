import React from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { emptyDistributor } from "../AccountAction"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from "react-router-dom";

function AccountDetailsHeaderLeft (props) {

  const navigate = useNavigate();

        return (
            <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
                <Tooltip title="Back">
                    <KeyboardReturnIcon
                        style={{ marginRight: "0.3rem", color: "#1890ff", cursor:"pointer" }}
                      onClick={() => {
              navigate(-1)
              props.emptyDistributor()
            }}/>
                </Tooltip>
                <div>
                    <b>
                        {props.distributorData.name || ""}
                    </b>
                </div>
            </div>
        );   
}
const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    emptyDistributor
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsHeaderLeft)


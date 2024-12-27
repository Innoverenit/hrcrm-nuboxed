import React from "react";
import { useNavigate } from "react-router-dom";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

function DistributorDetailsHeaderLeft (props) {
 const navigate = useNavigate();
    return (
      <FlexContainer alignItems="center">
        <Tooltip title="Back">
          <KeyboardReturnIcon
            style={{ marginRight: "0.3rem",color: "#1890ff" }}
            // iconType="rollback"
            // tooltipTitle="Back"
            
            onClick={() => {
              navigate(-1)
              
            }}
          />
        </Tooltip>
      </FlexContainer>
    );
  }

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DistributorDetailsHeaderLeft)


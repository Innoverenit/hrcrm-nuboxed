import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Tooltip } from "antd";

function InvestorDetailActionLeft (props) {
   const navigate = useNavigate();
  
    return (
      <div class=" flex items-center">
         <Tooltip title="Back">
        <KeyboardReturnIcon
          iconType="rollback"
          onClick={() => {
            navigate(-1)
            
          }}
        />
        </Tooltip>
      </div>
    );
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDetailActionLeft)


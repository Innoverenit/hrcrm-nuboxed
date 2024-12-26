import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

function CustomerDetailActionLeft (props) {
  const navigate = useNavigate();
    return (
      <div class=" flex items-center">
        <KeyboardReturnIcon
          iconType="rollback"
         tooltipTitle="Back"
        className=" cursor-pointer"
        onClick={() => {navigate(-1)}}
        />
      </div>
    );

}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailActionLeft)


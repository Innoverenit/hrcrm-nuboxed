import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


function SupplierDetailsHeaderLeft(props) {

   const navigate = useNavigate();
    return (
      <div class="items-center">
        <Tooltip 
       title="Back"
      >
          <KeyboardReturnIcon
           className=" cursor-pointer ml-1 text-2xl text-[#1890ff]"
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetailsHeaderLeft)


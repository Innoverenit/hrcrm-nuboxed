import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TableViewIcon from '@mui/icons-material/TableView';
import { Tooltip } from "antd";

const ProgramActionLeft = (props) => {
 
  return (
    <div class=" flex items-center">
<Tooltip
        title= "Table View"
      >
        <span class=" mr-2 text-sm cursor-pointer"
          onClick={() => props.setProgramViewType("table")}
          style={{
           color: props.viewType === "table" && "#1890ff",
          }}
        >
        <TableViewIcon  />
        </span>
      </Tooltip>
      
    </div>
  );
};

const mapStateToProps = ({leads}) => ({
});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProgramActionLeft);

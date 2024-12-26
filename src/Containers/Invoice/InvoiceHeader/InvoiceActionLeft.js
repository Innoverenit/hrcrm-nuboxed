import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TableViewIcon from '@mui/icons-material/TableView';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { } from 'react-speech-recognition';
import { Input, Tooltip } from "antd";

const { Search } = Input;

const InvoiceActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  function handleChange(data) {
    
  }
  const suffix = (
    <MicIcon
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );
  return (
    <div class=" flex items-center"
    >

<Tooltip
        title= "Table View"
      >
        <span class=" mr-2 text-sm cursor-pointer"
          onClick={() => props.setInvoiceViewType("table")}
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
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceActionLeft);

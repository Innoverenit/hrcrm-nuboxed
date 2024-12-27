import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HandshakeIcon from '@mui/icons-material/Handshake';
import LanguageIcon from '@mui/icons-material/Language';
import TableViewIcon from '@mui/icons-material/TableView';

import SpeechRecognition, {  } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import {
   inputPartnerDataSearch ,
   getRecords,
   //inputPartnerSearch
} 
from "../PartnerAction";
import { Button, Input,Badge,Tooltip } from "antd";
const { Search } = Input;
const suffix = (
  <MicIcon
    onClick={SpeechRecognition.startListening}
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}


  />
);
const PartnerActionLeft = (props) => {
  const { user, setPartnerViewType, viewType, dateRangeList, setSelectedTimeInterval,
    setTimeRange, startDate,
    endDate, } = props;

    useEffect(() => {
      props.getRecords(props.userId);
  }, [props.userId]);

  return (
   
  <div class=" flex items-center" >  
         
       <Tooltip
        title="Vendor"
      >
        <Badge size="small" count={props.viewType === "list" &&props.recordData.PartnerDetails || 0} overflowCount={5000}>
        <span  class=" mr-2 text-sm cursor-pointer"
          onClick={() => props.setPartnerViewType("list")}
          style={{
            color: props.viewType === "list" && "#24d8a7",
          }}
        >
          <HandshakeIcon/>
        </span>
        </Badge>
      </Tooltip>
      <Tooltip>
      <Badge size="small" count={ props.viewType === "card" &&props.recordData.PartnerDetails || 0}>
     <span class=" mr-2 text-sm cursor-pointer"
       onClick={() => props.setPartnerViewType("card")}
       style={{
         color: props.viewType === "card" && "#1890ff",  
       }}
     >
      <TableViewIcon/>
       </span>
</Badge>
 </Tooltip>
 <Tooltip
        title="Map View" 
      >
        <Badge size="small" count={ props.viewType === "map" &&props.recordData.PartnerDetails || 0}>
        <span class=" mr-2 text-sm cursor-pointer"
          style={{
            color: props.viewType === "map" && "#1890ff",
          }}
         
          onClick={() => props.setPartnerViewType("map")}
        >
          <LanguageIcon/>
        </span>
        </Badge>
      </Tooltip>  
      
      <div class=" w-72" >
          <Input
            placeholder="Search by Name, Sector or Owner"
            width={"100%"}
            suffix={suffix}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
       
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputPartnerDataSearch(props.currentData);
          }}
        >
          Submit
        </Button>
       
      
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.handleClear();
          }}
          disabled={props.currentData}
        >
        
          Clear
        </Button>
              
      
     
  </div>
 
  );
};
const mapStateToProps = ({auth,partner}) => ({
  userId: auth.userDetails.userId,
  //fetchingPartnerInputSearch:partner.fetchingPartnerInputSearch,
  fetchingPartnerInputSearchData:partner.fetchingPartnerInputSearchData,
  recordData: partner.recordData,
  userId: auth.userDetails.userId,


});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputPartnerDataSearch,
  //inputPartnerSearch,
  getRecords
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PartnerActionLeft)


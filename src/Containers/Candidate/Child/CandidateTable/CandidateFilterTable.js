import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {  Select, } from "antd";
import { StyledTable, } from "../../../../Components/UI/Antd";
const Option =Select;

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CandidateFilterTable(props) {
  useEffect(() => {

  }, []);

  const {
    fetchingOpportunity,
    user,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
  } = props;

  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      //title: "Name",
      title: "Filter ID"    
      ,
      width: "20%",
    
    },
    {
      //title: "Currency",
      title: "Parameter"
     ,
       width: "15%",
    },


    
  ];
  return (
    <>
     <StyledTable
        // rowSelection={rowSelection}
        rowKey={(record) => record.opportunityId}
        columns={columns}
        dataSource={props.skillExperince
        }
        onChange={onChange}
        scroll={{ y: 240 }}     
        pagination={false}
      />
  </>
)}
     

// }
const mapStateToProps = ({ auth, account, opportunity }) => ({
 
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateFilterTable);



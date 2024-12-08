import React, { Component } from "react";
import { StyledTable } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";

class RecruitmentFileTable extends Component {

  render() {
    const columns = [
      {
        title: "Invoice#"
       ,
        dataIndex: "stageName",
        sorter: (a, b) => {
          const stageA = a.stageA && a.stageA.toLowerCase();
          const stageB = b.stageB && a.stageB.toLowerCase();
          if (stageA < stageB) {
            return -1;
          }
          if (stageA > stageB) {
            return 1;
          }
          return 0;
        },
      },
      {
        // title: "Reviewer",
        title: "Date"
        ,
        dataIndex: "reviewer",
        sorter: (a, b) => {
          const reviewerA = a.reviewerA && a.reviewerA.toLowerCase();
          const reviewerB = b.reviewerB && a.reviewerB.toLowerCase();
          if (reviewerA < reviewerB) {
            return -1;
          }
          if (reviewerA > reviewerB) {
            return 1;
          }
          return 0;
        },
      },
      {
        title: "Amount" 
      ,
        dataIndex: "note",
        sorter: (a, b) => {
          const commentsA = a.commentsA && a.commentsA.toLowerCase();
          const commentsB = b.commentsB && a.commentsB.toLowerCase();
          if (commentsA < commentsB) {
            return -1;
          }
          if (commentsA > commentsB) {
            return 1;
          }
          return 0;
        },
      },

      {
        title: "Currency" 
     ,
        dataIndex: "note",
        sorter: (a, b) => {
          const commentsA = a.commentsA && a.commentsA.toLowerCase();
          const commentsB = b.commentsB && a.commentsB.toLowerCase();
          if (commentsA < commentsB) {
            return -1;
          }
          if (commentsA > commentsB) {
            return 1;
          }
          return 0;
        },
      },

      {
        title: "Contact" 
   ,
        dataIndex: "note",
        sorter: (a, b) => {
          const commentsA = a.commentsA && a.commentsA.toLowerCase();
          const commentsB = b.commentsB && a.commentsB.toLowerCase();
          if (commentsA < commentsB) {
            return -1;
          }
          if (commentsA > commentsB) {
            return 1;
          }
          return 0;
        },
      },
    ];
    if (this.props.fetchingRemarkError) {
      return <APIFailed />;
    }
    return (
      <>
        <StyledTable
          columns={columns}
          dataSource={this.props.remark}
          Loading={this.props.fetchingRemark || this.props.fetchingRemarkError}
          scroll={{ y: 100 }}
          pagination={false}
        />
      </>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentFileTable);

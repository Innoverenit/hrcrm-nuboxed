import React, { Component } from "react";
import { StyledTable } from "../../../../../../../Components/UI/Antd";
// import { getRemark } from "../../../../../OpportunityAction";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";

class RemarksTable extends Component {
  // componentDidMount() {
  //   this.props.getRemark(this.props.profileId);
  // }
  render() {
    const columns = [
      {
        //title: "Stage",
        title: <FormattedMessage
          id="app.stageName"
          defaultMessage="Stage"
        />,
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
        title: <FormattedMessage
          id="app.reviewer"
          defaultMessage="Reviewer"
        />,
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
        //  title: "Comments",
        title: <FormattedMessage
          id="app.note"
          defaultMessage="" Comments
        />,
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
  // fetchingRemark: opportunity.fetchingRemark,
  // fetchingRemarkError: opportunity.fetchingRemarkError,
  // remark: opportunity.remark,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getRemark
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RemarksTable);

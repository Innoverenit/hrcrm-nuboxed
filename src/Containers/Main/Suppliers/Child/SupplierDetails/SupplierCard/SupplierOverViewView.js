import React, { Component } from "react";
import {  MultiAvatar } from "../../../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";


class SupplierOverViewView extends Component {
  render() {
    const {
        supplier: { name },
      toggleViewType,
      handleFeedbackModal,
      feedbackModal,
    } = this.props;
    return (
      <>
        <div class="flex justify-between items-center">
          <div class="flex start-0 flex-nowrap w-full items-center mb-6">
            <div>
              <MultiAvatar />
            </div>
            &nbsp;
            <div class="flex-col w-wk max-xl:text-[0.65rem] overflow-hidden text-ellipsis text-xl ">
              {/* <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"0.875rem"}
              > */}
                {`${name || ""}`}
              {/* </Title> */}
            </div>
            <Tooltip title="Feedback">
              <span
                onClick={() => handleFeedbackModal(true)}
                style={{ cursor: "pointer" }}
              >
                <i
                  class="far fa-comment-alt"
                  style={{ fontSize: "15px" }}
                ></i>
              </span>
            </Tooltip>
           
          </div>
        </div>    
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  feedbackModal: shipper.feedbackModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // handleFeedbackModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierOverViewView);

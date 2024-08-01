import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

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
          <div class="flex start-0 flex-nowrap w-full items-center">
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
            <Tooltip title={<FormattedMessage id="app.feedback" defaultMessage="Feedback" />}>
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

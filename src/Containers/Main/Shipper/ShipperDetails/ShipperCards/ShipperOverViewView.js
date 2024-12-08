import React, { Component, lazy, Suspense } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFeedbackModal } from "../../ShipperAction";
import { Tooltip } from "antd";
const ShipperFeedbackModal =lazy(()=>import("./ShipperFeedbackModal"));

class ShipperOverViewView extends Component {
  render() {
    const {
      shipper: { shipperName },
      toggleViewType,
      handleFeedbackModal,
      feedbackModal,
    } = this.props;
    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "70%" }}
          >
            <div style={{ width: "25%" }}>
              <MultiAvatar />
            </div>
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                // fontSize={"22px"}
              >
                {`${shipperName || ""}`}
              </Title>
            </FlexContainer>
            <Tooltip title="Feedback">
              <span
                onClick={() => handleFeedbackModal(true)}
                style={{ cursor: "pointer" }}
              >
                <i
                  class="far fa-comment-alt"
                  style={{ fontSize: "15px", marginTop: "4px" }}
                ></i>
              </span>
            </Tooltip>
          </FlexContainer>
        </FlexContainer>
        <Suspense fallback={"Loading..."}>
        <ShipperFeedbackModal
          handleFeedbackModal={handleFeedbackModal}
          feedbackModal={feedbackModal}
        />
        </Suspense>
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
      handleFeedbackModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperOverViewView);

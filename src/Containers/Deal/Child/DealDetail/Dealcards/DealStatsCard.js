import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import {ReadOutlined } from '@ant-design/icons';
import { message, Tooltip, Popover} from "antd";
import dayjs from "dayjs";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { BussinessCard, Spacer } from "../../../../../Components/UI/Elements";
import StagesSwitch from "./StagesSwitch";

class DealStatsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStageId: "",
      qualify: false,
    };
  }
  handleSetCurrentStage = (id) => {
    debugger;
    this.setState({ currentStageId: id });
  };

  handleCallback = (id) => {
    message.success("Stage updated successfully!");
  };
  handleCallback2 = (checked) => {
    this.setState({ qualify: checked });
  };
  onChange = (checked) => {
    this.setState(
      { qualify: true },
      // this.props.getLeadsAccounts(this.props.userId, 0),
      // this.props.getFilterJunkContact(),
      // this.props.convertLeadsContactToActualContact(
      // this.props.leadsId,
      this.handleCallback2
      // )
    );
  };

  render() {
    const { dealDetailsbyID } = this.props;
    console.log(this.state.currentStageId);

    return (
      <>
        <FlexContainer
          style={{}}
          justifyContent="space-between"
          alignSelf="center"
          alignItems="center"
        >
          <StageStatus
            stages={dealDetailsbyID.stageMapper}
            key={dealDetailsbyID.invOpportunityId}
            dealDetailsbyID={dealDetailsbyID}
            currentStageId={this.state.currentStageId}
            // addPlaybookModal={this.props.addPlaybookModal}
            handleCallback={this.handleCallback}
            handleSetCurrentStage={this.handleSetCurrentStage}
          />
          {/* <span>&#10230;</span> */}
        </FlexContainer>
        {/* <OpportunityPlaybookModal
          currentStageId={this.state.currentStageId}
          addPlaybookModal={this.props.addPlaybookModal}
          handlePlaybookModal={this.props.handlePlaybookModal}
        /> */}
      </>
      // </div>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, account }) => ({
  user: auth.userDetails,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealStatsCard);
function StageStatus({
  stages,
  dealDetailsbyID,
  handleCallback,
  updateOpportunityStageByParticularOpportunity,
  handlePlaybookModal,
  handleSetCurrentStage,
  currentStageId,
  subscriptionType,
}) {
  console.log(stages);
  const index =
    stages &&
    stages
      .sort((a, b) =>
        Number(a.probability) > Number(b.probability)
          ? 1
          : Number(b.probability) > Number(a.probability)
            ? -1
            : 0
      )
      .findIndex((stage) => stage.stageId === dealDetailsbyID.stageId);
  return (
    <>
      {stages &&
        stages
          .sort((a, b) =>
            Number(a.probability) > Number(b.probability)
              ? 1
              : Number(b.probability) > Number(a.probability)
                ? -1
                : 0
          )
          .map((stage, i) => {
            let backgroundColor =
              index >= i ? `rgba(3, 89, 30, 0.${i + 1})` : "whiteSmoke";
            let lossBackgroundColor =
              index >= i ? `rgba(204, 39, 24, 0.${i + 2})` : "#db584c";
            let boxShadow =
              index >= i
                ? `0.625em -0.625em 0 0 rgba(3, 89, 30, 0.${i + 2})`
                : `0.625em -0.625em 0 0 rgba(3, 89, 30, 0.${i + 2})`;
            let lossBoxShadow =
              index >= i
                ? `0.625em -0.625em 0 0 rgba(204, 39, 24, 0.${i + 2})`
                : "#db584c";

            // if (stage.stageName === 'Lost') {
            //     backgroundColor = 'red'
            // }
            if (dealDetailsbyID.probability === 0) {
              if (stage.probability === 100) {
                return;
              } else {
                return (
                  <div
                  // style={{ cursor: "pointer" }}
                  // onClick={() => alert(stage.stageId)}
                  >
                    <Tooltip title={"Lost"} key={stage.stageId}>
                      {/* <Arrow
                      style={{
                        backgroundColor: "#db584c",
                        boxShadow
                      }}
                    /> */}
                      <FlexContainer>
                        <svg
                          width="82"
                          height="37"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <title>background</title>
                            <rect
                              fill="#fff"
                              id="canvas_background"
                              height="39"
                              width="84"
                              y="-1"
                              x="-1"
                            />
                            <g
                              display="none"
                              overflow="visible"
                              y="0"
                              x="0"
                              height="100%"
                              width="100%"
                              id="canvasGrid"
                            >
                              <rect
                                fill="url(#gridpattern)"
                                stroke-width="0"
                                y="2"
                                x="2"
                                height="1200"
                                width="1600"
                              />
                            </g>
                          </g>
                          <g>
                            <path
                              id="svg_1"
                              d="m274.63499,250.75498l68.99998,0l23.00003,13.99998l-23.00003,14.00004l-68.99998,0l23.00003,-14.00004l-23.00003,-13.99998z"
                              stroke-width="0.5"
                              stroke="#000"
                              fill="#db584c"
                            />
                            <path
                              stroke="#000"
                              id="svg_2"
                              d="m0.99844,2.99688l59.99998,0l20.00003,15.49997l-20.00003,15.50003l-59.99998,0l20.00002,-15.50003l-20.00002,-15.49997z"
                              stroke-width="0.5"
                              fill="#db584c"
                            />
                          </g>
                        </svg>
                      </FlexContainer>
                      {/* <p
                      style={{
                        backgroundColor: "#db584c",
                        margin: "0.625em",
                        cursor: "pointer",
                        width: "3.125em",
                        height: "0.5625em",
                        borderRadius: "20%",
                      }}
                    ></p> */}
                    </Tooltip>
                  </div>
                );
              }
            } else {
              if (stage.probability === 0) {
                return;
              } else {
                return (
                  <Popover
                    title={stage.stageName}
                    key={stage.stageId}
                    content={
                      subscriptionType === "FREE" ||
                        subscriptionType === "STARTER" ? null : (
                          <>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                              onClick={() => {
                                handlePlaybookModal(true);
                                handleSetCurrentStage(stage.stageId);
                              }}
                            >
                              <ReadOutlined
                                type="read"
                                style={{
                                  color: "#fb8500",
                                  fontSize: "1.5625em",
                                  marginTop: "0em",
                                  cursor: "pointer",
                                  marginBottom: "-0.125em",
                                }}
                              />
                            </div>
                          &nbsp;
                            <div>
                              <StagesSwitch
                                dealDetailsbyID={dealDetailsbyID}
                                disableInd={stage.disableInd}
                                currentStageId={stage.stageId}
                                stageName={stage.stageName}
                              />
                            </div>
                          </>
                        )
                    }
                  >
                    <div
                      style={{
                        cursor:
                          dealDetailsbyID.probability === 100
                            ? "not-allowed"
                            : "pointer",
                      }}
                      onClick={() =>
                        dealDetailsbyID.probability === 100
                          ? null
                          : updateOpportunityStageByParticularOpportunity(
                            stage.stageId,
                            dealDetailsbyID.invOpportunityId,
                            () => handleCallback(dealDetailsbyID.invOpportunityId)
                          )
                      }
                    >
                    
                      <FlexContainer>
                        <svg
                          width="82"
                          height="37"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <title>background</title>
                            <rect
                              fill="#fff"
                              id="canvas_background"
                              height="39"
                              width="84"
                              y="-1"
                              x="-1"
                            />
                            <g
                              display="none"
                              overflow="visible"
                              y="0"
                              x="0"
                              height="100%"
                              width="100%"
                              id="canvasGrid"
                            >
                              <rect
                                fill="url(#gridpattern)"
                                stroke-width="0"
                                y="2"
                                x="2"
                                height="1200"
                                width="1600"
                              />
                            </g>
                          </g>
                          <g>
                            <path
                              id="svg_1"
                              d="m274.63499,250.75498l68.99998,0l23.00003,13.99998l-23.00003,14.00004l-68.99998,0l23.00003,-14.00004l-23.00003,-13.99998z"
                              stroke-width="0.5"
                              stroke="#000"
                              fill={backgroundColor}
                            />
                            <path
                              stroke="#000"
                              id="svg_2"
                              d="m0.99844,2.99688l59.99998,0l20.00003,15.49997l-20.00003,15.50003l-59.99998,0l20.00002,-15.50003l-20.00002,-15.49997z"
                              stroke-width="0.5"
                              fill={backgroundColor}
                            />
                          </g>
                        </svg>
                      </FlexContainer>
                    </div>
                  </Popover>
                );
              }
            }
          })}
    </>
  );
}
const p = styled.div`
  /* border-left: 1.25em solid transparent;
  margin-top: -1.375em;
  margin-left: 3.75em;
  border-top: 1.125em solid transparent;
  border-bottom: 1.125em solid transparent;
  width: 0;
  height: 0;
  margin: 3.125em auto; */
  position: relative;
  display: inline-block;
  margin: 0.625em;

  //set size
  padding: 0.625em;

  //set tickness
  /* box-shadow: 0.625em -0.625em 0 0 backgroundColor; */
  transform: rotate(405deg);
  /* margin-top: -0.9375em; */
  margin-left: -0.625em;
`;

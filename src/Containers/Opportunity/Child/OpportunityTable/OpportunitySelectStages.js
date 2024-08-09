import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Spin } from "antd";

class OpportunitySelectStages extends Component {
 
  handleStageClick = (opportunityStagesId) => {
    // this.setState({ loading: true });
    this.props.stageClick(opportunityStagesId, () => {
     
    });
  };

  render() {
    // const { loading } = this.state;
    const { rec } = this.props;
    const index =
      rec.stageList &&
      rec.stageList
        .sort((a, b) =>
          Number(a.probability) > Number(b.probability)
            ? 1
            : Number(b.probability) > Number(a.probability)
            ? -1
            : 0
        )
        .findIndex((stage) => stage.opportunityStagesId === this.props.opportunityStagesId);

    return (
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
        {" "}
        {rec.stageList
          .filter((item) => item.probability !== 0 && item.probability !== 100)
          .map((item, i) => {
            // let backgroundColor =
            //   index >= i ? `rgba(3, 89, 30, 0.${i + 1})` : "lightgray";
            return (
              <div
                style={{
                  cursor:
                    // this.props.recruitOwner !=this.props.fullName
                    //   ? "not-allowed"
                    //   : this.props.candidateName
                    //   ? "pointer"
                    //   : "not-allowed",
                    "pointer"
                }}
                onClick={() =>
                //   this.props.recruitOwner !=this.props.fullName
                //     ? null
                //     : this.props.candidateName
                //     ? this.handleStageClick(item.stageId)
                //     : null
                this.handleStageClick(item.opportunityStagesId)
                }
                // loading={this.props.linkingOpportunity}
              >
                <Tooltip title={item.stageName}>
                {/* <Spin spinning={loading}> */}
                  <svg
                    width="21"
                    height="17"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <title>background</title>
                      <rect
                        fill="#fff"
                        id="canvas_background"
                        height="19"
                        width="23"
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
                          y="0"
                          x="0"
                          height="100%"
                          width="100%"
                        />
                      </g>
                    </g>
                    <g>
                      <title></title>
                      <path
                        stroke="#5f5f5c"
                        id="svg_1"
                        d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
                        stroke-width="0.5"
                      
                        fill={
                          item.stageName === rec.oppStage
               
                            ? "green"
                            : "rgba(3, 89, 30, 0.6)"
                        }
                      />
                    </g>
                  </svg>
                 
                </Tooltip>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, account }) => ({

  linkingOpportunity:opportunity.linkingOpportunity,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getStages,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitySelectStages);

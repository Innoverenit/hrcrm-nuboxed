import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactSpeedometer from "react-d3-speedometer";
import { getOpportunityDeviation } from "../../../OpportunityAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { HeaderText } from "../../../../../Components/UI/Elements";
import { Empty, Divider } from "antd";
class OpportunityDeviationChart extends Component {
  componentDidMount() {
    const {
      opportunity: { opportunityId },
      getOpportunityDeviation
    } = this.props;
    // getOpportunityDeviation(opportunityId);
  }
  render() {
    const {
      fetchingOpportunityDeviation,
      fetchingOpportunityDeviationError,
      opportunityDeviation
    } = this.props;
    const {
      currentAmount,
      deviationAmount,
      previousAmount,
      deviationPercentage
    } = opportunityDeviation;
    if (fetchingOpportunityDeviation) return <BundleLoader />;
    if (fetchingOpportunityDeviationError)
      return <Empty description="Something went wrong! occoured" />;
    return (
      <MainWrapper >
        <HeaderText style={{ fontSize: 15, textAlign: "center" }}>
          Proposal value - Current/previous stages
          {/* change in (%) */}
          <br />
          <br />
          <ReactSpeedometer
            maxValue={100}
            minValue={-100}
            // value={deviationPercentage}
            currentValueText="#{value}%"
            currentValuePlaceholderStyle="#{value}"
            // value={`${deviationPercentage} hhhhh`}
            width={250}
            height={160}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
          />
        </HeaderText>
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  // fetchingOpportunityDeviation: opportunity.fetchingOpportunityDeviation,
  // fetchingOpportunityDeviationError:
  //   opportunity.fetchingOpportunityDeviationError,
  // opportunityDeviation: opportunity.opportunityDeviation
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // getOpportunityDeviation
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDeviationChart);

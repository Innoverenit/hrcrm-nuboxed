import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';

import { JumpStartBox } from "../../../../Components/UI/Elements";
import { CurrencySymbol } from "../../../../Components/Common";
import {
  getAllRecruitmentByOppId,
  getAllRecruitmentPositionByOppId,
   getAllRecruitmentAvgTimeByOppId,
  getAllRecruitmentPositionFilledByOppId,
} from "../../OpportunityAction";
class RecruitProJumpStart extends Component {
  componentDidMount() {
    this.props.getAllRecruitmentByOppId(this.props.opportunityId);
     this.props.getAllRecruitmentPositionByOppId(this.props.opportunityId);
     this.props.getAllRecruitmentAvgTimeByOppId(this.props.opportunityId);
     this.props.getAllRecruitmentPositionFilledByOppId(this.props.opportunityId);
  }
  render() {
    return (
      <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
          <JumpStartBox
            // title="# Requirements"
            title={<FormattedMessage
              id="app.requirements"
              defaultMessage="# Requirements"
            />}
            noProgress
            stringValue
             value={this.props.allRecruitmentByOppId}
            isLoading={this.props.fetchingAllRecruitmentByOppId}
          />
          <CurrencySymbol />
          <JumpStartBox
            //title="# Positions"
            title={<FormattedMessage
              id="app.positions"
              defaultMessage="# Positions"
            />}
            noProgress
            stringValue
             isLoading={this.props.fetchingAllRecruitmentPositionByOppId}
             value={this.props.allRecruitmentPositionByOppId}
           
          />

          <JumpStartBox
            noProgress
            stringValue
            //title="Positions Filled"
            title={<FormattedMessage
              id="app.#selected"
              defaultMessage="# Selected"
            />}
             isLoading={this.props.fetchingAllRecruitmentPositionFilledByOppId}
             value={this.props.allRecruitmentPositionFilledByOppId}
           
          />
          <JumpStartBox
            noProgress
            stringValue
            // title="Average Time"
            title={<FormattedMessage
              id="app.onboarded"
              defaultMessage="OnBoarded"
            />}
            isLoading={this.props.fetchingAllRecruitmentAvgTimeByOppId}
              value={this.props.allRecruitmentAvgTimeByOppId.recruitProfileLinkDetails}
           
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  opportunityId: opportunity.opportunity.opportunityId,
  fetchingAllRecruitmentByOppId: opportunity.fetchingAllRecruitmentByOppId,
  fetchingAllRecruitmentByOppIdError:
    opportunity.fetchingAllRecruitmentByOppIdError,
   allRecruitmentByOppId: opportunity.allRecruitmentByOppId,

  fetchingAllRecruitmentPositionByOppId:
     opportunity.fetchingAllRecruitmentPositionByOppId,
 fetchingAllRecruitmentPositionByOppIdError:
     opportunity.fetchingAllRecruitmentPositionByOppIdError,
   allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,

   fetchingAllRecruitmentAvgTimeByOppId:
     opportunity.fetchingAllRecruitmentAvgTimeByOppId,
   fetchingAllRecruitmentAvgTimeByOppIdError:
    opportunity.fetchingAllRecruitmentAvgTimeByOppIdError,
   allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,

   fetchingAllRecruitmentPositionFilledByOppId:
   opportunity.fetchingAllRecruitmentPositionFilledByOppId,
   fetchingAllRecruitmentPositionFilledByOppIdError:
     opportunity.fetchingAllRecruitmentPositionFilledByOppIdError,
   allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getAllRecruitmentByOppId,
       getAllRecruitmentPositionByOppId,
       getAllRecruitmentAvgTimeByOppId,
      getAllRecruitmentPositionFilledByOppId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitProJumpStart);

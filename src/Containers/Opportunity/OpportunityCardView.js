import React, { Component } from "react";
import { MultiAvatar } from "../../Components/UI/Elements";
import { getOpportunityListByUserId } from "../Opportunity/OpportunityAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";

class OpportunityCardView extends Component {
  componentDidMount() {
    this.props.getOpportunityListByUserId(this.props.userId);
  }

  render() {
    return (
      <>
     <div class="flex"> 
        { !this.props.fetchingOpportunity && this.props.opportunityByUserId.length === 0 ?<NodataFoundPage />:this.props.opportunityByUserId.map((item,index) =>  {
            return (
              <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
          <div class="w-7 h-7" >
                  <MultiAvatar             
                    imgHeight={"1.8rem"}
                    imgWidth={"1.8rem"}              
                  />
                </div>

                <div>
                <div class="h-8 overflow-hidden whitespace-nowrap text-lg font-poppins font-bold overflow-ellipsis text-center">{item.opportunityName}</div>
                  <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">100</div>
                  translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                translatedMenuItems={this.props.translatedMenuItems}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  fetchingOpportunity:opportunity.fetchingOpportunity,
  opportunityByUserId: opportunity.opportunityByUserId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByUserId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityCardView);



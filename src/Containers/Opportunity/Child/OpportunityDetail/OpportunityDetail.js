import React, { Component, lazy,useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import OpportunityDetailHeader from "./OpportunityDetailHeader";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getOpportunityById } from "../../OpportunityAction";
const OpportunityDetailLeft = lazy(() => import("./OpportunityDetailLeft"));
const OpportunityDetailRight = lazy(() => import("./OpportunityDetailRight"));

function OpportunityDetail (props){
  const { opportunityId, data } = useParams();
  // componentDidMount() {
  //   this.props.getOpportunityById(this.props.match.params.opportunityId);
  //   console.log(this.props.location);
  // }
    useEffect(() => {
      props.getOpportunityById(opportunityId);
    }, [opportunityId]);
 
    const { opportunity, fetchingOpportunityById } = props;
    
    return (
      <>
        <OpportunityDetailHeader
          opportunity={opportunity}
          fetchingOpportunityById={fetchingOpportunityById}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
        />
        {fetchingOpportunityById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            <Suspense fallback={""}>
            <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
                <div class=" w-[22%] max-sm:w-full max-sm:flex flex-col">
                  <OpportunityDetailLeft opportunity={opportunity}
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}
                   translatedMenuItems={props.translatedMenuItems}
                  />
                </div>
                <div class="w-[80%] max-sm:hidden">
                  <OpportunityDetailRight 
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}
                   translatedMenuItems={props.translatedMenuItems}
                  opportunity={opportunity}
                  />
                </div>
              </div>
            </Suspense>
          </div>
        )}
      </>
    );
  }


const mapStateToProps = ({ opportunity, auth }) => ({
  fetchingOpportunityById: opportunity.fetchingOpportunityById,
  fetchingOpportunityByIdfailure: opportunity.fetchingOpportunityByIdfailure,
  opportunity: opportunity.opportunity,
  // tradeurrency: auth.userDetails.tradeurrency,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getOpportunityById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDetail);

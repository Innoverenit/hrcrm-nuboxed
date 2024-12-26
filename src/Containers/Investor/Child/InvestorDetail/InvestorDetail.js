import React, { useEffect,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInvestorDetailsById } from "../../InvestorAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { useParams } from "react-router-dom";
import { BundleLoader } from "../../../../Components/Placeholder";
const InvestorDetailRight=lazy(()=> import("./InvestorDetailRight"));
const InvestorDetailLeft=lazy(()=> import("./InvestorDetailLeft"));
const InvestorDetailHeader=lazy(()=> import("./InvestorDetailHeader"));

function InvestorDetail (props) {
     const { investorId } = useParams();
    useEffect(()=> {
    props.getInvestorDetailsById(investorId);
  },[investorId]);

    const { investorDetails, fetchingInvestorDetailsById } = props;
    return (
      <>
        <>
       < Suspense fallback={"Loading..."}>
          <InvestorDetailHeader 
          investorDetails={investorDetails}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}/>
           </Suspense>
          {fetchingInvestorDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
              <div>
                <Suspense fallback={"Loading..."}>
                  <div class=" flex flex-nowrap w-full"
                >
                    <div class=" w-1/4">
                      <InvestorDetailLeft 
                      investorDetails={investorDetails} 
                       translateText={props.translateText}
                       selectedLanguage={props.selectedLanguage}/>
                    </div>
                    <div class=" w-3/4">
                      <InvestorDetailRight 
                      investorDetails={investorDetails}
                       translateText={props.translateText}
                       selectedLanguage={props.selectedLanguage} />
                    </div>
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  
}
const mapStateToProps = ({ investor }) => ({
  fetchingInvestorDetailsById: investor.fetchingInvestorDetailsById,
  investorDetails: investor.investorDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorDetailsById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDetail)


import React, {lazy, Suspense} from "react";
const InvestorOverviewCard =lazy(()=> import("./InvestorCards/InvestorOverviewCard"));
const InvestorExtraDetailCard =lazy(()=> import("./InvestorCards/InvestorExtraDetailCard"));
const InvestorDetailCard =lazy(()=> import("./InvestorCards/InvestorDetailCard"));

function InvestorDetailLeft(props) {
    const { investorDetails } = props;
    return (
      <>
        <div class=" flex flex-col">
        < Suspense fallback={"Loading..."}>
           <InvestorOverviewCard investorDetails={investorDetails}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage} />
       <InvestorExtraDetailCard investorDetails={investorDetails} 
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}/>         
          <InvestorDetailCard investorDetails={investorDetails}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} /> 
           </Suspense>
        </div>
      </>
    );
  
}
export default InvestorDetailLeft;

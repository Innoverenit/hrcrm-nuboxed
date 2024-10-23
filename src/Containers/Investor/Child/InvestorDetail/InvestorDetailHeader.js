import React, { lazy, Suspense } from "react";
import { ActionHeader } from "../../../../Components/Utils";
const InvestorDetailActionLeft =lazy(()=> import("./InvestorDetailActionLeft.js"));

function InvestorDetailHeader (props) {

    return (
      <div>
       < Suspense fallback={"Loading..."}>
        <ActionHeader
          leftComponent={<InvestorDetailActionLeft
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}/>}
          rightComponent={<></>}
        />
        </Suspense>
      </div>
    );
  
}

export default InvestorDetailHeader;

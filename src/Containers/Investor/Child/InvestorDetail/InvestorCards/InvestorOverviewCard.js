import React, { lazy , Suspense} from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const InvestorOverView=lazy(()=> import("./InvestorOverView"));

function InvestorOverviewCard (props) {
    const { investorDetails } = props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              < Suspense fallback={"Loading..."}>
              <InvestorOverView investorDetails={investorDetails} />
              </Suspense>
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  
}

export default InvestorOverviewCard;

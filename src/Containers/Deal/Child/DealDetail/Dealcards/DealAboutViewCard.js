import React, { Component,lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const DealRecruiterDetails = lazy(() => import("./DealRecruiterDetails"));
const DealRecruiterDetailsEdit = lazy(() => import("./DealRecruiterDetailsEdit"));

class DealAboutViewCard extends Component {
  render() {
    const { dealDetailsbyID } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <Suspense fallback={<BundleLoader />}>
              <DealRecruiterDetails
              dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
              /></Suspense>
            ) : (
             < Suspense fallback={<BundleLoader />}>
              <DealRecruiterDetailsEdit
                toggleViewType={toggleViewType}
                dealDetailsbyID={dealDetailsbyID}
              /></Suspense>
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default DealAboutViewCard;

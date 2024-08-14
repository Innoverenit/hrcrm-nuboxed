import React, { Component,lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const DealAboutEdit = lazy(() => import("./DealAboutEdit"));
const DealAboutView = lazy(() => import("./DealAboutView"));

class DealAboutCard extends Component {
  render() {
    const { dealDetailsbyID } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <Suspense fallback={<BundleLoader />}>
              <DealAboutView
                dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
                department={this.props.department}
                partnerLogin={this.props.partnerLogin}
                tradeCurrency={this.props.tradeCurrency}
              /></Suspense>
            ) : (
              <Suspense fallback={<BundleLoader />}>
              <DealAboutEdit
              dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
              /></Suspense>
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default DealAboutCard;

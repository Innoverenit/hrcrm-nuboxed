import React, { Component ,lazy,Suspense} from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../../Components/Placeholder";
const DealRecruiterDetailsEdit = lazy(() => import("./DealRecruiterDetailsEdit"));
const DealReportDetails = lazy(() => import("./DealReportDetails"));

class DealReportCard extends Component {
  render() {
    const { dealDetailsbyID } = this.props;
    return (
      <div>
        <Suspense fallback={<BundleLoader />}>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <DealReportDetails
              dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
              />
            ) : (
              <DealRecruiterDetailsEdit
                toggleViewType={toggleViewType}
                dealDetailsbyID={dealDetailsbyID}
              />
            )
          }
        </ViewEditCard>
        </Suspense>
      </div>
    );
  }
}

export default DealReportCard;

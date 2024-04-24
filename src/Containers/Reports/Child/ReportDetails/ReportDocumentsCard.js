import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const ReportDocumentsView =lazy(()=>import("./ReportDocumentsView"));

class ReportDocumentsCard extends Component {
  render() {
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ReportDocumentsView
                customer={customer}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ReportDocumentsCard;

import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const CustomerExtraDetailView =lazy(()=>import("./CustomerExtraDetailView"));

class CustomerExtraDetailCard extends Component {
  render() {
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CustomerExtraDetailView
                customer={customer}
                toggleViewType={toggleViewType}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}

              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CustomerExtraDetailCard;

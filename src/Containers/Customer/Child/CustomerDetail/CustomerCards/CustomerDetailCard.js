import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const CustomerDetailView =lazy(()=>import("./CustomerDetailView"));

class CustomerDetailCard extends Component {
  render() {
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CustomerDetailView
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

export default CustomerDetailCard;

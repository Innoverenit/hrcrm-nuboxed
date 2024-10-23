import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import OpportunityView from "./OpportunityView";
import OpportunityEdit from "./OpportunityEdit";

class OpportunityCard extends Component {
  render() {
    const { opportunity, account, updateAccount, setAccount } = this.props;
    console.log(opportunity);
    return (
      <div>
        <ViewEditCard class="w-64">
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OpportunityView
                opportunity={opportunity}
                account={account}
                toggleViewType={toggleViewType}
                updateAccount={updateAccount}
                setAccount={setAccount}
                department={this.props.department}
                partnerLogin={this.props.partnerLogin}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                translatedMenuItems={this.props.translatedMenuItems}
              />
            ) : (
              <OpportunityEdit
                opportunity={opportunity}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OpportunityCard;

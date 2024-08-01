import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
import SubscriptionActionRight from "./SubscriptionActionRight";
import SubscriptionActionLeft from "./SubscriptionActionLeft";
class SubscriptionHeader extends Component {
  render() {
    const {
      createSubscriptiondrawer,
      handleCreateSubscriptionDrawer
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
        <SubscriptionActionLeft/>
          }
          rightComponent={
            <SubscriptionActionRight
            handleSuscrptionModal={this.props.handleSuscrptionModal}
       addingSuscrpitionModal={this.props.addingSuscrpitionModal}
            />
          }
        />
      </div>
    );
  }
}

export default SubscriptionHeader;

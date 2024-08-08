import React, {} from "react";
import { ActionHeader } from "../../../../Components/Utils";
import ContactInvestDetailActionLeft from "./ContactInvestDetailActionLeft";

function ContactInvestDetailHeader(props) {

    return (
      <div>
        <ActionHeader
          leftComponent={<ContactInvestDetailActionLeft
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            />}
          rightComponent={<></>}
        />
      </div>
    );
}

export default ContactInvestDetailHeader;
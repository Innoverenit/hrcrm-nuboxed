import React, {} from "react";
import { ActionHeader } from "../../../../Components/Utils";
import ContactInvestDetailActionLeft from "./ContactInvestDetailActionLeft";

function ContactInvestDetailHeader(props) {

    return (
      <div>
        <ActionHeader
          leftComponent={<ContactInvestDetailActionLeft
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            translatedMenuItems={props.translatedMenuItems}
            />}
          rightComponent={<></>}
        />
      </div>
    );
}

export default ContactInvestDetailHeader;
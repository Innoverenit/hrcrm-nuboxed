import React, { lazy,Suspense,useEffect } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";

import { Badge, Tooltip } from "antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { handleCETactivityContactModal,
  // getContactActivityRecords
} from "../../ContactAction";
import ContactCETTab from "./ContactCETTab";
const ContactCETdr =lazy(()=>import("./ContactCETdr"));
const ContactCETcard =lazy(()=>import("./ContactCETcard"));

const TabPane = StyledTabs.TabPane;

function ContactCETdrawer (props) {

    return (
      <div>
        <StyledDrawer
          title={props.currentContact.fullName}
          width="60%"
          visible={props.contactCETdrawer}
          closable
          placement="right"
          destroyOnClose
          onClose={() => props.handleContactCETdrawer(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <ContactCETTab
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
         
           contact={props.contact}
        type={props.type}
          currentContact={props.currentContact}/>
          </Suspense>
        </StyledDrawer>
      </div>
    );
};
const mapStateToProps = ({ contact }) => ({
    clickCETcontactActivity:contact.clickCETcontactActivity,
    contactActivityCount:contact.contactActivityCount
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleCETactivityContactModal,
    // getContactActivityRecords
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactCETdrawer);

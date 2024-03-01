import React, { lazy, Suspense,useEffect } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { handleLeadCallModal,
  // getLeadsActivityRecords
 } from "../../LeadsAction";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Tooltip,Badge } from "antd";
const LeadsCetTab = lazy(() => import("./LeadsCetTab"));
const CallLeadsTable = lazy(() => import("./CallLeadsTable"));
const AddCallTaskModal = lazy(() => import("./AddCallTaskModal"));



const TabPane = StyledTabs.TabPane;

function  OpenCETmodal(props)  {
  return (
    <>
      <StyledDrawer
        title={props.rowdata.name}
        width="60%"
        visible={props.openCETmodal}
        onClose={() => {
          props.handleCETmodal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsCetTab rowdata={props.rowdata}/>
        </Suspense>
      </StyledDrawer>
    </>
  );


};

const mapStateToProps = ({ leads }) => ({
  addCallTaskModal: leads.addCallTaskModal,
  leadsActivityCount:leads.leadsActivityCount,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeadCallModal,
      // getLeadsActivityRecords
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpenCETmodal);



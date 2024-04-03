import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import NotesProspectForm from "./NotesProspectForm";
// const CustomerWordCloud =lazy(()=> import("./CustomerWordCloud"));
// const CustomerDocumentView =lazy(()=> import("./CustomerDocumentView"));
// const Customerbutton =lazy(()=> import("./Customerbutton"));
 
class AddCustomerNotesListDrawerModal extends Component {

 
  render() {
    // const {
    //   customerDrawerProps: { name,  },
    //   handleCustomerDrawerModal,
    //   opportunityDrawerVisible
    // } = this.props;
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          title="Notes"
          width={400}
          destroyOnClose
          closable
          visible={this.props.addCustomerNoteDrawerModal}
        onClose={() =>
          this.props.handleCustomerNoteDrawerModal( false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>

          <NotesProspectForm/>
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ customer }) => ({
//   customerDrawerProps: customer.customerDrawerProps,
//   addDrawerCustomerModal:customer.addDrawerCustomerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   handleCustomerDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerNotesListDrawerModal);
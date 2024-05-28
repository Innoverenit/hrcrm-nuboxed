import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
// import NotesLeadsForm from "./NotesLeadsForm";

class UpdateLeadsNotesListDrawerModal extends Component {

 
  render() {
    console.log(this.props.rowdata.leadsId)
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          // title="Notes"
          title={this.props.rowdata.notes}
          width="64%"
          destroyOnClose
          closable
          visible={this.props.updatingLeadsNoteDrawerModal}
        onClose={() =>
          this.props.updateLeadsNoteDrawerModal( false)
        }
        
        >
          {/* <Suspense fallback={<BundleLoader />}>

          <NotesLeadsForm
            rowdata={this.props.rowdata}
          />
        </Suspense> */}
         
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeadsNotesListDrawerModal);
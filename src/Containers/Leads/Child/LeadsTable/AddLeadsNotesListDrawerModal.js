import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import NotesLeadsForm from "./NotesLeadsForm";

class AddLeadsNotesListDrawerModal extends Component {

 
  render() {
    console.log(this.props.rowdata)
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          // title="Notes"
          title={this.props.rowdata.category}
          width="64%"
          destroyOnClose
          closable
          visible={this.props.addLeadsNoteDrawerModal}
        onClose={() =>
          this.props.handleLeadsNoteDrawerModal( false)
        }
        >
          <Suspense fallback={<BundleLoader />}>

          <NotesLeadsForm
          callTimeline={this.props.callTimeline}
            rowdata={this.props.rowdata}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddLeadsNotesListDrawerModal);
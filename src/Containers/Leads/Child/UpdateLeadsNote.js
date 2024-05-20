import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import UpdateNotesLeadsForm from "./UpdateNotesLeadsForm";

class UpdateLeadsNote extends Component {

 
  render() {

   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          title="Notes"
        //   title={this.props.rowdata.notes}
          width="64%"
          destroyOnClose
          closable
          visible={this.props.updatingLeadsNoteDrawer}
        onClose={() =>
          this.props.updateLeadsNoteDrawer( false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>

          <UpdateNotesLeadsForm
          notes={this.props.notes}
            notesId={this.props.notesId}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeadsNote);
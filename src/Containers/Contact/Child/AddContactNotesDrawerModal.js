import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import MainNotes from "../../CustomNote/MainNotes";


class AddContactNotesDrawerModal extends Component {

  render() {
      console.log("data5", this.props.contactData.contactId);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.contactData.fullName}
          width="38%"
          visible={this.props.addDrawerContactNotesModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleContactNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
             <MainNotes
             type="contact"
             uniqueId={this.props.contactData.contactId}
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactNotesDrawerModal);

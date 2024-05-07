import React, { Component, Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import LinkedProductNotes from "./LinkedProductNotes";





class AddProductNotesDrawerModal extends Component {
  render() {
    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.rowdata.suppliesName}
          width="64%"
          visible={this.props.addDrawerProductNotesModal}
          destroyOnClose
          closable
          onClose={() => this.props.handleProductNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <LinkedProductNotes
            rowdata={this.props.rowdata}
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
)(AddProductNotesDrawerModal);

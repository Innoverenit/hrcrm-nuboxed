import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import WarantyCard from "../Waranty/WarantyCard"

import { StyledDrawer } from "../../Components/UI/Antd";


class AddWarantyDrawerModal extends Component {
  render() {
   

    return (
      <div>
        <StyledDrawer
          title="Waranty"
          width="60%"
          visible={this.props.addDrawerWarantyModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleWarantyDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
 <WarantyCard/>
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWarantyDrawerModal);

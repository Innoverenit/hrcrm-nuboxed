import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Button, Icon } from "antd";

class TeamsActionRight extends React.Component {

  render() {

    const {
      handleTeamsModal,
    } = this.props;

    return (
      <div class="flex items-center" >
        {this.props.viewType === "order" || this.props.viewType === "table" ?
          <Button
            type="primary"
            // ghost
            onClick={() => handleTeamsModal(true)}
          >Add
          </Button>
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsActionRight);
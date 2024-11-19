import React from "react";
import { withRouter } from "react-router-dom";
import { FormattedMessage, } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

class ProjectsDetailActionLeft extends React.Component {
  render() {
    return (
    <div class=" flex items-center">
        <KeyboardReturnIcon
          iconType="rollback"
          tooltipTitle={
            <FormattedMessage
              id="app.back"
              defaultMessage="Back"
            />
          }
        onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsDetailActionLeft)
);

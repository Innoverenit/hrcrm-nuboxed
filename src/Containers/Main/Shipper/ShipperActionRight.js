import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Button, Tooltip } from "antd";
import {base_url} from "../../../Config/Auth";
class ShipperActionRight extends React.Component {
  render() {
    const { handleShipperModal, user,viewType } = this.props;
    return (
      
      <FlexContainer alignItems="center">
        {user.functionName === "Production" && user.designation === "Manager" &&
       viewType === "table" ?
          <Tooltip title={this.props.translatedMenuItems[21]}>
            <Button
              //type="primary"
              className="export"
              href={`${base_url}/export/shipper/${user.userId}`}
            >           
              {/* <i class="fas fa-download"></i> */}
            </Button>
          </Tooltip>
          :null}
        <Tooltip title={this.props.translatedMenuItems[15]}>
          <Button type="primary" onClick={() => handleShipperModal(true)}>
           {/* <FormattedMessage id="app.add" defaultMessage="Add" />  */} {this.props.translatedMenuItems[22]}
          </Button>
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperActionRight);

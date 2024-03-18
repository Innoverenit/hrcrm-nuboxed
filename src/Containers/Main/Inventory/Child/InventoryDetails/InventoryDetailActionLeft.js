import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
class InventoryDetailActionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      value: 1,
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  render() {

    const { setInventoryDetailViewType, viewType1 } = this.props
    return (
      <>
        <FlexContainer alignItems="center">

          {/* {user.designation === "Manager" && */}
          <Tooltip title="Material">
            <div
              className=" mr-2 cursor-pointer font-medium text-sm"
              style={{
                color: viewType1 === "material" && "#1890ff",
              }}
              onClick={() => setInventoryDetailViewType("material")}
            >
              Material
            </div>

          </Tooltip>
          {/* } */}
          {this.props.productionInd && <Tooltip title="Production">
            <div
              className=" mr-2 cursor-pointer font-medium text-sm"
              style={{
                color: viewType1 === "production" && "#1890ff",
              }}
              onClick={() => setInventoryDetailViewType("production")}
            >
              Production
            </div>
          </Tooltip>}
          {this.props.repairInd && <Tooltip title="Repair">
            <div
              className=" mr-2 cursor-pointer font-medium text-sm"
              style={{
                color: viewType1 === "repair" && "red",
              }}
              onClick={() => setInventoryDetailViewType("repair")}
            >
              Repair
            </div>
          </Tooltip>}

        </FlexContainer>

      </>
    );
  }
}
const mapStateToProps = ({ auth, production }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  productionInd: auth.userDetails.productionInd,
  repairInd: auth.userDetails.repairInd,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryDetailActionLeft);
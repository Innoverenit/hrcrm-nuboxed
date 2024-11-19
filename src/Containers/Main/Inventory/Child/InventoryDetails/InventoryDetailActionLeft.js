import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { emptyInventory } from "../../InventoryAction"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';
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
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">

          {/* {user.designation === "Manager" && */}
          <Link to="/inventory">
          <Tooltip title={this.props.translatedMenuItems[3]}>
                        <KeyboardReturnIcon
                            style={{ marginRight: "0.3rem", color: "#1890ff" }}
                            // onClick={() => {
                            //     this.this.props.history.goBack();
                            //     this.this.props.emptyInventory()
                            // }}
                        />
                    </Tooltip>
                    </Link>
          <Tooltip title={this.props.translatedMenuItems[0]}>
          <div
      className="mr-2  font-medium text-sm"
      style={{
        color: viewType1 === "material" ? "#1890ff" : "tomato",
      }}
      onClick={() => setInventoryDetailViewType("material")}
    >
      <Button type={viewType1 === "material" ? "primary" : ""} style={{ backgroundColor: viewType1 === "material" ? "" : "tomato" }}>
        <div class="text-white cursor-pointer">{this.props.translatedMenuItems[0]}</div>
      </Button>
    </div>

          </Tooltip>
          {/* } */}
          {this.props.productionInd && <Tooltip title={this.props.translatedMenuItems[1]}>
            <div
              className=" mr-2  font-medium text-sm"
              style={{
                color: viewType1 === "production" && "#1890ff",
              }}
              onClick={() => setInventoryDetailViewType("production")}
            >
             {/* <Button type="primary">  */}
             <Button type={viewType1 === "production" ? "primary" : ""} style={{ backgroundColor: viewType1 === "production" ? "" : "tomato" }}>
             <div class="text-white cursor-pointer">{this.props.translatedMenuItems[1]}</div></Button>
            </div>
          </Tooltip>}
          {this.props.repairInd && <Tooltip title={this.props.translatedMenuItems[2]}>
            <div
              className=" mr-2 cursor-pointer font-medium text-sm"
              style={{
                color: viewType1 === "repair" && "red",
              }}
              onClick={() => setInventoryDetailViewType("repair")}
            >
              <Button type={viewType1 === "repair" ? "primary" : ""} style={{ backgroundColor: viewType1 === "repair" ? "" : "tomato" }}>
                
              <div class="text-white cursor-pointer">{this.props.translatedMenuItems[2]}</div></Button>
            </div>
          </Tooltip>}

        </div>

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
const mapDispatchToProps = (dispatch) => bindActionCreators({emptyInventory}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryDetailActionLeft);
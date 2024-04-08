import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { emptyInventory } from "../../InventoryAction"
import { RollbackOutlined } from "@ant-design/icons";
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
        <FlexContainer alignItems="center">

          {/* {user.designation === "Manager" && */}
          <Link to="/inventory">
          <Tooltip title="Back">
                        <RollbackOutlined
                            style={{ marginRight: "0.3rem", color: "#1890ff" }}
                            // onClick={() => {
                            //     this.props.history.goBack();
                            //     this.props.emptyInventory()
                            // }}
                        />
                    </Tooltip>
                    </Link>
          <Tooltip title="Material">
          <div
      className="mr-2 cursor-pointer font-medium text-sm"
      style={{
        color: viewType1 === "material" ? "#1890ff" : "tomato",
      }}
      onClick={() => setInventoryDetailViewType("material")}
    >
      <Button type={viewType1 === "material" ? "primary" : ""} style={{ backgroundColor: viewType1 === "material" ? "" : "tomato" }}>
        <label class="text-white">Material</label>
      </Button>
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
             {/* <Button type="primary">  */}
             <Button type={viewType1 === "production" ? "primary" : ""} style={{ backgroundColor: viewType1 === "production" ? "" : "tomato" }}>
             <label class="text-white">Production</label></Button>
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
              <Button type={viewType1 === "repair" ? "primary" : ""} style={{ backgroundColor: viewType1 === "repair" ? "" : "tomato" }}>
                
              <label class="text-white">Repair</label></Button>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({emptyInventory}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryDetailActionLeft);
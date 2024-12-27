import React, { Component, lazy, PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../../../Components/UI/Antd";

import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import { Tooltip } from "antd";

import {
  handleAddDispatchModal,
  handleAddOutputReasonModal,
} from "../../../InventoryAction";
import ReceivedTable from "../Recieved/ReceivedTable";

// const InventoryOutputForm = lazy(() => import("../Output/InventoryOutputForm"));
// const InventoryOutputTable = lazy(() =>
//   import("../Output/InventoryOutputTable")
// );
const InventoryConsumptionForm = lazy(() =>
  import("../Consumption/InventoryConsumptionForm")
);
const InventoryConsumptionTable = lazy(() =>
  import("../Consumption/InventoryConsumptionTable")
);
const DispatchTable = lazy(() => import("../Dispatch/DispatchTable"));

const TabPane = StyledTabs.TabPane;
class InventoryDetailTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: this.props.tabData || "1",
      breadCumb: false,
      breadCumb1: false,
      value: 1,
      reportClick: false,
      showReport: false,
    };
  }
  componentDidMount() {
    // alert(this.props.tabData);
    console.log(this.props.tabData.typeOf);
    this.setState({ activeKey: this.props.tabData });
  }

  handleCatalogueCreateClick = (data) => {
    this.setState({ breadCumb: data });
    this.setState({ breadCumb1: false });
    this.setState({ showReport: false });
  };

  handleCatalogueReportClick = (data) => {
    this.setState({ breadCumb1: data });
    this.setState({ breadCumb: false });
    this.setState({ showReport: true });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };


  handleTabChange = (key) => this.setState({ activeKey: key });
  handleReportClick = (data) => {
    this.setState({
      reportClick: data,
    });
    this.setState({
      showReport: true,
    });
  };
  render() {
    const { activeKey } = this.state;
    const { user } = this.props;
    // const {
    //   history,
    //   match: {
    //     params: { inventoryId, data, emailId, organizationId },
    //   },
    // } = this.props;
    console.log(this.props.match);

    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
          >

            <TabPane
              tab={
                <>
                  {/* <span
                  //    onClick={() => this.handleOrderCreateClick(false)}
                  > */}
                  <i class="fas fa-satellite-dish"></i>&nbsp;
                  {/* Receive */}  {this.props.translatedMenuItems[5]}
                  {/* </span> */}
                  {/* {activeKey === "1" && (
                 
                  )} */}
                </>
              }
              key="1"
            >
              {" "}
              <Suspense fallback={"Loading..."}>
                <ReceivedTable
                  translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                 />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-share-square"></i>&nbsp;
                    {/* Dispatch */}  {this.props.translatedMenuItems[8]}

                  </span>
                  {/* {activeKey === "2" && (
                    <>
                      <Tooltip title="Dispatch">
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                          onClick={() => this.props.handleAddDispatchModal(true)}
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
                        />
                      </Tooltip>{" "}
                    </>
                  )} */}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading..."}>
                <DispatchTable 
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                   inventory={this.props.inventory}
                />
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          {/* <AddDispatchModal
            addDispatchModal={this.props.addDispatchModal}
            handleAddDispatchModal={this.props.handleAddDispatchModal}
          />
          <AddOutputReasonModal
            addOutputReasonModal={this.props.addOutputReasonModal}
            handleAddOutputReasonModal={this.props.handleAddOutputReasonModal}
          /> */}
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ inventory, auth }) => ({
  addDispatchModal: inventory.addDispatchModal,
  user: auth.userDetails,
  addOutputReasonModal: inventory.addOutputReasonModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleAddDispatchModal,
      handleAddOutputReasonModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetailTab)




// import React from "react";

// function InventoryDetailTab(){
//   return (
//     <>
//     <div>hiii</div>
//     </>
//   )
// }
// export default InventoryDetailTab;

import React, {  PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { withRouter } from "react-router";
import {
  handleAddDispatchModal,
  handleAddOutputReasonModal,
} from "./InventoryAction";
import { TabsWrapper } from "../../../Components/UI/Layout";
import DispatchTableOut from "./DispatchTableOut";
import ReceivedTableOut from "./ReceivedTableOut";

                                           
const TabPane = StyledTabs.TabPane;
class InventoryDetailTabO extends PureComponent {
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
                  {/* Receive */}  {this.props.translatedMenuItems[17]}
                  {/* </span> */}
                  {/* {activeKey === "1" && (
                 
                  )} */}
                </>
              }
              key="1"
            >
              {" "}
              <Suspense fallback={"Loading..."}>
                <ReceivedTableOut
                  translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                locationDetailsId={this.props.user.locationId}
                
                 />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-share-square"></i>&nbsp;
                    {/* Dispatch */}  {this.props.translatedMenuItems[18]}

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
                <DispatchTableOut
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                locationDetailsId={this.props.user.locationId}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetailTabO)

);



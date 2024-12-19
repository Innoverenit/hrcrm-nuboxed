import React, {  PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { withRouter } from "react-router";
import DispatchCommerceAndRepairTableOut from "./DispatchCommerceAndRepairTableOut";
import CompleteDispatchTable from "./CompleteDispatchTable";
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';

                                           
const TabPane = StyledTabs.TabPane;
class InventoryCommerceDetailTabO extends PureComponent {
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
                    <span class="!text-tab">
                     <SendAndArchiveIcon className=" !text-icon text-[#480CA8]"/>

                     {this.props.translatedMenuItems[18]} 
                      {/* Dispatch */}
                  </span>
                  
                </>
              }
              key="1"
            >
              {" "}
              <Suspense fallback={"Loading..."}>
               
              <DispatchCommerceAndRepairTableOut
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                locationDetailsId={this.props.user.locationId}
                   inventory={this.props.inventory}
                   viewType={this.props.viewType}
                />
             
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                   <span class="!text-tab">
                    <i class="far fa-share-square text-[#9B2226]"></i>&nbsp;
                    {this.props.translatedMenuItems[45]} {this.props.translatedMenuItems[18]}

                  </span>
                
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading..."}>
                <CompleteDispatchTable
                viewType={this.props.viewType}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                locationDetailsId={this.props.user.locationId}
                   inventory={this.props.inventory}
                />
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
      
      </>
    );
  }
}
const mapStateToProps = ({ inventory, auth }) => ({
//   addDispatchModal: inventory.addDispatchModal,
 user: auth.userDetails,
//   addOutputReasonModal: inventory.addOutputReasonModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   handleAddDispatchModal,
    //   handleAddOutputReasonModal,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryCommerceDetailTabO)

);



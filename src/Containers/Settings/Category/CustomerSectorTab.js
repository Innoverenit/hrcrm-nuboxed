import React, { Component, Suspense,lazy } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import PaymentIcon from '@mui/icons-material/Payment';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import { FormattedMessage } from "react-intl";
const Payment = lazy(() =>
  import("./Payment/Payment")
);
const Sectors = lazy(() =>
  import("../Sectors/Sectors")
);
const Source = lazy(() =>
  import("./Source/Source")
);
const ShipBy = lazy(() =>
  import("./ShipBy/ShipBy")
);
const Customer = lazy(() =>
  import("./Customer/Customer")
);
const BrandModel = lazy(() =>
  import("./Brand&Model/BrandModel")
);
const Vat = lazy(() =>
  import("./Vat/Vat")
);

const TabPane = StyledTabs.TabPane;

class CustomerSectorTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "0",
      value: 1,
    };
  }

  // onChange = (e) => {
  //   this.setState({
  //     value: e.target.value,
  //   });
  // };

  handleTabChange = (key) => this.setState({ activeKey: key });
  renderTabContent = (key) => {
    switch (key) {
      case "0":
        return    <Sectors />;
      case "1":
        return  <Source />;
      case "2":
        return     <ShipBy />;
      case "3":
        return    <Customer />;
        case "4":
          return        <BrandModel />;
          case "5":
            return            <Vat />;
            case "6":
              return              <Payment />;
      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
         <div class="flex flex-nowrap" >
          <div class=" w-[70%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <FactoryIcon />
                      <span class=" ml-1">
                        Sector
                      </span>
                    </>
                  }
                  key="0"
                >
                  {/* <Suspense>
                    <Sectors />
                  </Suspense> */}
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <SourceIcon />
                      <span class=" ml-1">
                        Source
                      </span>
                    </>
                  }
                  key="1"
                >
                  {/* <Suspense>
                    <Source />
                  </Suspense> */}
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <SourceIcon />
                      <span class=" ml-1">
                        Ship By
                      </span>
                    </>
                  }
                  key="2"
                >
                  {/* <Suspense>
                    <ShipBy />
                  </Suspense> */}
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <SourceIcon />
                      <span class=" ml-1">
                      Type
                      </span>
                    </>
                  }
                  key="3"
                >
                  {/* <Suspense>
                    <Customer />
                  </Suspense> */}
                </TabPane>

                <TabPane
                  tab={
                    <>
                      <SourceIcon />
                      <span class=" ml-1">
                        BrandModel
                      </span>
                    </>
                  }
                  key="4"
                >
                  {/* <Suspense>
                    <BrandModel />
                  </Suspense> */}
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <SourceIcon />
                      <span class=" ml-1">
                        Vat
                      </span>
                    </>
                  }
                  key="5"
                >
                  <Suspense>
                    <Vat />
                  </Suspense>
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <PaymentIcon />
                      <span class=" ml-1">
                      <FormattedMessage id="app.payment" defaultMessage="Payment" />
                      </span>
                    </>
                  }
                  key="6"
                >
                  {/* <Suspense>
                    <Payment />
                  </Suspense> */}
                </TabPane>
              </StyledTabs>
              <Suspense fallback={<div>Loading...</div>}>
                {this.renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSectorTab);

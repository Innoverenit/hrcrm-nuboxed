import React, { Component, Suspense,lazy } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import SourceIcon from '@mui/icons-material/Source';
import PaymentIcon from '@mui/icons-material/Payment';
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

const Customer = lazy(() =>
  import("./Customer/Customer")
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
        return    <Customer />;
          case "3":
            return            <Vat />;
            case "4":
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
                        Sector <span className="text-red-500 font-bold">{this.props.sectorCount.SectorCount}</span>
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
                        Source<span className="text-red-500 font-bold">{this.props.sourceCount.SourceCount}</span>
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
                      Type
                      </span>
                    </>
                  }
                  key="2"
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
                        Vat
                      </span>
                    </>
                  }
                  key="3"
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
                  key="4"
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
const mapStateToProps = ({ sector,source}) => ({
  sectorCount:sector.sectorCount,
  sourceCount:source.sourceCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSectorTab);

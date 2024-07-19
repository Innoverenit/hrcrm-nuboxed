import React, { Component, Suspense,lazy } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import SourceIcon from '@mui/icons-material/Source';
import PaymentIcon from '@mui/icons-material/Payment';
import FactoryIcon from '@mui/icons-material/Factory';
import { FormattedMessage } from "react-intl";
import LOB from "./LOB/LOB";
import CategoryList from "./CategoryList/CategoryList";
import CameraIcon from '@mui/icons-material/Camera';
import GavelIcon from '@mui/icons-material/Gavel';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';

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
              case "5":
                return              <LOB />;
                case "6":
                  return              <CategoryList />;
      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
         <div  >
          <div class=" w-[100%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <FactoryIcon  className=" !text-icon"/>
            
                      <span class="font-poppins ml-1 ">
                      <Badge
                count={this.props.sectorCount.SectorCount}
                overflowCount={999}
              >
                
                   Sector 
                        {/* <span className="text-red-500 font-bold">{this.props.sectorCount.SectorCount}</span> */}
                        </Badge>
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
                      <SourceIcon  className=" !text-icon"/>
             
                          <span class="font-poppins ml-1 ">
                          <Badge
                count={this.props.sourceCount.SourceCount}
                overflowCount={999}
              >
                        Source
                        {/* <span className="text-red-500 font-bold">{this.props.sourceCount.SourceCount}</span> */}
                        </Badge>
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
                      <CameraIcon  className=" !text-icon"/>
                        <span class="font-poppins ml-1 ">
                        <Badge
                count={this.props.customerCount.CustomerTypeCount}
                overflowCount={999}
              >
                      Type
                      </Badge>
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
                      <GavelIcon  className=" !text-icon" />
                      <span class="font-poppins ml-1 ">
                        VAT
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
                      <PaymentIcon  className=" !text-icon"/>
            
                         <span class="font-poppins ml-1 ">
                         <Badge
                count={this.props.paymentCount.ServiceLineCount}
                overflowCount={999}
              >
                      <FormattedMessage id="app.payment" defaultMessage="Payment" />
                      </Badge>
                      </span>
                     
                    </>
                  }
                  key="4"
                >
                  {/* <Suspense>
                    <Payment />
                  </Suspense> */}
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <FormatLineSpacingIcon  className=" !text-icon"/>
            
                         <span class="font-poppins ml-1 ">
                         <Badge
                count={this.props.lobCount.LobCount}
                overflowCount={999}
              >
                      <FormattedMessage id="app.lob" defaultMessage="LOB" />
                      </Badge>
                      </span>
                     
                    </>
                  }
                  key="5"
                >
                  {/* <Suspense>
                    <Payment />
                  </Suspense> */}
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <PaymentIcon  className=" !text-icon" />
            
                         <span class="font-poppins ml-1 ">
                         <Badge
                count={this.props.categoryCount.categoryCount}
                overflowCount={999}
              >
              Category
                      {/* <FormattedMessage id="app.category" defaultMessage="Category" /> */}
                      </Badge>
                      </span>
                     
                    </>
                  }
                  key="6"
                >
               
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
const mapStateToProps = ({ sector,lob,categoryList,source,catgCustomer,payments}) => ({
  sectorCount:sector.sectorCount,
  sourceCount:source.sourceCount,
  paymentCount:payments.paymentCount,
  lobCount:lob.lobCount,
  customerCount:catgCustomer.customerCount,
  categoryCount:categoryList.categoryCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSectorTab);

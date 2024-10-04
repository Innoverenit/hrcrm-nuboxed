import React, { Component, lazy, PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MaterialIntransitList from "../Inventory/MaterialIntransitList"
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { withRouter } from "react-router";
import TokenIcon from '@mui/icons-material/Token';
import DeleteIcon from '@mui/icons-material/Delete';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import MaterialReceivedTableOut from "./MaterialReceivedTableOut";
import MaterialStockTableOut from "./MaterialStockTableOut";
import MaterialUnitsDataOut from "./MaterialUnitsDataOut";
import MaterialCellCardViewOut from "./MaterialCellCardViewOut";

const TabPane = StyledTabs.TabPane;
class InventoryMaterialTabO extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "1",
            breadCumb: false,
            breadCumb1: false,
            carrierSub: false,
            shipperPopover:false,
        };
    }
    handleSubscr = () => {
        this.setState({ 
          shipperPopover: true,
          breadCumb:false,
          carrierSub:false
         });
    
        console.log(this.state.breadCumb);
      };

      handleRecruitClick = () => {
        this.setState({ 
          carrierSub:false,
          breadCumb:true,
          shipperPopover: false,
         });
      };

    handleTabChange = (key) => this.setState({ activeKey: key });

    render() {
        const { activeKey } = this.state;
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
                                    <i class="fas fa-satellite-dish"></i>&nbsp; 
                                    {/* Receive */} {this.props.translatedMenuItems[17]}
                                </>
                            }
                            key="1"
                        >
                            {" "}
                            <Suspense fallback={"Loading..."}>
                                <MaterialReceivedTableOut  
                                translateText={this.props.translateText}
                                selectedLanguage={this.props.selectedLanguage}
                    translatedMenuItems={this.props.translatedMenuItems}
                    locationDetailsId={this.props.user.locationId}
             />
                            </Suspense>
                        </TabPane>


                        <TabPane
                            tab={
                                <>
                                    <span onClick={this.handleRecruitClick}>
                                    <i class="far fa-share-square"/>&nbsp;
                                        {/* Stock */} 
                                        In transit
                                        {/* {this.props.translatedMenuItems[19]} */}

                                    </span>
                                    {activeKey === "2" && (
                        <>
                         
                             <span
                    className="ml-4"
                          type="area-chart"
                         
                          onClick={() => {
                            this.handleSubscr();
                          }}
                          size="0.875em"                         
                          >
                          <WarehouseIcon
                            style={{ color: "red", fontSize: "1rem" }}
                          
                          />
                          </span>
                        </>
                      )}

                                </>
                            }
                            key="2"
                        >
                            
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                                 
                                  <MaterialIntransitList
                                   locationDetailsId={this.props.user.locationId}
                                selectedLanguage={this.props.selectedLanguage}
                                  translateText={this.props.translateText}
                                inventory={this.props.inventory}
                                 translatedMenuItems={this.props.translatedMenuItems}
                                />
                                </Suspense>
                                
                             
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <span onClick={this.handleRecruitClick}>
                                    <i class="far fa-share-square"/>&nbsp;
                                        {/* Stock */} 
                                        {this.props.translatedMenuItems[19]}

                                    </span>
                                    {activeKey === "3" && (
                        <>
                         
                             <span
                    className="ml-4"
                          type="area-chart"
                         
                          onClick={() => {
                            this.handleSubscr();
                          }}
                          size="0.875em"                         
                          >
                          <WarehouseIcon
                            style={{ color: "red", fontSize: "1rem" }}
                          
                          />
                          </span>
                        </>
                      )}

                                </>
                            }
                            key="3"
                        >
                             {this.state.shipperPopover ? (
                            <Suspense fallback={"Loading..."}>
                                  <MaterialUnitsDataOut
                                   inventory={this.props.inventory}
                                   locationDetailsId={this.props.user.locationId}
                                //    storedLoc={this.props.storedLoc} 
                                translatedMenuItems={this.props.translatedMenuItems}
                                   />
                               
                            </Suspense>
                             ) :(
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                                  <MaterialStockTableOut
                                   locationDetailsId={this.props.user.locationId}
                                   selectedLanguage={this.props.selectedLanguage}
                                   translateText={this.props.translateText}
                                inventory={this.props.inventory}
                                translatedMenuItems={this.props.translatedMenuItems}
                                />
                                </Suspense>
                                
                              )}
                        </TabPane>
{this.props.user.moduleMapper.productionInd===true && (
                        <TabPane
                            tab={
                                <>
                                    <span>
                                        <TokenIcon/>&nbsp;
                                        {/* Cell */}
                                        {this.props.translatedMenuItems[20]}
                                    </span>

                                </>
                            }
                            key="4"
                        >
                            <Suspense fallback={"Loading..."}>
                                {/* <MaterialCellStock /> */}
                                <MaterialCellCardViewOut 
                                 locationDetailsId={this.props.user.locationId}
                                 inventory={this.props.inventory}
                                 translatedMenuItems={this.props.translatedMenuItems}
                                />
                            </Suspense> 
                        </TabPane>
    )}

<TabPane
                            tab={
                                <>
                                    <span onClick={this.handleRecruitClick}>
                                    <i class="far fa-share-square"/>&nbsp;
                                        {/* Stock */} 
                                      Damage
                                        {/* {this.props.translatedMenuItems[19]} */}

                                    </span>
                                    {activeKey === "4" && (
                        <>
                         
                             <span
                    className="ml-4"
                          type="area-chart"
                         
                          onClick={() => {
                            this.handleSubscr();
                          }}
                          size="0.875em"                         
                          >
                          <WarehouseIcon
                            style={{ color: "red", fontSize: "1rem" }}
                          
                          />
                          </span>
                        </>
                      )}

                                </>
                            }
                            key="4"
                        >
                            
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                                 Hello
                                  {/* <MaterialIntransitList
                                   locationDetailsId={this.props.user.locationId}
                                selectedLanguage={this.props.selectedLanguage}
                                  translateText={this.props.translateText}
                                inventory={this.props.inventory}
                                 translatedMenuItems={this.props.translatedMenuItems}
                                /> */}
                                </Suspense>
                                
                             
                        </TabPane>


                        <TabPane
                            tab={
                                <>
                                    <span onClick={this.handleRecruitClick}>
                                    <i class="far fa-share-square"/>&nbsp;
                                        {/* Stock */} 
                                      Best Before
                                        {/* {this.props.translatedMenuItems[19]} */}

                                    </span>
                                    {activeKey === "5" && (
                        <>
                         
                             <span
                    className="ml-4"
                          type="area-chart"
                         
                          onClick={() => {
                            this.handleSubscr();
                          }}
                          size="0.875em"                         
                          >
                          <WarehouseIcon
                            style={{ color: "red", fontSize: "1rem" }}
                          
                          />
                          </span>
                        </>
                      )}

                                </>
                            }
                            key="5"
                        >
                            
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                                 Hello
                                  {/* <MaterialIntransitList
                                   locationDetailsId={this.props.user.locationId}
                                selectedLanguage={this.props.selectedLanguage}
                                  translateText={this.props.translateText}
                                inventory={this.props.inventory}
                                 translatedMenuItems={this.props.translatedMenuItems}
                                /> */}
                                </Suspense>
                                
                             
                        </TabPane>
                    </StyledTabs>
                </TabsWrapper>

            </>
        );
    }
}
const mapStateToProps = ({ inventory, auth }) => ({
    productionInd:auth.userDetails.userDetails,
    erpInd:auth.userDetails.erpInd,
    user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialTabO)

);




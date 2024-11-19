import React, { Component, lazy, PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MaterialIntransitList from "../Inventory/MaterialIntransitList"//2
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import InventoryMaterialBestBefore from "../Inventory/InventoryMaterialBestBefore"//5
import { withRouter } from "react-router";
import {handleStockUpload} from "../Inventory/InventoryAction"
import UploadIcon from '@mui/icons-material/Upload';
import TokenIcon from '@mui/icons-material/Token';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import MaterialReceivedTableOut from "./MaterialReceivedTableOut";//1
import InventoryWastetab from "../Inventory/InventoryWastetab"//waste
import InventoryMaterialDamagedData from "../Inventory/InventoryMaterialDamagedData"//4
import MaterialStockTableOut from "./MaterialStockTableOut";//3
import MaterialUnitsDataOut from "./MaterialUnitsDataOut";
import MaterialCellCardViewOut from "./MaterialCellCardViewOut";
import CookieIcon from '@mui/icons-material/Cookie';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import StockUploadModal from "./StockUploadModal";

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
        const renderTabContent = (key) => {
          switch (key) {
            case "1":
              return     <div> 
                       <MaterialReceivedTableOut  
                                translateText={this.props.translateText}
                                selectedLanguage={this.props.selectedLanguage}
                    translatedMenuItems={this.props.translatedMenuItems}
                    locationDetailsId={this.props.user.locationId}
             />
                  </div>;
            case "2":
              return  <div>  <MaterialIntransitList
              locationDetailsId={this.props.user.locationId}
           selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
           inventory={this.props.inventory}
            translatedMenuItems={this.props.translatedMenuItems}
           /></div>;
              case "3":
                  return  <div>   {this.state.shipperPopover ? (
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
                        
                      )}</div>;
                  case "4":
                      return  <div> 
                      <MaterialCellCardViewOut 
                                 locationDetailsId={this.props.user.locationId}
                                 inventory={this.props.inventory}
                                 translatedMenuItems={this.props.translatedMenuItems}
                                />
                          </div>;
                       case "5":
                          return  <div>  <InventoryMaterialDamagedData
                          locationDetailsId={this.props.user.locationId}
                          /></div>;
                          case "6":
                          return  <div> 
                           <InventoryMaterialBestBefore
                                   locationDetailsId={this.props.user.locationId}
                                  />
                              </div>;
                               case "7":
                                return  <div> 
                                 <InventoryWastetab/>
                                    </div>;
                      
            default:
              return null;
          }
        };
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
                                 <span class="!text-tab">
                                    <i class="fas fa-satellite-dish"></i>&nbsp; 
                                    {/* Receive */} {this.props.translatedMenuItems[17]}
                                    </span>
                                </>
                            }
                            key="1"
                        >
                            {" "}
                            <Suspense fallback={"Loading..."}>
                                {/* <MaterialReceivedTableOut  
                                translateText={this.props.translateText}
                                selectedLanguage={this.props.selectedLanguage}
                    translatedMenuItems={this.props.translatedMenuItems}
                    locationDetailsId={this.props.user.locationId}
             /> */}
                            </Suspense>
                        </TabPane>


                        <TabPane
                            tab={
                                <>
                                    <span onClick={this.handleRecruitClick} className=" !text-tab">
                                    <LocalShippingIcon className=" !text-icon"/>&nbsp;
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
                          <WarehouseIcon className=" !text-icon text-red-600"/>
                          </span>
                         
                        </>
                      )}
                      
                                </>
                            }
                            key="2"
                        >
                            
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                                 
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
                                    <span onClick={this.handleRecruitClick} className=" !text-tab">
                                    <WarehouseIcon  className=" !text-icon text-red-600"/>&nbsp;
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
                          <WarehouseIcon className=" !text-icon text-red-600"/>
                          </span>
                        </>
                      )}
 {activeKey === "3" && (
                        <>
 <span
                           onClick={() => {
                            this.props.handleStockUpload(true);
                          }}
                          ><UploadIcon/></span>
                              </>
                      )}
                                </>
                            }
                            key="3"
                        >
                             {/* {this.state.shipperPopover ? (
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
                                
                              )} */}
                        </TabPane>
{this.props.user.moduleMapper.productionInd===true && (
                        <TabPane
                            tab={
                                <>
                                   <span class="!text-tab">
                                        <TokenIcon className=" !text-icon "/>&nbsp;
                                        {/* Cell */}
                                        {this.props.translatedMenuItems[20]}
                                    </span>

                                </>
                            }
                            key="4"
                        >
                            <Suspense fallback={"Loading..."}>
                                {/* <MaterialCellStock /> */}
                                {/* <MaterialCellCardViewOut 
                                 locationDetailsId={this.props.user.locationId}
                                 inventory={this.props.inventory}
                                 translatedMenuItems={this.props.translatedMenuItems}
                                /> */}
                            </Suspense> 
                        </TabPane>
    )}

<TabPane
                            tab={
                                <>
                                    <span onClick={this.handleRecruitClick} className=" !text-tab">
                                    <FolderDeleteIcon className="!text-icon"/>&nbsp;
                                        {/* Stock */} 
                                      Damaged
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
                          <WarehouseIcon className=" !text-icon text-red-600" />
                          </span>
                        </>
                      )}

                                </>
                            }
                            key="5"
                        >
                            
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                               {/* <InventoryMaterialDamagedData
                               locationDetailsId={this.props.user.locationId}
                               /> */}
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
                                    <span onClick={this.handleRecruitClick} className=" !text-tab">
                                    <CookieIcon className=" !text-icon"/>&nbsp;
                                      Best Before
                                     
                                       

                                    </span>
                                    {activeKey === "6" && (
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
                            key="6"
                        >
                            
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                                  {/* <InventoryMaterialBestBefore
                                   locationDetailsId={this.props.user.locationId}
                                  /> */}
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
                                    <span onClick={this.handleRecruitClick} className=" !text-tab">
                                    <FolderDeleteIcon className="!text-icon"/>&nbsp;
                                        {/* Stock */} 
                                      Waste
                                        {/* {this.props.translatedMenuItems[19]} */}

                                    </span>
                                    {activeKey === "7" && (
                        <>
                         
                             <span
                    className="ml-4"
                          type="area-chart"
                         
                          onClick={() => {
                            this.handleSubscr();
                          }}
                          size="0.875em"                         
                          >
                          <WarehouseIcon className=" !text-icon text-red-600" />
                          </span>
                        </>
                      )}

                                </>
                            }
                            key="7"
                        >
                            
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                               {/* <InventoryMaterialDamagedData
                               locationDetailsId={this.props.user.locationId}
                               /> */}
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
                    <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
                <StockUploadModal
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
              addStockModal={this.props.addStockModal}
            handleStockUpload={this.props.handleStockUpload}
            locationDetailsId={this.props.user.locationId}
        />
              </Suspense>
                </TabsWrapper>

            </>
        );
    }
}
const mapStateToProps = ({ inventory, auth }) => ({
    productionInd:auth.userDetails.userDetails,
    erpInd:auth.userDetails.erpInd,
    user: auth.userDetails,
    addStockModal:inventory.addStockModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          handleStockUpload
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialTabO)

);




import React, { Component, lazy, PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import MaterialUnitsData from "../InventoryMaterialTab/MaterialUnitsData"
import MaterialReceivedTable from "./MaterialReceivedTable";
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialStockTable from "./MaterialStockTable";
// import MaterialCellStock from "./MaterialCellStock";
import MaterialCellCardView from "./MaterialCellCardView";

const TabPane = StyledTabs.TabPane;
class InventoryMaterialTab extends PureComponent {
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
                                    <i class="fas fa-satellite-dish"></i>&nbsp; Receive
                                </>
                            }
                            key="1"
                        >
                            {" "}
                            <Suspense fallback={"Loading..."}>
                                <MaterialReceivedTable />
                            </Suspense>
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <span onClick={this.handleRecruitClick}>
                                        <i class="far fa-share-square"></i>&nbsp;Stock

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
                          <DeleteIcon
                            style={{ color: "red", fontSize: "1rem" }}
                          
                          />
                          </span>
                        </>
                      )}

                                </>
                            }
                            key="2"
                        >
                             {this.state.shipperPopover ? (
                            <Suspense fallback={"Loading..."}>
                                  <MaterialUnitsData 
                                   inventory={this.props.inventory}
                                //    storedLoc={this.props.storedLoc} 
                                   />
                               
                            </Suspense>
                             ) :(
                                <Suspense fallback={"Loading ..."}>
                                  {" "}
                                  <MaterialStockTable 
                                inventory={this.props.inventory}
                                />
                                </Suspense>
                                
                              )}
                        </TabPane>

                        <TabPane
                            tab={
                                <>
                                    <span>
                                        <i class="far fa-share-square"></i>&nbsp;Cell

                                    </span>

                                </>
                            }
                            key="3"
                        >
                            <Suspense fallback={"Loading..."}>
                                {/* <MaterialCellStock /> */}
                                <MaterialCellCardView 
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

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialTab)

);


// import React from "react";

// function InventoryMaterialTab(){
//   return (
//     <>
//     <div>hiii</div>
//     </>
//   )
// }
// export default InventoryMaterialTab;

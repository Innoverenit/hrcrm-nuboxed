import React, { Component, lazy, PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import MaterialReceivedTable from "./MaterialReceivedTable";
import MaterialStockTable from "./MaterialStockTable";
// import MaterialCellStock from "./MaterialCellStock";
import MaterialCellCardView from "./MaterialCellCardView";

const TabPane = StyledTabs.TabPane;
class InventoryMaterialTab extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "1",
        };
    }


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
                                    <span>
                                        <i class="far fa-share-square"></i>&nbsp;Stock

                                    </span>

                                </>
                            }
                            key="2"
                        >
                            <Suspense fallback={"Loading..."}>
                                <MaterialStockTable 
                                inventory={this.props.inventory}
                                />
                            </Suspense>
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
                                <MaterialCellCardView />
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

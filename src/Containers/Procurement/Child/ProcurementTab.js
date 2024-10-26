import React, { Component, lazy, Suspense } from "react";
import { Tooltip } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleBOMdrawer,handleAddIndentModal,handleProcDispatchModal} from "../ProcurementAction";
const ProcurementCard=lazy(()=>import("./ProcurementCard"));
const ProcurementTCForm=lazy(()=>import("./ProcurementTCForm"));
const ProcurementIndentCard=lazy(()=>import("./ProcurementIndentCard"));
const ProcurementQuotationCard=lazy(()=>import("./ProcurementQuotationCard"));
const ProcurementPurchaseCard=lazy(()=>import("./ProcurementPurchaseCard"));
const ProcurementPiCard=lazy(()=>import("./ProcurementPiCard"));
const ProcurementCiCard=lazy(()=>import("./ProcurementCiCard"));
const ProcurementDispatchCard=lazy(()=>import("./ProcurementDispatchCard"));
const ProcurementStockCard=lazy(()=>import("./ProcurementStockCard"));
const BOMdrawerForm =lazy(()=>import("./BOMdrawerForm"));
const AddIndentDrawer =lazy(()=>import("./AddIndentDrawer"));
const DispatchProcDrawer =lazy(()=>import("./DispatchProcDrawer"));

const TabPane = StyledTabs.TabPane;

class ProcurementTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    
                 BOM
                  </span>
                  {activeKey === "1" && (
                      <>
                        
                          <Tooltip title="Add BOM">
                             <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                                            
                              tooltipTitle="Create"
                              onClick={() => {
                                this.props.handleBOMdrawer(true);
                              }}                                                      
                            />
                          </Tooltip>
                        &nbsp;

                      </>
                    )}
                  </>
                }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementCard />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    
                  T&C
                  </span>
                
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementTCForm/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    
                    Indent
                    </span>
                 {activeKey === "3" && (
                      <>
                        
                          <Tooltip title="Add Indent">
                             <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                                           
                              tooltipTitle="Create"
                              onClick={() => {
                                this.props.handleAddIndentModal(true);
                              }}
                      
                            />
                          </Tooltip>
                        &nbsp;

                      </>
                    )}
                
                
                
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementIndentCard/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    
                  Inquiry
                  </span>
                
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementQuotationCard/>
              </Suspense>
            </TabPane>

              <TabPane
              tab={
                <>
                  <span>
                    
                 Purchase Order
                  </span>
                
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               <ProcurementPurchaseCard/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    
                 PI
                  </span>
                
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               <ProcurementPiCard/>
              </Suspense>
            </TabPane>
                 <TabPane
              tab={
                <>
                  <span>
                    
                 CI
                  </span>
                
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementCiCard/>
              </Suspense>
            </TabPane>
                 <TabPane
              tab={
                <>
                  <span>
                    
               Dispatch
                  </span>
                  {activeKey === "8" && (
                      <>
                        
                          <Tooltip title="Create Dispatch">
                             <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                           
                              tooltipTitle="Create"
                              onClick={() => {
                                this.props.handleProcDispatchModal(true);
                              }}
                           
                            />
                          </Tooltip>
                        &nbsp;

                      </>
                    )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementDispatchCard/>
              </Suspense>
            </TabPane>
                 <TabPane
              tab={
                <>
                  <span>
                    
               Stock
                  </span>
                
                </>
              }
              key="9"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementStockCard/>
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      
      <BOMdrawerForm
      handleBOMdrawer={this.props.handleBOMdrawer}
      addBOMdrawer={this.props.addBOMdrawer}
      />
      <AddIndentDrawer
      handleAddIndentModal={this.props.handleAddIndentModal}
      addIndentModal={this.props.addIndentModal}
      />
          <DispatchProcDrawer
          dispatchProcModal={this.props.dispatchProcModal}
          handleProcDispatchModal={this.props.handleProcDispatchModal}/>
      </>
    );
  }
}
const mapStateToProps = ({ procurement }) => ({
  addBOMdrawer:procurement.addBOMdrawer,
  addIndentModal:procurement.addIndentModal,
  dispatchProcModal:procurement.dispatchProcModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleBOMdrawer,
      handleAddIndentModal,
      handleProcDispatchModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProcurementTab);

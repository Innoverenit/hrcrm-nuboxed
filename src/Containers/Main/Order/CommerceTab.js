import React, { Suspense, useState,useEffect, lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { StyledTabs } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import {quatationDrawer,invoiceDrawer} from "../Order/OrderAction";
const EcomCardList=lazy(()=>import("./EcomCardList"));
const QuotationDrawer=lazy(()=>import("./QuotationDrawer"));
const InvoiceDrawer = lazy(() => import("./InvoiceDrawer"));
const QuotationCardList = lazy(() => import("./QuotationCardList")); //2
const InvoiceCardList = lazy(() => import("./InvoiceCardList"));
const TabPane = StyledTabs.TabPane;

function CommerceTab(props) {
    const [activeKey, setactiveKey] = useState("1")
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clickSideIcon,setclickSideIcon]=useState(false);
    const [selectedHistory, setSelectedHistory] = useState("completed");
    const handleTabChange = (key) => {
        setactiveKey(key);
    
        if (key === "4") {
                       setclickSideIcon(false);
            setSelectedHistory("completed"); 
        } else {
                  setclickSideIcon(false);
            setSelectedHistory(null); 
                }
    };
    const renderTabContent = (key) => {
        switch (key) {
          case "1":
            return     <div> 
                  <EcomCardList
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText} 
            translatedMenuItems={props.translatedMenuItems}
            contextType={props.contextType}
            />
                </div>;
          case "2":
            return  <div><QuotationCardList
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText} 
            translatedMenuItems={props.translatedMenuItems}
            contextType={props.contextType}
            /> </div>;
            case "3":
                return  <div><InvoiceCardList
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}
                translatedMenuItems={props.translatedMenuItems}
                contextType={props.contextType}
                /> 
                </div>;
          default:
            return null;
        }
      };
 
    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>

                  
                    <TabPane
                        tab={
                            <>
                                <span >
                                {props.translatedMenuItems[59]}  {/* Orders    */}
                                </span>
                                {activeKey === "1" && (
                                    <>
                                       
                                    </>
                                )}</>}
                        key="1"
                    >
                        
                    </TabPane>

                     <TabPane
                        tab={
                            <>
                             <span>
                             {props.translatedMenuItems[51]}   {/* Quotation */}
                                    </span>
                               
                                 
                                {/* {activeKey === "2" && (
                                    <Tooltip title="Add Quotation">
                                        <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                                            fontSize="small"
                                            onClick={() => {
                                                 props.quatationDrawer(true);
                                             }}
                                        />
                                    </Tooltip>
                                )}
  */}
                              
                            </>
                        }
                        key="2"
                    >
                    </TabPane>
                   
                   <TabPane
                        tab={
                            <>
                           
                                           
                                            <span class=" ml-1 !text-tab font-poppins " >
                                            {props.translatedMenuItems[56]} {/* Invoices */}
                                                </span>
                                        
                                
                    
                             
                                {/* {activeKey === "3" && (
                                    <>
                                        <Tooltip title="Add invoice">
                                            <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                                               
                                                
                                                onClick={() => {
                                                   props.invoiceDrawer(true);
                                                }}
                                                className="!text-icon cursor-pointer "
                                            />
                                        </Tooltip>
                                    </>
                                )} */}

                            </>
                        }
                        key="3"
                    >

                        <Suspense fallback={"Loading ..."}>
                        </Suspense>
                    </TabPane>  
                    <TabPane
                        tab={
                            <>
                           <div className="flex w-[56rem] justify-end">
                                           
                           <Button
                onClick={() => {
                    props.quatationDrawer(true);
                }}
                >
           {/* + Quotation */} + {props.translatedMenuItems[51]}
                </Button>
                </div>                

                            </>
                        }
                        key="4"
                    >
                    </TabPane>    
                    <TabPane
                        tab={
                            <>
                           
                           <div >                     
                           <Button
                onClick={() => {
                    props.invoiceDrawer(true);
                 }}
                >
           {/* + Invoice */} + {props.translatedMenuItems[56]}
                </Button>  
                   </div>                 

                            </>
                        }
                        key="5"
                    >

                      
                    </TabPane>  
                  
                
                </StyledTabs>
               
                <Suspense fallback={<div class="flex justify-center"><BundleLoader/></div>}>
                {renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
              <Suspense fallback={<BundleLoader />}>
<QuotationDrawer
quotationItemDrwr={props.quotationItemDrwr}
quatationDrawer={props.quatationDrawer}
translatedMenuItems={props.translatedMenuItems}
/>
<InvoiceDrawer
invoiceItemDrwr={props.invoiceItemDrwr}
invoiceDrawer={props.invoiceDrawer}
translatedMenuItems={props.translatedMenuItems}
/>
            </Suspense>
           
        </>
    );
}

const mapStateToProps = ({ order, auth, suppliers,customer }) => ({
    user: auth.userDetails,  
    quotationItemDrwr:order.quotationItemDrwr,
    invoiceItemDrwr:order.invoiceItemDrwr
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            quatationDrawer,
            invoiceDrawer
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CommerceTab);

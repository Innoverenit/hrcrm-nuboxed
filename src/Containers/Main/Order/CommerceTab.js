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

    
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
   "203", // 'Production', // 0
   "661", // 'Repair', // 1
   "666", // ' Procure', // 2
    "213",// 'Quotation', // 3
    "1165",// ' Activity', // 4
    "316",// 'Notes', // 5
   "138", // ' Documents',6
   "1167", // 'Sales Map',7
    "1168",// 'Summary',8
    "73",// 'Contact ',9
    "1169",// 'Invoice',//10
    "104",// 'Create',11
   "1212", //  'Commerce', //12              
   "1213", // 'Add Commerce',//13
   '1357',// Memo 14
     "202",       //    Order
     "667",      //    Completed Orders
     "1475",       //    Add Order
 "1474",       //    Add Contact
 "660"
          ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);


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
            translateText={props.translateText}/>
                </div>;
          case "2":
            return  <div><QuotationCardList
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}/> </div>;
            case "3":
                return  <div><InvoiceCardList
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}/> </div>;
                

          default:
            return null;
        }
      };


    console.log("opIND",clickSideIcon)  
    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>

                  
                    <TabPane
                        tab={
                            <>
                                <span >
                                   Orders   
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
                                        Quotation
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
                                           Invoices
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
           + Quotation
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
           + Invoice
                </Button>  
                   </div>                 

                            </>
                        }
                        key="5"
                    >

                      
                    </TabPane>  
                  
                
                </StyledTabs>
               
                <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
              <Suspense fallback={<BundleLoader />}>
<QuotationDrawer
quotationItemDrwr={props.quotationItemDrwr}
quatationDrawer={props.quatationDrawer}
/>
<InvoiceDrawer
invoiceItemDrwr={props.invoiceItemDrwr}
invoiceDrawer={props.invoiceDrawer}
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

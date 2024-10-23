
import React, { lazy, Component, Suspense,useState } from "react";
import { StyledDrawer, StyledTabs } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import TabPane from 'antd/lib/tabs/TabPane';
import { BundleLoader } from "../../../../Components/Placeholder";
import LocationSuppliesList from "../LocationSuppliesList";
import MaterialComplementaryCard from "../MaterialComplementaryCard";
import PriceDiscountCardB2C from "../PriceDiscountCardB2C";
import PriceDiscountCard from "../PriceDiscountCard";
import PriceAddCard from "../PriceAddCard";
const MaterialsDetailsbyId = lazy(() => import("./MaterialsDetailsbyId"));

function MaterialDetailsDrawer(props) {

    const { modalVisible,closeModal,particularDiscountData, ...formProps } = props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "90%";
    const [activeKey, setActiveKey] = useState("1");
    const handleTabChange = (key) => setActiveKey(key);
    const renderTabContent = (key) => {
      switch (key) {
       
        case "1":
          return  <div> <div class="font-semibold ">Price</div>
          <PriceAddCard particularDiscountData={particularDiscountData}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} />  
          <div class="font-semibold ">Discount B2B</div>
          <PriceDiscountCard particularDiscountData={particularDiscountData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} /> 
          <div class="font-semibold ">Discount B2C</div>
          <PriceDiscountCardB2C particularDiscountData={particularDiscountData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} /></div>;
           case "2":
            return     <div> 
                <MaterialsDetailsbyId 
            particularDiscountData={particularDiscountData}
            recomendInd={particularDiscountData.recomendInd}
            suppliesId={particularDiscountData.suppliesId}
            fifoInd={particularDiscountData.fifoInd}
            featureInd={particularDiscountData.featureInd}
            UOMListData={props.UOMListData}
            /> 
                </div>;
          // case "3":
          // return  <div>  <LocationSuppliesList
          // particularDiscountData={props.particularDiscountData}
          // /></div>;
          case "4":
          return  <div><MaterialComplementaryCard
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
            particularDiscountData={props.particularDiscountData}
            openComplementary={props.openComplementary}
            setopenComplementary={props.setopenComplementary}
          /></div>;
        default:
          return null;
      }
    };
console.log(props.UOMListData)
    return (
      <>
        <StyledDrawer
          title={`${particularDiscountData.suppliesName}`}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={modalVisible}
          onClose={closeModal}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
          <div>
            <StyledTabs
           defaultActiveKey={activeKey} onChange={handleTabChange}
            >
                  <TabPane
                    tab={
                        <>
                            <span >

                           Pricing
                            </span>
                          
                           

                        </>
                    }
                    key="1">
                    <Suspense fallback={<BundleLoader />}>
                       
                    </Suspense>
                </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span >
                                    Info
                                </span>
                               
                               

                            </>
                        }
                        key="2">
                       
                    </TabPane>
             

                    {/* <TabPane
                        tab={
                            <>
                                <span>

                               ReOrder
                                </span>
                            </>
                        }
                        key="3">
                        


                    </TabPane> */}
                    
                    <TabPane
                        tab={
                            <>
                                <span>

                                Complementary
                                </span>
                            </>
                        }
                        key="4">
                        


                    </TabPane>
              
            </StyledTabs>
            <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
        </div>
          </Suspense>


        </StyledDrawer>
      </>
    );
}

export default MaterialDetailsDrawer;


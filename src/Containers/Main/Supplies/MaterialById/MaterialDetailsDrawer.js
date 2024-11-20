
import React, { lazy, Suspense,useState } from "react";
import { StyledDrawer, StyledTabs } from "../../../../Components/UI/Antd";
import TabPane from 'antd/lib/tabs/TabPane';
import { BundleLoader } from "../../../../Components/Placeholder";
import MaterialComplementaryCard from "../MaterialComplementaryCard";
import PriceDiscountCardB2C from "../PriceDiscountCardB2C";
import PriceDiscountCard from "../PriceDiscountCard";
import PriceAddCard from "../PriceAddCard";
const MaterialsDetailsbyId = lazy(() => import("./MaterialsDetailsbyId"));

function MaterialDetailsDrawer(props) {

    const { modalVisible,closeModal,particularDiscountData, ...formProps } = props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "65%";
    const [activeKey, setActiveKey] = useState("1");
    const handleTabChange = (key) => setActiveKey(key);
    const renderTabContent = (key) => {
      switch (key) {
       
        case "1":
          return  <div class="flex w-full justify-between "><div class="w-[47.5%]"> <div class=" font-poppins  font-semibold ">Price</div>
          <PriceAddCard particularDiscountData={particularDiscountData}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} />  </div>
           <div class="flex flex-col w-[47.5%]">
          <div class="font-semibold font-poppins w-[47.5%] ">Discount B2B</div>
          <PriceDiscountCard particularDiscountData={particularDiscountData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} /> 
          <div class=" font-semibold  font-poppins w-[47.5%]">Discount B2C</div>
          <PriceDiscountCardB2C particularDiscountData={particularDiscountData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} /></div></div>;

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
        
          case "3":
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
             

                   
                    
                    <TabPane
                        tab={
                            <>
                                <span>

                                Complementary
                                </span>
                            </>
                        }
                        key="3">
                        


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


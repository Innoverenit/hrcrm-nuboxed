import React, { useState, lazy, Suspense, useEffect } from 'react';
import { StyledTabs } from '../../../Components/UI/Antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BundleLoader } from '../../../Components/Placeholder';
import NewArrivalListData from './NewArrivalListData';
import BestbeforeEmailList from './BestbeforeEmailList';



const SuppliesTab = (props) => {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qcMain, setQcMain] = useState(true);
    const [openQc, setOpenQc] = useState(false);

    const handleMainQc = () => {
        setQcMain(true)
        setOpenQc(false)
    }
    const handleOpenQc = () => {
        setQcMain(false)
        setOpenQc(true)
    }

    const [repairMain, setRepairMain] = useState(true);
    const [openRepair, setOpenRepair] = useState(false);

    const handleMainRepair = () => {
        setRepairMain(true)
        setOpenRepair(false)
    }
    const handleOpenRepair = () => {
        setRepairMain(false)
        setOpenRepair(true)
    }

    const [activeKey, setActiveKey] = useState("1");
    const handleTabChange = (key) => setActiveKey(key);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
             "1068", //  " Process",//0
              "203",  // " Production",//1
              
    
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

    const renderTabContent = (key) => {
        switch (key) {
          case "1":
            return     <div> 
                <BestbeforeEmailList/>
                </div>;
          case "2":
            return  <div>
                <NewArrivalListData/>
            </div>;
        
            
          default:
            return null;
        }
      };

    return (
        <div>
            <StyledTabs
           defaultActiveKey={activeKey} onChange={handleTabChange}
            >
                {!props.inspectionRequiredInd && props.user.refurbishQcInd &&
                    <TabPane
                        tab={
                            <>
                                <span >
                                   Email List
                                </span>
                               
                              

                            </>
                        }
                        key="1">
                       
                    </TabPane>}
                   
                <TabPane
                    tab={
                        <>
                            <span >

                            Arrival List
                            </span>
                            

                        </>
                    }
                    key="2">
                    <Suspense fallback={<BundleLoader />}>
                       
                    </Suspense>
                </TabPane>
                
                
                
              
            </StyledTabs>
            <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
     user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesTab);


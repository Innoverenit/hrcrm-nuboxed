import React, { useState, lazy, Suspense, useEffect } from 'react';
import { StyledTabs } from '../../../Components/UI/Antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BundleLoader } from '../../../Components/Placeholder'
const TechnicianListByOrderId =lazy(()=>import('./TechnicianListByOrderId'));
const RepairTechnicianList =lazy(()=>import('./RepairTechnicianList'));


const OrderQCandRepairHistory = (props) => {


    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
               "661",    //Repair
          
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

    const [activeKey, setActiveKey] = useState(false)
    const handleTabChange = (key) => {
        setActiveKey(key)
    }
    return (
        <div>
            <StyledTabs
                defaultActiveKey="1"
                onChange={handleTabChange}
            >
                <TabPane
                    tab={
                        <>
                            <span >
                                QC
                            </span>
                        </>
                    }
                    key="1">
                    <Suspense fallback={<BundleLoader />}>
                        <TechnicianListByOrderId rowData={props.rowData}
                         translateText={props.translateText}
                         selectedLanguage={props.selectedLanguage} />
                    </Suspense>
                </TabPane>
                <TabPane
                    tab={
                        <>
                            <span>
                               {translatedMenuItems[0]} {/* Repair */}
                            </span>
                        </>
                    }
                    key="2">
                    <Suspense fallback={<BundleLoader />}>
                        <RepairTechnicianList rowData={props.rowData} 
                         translateText={props.translateText}
                         selectedLanguage={props.selectedLanguage}/>
                    </Suspense>
                </TabPane>

            </StyledTabs>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderQCandRepairHistory);


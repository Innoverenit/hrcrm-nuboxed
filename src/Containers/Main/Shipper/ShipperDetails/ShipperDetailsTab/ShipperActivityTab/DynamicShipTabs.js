import React, { useState, useEffect, Suspense } from 'react';
import { Tabs} from 'antd';
import { base_url2 } from '../../../../../../Config/Auth';
import ShipperAwbTable from './ShipperAwbTable';
import axios from 'axios';

const DynamicShipTabs = (props) => {
    const [tabsData, setTabsData] = useState([{"cName":"Nietherland","cId":"C1"},{"cName":"Italy","cId":"C2"}]);
    const [activeKey, setActiveKey] = useState('1');
  
    useEffect(() => {
        const fetchTabsData = async () => {
            try {
                const response = await axios.get(`${base_url2}/DUMMY`,{
                    headers: {
                      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                    },
                  });
                  const data = await response.json();
                  setTabsData(data.tabs); 
            } catch (error) {
                console.error('Error fetching tabs data:', error);
            }
        };

        fetchTabsData();
    }, []);

    const handleTabChange = (key) => {
        setActiveKey(key);
    };
    const renderTabContent = (key) => {
        switch (key) {
          case "1":
            return     <div> 
                   <ShipperAwbTable 
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                shipperId={props.shipperId}
                />
                </div>;
          case "2":
            return  <div> More to come</div>;
            default:
                return null;
            }
          };

    return (
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
            {tabsData.map((tab, index) => (
                <Tabs.TabPane
                    key={tab.key}
                    tab={
                        <span>
                            {/* Dynamically setting the tab name */}
                            <span className="ml-1 !text-tab font-poppins">{tab.cName}</span>
                            
                            {/* Conditional rendering of icons based on activeKey */}
                            {activeKey === tab.key && (
                                <>
                                    {/* {tab.key === "1" && (
                                        <Tooltip title="Add to Order">
                                            <AddShoppingCartIcon
                                                onClick={() => props.handleAddOrderModal(true)}
                                                className="!text-icon cursor-pointer"
                                            />
                                        </Tooltip>
                                    )} */}
                                    {/* {tab.key === "2" && (
                                        <>
                                            <Tooltip title="History">
                                                <HistoryIcon
                                                    fontSize="small"
                                                    onClick={() =>  }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Link Order">
                                                <AddShoppingCartIcon
                                                    onClick={() => props.handleLinkDistributorOrderConfigureModal(true)}
                                                    className="!text-icon cursor-pointer"
                                                />
                                            </Tooltip>
                                        </>
                                    )} */}
                                </>
                            )}
                        </span>
                    }
                >
                  
                    <div>
                    <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
                    </div>
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
};

export default DynamicShipTabs;
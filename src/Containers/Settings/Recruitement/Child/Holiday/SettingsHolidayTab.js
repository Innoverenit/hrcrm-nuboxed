import React, { Suspense, useState,lazy } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
 import {getCountries} from "../../../../Auth/AuthAction"
import LeadsTab from "../../../../Rules/Child/RulesTab/LeadsTab";
 const WeekendCountryList = lazy(() => import("./WeekendCountryList"));
 const CountryList = lazy(() => import("./CountryList"));


const TabPane = StyledTabs.TabPane;

function SettingsHolidayTab(props) {
    const [activeKey, setActiveKey] = useState("1");
    const [departmentData, setDepartmentData] = useState({});
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    // useEffect(() => {
    //     getCountries();
    //   }, [getCountries]);

    const handleOnClick = (data) => {
        console.log(data);
        setSelectedDepartmentId(data);
        setDepartmentData(data);
      };
     const handleHeaderClick = (data) => {
        console.log(data);
        setSelectedDepartmentId(data);
        setDepartmentData(data);
        props.getCountries();
      };

      const handleTabChange = (key) => {
        setActiveKey(key);
      };


      const renderTabContent = (key) => {
        switch (key) {
          case "1":
            return (
              <Suspense fallback={"Loading..."}>
                <CountryList />
              </Suspense>
            );
          case "2":
            return (
              <Suspense fallback={"Loading..."}>
                <WeekendCountryList
                //   translateText={props.translateText}
                //   selectedLanguage={props.selectedLanguage}
                />
              </Suspense>
            );
          case "3":
            return (
              <Suspense fallback={"Loading..."}>
                <LeadsTab
                  
                />
              </Suspense>
            );
        
          default:
            return null;
        }
      };
    
   return (
        <>
            <TabsWrapper>
                <StyledTabs  type="card"
                 defaultActiveKey={activeKey} onChange={handleTabChange}
                >
                    <TabPane 
                     tab={
                        <span onClick={() => handleOnClick()}>
                    Holiday List
                        </span>
                    }
                   
                     key="1"
                     >
                
                     
                    </TabPane>
                    <TabPane 
                       tab={
                        <span >
                   Weekend
                        </span>
                    }
                   
                   key="2"
                    >
                         
                                       
                                 
                     
                    </TabPane>
                    <TabPane 
                       tab={
                        <span >
                   Leaves
                        </span>
                    }
                   
                   key="3"
                    >
                         
                                      
                                 
                     
                    </TabPane>
                  
                </StyledTabs>
                <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    countries: auth.countries,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
         getCountries
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHolidayTab);


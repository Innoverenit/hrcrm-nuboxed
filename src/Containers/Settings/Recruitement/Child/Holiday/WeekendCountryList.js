




import React, {  PureComponent, Suspense,useEffect,useState, lazy } from "react";
import { connect } from "react-redux";
import { Tabs, Badge } from 'antd';
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import {getCountries} from "../../../../Auth/AuthAction"
const Weekend = lazy(() => import("../Weekend/Weekend"));


const TabPane = StyledTabs.TabPane;
function WeekendCountryList (props) {
    const [activeKey, setActiveKey] = useState("")
    useEffect(() => {
        props.getCountries(); 
      //  props.getSectorCount(props.orgId) 
    }, [])


    useEffect(() => {
        // Ensure the initial tab content is rendered on component mount
        
        if (props.countries.length > 0) {
       
          setActiveKey(props.countries[0]?.country_id);
        }
      }, [props.countries]);



    useEffect(() => {
        // Ensure the initial tab content is rendered on component mount
        renderTabContent(activeKey);
        
      }, [activeKey]);
    const handleTabChange = (key) => {
        console.log(key)
        setActiveKey(key);
        //const selectedTypedata = type.find(type => type.workflowCategoryId === value);
      };
   
    const renderTabContent = (key) => {
        const tab = props.countries.find(tab => tab.country_id === key);
        console.log(tab)
        if (!tab) return null;
    
        return <Weekend 
        // label={tab.name} 
        // activeKey={activeKey}
        country_name={tab.country_name}
                          country_id={tab.country_id}
        />;
      };
        return (
            <>
                <TabsWrapper>

<Tabs type="card"
defaultActiveKey={activeKey} onChange={handleTabChange}
>
    {props.countries.map(member => (
    
            <TabPane
               
                tab={
                    <>
                    <span >
                   
                        {member.country_name}
                    </span>
                    </>
                }
                key={member.country_id}  
            />
    ))}
                

          
        
    

</Tabs>
<Suspense fallback={<div className="flex justify-center">Loading...</div>}>
{renderTabContent(activeKey)}
</Suspense>
</TabsWrapper>
            </>
        )
    }


const mapStateToProps = ({ settings, opportunity, auth }) => ({
    countries: auth.countries,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getCountries
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WeekendCountryList);




// import {} from "antd";
// import React, {  PureComponent, Suspense,lazy  } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import {getCountries} from "../../../../Auth/AuthAction"
// const SettingsHoliday = lazy(() => import("./SettingsHoliday"));


// const TabPane = StyledTabs.TabPane;
// class CountryList extends PureComponent {

//     constructor(props) {
//         super(props)

//         this.state = {
//             key: "",
//             departmentData: {}
//         }
//     }

//     componentDidMount() {
//         this.props.getCountries()
//     }

//     handleOnClick = (data) => {
//         console.log(data);
//         debugger;
//         this.setState({
//             departmentData: data,
//         });

//     };
//     render() {
//         const { countries } = this.props;
//         console.log(this.state.departmentData.country_id)
//         return (
//             <>
//                 <TabsWrapper>
//                 {/* <div class=" flex ">
// <div class=" text-xs font-bold font-poppins text-black">Optional Allowed</div>
              
//                   <Input
//                   type="text"
             
//                 />
                
             
//                     <Button 
                 
//                     >Save</Button>
                 
//                     </div> */}
//                     <StyledTabs type="card">
//                         {countries.map((member, i) => {
//                             return (
//                                 <TabPane
//                                     key={i}
//                                     tab={
//                                         <span onClick={() => this.handleOnClick(member)}>
//                                             {member.country_name}
//                                         </span>
//                                     }
//                                 >
//                                     {this.state.departmentData.country_id && (
//                                         <Suspense fallback={"Loading..."}>
                                          
//                                             <div class=" mt-4">
//                             <SettingsHoliday country_name={this.state.departmentData.country_name}
//                             country_id={this.state.departmentData.country_id}
//                             />
                        
//                         </div>
//                                         </Suspense>
//                                     )}

//                                 </TabPane>
//                             );
//                         })} 

//                     </StyledTabs>
//                 </TabsWrapper>
//             </>
//         )
//     }
// }

// const mapStateToProps = ({ settings, opportunity, auth }) => ({
//     countries: auth.countries,

// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//         getCountries
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(CountryList);







import React,{lazy,Suspense,useEffect,useState} from "react";
import { Tabs, Badge } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import {getCountries} from "../../../../Auth/AuthAction"
const SettingsHoliday = lazy(() => import("./SettingsHoliday"));


const TabPane = StyledTabs.TabPane;
function CountryList (props) {

    const [activeKey, setActiveKey] = useState("")
console.log(activeKey)

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
    
        return <SettingsHoliday 
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

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);




























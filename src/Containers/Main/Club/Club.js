import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setClubViewType } from "./ClubAction";
import { BundleLoader } from "../../../Components/Placeholder";
import ClubHeader from "./ClubHeader";
import ClubTableAll from "./ClubTableAll";
import {getclubShare,clearSettingData} from "../../Settings/SettingsAction";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { StyledTabs } from "../../../Components/UI/Antd";
import ClubTableTeam from "./ClubTableTeam";
import ClubTableForAll from "./ClubTableForAll";

const TabPane = StyledTabs.TabPane;

class Club extends Component {
  constructor(props) {
    super(props)

    this.state = {
        key: "",
        currentData: "" ,
     departmentData: {},
        
    }
}

componentDidMount() {
  this.props.getclubShare();

  // Set the initial club data when clubShareData is available
  if (this.props.clubShareData && this.props.clubShareData.length > 0) {
    this.setState({
      departmentData: this.props.clubShareData[0],
    });
  }
}

componentDidUpdate(prevProps) {
  // Check if clubShareData has changed and set the initial state
  if (prevProps.clubShareData !== this.props.clubShareData) {
    if (this.props.clubShareData && this.props.clubShareData.length > 0) {
      this.setState({
        departmentData: this.props.clubShareData[0],
      });
    }
  }
}


  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleOnClick = (data) => {
    console.log(data);
    debugger;
    this.setState({
        departmentData: data,
    });

};


  render() {
    if (this.props.fetchingClubShare) {
      return <BundleLoader />;
    }
    const { setClubViewType, viewType,clubShareData } = this.props;
    return (
      <React.Fragment>
        <ClubHeader
          setClubViewType={setClubViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          clubShareData={clubShareData}
        />

        <Suspense fallback={"Loading..."}>
          {viewType === "table" ? (
              <TabsWrapper style={{height:"150vh" }}>
           <StyledTabs type="card">
           {this.props.clubShareData.map((member, i) => (
             <TabPane key={i} tab={
               <span onClick={() => this.handleOnClick(member)}>
                 {member.clubName}
               </span>
             }>
               {this.state.departmentData.clubId && (
                 <Suspense fallback={"Loading..."}>
                   <div>
                   <ClubTableAll clubId={this.state.departmentData.clubId}
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage} />
                   </div>
                 </Suspense>
               )}
             </TabPane>
           ))}
         </StyledTabs>
         </TabsWrapper>
        //   ):viewType === "teams" ?(
        //   <TabsWrapper style={{height:"150vh" }}>
        //   <StyledTabs type="card">
        //   {this.props.clubShareData.map((member, i) => (
        //     <TabPane key={i} tab={
        //       <span onClick={() => this.handleOnClick(member)}>
        //         {member.clubName}
        //       </span>
        //     }>
        //       {this.state.departmentData.clubId && (
        //         <Suspense fallback={"Loading..."}>
        //           <div>
        //           <ClubTableTeam clubId={this.state.departmentData.clubId} />
        //           </div>
        //         </Suspense>
        //       )}
        //     </TabPane>
        //   ))}
        // </StyledTabs>
        // </TabsWrapper>)
        //  :viewType === "all" ?(
        //   <TabsWrapper style={{height:"150vh" }}>
        //   <StyledTabs type="card">
        //   {this.props.clubShareData.map((member, i) => (
        //     <TabPane key={i} tab={
        //       <span onClick={() => this.handleOnClick(member)}>
        //         {member.clubName}
        //       </span>
        //     }>
        //       {this.state.departmentData.clubId && (
        //         <Suspense fallback={"Loading..."}>
        //           <div>
        //           <ClubTableForAll clubId={this.state.departmentData.clubId} />
        //           </div>
        //         </Suspense>
        //       )}
        //     </TabPane>
        //   ))}
        // </StyledTabs>
        // </TabsWrapper>)
 ) :null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ club, auth ,settings}) => ({
  viewType: club.viewType,
  userId: auth.userDetails.userId,
  clubShareData: settings.clubShareData,
  fetchingClubShare:settings.fetchingClubShare
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setClubViewType,
      getclubShare,
      clearSettingData
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Club);


// import React, { lazy,useState,Suspense,useEffect} from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { setClubViewType } from "./ClubAction";
// import { BundleLoader } from "../../../Components/Placeholder";
// import ClubHeader from "./ClubHeader";
// import { Tabs, Badge } from 'antd';
// import ClubTableAll from "./ClubTableAll";
// import {getclubShare} from "../../Settings/SettingsAction";
// import { TabsWrapper } from "../../../Components/UI/Layout";
// import { StyledTabs } from "../../../Components/UI/Antd";
// import ClubTableTeam from "./ClubTableTeam";
// import ClubTableForAll from "./ClubTableForAll";


// const TabPane = StyledTabs.TabPane;


// function Club(props) {
//     const [activeKey, setActiveKey] = useState(" ")
//     const tabData=props.clubShareData
   
//       useEffect(() => {
        
//         renderTabContent(activeKey);
        
//       }, [activeKey]);
//       useEffect(() => {
           
            
//         if (tabData.length > 0) {
       
//           setActiveKey(tabData[0]?.clubId);
//         }
//       }, [tabData]);
//       useEffect(() => {
//             props.getclubShare()
//       }, []);
//       const handleTabChange = (key) => {
//         setActiveKey(key);
       
//       };
 

//         const renderTabContent = (key) => {
//             // const tab = tabData.find(tab => tab.clubId === key);
//             // console.log(tab)
//             // if (!tab) return null;
        
//             return <ClubTableForAll clubId={activeKey} 
//             />;
//           };
       
//       console.log(activeKey)  
//       const { setClubViewType, viewType,clubShareData } = props;
//     return (
//         <>
         
//         <ClubHeader
//           setClubViewType={setClubViewType}
//           viewType={viewType}
//           // handleClear={this.handleClear}
//           // currentData={this.state.currentData}
//           // setCurrentData={this.setCurrentData}
//           clubShareData={clubShareData}
//         />
//             <TabsWrapper>
               
//  <Tabs type="card"  defaultActiveKey={activeKey}  onChange={handleTabChange}>
//         {tabData.map(tab => (
//           <TabPane
//             tab={
//               <>
//                 <span className="ml-1">{tab.clubName}</span>
                


//               </>
//             }
//             key={tab.clubId}
//           />
//         ))}
//       </Tabs>
//       <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
//         {renderTabContent(activeKey)}
//       </Suspense> 
//             </TabsWrapper>
//         </>
//     );
// }

// const mapStateToProps = ({ club, auth ,settings}) => ({
//   viewType: club.viewType,
//   userId: auth.userDetails.userId,
//   clubShareData: settings.clubShareData
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       setClubViewType,
//       getclubShare
    
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(Club);



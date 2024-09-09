import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setClubViewType } from "./ClubAction";
import { BundleLoader } from "../../../Components/Placeholder";
import ClubHeader from "./ClubHeader";
import ClubTableAll from "./ClubTableAll";
import {getclubShare} from "../../Settings/SettingsAction";
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

        <Suspense fallback={<BundleLoader />}>
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
                   <ClubTableAll clubId={this.state.departmentData.clubId} />
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
  clubShareData: settings.clubShareData
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setClubViewType,
      getclubShare
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Club);

import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer, MainWrapper } from "../../Components/UI/Layout";
import WordCloud from "../../Components/WordCloud/WordCloud";
 import DashboardTodo from "./Child/DashboardTodo";
import Indicator from "./Indicator";
 const DashboardCustomerTab = lazy(() => import("../Dashboard/DashboardCustomerTab"));
function DashboardDetailsRight(props) {
  return (
    <>

       <FlexContainer flexDirection="column" style={{ display: "block" }}>
      
      <DashboardCustomerTab/> 
       <FlexContainer justifyContent="space-between" >
    
       <MainWrapper
        style={{width:"54%",height:"30vh"}}>
       
        Todays Onboard Rate
       <Indicator/>
       </MainWrapper>      
            
       <div style={{ width: "44%",marginLeft:"auto" ,height:"14em"}}>
    
       <DashboardTodo />
    
       </div>
      
       </FlexContainer>
     
       <div style={{ width: "55%", }}>
       <MainWrapper
        style={{height:"30vh",}}
       >
       <WordCloud/>
       </MainWrapper>
       </div>
      
       {/* <DashboardCustomerTab/> */}
      
    </FlexContainer>
    </>
  );
}

const mapStateToProps = ({ permissions, auth }) => ({
//   permissionsData: permissions.permissionsData,
//   userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getPermissions,
    //   addingPermissions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsRight);
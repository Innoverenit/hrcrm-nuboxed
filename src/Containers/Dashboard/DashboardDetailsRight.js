import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../Components/UI/Layout";
import WordCloud from "../../Components/WordCloud/WordCloud";
 import DashboardTodo from "./Child/DashboardTodo";
import Indicator from "./Indicator";
 const DashboardCustomerTab = lazy(() => import("../Dashboard/DashboardCustomerTab"));
function DashboardDetailsRight(props) {
  return (
    <>

<div class=" block flex-col  flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
      
      <DashboardCustomerTab/> 
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
    
       <MainWrapper
        style={{width:"54%",height:"30vh"}}>
       
        Todays Onboard Rate
       <Indicator/>
       </MainWrapper>      
            
       <div style={{ width: "44%",marginLeft:"auto" ,height:"14em"}}>
    
       <DashboardTodo />
    
       </div>
      
       </div>
     
       <div style={{ width: "55%", }}>
       <MainWrapper
        style={{height:"30vh",}}
       >
       <WordCloud/>
       </MainWrapper>
       </div>

    </div>
    </>
  );
}

const mapStateToProps = ({ permissions, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsRight);
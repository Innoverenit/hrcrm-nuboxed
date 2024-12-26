

import React, { useEffect,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styled from "styled-components";
import {getOrderPlanList,emptyOrderPlan} from "../RegionalDashAction"
import { StyledTabs, } from "../../../Components/UI/Antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";

const  OrderPlanColumn = lazy(() =>import("../Child/OrderPlanColumn"));
const TabPane = StyledTabs.TabPane;


const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  position: absolute;
height:26rem;
  // overflow-x: auto;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StageColumn = styled.div`
  background-color: whitesmoke;
  color: ${(props) => props.theme.color};
  float: left;
  overflow-x: scroll;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 26rem;
  width: 250px;
  margin-top: 3.75em;
  overflow-y: auto;
  border-right: 0.06em solid #d2cfcf;
  /* background-color: ${(props) => props.theme.applicationBackground}; */
  /* color: ${(props) => props.theme.color}; */
  /* min-height: 43.12em; */
`;


const StageHeader = styled.div`
  background-color: rgb(14, 149, 144);
  color: white;
  font-size: 0.93em;
  width: 250px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.06em solid ${(props) => props.theme.backgroundColor};
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;


function OrderPlanList(props) {
  const result=[
    {
        repairStatus:"To Start"
    },
    {
        repairStatus:"In Progress"
    },
    {
        repairStatus:"Complete"
    },
  ]

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    props.emptyOrderPlan()
    props.getOrderPlanList(props.userId,props.tabKey,currentYear);
    //  props.getAllOpportunityListByUserId(props.userId)
  }, [props.userId,props.tabKey]);


  if(props.fetchingOrderPlanList){
    return <BundleLoader/>
  }

  return (
    <div class=" flex flex-no-wrap" >
      <MainWrapper
        style={{
          width: "100%",
          color: "#FFFAFA",
          height: "100vh",
        }}
      >
         

        <div class="flex flex-no-wrap justify-center" >
            
                <Container style={{ marginTop: "0.75em" }}>
                  <>
                    {result
                      
                     
                      .map((stage, index) => (
                      
                         
                            
                            <div class=" flex"
                                >
                                  <StageHeader style={{ position: "absolute" }}>
                                    <div>{stage.repairStatus}</div>
                                    <div>
                                    </div>
                                  </StageHeader>
                                
                                    <StageColumn
                                     
                                     style={{scrollbarWidth:"thin", backgroundColor:"f5f5f5" }}
                                    >
                                 {props.orderPlanList
                                        .filter(
                                          (opp, index) =>
                                            opp.repairStatus === stage.repairStatus
                                        )
                                        .map((opp, index) => {
                                          return (
                                            <Suspense fallback={<BundleLoader />}>
                                            <OrderPlanColumn
                                              key={index}
                                              order={opp}
                                              index={index}
                                            //   history={props.history}
                                            /></Suspense>
                                          );
                                        })}
                                    </StageColumn>
                                  
                                </div>
                              
                         
                     
                   
                      ))
                    }
                  </>
                </Container>
             
            </div>
      </MainWrapper>

     
    </div>
  );
}

const mapStateToProps = ({
  opportunity,
  dashboardRegional,
  auth,
  settings,
}) => ({
  
 
orgId: auth.userDetails && auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
   orderPlanList:dashboardRegional.orderPlanList,
   fetchingOrderPlanList:dashboardRegional.fetchingOrderPlanList,
   
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getOrderPlanList,
        emptyOrderPlan
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanList)


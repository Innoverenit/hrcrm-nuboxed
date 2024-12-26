import React, { useEffect, } from 'react';
import { Funnel } from '@ant-design/plots';
import { StyledTabs, } from "../../../Components/UI/Antd";
import {
    getProcessForDeals,   
} from "../../Settings/SettingsAction";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const TabPane = StyledTabs.TabPane;

const FunnelChartInvestor = (props) => {

    useEffect(() => {
        //debugger;
        // if (!processData) return;
        props.getProcessForDeals(props.orgId);
        
      }, []);
    

      const data = [
        {
          stage: 'onBoarded',
          number: 200,
          Amount: 100,
        },
        {
          stage: 'openRequirement',
          number: 155,
          Amount: 80,
        },
        {
          stage: 'selected',
          number: 120,
          Amount: 60,
        },
        {
          stage: 'submitted',
          number: 110,
          Amount: 40,
        },
      ];
      
      const color= ['#d62728', '#2ca02c', '#000000']
      const config = {
        data: data,
        xField: 'stage',
         yField: 'number',
         color:color
        // dynamicHeight: true,
        // legend: false,
      };
    
      return (
        <div>
            <div style={{ display: "flex" }}>
          <StyledTabs
            // defaultActiveKey={this.state.activeKey}
           // onChange={handleTabChange}
            type="card"
          >
            {props.dealsProcess.map((item, i) => {
              return (
                <TabPane
                  key={i}
                  tab={
                    <span 
                    // onClick={() => handleProcessClick(item)}
                    >
                      {item.workflowName}
                    </span>
                  }
                ></TabPane>
              );
            })}
          </StyledTabs>
        </div>
        
          <Funnel 
          // className=" h-[218px] w-[401px]"
          style={{height:"177px",width:"354px"}}
          {...config} />
        </div>
      );
    };


    const mapStateToProps = ({
        opportunity,
        account,
        dashboard,
        auth,
        settings,
      }) => ({
        dealsProcess: settings.dealsProcess,
          orgId: auth.userDetails && auth.userDetails.organizationId,
      
    //   opportunityProcessStages: settings.opportunityProcessStages,
      });
      const mapDispatchToProps = (dispatch) =>
        bindActionCreators(
          {
            getProcessForDeals,
            //   getProcessStagesForOpportunity,
            //   getAllOpportunityListByUserId,
            //   updateOpportunitydragstage
          
          },
          dispatch
        );
      export default connect(mapStateToProps, mapDispatchToProps)(FunnelChartInvestor)
      



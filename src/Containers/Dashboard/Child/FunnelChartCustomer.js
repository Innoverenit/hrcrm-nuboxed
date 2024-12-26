import React, { useEffect, } from 'react';
import { Funnel } from '@ant-design/plots';
import { StyledTabs, } from "../../../Components/UI/Antd";
import {
    getProcessForOpportunity,   
} from "../../Settings/SettingsAction";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const TabPane = StyledTabs.TabPane;

const FunnelChartCustomer = (props) => {

    useEffect(() => {
        //debugger;
        // if (!processData) return;
        props.getProcessForOpportunity(props.orgId);
        
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
        <div className=' h-[40vh] flex items-center justify-center'>
            <div className=" flex" >
          <StyledTabs
            // defaultActiveKey={this.state.activeKey}
           // onChange={handleTabChange}
            type="card"
          >
            {props.opportunityProcess.map((item, i) => {
              return (
                <TabPane
                  key={i}
                  tab={
                    <span >
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
          opportunityProcess: settings.opportunityProcess,
          orgId: auth.userDetails && auth.userDetails.organizationId,
      
    //   opportunityProcessStages: settings.opportunityProcessStages,
      });
      const mapDispatchToProps = (dispatch) =>
        bindActionCreators(
          {
              getProcessForOpportunity,
            //   getProcessStagesForOpportunity,
            //   getAllOpportunityListByUserId,
            //   updateOpportunitydragstage
          
          },
          dispatch
        );
      export default connect(mapStateToProps, mapDispatchToProps)(FunnelChartCustomer)
    



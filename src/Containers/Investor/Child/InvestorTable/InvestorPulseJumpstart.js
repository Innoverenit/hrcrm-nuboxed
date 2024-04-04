import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
 import {
  getInvestorWeightedValue,
  getWonInvestorWeightedValue,
  getInvestorOppValue,
  getWonInvestorOppValue,
  getInvestorPipeLineValue,
  getWonInvestorPipeLineValue,
  getInvestorContactValue
} from "../../InvestorAction"
import { JumpStartBox, } from "../../../../Components/UI/Elements";
class InvestorPulseJumpStart extends React.Component{
  constructor() {
    super();
    const startDate = dayjs().startOf("month"); 
    const endDate = dayjs();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  this.state = {
    date: date,
    startDate,
    endDate
  };
}
componentDidMount() {
  // const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  // const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
   this.props.getInvestorWeightedValue(this.props.RowData.investorId)
    this.props.getInvestorOppValue(this.props.RowData.investorId); 
    this.props.getWonInvestorWeightedValue(this.props.RowData.investorId);   
     this.props.getInvestorContactValue(this.props.RowData.investorId);
     this.props.getInvestorPipeLineValue(this.props.RowData.investorId);
     this.props.getWonInvestorPipeLineValue(this.props.RowData.investorId);
     this.props.getWonInvestorOppValue(this.props.RowData.investorId);
  // console.log(`Start Date: ${this.state.startDate.format("ll")}`);
  // console.log(`End Date: ${this.state.endDate.format("ll")}`);
}

render() {
   const weightedValue = `${this.props.InvWeightedValue.weightedValue}`;
   const pipeLineValue = `${this.props.InvestorPipelineValue.pipeLineValue}`;
 
  const { showDatelist, fetchingDatewiseReport } = this.props;
  console.log( this.props.taskperCount)
   const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  //   const endDate = new Date(this.state.endDate);

  console.log(startDate)
  console.log(this.state.endDate.format("YYYY MM DD"))
  return(
    <>
        <div class=" text-base flex  font-bold justify-center text-[blue]">Current</div>
    <div class=" flex flex-row w-full" >
    
    <div class="flex w-full" >
        
        <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.opportunities"
                defaultMessage=" # Opportunities"
              />
            }
            bgColor="#33D7FF" 
            // bgColor="linear-gradient(270deg,#7630f0,#ad82f7)"
            value={
              this.props.InvestOppValue.opportunity

            }
            isLoading={this.props.fetchingInvestorOppValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />
  
       
          <JumpStartBox
            noProgress
            // bgColor="linear-gradient(270deg,#ad82f7,#3dcec7)"
            bgColor="#34495E "
            title={
              <FormattedMessage
                id="app.pipeLineValue"
                defaultMessage="Pipe line value"
              />
            }
          
            value={
              this.props.InvestorPipelineValue.pipeLineValue

            }
             isLoading={this.props.fetchingInvPipelineValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />

          <JumpStartBox
            bgColor="#35CD7A"
          // bgColor="linear-gradient(270deg,#3062d8,#94a4b2)"
            noProgress
            // title="Open Tasks"
            title={
              <FormattedMessage
                id="app.weightedValue"
                defaultMessage="Weighted Value"
              />
            }
            value={
              this.props.InvWeightedValue.weightedValue

            }
            isLoading={this.props.fetchingINVWeightedValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
            
          />
          <JumpStartBox
        noProgress
        title={
          <FormattedMessage
            id="app.activity"
            defaultMessage="Activity"
          />
        }
        // value={
        //   this.props.WonCustomerOpp.CustomerWonOppertunityDetails

        // }
        bgColor="#FF4C33"
        // isLoading={this.props.fetchingWonCustomerOppValue} 
        //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
      
      />
          <JumpStartBox
           bgColor="linear-gradient(270deg,black,grey)"
            noProgress
            title={
              <FormattedMessage
                id="app.#Contacts"
                defaultMessage="#Contacts "
              />
            }

            value={
              this.props.InvcontactValue.contact

            }
            isLoading={this.props.fetchingInvContactValue} 
            // //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
            
          />


       

        </div>

        {/* <FlexContainer>
          <JumpStartBox noProgress title="All Products" bgColor="#8791a1" />
          <JumpStartBox noProgress title="Quantity On Hand" bgColor="#8791a1" />
          <JumpStartBox
            noProgress
            title="Out of Stock Products"
            bgColor="#8791a1"
          />
          <JumpStartBox noProgress title="Total Visitors" bgColor="#8791a1" />
        </FlexContainer> */}
      </div>
      <div class=" text-base justify-center flex font-bold  text-[blue]">Past</div>
        <div class=" flex flex-row w-full mt-4" >
        <div class="flex w-full" >
            
            <JumpStartBox
             bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                noProgress
                title={
                  <FormattedMessage
                    id="app.opportunities"
                    defaultMessage="Won Opportunities"
                  />
                }
                value={
                  this.props.WonInvestOpp.opportunityWon
    
                }
                isLoading={this.props.fetchingWonInvestorOppValue} 
                //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
              
              />
      
           
              <JumpStartBox
               bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                noProgress
                title={
                  <FormattedMessage
                    id="app.pipeLineValue"
                    defaultMessage="Won Pipe line value"
                  />
                }
              
                value={
                  this.props.WonInvestorPipeline.pipeLineWonValue
    
                }
                 isLoading={this.props.fetchingWonInvPipelineValue} 
                //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
              
              />
    
              <JumpStartBox
               bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                noProgress
                // title="Open Tasks"
                title={
                  <FormattedMessage
                    id="app.weightedValue"
                    defaultMessage="Won Weighted Value"
                  />
                }
                value={
                  this.props.WonInvWeighted.weightedWonValue
    
                }
                isLoading={this.props.fetchingWonINVWeightedValue} 
                //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
              
                
              />
      
         
               
    
            </div>
    
            {/* <FlexContainer>
              <JumpStartBox noProgress title="All Products" bgColor="#8791a1" />
              <JumpStartBox noProgress title="Quantity On Hand" bgColor="#8791a1" />
              <JumpStartBox
                noProgress
                title="Out of Stock Products"
                bgColor="#8791a1"
              />
              <JumpStartBox noProgress title="Total Visitors" bgColor="#8791a1" />
            </FlexContainer> */}
          </div>
          </>
    
  ); 
}
}
const mapStateToProps = ({ investor,auth }) => ({

  WonInvWeighted:investor.WonInvWeighted,
  fetchingWonINVWeightedValue:investor.fetchingWonINVWeightedValue,
  WonInvestorPipeline:investor.WonInvestorPipeline,
  fetchingWonInvPipelineValue:investor.fetchingWonInvPipelineValue,
  WonInvestOpp:investor.WonInvestOpp,
  fetchingWonInvestorOppValue:investor.fetchingWonInvestorOppValue,
  InvcontactValue:investor.InvcontactValue,
  fetchingInvContactValue:investor.fetchingInvContactValue,
  InvestorPipelineValue:investor.InvestorPipelineValue,
  fetchingInvPipelineValue:investor.fetchingInvPipelineValue,
  InvestOppValue:investor.InvestOppValue,
  fetchingInvestorOppValue:investor.fetchingInvestorOppValue,
  InvWeightedValue:investor.InvWeightedValue,
  fetchingINVWeightedValue:investor.fetchingINVWeightedValue
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvestorWeightedValue,
  getWonInvestorWeightedValue,
getInvestorOppValue,
getWonInvestorOppValue,
getInvestorPipeLineValue, 
getWonInvestorPipeLineValue, 
getInvestorContactValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorPulseJumpStart);

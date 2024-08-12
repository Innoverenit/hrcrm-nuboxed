import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
class ContactInvestPulseJumpStart extends React.Component{
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

render() {
  const weightedValue = `${this.props.WeightedValue.weightedValue} ${this.props.WeightedValue.tradeCurrency}`;
  const pipeLineValue = `${this.props.pipelineValue.pipeLineValue} ${this.props.pipelineValue.tradeCurrency}`;
  const OpportunityValue = `${this.props.OppValue.pipeLineValue} ${this.props.WeightedValue.tradeCurrency}`
  const { showDatelist, fetchingDatewiseReport } = this.props;
  console.log( this.props.taskperCount)
   const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  //   const endDate = new Date(this.state.endDate);

  console.log(startDate)
  console.log(this.state.endDate.format("YYYY MM DD"))
  return(
    <>
    <div class=" flex flex-row w-full" >
    <div class="flex w-full" >
        
        <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.opportunities"
                defaultMessage="#Open Opportunities"
              />
            }
            // }
            bgColor="#33D7FF"             
          />           
          <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.pipeLineValue"
                defaultMessage="Pipe line value"
              />
            }
            bgColor="#34495E "
                   
          />

<JumpStartBox
        noProgress
        title={
          <FormattedMessage
            id="app.opportunities"
            defaultMessage=" Opportunities Won"
          />
        }
         bgColor="#35CD7A"   
      />   
<JumpStartBox
        noProgress
        title={
          <FormattedMessage
            id="app.activity"
            defaultMessage="Activity"
          />
        }      
        bgColor="#FF4C33"     
      />
      <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.#Contacts"
                defaultMessage="#Contacts "
              />
            }     
            bgColor="linear-gradient(270deg,black,grey)"                     
          />                     
        </div>
      </div>

<div class=" flex flex-row w-full mt-4" >
  </div>
  </>
  ); 
}
}
const mapStateToProps = ({ customer,auth }) => ({
  contactValue:customer.contactValue,
  WonCustomerWeighted:customer.WonCustomerWeighted,
  fetchingWonCusmWeightedValue:customer.fetchingWonCusmWeightedValue,
  WonCustomerPipeline:customer.WonCustomerPipeline,
  fetchingWonCusPipelineValue:customer.fetchingWonCusPipelineValue,
  WonCustomerOpp:customer.WonCustomerOpp,
  fetchingWonCustomerOppValue:customer.fetchingWonCustomerOppValue,
  fetchingContactValue:customer.fetchingContactValue,
  pipelineValue:customer.pipelineValue,
  fetchingPipelineValue:customer.fetchingPipelineValue,
  OppValue:customer.OppValue,
  fetchingOppValue:customer.fetchingOppValue,
  WeightedValue:customer.WeightedValue,
  fetchingWeightedValue:customer.fetchingWeightedValue
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestPulseJumpStart);

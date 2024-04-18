import React, {Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import {getProspectWeightedValue,
  getCustomerActivityRecords,
  getWonCustomerOppValue,
  getWonCustomerPipeLineValue,
  getWonCustomerWeightedValue,
  handleCustomerContactJumpstartModal,
  handleCustomerActivityJumpstartModal,
  handleCustomerOpenOpportunityJumpstartModal,
  handleCustomerWonOpportunityJumpstartModal,
  getProspectOppValue,getProspectPipeLineValue,getProspectContactValue} from "../../CustomerAction"
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import AddCustomerContactJumpstartModal from "./AddCustomerContactJumpstartModal";
import AddCustomerActivityJumpstartModal from "./AddCustomerActivityJumpstartModal";
import AddCustomerOpenOppJumpstartModal from "./AddCustomerOpenOppJumpstartModal";
import AddCustomerWonOppJumpstartModal from "./AddCustomerWonOppJumpstartModal";
import CustrOpenOpportunityJumpstartCardList from "./CustrOpenOpportunityJumpstartCardList";
import { BundleLoader } from "../../../../Components/Placeholder";
class CustomerPulseJumpStart extends React.Component{
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
  
  this.props.getWonCustomerWeightedValue(this.props.customer.customerId)
  this.props.getWonCustomerPipeLineValue(this.props.customer.customerId)
  this.props.getWonCustomerOppValue(this.props.customer.customerId)
  // const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  // const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
  this.props.getProspectWeightedValue(this.props.customer.customerId);
  this.props.getCustomerActivityRecords(this.props.customer.customerId);
  
    this.props.getProspectOppValue(this.props.customer.customerId);    
    this.props.getProspectContactValue(this.props.customer.customerId);
    this.props.getProspectPipeLineValue(this.props.customer.customerId);
  // console.log(`Start Date: ${this.state.startDate.format("ll")}`);
  // console.log(`End Date: ${this.state.endDate.format("ll")}`);
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
  const {
    handleCustomerActivityJumpstartModal,
    addCustomerWonOppJumpstartModal,
    addCustomerOpenOppJumpstartModal,
    handleCustomerOpenOpportunityJumpstartModal,
    addCustomerActivityJumpstartModal,
    handleCustomerContactJumpstartModal,
    addCustomerContactJumpstartModal,
    handleCustomerWonOpportunityJumpstartModal
  } = this.props;
  return(
    <>
    <div class=" flex flex-row w-full" >
    <div class="flex w-full" >
        
        <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.quotations"
                defaultMessage="#Open Quotations"
              />
            }
            // jumpstartClick={() => {
            //   handleCustomerOpenOpportunityJumpstartModal(true);
           
            
            // }}
      
            // cursorData={"pointer"}
            value={
              this.props.OppValue.CustomerOppertunityDetails

            }
            bgColor="#33D7FF" 
            // bgColor="linear-gradient(270deg,#7630f0,#ad82f7)"
            isLoading={this.props.fetchingOppValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />
  
       
          <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.pipeLineValue"
                defaultMessage="Pipeline value"
              />
            }
            bgColor="#34495E "
            // bgColor="linear-gradient(270deg,#ad82f7,#3dcec7)"
            value={
              pipeLineValue

            }
            isLoading={this.props.fetchingPipelineValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />


<JumpStartBox
    noProgress
    title={
        <FormattedMessage
            id="app.quotations"
            defaultMessage=" Quotations Won"
        />
    }
    value={this.props.WonCustomerOpp.CustomerWonOppertunityDetails}
    jumpstartClick={() => {
        handleCustomerWonOpportunityJumpstartModal(true);
        // handleRowData(region);
    }}
    cursorData={"pointer"}
    bgColor="#35CD7A"
    // bgColor="linear-gradient(270deg,#3062d8,#94a4b2)"
    isLoading={this.props.fetchingWonCustomerOppValue} 
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
        value={
          this.props.customerActivityCount.count

        }
        jumpstartClick={() => {
          handleCustomerActivityJumpstartModal(true);
       
          // handleRowData(region);
        }}
  
        cursorData={"pointer"}
        bgColor="#FF4C33"
        // isLoading={this.props.fetchingWonCustomerOppValue} 
        //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
      
      />
      <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.#Contacts"
                defaultMessage="#Contacts "
              />
            }
       
            jumpstartClick={() => {
              handleCustomerContactJumpstartModal(true);
           
              // handleRowData(region);
            }}
      
            cursorData={"pointer"}

            value={
              this.props.contactValue.CustomerContactDetails

            }
            bgColor="linear-gradient(270deg,black,grey)"
            isLoading={this.props.fetchingContactValue} 
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

<div class=" flex flex-row w-full mt-4" >
<Suspense fallback={<BundleLoader />}>
            <CustrOpenOpportunityJumpstartCardList 
          customer={this.props.customer} 
           
            />
          </Suspense>
{/* <div class="flex w-full" >
    
<JumpStartBox2
            noProgress
            // title="Open Tasks"
            title={
              <FormattedMessage
                id="app.weightedValue"
                defaultMessage="Weighted Value"
              />
            }
            value={
              weightedValue

            }
            isLoading={this.props.fetchingWeightedValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
            
          />
  
   
      <JumpStartBox1
        noProgress
        title={
          <FormattedMessage
            id="app.pipeLineValue"
            defaultMessage="Won Pipe line value"
          />
        }
      
        value={
          this.props.WonCustomerPipeline.WonPipeLineValue

        }
         isLoading={this.props.fetchingWonCusPipelineValue} 
        //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
      
      />

      <JumpStartBox2
        noProgress
        // title="Open Tasks"
        title={
          <FormattedMessage
            id="app.weightedValue"
            defaultMessage="Won Weighted Value"
          />
        }
        value={
          this.props.WonCustomerWeighted.weightedValue

        }
        isLoading={this.props.fetchingWonCusmWeightedValue} 
        //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
      
        
      />

 
       

    </div> */}

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
  <AddCustomerContactJumpstartModal
       customer={this.props.customer}
        addCustomerContactJumpstartModal={addCustomerContactJumpstartModal}
        handleCustomerContactJumpstartModal={handleCustomerContactJumpstartModal}
      />
        <AddCustomerActivityJumpstartModal
       customer={this.props.customer}
       addCustomerActivityJumpstartModal={addCustomerActivityJumpstartModal}
        handleCustomerActivityJumpstartModal={handleCustomerActivityJumpstartModal}
      />
           <AddCustomerOpenOppJumpstartModal
       customer={this.props.customer}
       addCustomerOpenOppJumpstartModal={addCustomerOpenOppJumpstartModal}
       handleCustomerOpenOpportunityJumpstartModal={handleCustomerOpenOpportunityJumpstartModal}
      />
               <AddCustomerWonOppJumpstartModal
       customer={this.props.customer}
       addCustomerWonOppJumpstartModal={addCustomerWonOppJumpstartModal}
       handleCustomerWonOpportunityJumpstartModal={handleCustomerWonOpportunityJumpstartModal}
      />
  </>
  ); 
}
}
const mapStateToProps = ({ customer,auth }) => ({
  addCustomerWonOppJumpstartModal:customer.addCustomerWonOppJumpstartModal,
  addCustomerOpenOppJumpstartModal:customer.addCustomerOpenOppJumpstartModal,
  contactValue:customer.contactValue,
  addCustomerActivityJumpstartModal:customer.addCustomerActivityJumpstartModal,
  addCustomerContactJumpstartModal:customer.addCustomerContactJumpstartModal,
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
  customerActivityCount:customer.customerActivityCount,
  fetchingOppValue:customer.fetchingOppValue,
  WeightedValue:customer.WeightedValue,
  fetchingWeightedValue:customer.fetchingWeightedValue
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getProspectWeightedValue,
  getProspectOppValue,
  getCustomerActivityRecords,
  getWonCustomerWeightedValue,
  getWonCustomerPipeLineValue,
  getProspectPipeLineValue,
  getProspectContactValue,
  getWonCustomerOppValue,
  handleCustomerContactJumpstartModal,
  handleCustomerActivityJumpstartModal,
  handleCustomerOpenOpportunityJumpstartModal,
  handleCustomerWonOpportunityJumpstartModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPulseJumpStart);

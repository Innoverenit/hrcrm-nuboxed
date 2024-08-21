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
import CustrContJumpstartCardList from "./CustrContJumpstartCardList";
import CustrWonOpportunityJumpstartCardList from "./CustrWonOpportunityJumpstartCardList";
import CustrActivityJumpstartCardList from "./CustrActivityJumpstartCardList";
class CustomerPulseJumpStart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
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
        endDate,
        activeCard: "quotations", // default card to show
      };
}
componentDidMount() {
  
  this.props.getWonCustomerWeightedValue(this.props.customer.customerId)
  this.props.getWonCustomerPipeLineValue(this.props.customer.customerId)
  this.props.getWonCustomerOppValue(this.props.customer.customerId)
  
  this.props.getProspectWeightedValue(this.props.customer.customerId);
  this.props.getCustomerActivityRecords(this.props.customer.customerId);
  
    this.props.getProspectOppValue(this.props.customer.customerId);    
    this.props.getProspectContactValue(this.props.customer.customerId);
    this.props.getProspectPipeLineValue(this.props.customer.customerId);

}
handleClick = () => {
  this.setState(prevState => ({
    isFlipped: !prevState.isFlipped
  }));
};
handleCardClick = (cardName) => {
  this.setState({ activeCard: cardName });
}

render() {
  const { isFlipped } = this.state;
   if (this.props.fetchingOppValue) {
    return <BundleLoader />;
  }

 
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
  const { activeCard } = this.state;
  return(
    <>
    <div class=" flex flex-row w-full" >
    <div class="flex w-full justify-center" >
    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                        <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-3 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.quotations"
                defaultMessage="#Open Quotations"
              />
            }

             jumpstartClick={() => this.handleCardClick("quotations")}
         
            value={
              this.props.fetchingOppValue ? "Loading..." :
              this.props.OppValue.CustomerOppertunityDetails === 0 ? "None" :
              this.props.OppValue.CustomerOppertunityDetails
            }
         
            bgColor="#33D7FF" 
       
            isLoading={this.props.fetchingOppValue} 
 
          
          />
  
                            </div>
                        </div>
                    
                    </div>  
                    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                        <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-3 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
  noProgress
  title={
    <FormattedMessage
      id="app.pipeLineValue"
      defaultMessage="Pipeline value"
    />
  }
  bgColor="#34495E"
  value={
    this.props.fetchingPipelineValue ? "Loading..." :
    this.props.pipelineValue.pipeLineValue === null ? "None" :
    pipeLineValue
  }
  isLoading={this.props.fetchingPipelineValue} 
/>
                            </div>
                        </div>
                     
                    </div>  
  
                    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                        <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-3 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
    noProgress
    title={
        <FormattedMessage
            id="app.quotations"
            defaultMessage=" Quotations Won"
        />
    }
    value={
      this.props.fetchingWonCustomerOppValue ? "Loading..." :
      this.props.WonCustomerOpp.CustomerWonOppertunityDetails === null ? "None" :
      this.props.WonCustomerOpp.CustomerWonOppertunityDetails
    }
    
    jumpstartClick={() => this.handleCardClick("quotationsWon")}
   
    cursorData={
      this.props.fetchingWonCustomerOppValue || this.props.WonCustomerOpp.CustomerWonOppertunityDetails === 0 ? "not-allowed" : "pointer"
    }
    bgColor="#35CD7A"
  
    isLoading={this.props.fetchingWonCustomerOppValue} 
    //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
/>
                            </div>
                        </div>
                      
                    </div>    


                    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                        <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-3 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
        noProgress
        title={
          <FormattedMessage
            id="app.activity"
            defaultMessage="Activity"
          />
        }
        value={
          this.props.fetchingCustomerActivityCount ? "Loading..." :
          this.props.customerActivityCount.count === 0 ? "None" :
          this.props.customerActivityCount.count
        }
       
        isLoading={this.props.fetchingCustomerActivityCount} 
        jumpstartClick={() => this.handleCardClick("activity")}
       
        cursorData={
          this.props.fetchingCustomerActivityCount ||  this.props.customerActivityCount.count === 0 ? "not-allowed" : "pointer"
        }
        bgColor="#FF4C33"
       
        //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
      
      />
                            </div>
                        </div>
                       
                    </div>

                    {/* <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                    
                       <div class="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-3 bg-red-500"><i class="fas fa-tasks fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.#Contacts"
                defaultMessage="#Contacts "
              />
            }
            jumpstartClick={() => this.handleCardClick("contacts")}
          
            cursorData={
              this.props.fetchingContactValue ||   this.props.contactValue.CustomerContactDetails === 0 ? "not-allowed" : "pointer"
            }

            // value={
            //   this.props.contactValue.CustomerContactDetails

            // }
            value={
              this.props.fetchingContactValue ? "Loading..." :
              this.props.contactValue.CustomerContactDetails === 0 ? "None" :
              this.props.contactValue.CustomerContactDetails
            }
            bgColor="linear-gradient(270deg,black,grey)"
            isLoading={this.props.fetchingContactValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"               
          /> 
                            </div>
                        </div>
                       
                    </div> */}

<div className="w-full md:w-1/2 xl:w-1/3 p-2" style={{ perspective: '1000px' }}>
        <div
          className={`relative w-full h-[5rem] transition-transform duration-700 ${isFlipped ? 'flip' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={this.handleClick}
        >
          {/* Front of the card */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl flex items-center p-1"
            style={{ backfaceVisibility: 'hidden' }}
          >
             <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-3 bg-red-500"><i class="fas fa-tasks fa-2x fa-inverse"></i></div>
                                </div>
            {/* Replace with your actual JumpStartBox component */}
            <div>
            <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.#Contacts"
                defaultMessage="#Contacts "
              />
            }
            jumpstartClick={() => this.handleCardClick("contacts")}
          
            cursorData={
              this.props.fetchingContactValue ||   this.props.contactValue.CustomerContactDetails === 0 ? "not-allowed" : "pointer"
            }

            // value={
            //   this.props.contactValue.CustomerContactDetails

            // }
            value={
              this.props.fetchingContactValue ? "Loading..." :
              this.props.contactValue.CustomerContactDetails === 0 ? "None" :
              this.props.contactValue.CustomerContactDetails
            }
            bgColor="linear-gradient(270deg,black,grey)"
            isLoading={this.props.fetchingContactValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"               
          /> 
            </div>
          </div>

          {/* Back of the card */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-100 border-b-4 border-gray-500 rounded-lg shadow-xl flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h2 className="text-lg font-semibold">Additional Details</h2>
            <p>Some more information can be displayed here.</p>
          </div>
        </div>
      </div>









                           
        </div>

     
      </div>

<div class=" flex flex-row w-full mt-4" >
<Suspense fallback={<BundleLoader />}>
          {activeCard === "quotations" && <CustrOpenOpportunityJumpstartCardList customer={this.props.customer} />}
          {activeCard === "contacts" && <CustrContJumpstartCardList customer={this.props.customer} />}
          {activeCard === "quotationsWon" && <CustrWonOpportunityJumpstartCardList customer={this.props.customer} />}
          {activeCard === "activity" && <CustrActivityJumpstartCardList customer={this.props.customer} />}       
        </Suspense>

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
  fetchingCustomerActivityCount:customer.fetchingCustomerActivityCount,
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

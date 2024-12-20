import React, {Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomerTimeLineChart from "../CustomerTable/CustomerTimeLineChart"
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
import ContactsIcon from '@mui/icons-material/Contacts';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

class CustomerPulseJumpStart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      translatedMenuItems: [],
      loading: true
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
        translatedMenuItems: [],
        loading: true
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
    this.fetchMenuTranslations();
}

componentDidUpdate(prevProps) {
  if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
    this.fetchMenuTranslations();
  }
}
async fetchMenuTranslations() {
  try {
    this.setState({ loading: true });
    const itemsToTranslate = [
     '1291', // 0 #Open Quotations
     '1162', // 1  Pipeline value
    //  '', // 2 Quotations Won
    '1165', // 3 Activity
    '73', // 4 Contacts


    ];
    const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
    this.setState({ translatedMenuItems: translations ,loading: false});
   
  } catch (error) {
    this.setState({ loading: false });
    console.error('Error translating menu items:', error);
  }
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
<div className=" flex justify-between w-wk"> 
<div class="flex flex-col w-[50%] justify-between h-[68vh] max-md:h-[68vh]">
<div className=" flex flex-wrap">
    <div class=" flex flex-row w-full" >     
    <div class="flex flex-wrap w-full" >
    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                        <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center text-xs">
                                <div class="flex-shrink pr-3">
                                    <div class="rounded-full p-1 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
            noProgress
            title=' #Open Quotations'
              // "Open Quotations"      
              

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
                       
                        <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center text-xs">
                                <div class="flex-shrink pr-3">
                                    <div class="rounded-full p-1 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
  noProgress
 title= 'Pipeline value'
 //'{this.props.translatedMenuItems[1]}'
  // Pipeline value */}
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
                       
                        <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center text-xs">
                                <div class="flex-shrink pr-3">
                                    <div class="rounded-full p-1 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                                </div>
                                <JumpStartBox
    noProgress
    title='Quotations Won'
    // '{this.props.translatedMenuItems[2]}' 
    // Quotations Won
     
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
                      
                        <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                            <div class="flex flex-row items-center text-xs">
                                <div class="flex-shrink pr-3">
                                    <div class="rounded-full p-1 bg-blue-600">
                                    <HourglassFullIcon className="text-blue-500  !text-icon" />
                                      </div>
                                </div>  
                                <JumpStartBox
        noProgress
        title='Activity'
  //  Activity
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
<div className="w-full md:w-1/2 xl:w-1/3 p-2" style={{ perspective: '1000px' }}>
        <div
          className={`relative  h-[3.5rem] w-full transition-transform duration-700 ${isFlipped ? 'flip' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={this.handleClick}
        >
          {/* Front of the card */}
          <div
            className="absolute inset-0 bg-gradient-to-b w-wk from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl flex items-center p-1 text-xs"
            style={{ backfaceVisibility: 'hidden' }}
          >
             <div class="flex-shrink pr-3">
                                    <div class="rounded-full p-1 bg-red-500"><ContactsIcon className="!text-3xl text-[#FFFF]"/></div>
                                </div>
            {/* Replace with your actual JumpStartBox component */}
            <div>
            <JumpStartBox
            noProgress
            title='contacts'
      // #Contacts
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
            className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-100 border-b-4 border-gray-500 rounded-lg shadow-xl flex flex-col items-center justify-center text-xs"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h2 className="text-lg font-semibold">Additional Details</h2>
            <p>Some more information can be displayed here.</p>
          </div>
        </div>
      </div>









                           
        </div>

     
      </div>
</div>
<div className=" ">
    <CustomerTimeLineChart
     customer={this.props.customer}
    />
  </div>
</div>
<div class=" flex " >
<Suspense fallback={<BundleLoader />}>
          {activeCard === "quotations" && <CustrOpenOpportunityJumpstartCardList customer={this.props.customer}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems} />}
          {activeCard === "contacts" && <CustrContJumpstartCardList customer={this.props.customer}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems} />}
          {activeCard === "quotationsWon" && <CustrWonOpportunityJumpstartCardList customer={this.props.customer}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems} />}
          {activeCard === "activity" && <CustrActivityJumpstartCardList customer={this.props.customer}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems} />}       
        </Suspense>

  </div>
  </div>
  <AddCustomerContactJumpstartModal
       customer={this.props.customer}
       translateText={this.props.translateText}
       selectedLanguage={this.props.selectedLanguage}
       translatedMenuItems={this.props.translatedMenuItems}
        addCustomerContactJumpstartModal={addCustomerContactJumpstartModal}
        handleCustomerContactJumpstartModal={handleCustomerContactJumpstartModal}
      />
        <AddCustomerActivityJumpstartModal
       customer={this.props.customer}
       translateText={this.props.translateText}
       selectedLanguage={this.props.selectedLanguage}
       translatedMenuItems={this.props.translatedMenuItems}
       addCustomerActivityJumpstartModal={addCustomerActivityJumpstartModal}
        handleCustomerActivityJumpstartModal={handleCustomerActivityJumpstartModal}
      />
           <AddCustomerOpenOppJumpstartModal
       customer={this.props.customer}
       translateText={this.props.translateText}
       selectedLanguage={this.props.selectedLanguage}
       translatedMenuItems={this.props.translatedMenuItems}
       addCustomerOpenOppJumpstartModal={addCustomerOpenOppJumpstartModal}
       handleCustomerOpenOpportunityJumpstartModal={handleCustomerOpenOpportunityJumpstartModal}
      />
               <AddCustomerWonOppJumpstartModal
       customer={this.props.customer}
       translateText={this.props.translateText}
       selectedLanguage={this.props.selectedLanguage}
       translatedMenuItems={this.props.translatedMenuItems}
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

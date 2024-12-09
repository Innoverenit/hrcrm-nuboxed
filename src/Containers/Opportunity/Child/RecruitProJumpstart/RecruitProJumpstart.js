import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import { CurrencySymbol } from "../../../../Components/Common";
import {
  getAllRecruitmentByOppId,
  getAllRecruitmentPositionByOppId,
   getAllRecruitmentAvgTimeByOppId,
  getAllRecruitmentPositionFilledByOppId,
} from "../../OpportunityAction";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
class RecruitProJumpStart extends Component {
  componentDidMount() {
    this.props.getAllRecruitmentByOppId(this.props.opportunityId);
     this.props.getAllRecruitmentPositionByOppId(this.props.opportunityId);
     this.props.getAllRecruitmentAvgTimeByOppId(this.props.opportunityId);
     this.props.getAllRecruitmentPositionFilledByOppId(this.props.opportunityId);
  }
  render() {
    return (
      <div class=" flex w-full items-center justify-center max-sm:flex-col mt-4" >
    <div class="w-[14rem] max-md:w-1/2  max-xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-green-600"><VolumeUpIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
            title="# Requirements"
            noProgress
            stringValue
             value={this.props.allRecruitmentByOppId}
            isLoading={this.props.fetchingAllRecruitmentByOppId}
          />
          <CurrencySymbol />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-[14rem]  max-md:w-1/2  max-xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-yellow-600"><EventAvailableIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
            title="# Positions"
            noProgress
            stringValue
             isLoading={this.props.fetchingAllRecruitmentPositionByOppId}
             value={this.props.allRecruitmentPositionByOppId}
           
          />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-[14rem]  max-md:w-1/2  max-xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f]  rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2  bg-pink-600"><FactCheckIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
            noProgress
            stringValue
       
            title="# Selected"
          
             isLoading={this.props.fetchingAllRecruitmentPositionFilledByOppId}
             value={this.props.allRecruitmentPositionFilledByOppId}
           
          />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-[14rem]  max-md:w-1/2  max-xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-blue-600"><EventAvailableIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
            noProgress
            stringValue
            // title="Average Time"
            title="OnBoarded"
        
            isLoading={this.props.fetchingAllRecruitmentAvgTimeByOppId}
              value={this.props.allRecruitmentAvgTimeByOppId.recruitProfileLinkDetails}
           
          />
                         </div>
                     </div>
                 
                 </div> 
         
        </div>
     
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  opportunityId: opportunity.opportunity.opportunityId,
  fetchingAllRecruitmentByOppId: opportunity.fetchingAllRecruitmentByOppId,
  fetchingAllRecruitmentByOppIdError:
    opportunity.fetchingAllRecruitmentByOppIdError,
   allRecruitmentByOppId: opportunity.allRecruitmentByOppId,

  fetchingAllRecruitmentPositionByOppId:
     opportunity.fetchingAllRecruitmentPositionByOppId,
 fetchingAllRecruitmentPositionByOppIdError:
     opportunity.fetchingAllRecruitmentPositionByOppIdError,
   allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,

   fetchingAllRecruitmentAvgTimeByOppId:
     opportunity.fetchingAllRecruitmentAvgTimeByOppId,
   fetchingAllRecruitmentAvgTimeByOppIdError:
    opportunity.fetchingAllRecruitmentAvgTimeByOppIdError,
   allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,

   fetchingAllRecruitmentPositionFilledByOppId:
   opportunity.fetchingAllRecruitmentPositionFilledByOppId,
   fetchingAllRecruitmentPositionFilledByOppIdError:
     opportunity.fetchingAllRecruitmentPositionFilledByOppIdError,
   allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getAllRecruitmentByOppId,
       getAllRecruitmentPositionByOppId,
       getAllRecruitmentAvgTimeByOppId,
      getAllRecruitmentPositionFilledByOppId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitProJumpStart);

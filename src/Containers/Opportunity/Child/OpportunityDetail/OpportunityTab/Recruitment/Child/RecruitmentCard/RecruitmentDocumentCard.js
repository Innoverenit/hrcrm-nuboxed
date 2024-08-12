import React, {  Component } from 'react'
import { base_url } from "../../../../../../../../Config/Auth";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { MainWrapper } from '../../../../../../../../Components/UI/Layout'
import {
    getCandidateDocument,  
  } from "../../../../../../../Candidate/CandidateAction";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class RecruitmentDocumentCard extends Component {
    componentDidMount() {
        const {
          candidate: { candidateId },
          getCandidateDocument,
        } = this.props;   
        getCandidateDocument(candidateId);
      }    
  
  render() {

    return (
      
        <MainWrapper>
            <h1 style={{fontSize:"0.875em"}}>Document</h1>
            <div class="flex"> 
               {this.props.documentsByCandidateId.map((item) => { 
                  return ( 
             
                 
                    <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                  <div class="w-7 h-7" >
                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
                         <FileCopyIcon 
                   style={{fontSize:"40px",color:"blue"}}
                
                  />
                   </a>                                                
                        </div>                    
                        <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.documentContentType} </div>                                           
                    </div>
                  )   
                      })} 
              </div>     
            </MainWrapper>     
    )
              }
}
const mapStateToProps = ({ candidate, auth }) => ({
    // userId: auth.userDetails.userId,
    documentsByCandidateId:candidate.documentsByCandidateId
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // getCandidateListByUserId,
        // getCandidateById,
        getCandidateDocument
        // handleCandidateDrawerModal
    //   LinkProductInfo
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentDocumentCard)


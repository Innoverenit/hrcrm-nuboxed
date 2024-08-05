import React, {  Component } from 'react'
import { base_url } from "../../Config/Auth";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { MainWrapper } from '../../Components/UI/Layout';

class CandidateDocumentView extends Component {
  render() {
    return (  
          <>         
              <div class="flex">
               {this.props.documentsByCandidateId.map((item) => { 
                  return (                        
                    <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                      <MainWrapper>
                      <div class="w-7 h-7" >
                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
                         <FileCopyIcon 
                   style={{fontSize:"2.5em",color:"cornflowerblue"}}            
                  />
                   </a>                                                  
                        </div>
                        <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">{item.documentContentType} </div>
                        </MainWrapper>             

                    </div>
                  )   
                      })} 
              </div>           
           </>       
    )
              }
}

const mapStateToProps = ({ candidate, auth }) => ({  
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {    
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDocumentView)

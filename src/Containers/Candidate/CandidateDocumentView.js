import React, {  Component } from 'react'
import { base_url } from "../../Config/Auth";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class CandidateDocumentView extends Component {
  render() {
    return (  
          <>         
              <div class="flex">
               {this.props.documentsByCandidateId.map((item) => { 
                  return (                        
                    <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                  <div class="rounded shadow-[0em 0.25em 0.625em -0.125em] border-solid text-black m-1 p-1 w-full font-poppins overflow-auto"> 
                      <div class="w-7 h-7" >
                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
                         <div class="!text-icon text-[cornflowerblue]  ">                            
                   </div>
                   </a>                                                  
                        </div>
                        <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">{item.documentContentType} </div>
                        </div>             

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

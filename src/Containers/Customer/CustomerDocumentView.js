import React, { Component } from 'react'
import { base_url } from "../../Config/Auth";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
    getCustomerDocument
} from '../Customer/CustomerAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class CandidateDocumentView extends Component {
      
componentDidMount() {
    this.props.getCustomerDocument(this.props.customer.customerId);
 
  }
  
  render() {

    return (
      
            <>
             
             <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">  
               {this.props.documentsByCustomerId.map((item) => { 
                  return (                           
                    <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[10rem] 
                    text-[#444444] m-3 p-1 w-[19vw] flex flex-col  ">
                    <div class="w-7 h-7" >
                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
                         <InsertDriveFileIcon 
                   style={{fontSize:"2.5em",color:"cornflowerblue"}}
                  // icon={solid("file")} 
                  />
                   </a>                                                             
                        </div>                      
                        <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.documentContentType} </div>                              
                    </div>
                  )   
                      })} 
              </div>

            </>   
    )
              }
}

const mapStateToProps = ({ candidate, auth,customer }) => ({
    documentsByCustomerId: customer.documentsByCustomerId,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerDocument
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDocumentView)


import React, { Component } from 'react';
import { base_url } from '../../../../../Config/Auth';
import FileCopyIcon from '@mui/icons-material/FileCopy';

class EmployeeDocumentView extends Component {
  render() {
    return (
      <>
      <div class="flex"> 
          {this.props.documentsByEmployeeId.length === 0?<div class=" flex items-center mt-8">Data Not Available</div>:this.props.documentsByEmployeeId.map((item) => {
            return (
              <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black" key={item.documentId}>
                <MainWrapper>
                <div class="w-7 h-7" >
                    <a href={`${base_url}/document/${item.documentId}`}>
                      <FileCopyIcon style={{ fontSize: "1.5rem", color: "cornflowerblue" }} />
                    </a>
                  
                  </div>
                 
                  <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.documentContentType}</div>
                </MainWrapper>
                <div>{item.documentName}</div> 
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

export default EmployeeDocumentView;

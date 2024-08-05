import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import {
  getCandidateDocument,
  deleteDocument,
} from "../../../../../CandidateAction";
import DownloadIcon from '@mui/icons-material/Download';
import { elipsize } from "../../../../../../../Helpers/Function/Functions";


class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      candidate: { candidateId },
      getCandidateDocument,
    } = this.props;
    getCandidateDocument(candidateId);
  }
  render() {
    const {
      documentsByCandidateId,
      fetchingDocumentsByCandidateId,
      fetchingDocumentsByCandidateIdError,
        deleteDocument,
    } = this.props;

    return (
      <>
           <div className=' flex justify-end sticky top-28 z-auto'>
           <div class="rounded m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[2.5rem]">Date</div>
       <div className=" md:w-[1.1rem]">Name</div>
       <div className=" md:w-[2.1rem] ">Type</div>
       <div className=" md:w-[2.1rem] ">File Name</div>
       <div className=" md:w-[25.5rem] ">Uploaded By</div>

      </div>

      
      {documentsByCandidateId.map((item) => { 

                    return (
                      <div class="w-wk">
                      <div class=" flex rounded-xl justify-between bg-white mt-[0.5rem]  h-[2.75rem] items-center p-3">
                        <div class="flex">
                          <div className=" flex  flex-row md:w-[20.12rem] max-sm:flex-row w-full max-sm:justify-between ">                      
                              {/* Name */}
                               
                            <div class="  text-[0.82rem] font-poppins md:w-[10.1rem]">
                            <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
                            </div>
                               
                          <div className=" flex  md:w-[2.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">                         
                              {/* Country */}
                              
                            <div class="  text-[0.82rem]  font-poppins">
       {item.documentTitle}
                            </div>
                          </div>                     
                        </div>
                      
                          <div className=" flex  flex-row md:w-[9.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                                                      {/* Refurbish */}
                               
                            <div class="  text-[0.82rem]  font-poppins">
                            <span>{elipsize(item.documentContentType || "", 15)}</span>
                            </div>
                          </div>
                          <div className=" flex  flex-row md:w-[9.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">                       
                              {/* Refurbish */}
                         
       
                            <div class="  text-[0.82rem]  font-poppins">
                            <span>{item.contract}</span>
                            </div>
                          </div>
                          <div className=" flex flex-row md:w-[9.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                                                   {/* Inventory */}                             
                            <div class="  text-[0.82rem]  font-poppins">
{item.uploadedBy}
                            </div>
                          </div>                                        
                          <div class="flex flex-row w-[5%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                            <a
            href={`${base_url}/document/${item.documentId}`}
           //target="_blank"
          >
            <DownloadIcon
              type="download"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
            />
          </a>
                            </div>         
                            <div></div>
                          </div>                   
                      
                          <div class="flex flex-row w-[5%] max-sm:flex-row max-sm:w-[10%]">
                          <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteDocument(item.documentId)}
          >          
      <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"1rem", color: "red" }} />
          </StyledPopconfirm>
                        </div>                     
                            <div></div>
                          </div>
                          </div>
                      </div>
                    </div>
                    )
                })}
      </div>
      </div>     
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  candidate: candidate.candidate,
  fetchingDocumentsByCandidateId: candidate.fetchingDocumentsByCandidateId,
  fetchingDocumentsByCandidateIdError:
    candidate.fetchingDocumentsByCandidateIdError,
  documentsByCandidateId: candidate.documentsByCandidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateDocument,
        deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);

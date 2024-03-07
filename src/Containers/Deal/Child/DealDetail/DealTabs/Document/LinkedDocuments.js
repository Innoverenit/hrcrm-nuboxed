
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../../../../Config/Auth";
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import {
    getDealDocument,
    removeDealDocuments
} from "../../../../DealAction";
import { DeleteOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

class LinkedDocuments extends Component {
  componentDidMount() {
    const {
        dealDetailsbyID: { invOpportunityId },
      getDealDocument
      ,
    } = this.props;
    getDealDocument
    (invOpportunityId);
  }
  render() {
    
    return (
      <>
          <div className=' flex justify-end sticky top-28 z-auto'>          
<div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                  <div className=" flex  w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                  
                  <div className="md:w-[9.7rem]">Date</div>
                      <div className=" md:w-[11.12rem]">Name</div>
                      <div className=" md:w-[9.5rem]">Description</div>
                      <div className=" md:w-[9.8rem] ">Uploaded By</div>
                     
                  </div>
                  <div class="overflow-y-auto h-[67vh]">
                  { !this.props.fetchingDocumentsByDealId && this.props.documentsByInnOppId.length === 0 ?<NodataFoundPage />:this.props.documentsByInnOppId.map((item,index) =>  {
                      
                      return (
                          <div >
                              <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 "

                              >
                                  <div class="flex">
                                      <div className=" flex font-medium  md:w-[8.1rem] max-sm:w-full  ">
                                      <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
                                      </div>

                                      <div className=" flex font-medium   md:w-[14.2rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                          <div class=" text-xs text-cardBody font-poppins">
                                             {item.documentTitle}
                                          </div>

                                      </div>
                                      <div className=" flex font-medium  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                          <div class=" text-xs text-cardBody font-poppins">
                                              {item.documentDescription}
                                          </div>
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.uploadedBy}

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[2.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer" ,fontSize:"0.8rem"}}
              />
            </a>

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[2.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <a
              href={`${base_url}/download/${item.documentTypeId}`}
            >
              
            </a>

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[5.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <StyledPopconfirm
              title="Do you want to delete?"
               onConfirm={() => this.props.removeDealDocuments(item.documentId)}
           >
              <DeleteOutlined  className="!text-base text-[red] cursor-pointer" />
            </StyledPopconfirm>

                                      </div>
                                  </div>
                                  

                              </div>
                          </div>
                      )
                  })}
                  </div>
              </div>
             
              
          </div>
      </>
  )

    
    
  }
}

const mapStateToProps = ({ contact,deal }) => ({
  contact: contact.contact,
  fetchingDocumentsByDealId: deal.fetchingDocumentsByDealId,
  fetchingDocumentsByDealIdError: deal.fetchingDocumentsByDealIdError,
  documentsByInnOppId: deal.documentsByInnOppId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDealDocument,
        removeDealDocuments
,
        // deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);



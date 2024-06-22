import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import {
  deleteDocument,
} from "../../../../OpportunityAction";
import {
  getOpportunityDocument,
} from "../../../../../Customer/CustomerAction";
import { Tooltip } from "antd";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import ContractToggle from "./ContractToggle";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      opportunity: { opportunityId },
      getOpportunityDocument,
      // opportunity,
    } = this.props;
    getOpportunityDocument(opportunityId);
  }
  render() {
    const {
      documentsByOpportunityId,
      fetchingDocumentsByOpportunityId,
      fetchingDocumentsByOpportunityIdError,
        deleteDocument,
    } = this.props;


    if (fetchingDocumentsByOpportunityId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {true && (
              <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
              <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
              <div className=" md:w-[6.5rem]">
            <FormattedMessage
                      id="app.date"
                      defaultMessage="Date"
                    /></div>
     
            <div className="md:w-[10.1rem]">  <FormattedMessage id="app.name" defaultMessage="Name" /></div>
                     <div className="md:w-[11.12rem]">
                     <FormattedMessage
              id="app.description"
              defaultMessage="Description"
            /></div>
                           <div className=" md:w-[9.12rem]">
                           <FormattedMessage id="app.uploadedBy" defaultMessage="Uploaded By" /></div>
    
                          
           
                           <div className=" md:w-[7.1rem]">
                           <FormattedMessage id="app.fileName" defaultMessage="File Name" /></div>
    
            <div className="w-[10.2rem]"></div>
    
          </div>
       
            
          { !fetchingDocumentsByOpportunityId && documentsByOpportunityId.length === 0 ?<NodataFoundPage />:documentsByOpportunityId.map((item,index) =>  {
            
            
                        return (
                            <div>
                                 <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                                         
                                         <div className=" flex font-medium  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
    <div className="flex max-sm:w-full items-center"> 
    
              <div class="max-sm:w-full">
                                            <Tooltip>
                                              <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                              
                                                <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                    
                                                <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
         
           
                                                </div>
                                                </div>
                                            </Tooltip>
                                            </div>
                                            </div>
                                    </div>
                                    <div class="flex">
    
                                 
                                  
                                    <div className=" flex font-medium  md:w-[15.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                    
                                      <div class="text-sm text-cardBody font-poppins">
                                      {item.documentTitle}
                                      </div>
                                  </div>
    
                                  <div className=" flex font-medium  md:w-[14.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                    
                                    <div class="text-sm text-cardBody font-poppins">
                                    <span>{elipsize(item.documentDescription || "", 15)}</span>
                                    </div>
                                </div>
                                <div className=" flex font-medium  md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                       
                                       <div class="text-sm text-cardBody font-poppins">
                     
                         <div className="font-normal text-sm text-cardBody font-poppins">
                           <span>{item.uploadedBy}</span>
                         </div>
                     
                                       </div>
                                   </div>
                                   <div className=" flex font-medium  md:w-[20.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                       
                                       <div class="text-sm text-cardBody font-poppins">
                     
                         <div className="font-normal text-sm text-cardBody font-poppins">
                           <span>{item.fileName}</span>
                         </div>
                     
                                       </div>

                                       <div class="text-sm text-cardBody font-poppins">
                     
                                 
          <ContractToggle
          // partnerId={item.partnerId}
          contractInd={item.contractInd}
          // assignedIndicator={item.assignedInd}
          documentId={item.documentId}
        />
                 
                                   </div>
                                   </div>
    
                             
                                  </div>
                                  <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                       
                                  <>
                                  <a
            href={`${base_url}/document/${item.documentId}`}
          // target="_blank"
          >
            <DownloadIcon
              type="download"
              style={{ cursor: "pointer",fontSize:"1.25rem" }}
            />
          </a>
              </>
                     
                      </div>
                                 
                                    <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        
    
                                        <div class=" text-sm text-cardBody font-poppins text-center">
                                        <StyledPopconfirm
            title="Do you want to delete?"
          onConfirm={() => deleteDocument(item.documentId)}
         >
            <DeleteIcon type="delete" 
            class=" cursor-pointer !text-icon text-red "
            style={{ cursor: "pointer",fontSize:"1.25rem" , color: "red" }} />
          </StyledPopconfirm>
    
                                        </div>
                                    </div>
    
                                  
                                 
                                </div>
                            </div>
    
    
                        )
                    })}
                        
          </div>
          // <StyledTable
          //   // rowSelection={rowSelection}
          //   pagination={false}
          //   scroll={{ y: tableHeight }}
          //   expandedRowRender={(record) => {
          //     //debugger;
          //     return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
          //   }}
          //   rowKey="CustomerId"
          //   columns={columns}
          //   dataSource={documentsByOpportunityId}
          //   loading={fetchingDocumentsByOpportunityIdError}
          //   onChange={console.log("task onChangeHere...")}
          // />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ opportunity,customer }) => ({
  opportunity: opportunity.opportunity,
  fetchingDocumentsByOpportunityId:
  customer.fetchingDocumentsByOpportunityId,
  fetchingDocumentsByOpportunityIdError:
  customer.fetchingDocumentsByOpportunityIdError,
  documentsByOpportunityId: customer.documentsByOpportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityDocument,
        deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }

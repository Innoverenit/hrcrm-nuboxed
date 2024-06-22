import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OnlyWrapCard } from '../../../Components/UI/Layout';
import { Button, } from "antd";
import moment from "moment";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getTaskDocument,
    deleteDocumentTask
} from "../TaskAction";
import { FormattedMessage } from "react-intl";


const LinkedTaskDocument = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [currentNameId, setCurrentNameId] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;
  const [currentprocessName, setCurrentprocessName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [page, setPage] = useState(0);
  useEffect(() => {
  
    props.getTaskDocument(props.item.taskId);
    // props.getProviderCustomerData(props.provider.serviceId, page);
  }, []);




  const {
    fetchingDocumentsByTaskId,
    fetchingDocumentsByTaskIdError,
    documentsByTaskId,
    deleteDocumentTask
   
  } = props;

  return (
    <>

<div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] h-[81vh]">
      {documentsByTaskId.map((item) => { 
        
         
                    return (
                        <div>
                            <div className="flex justify-between mt-4 max-sm:flex-col"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                            

                                <div className=" flex font-medium flex-col  md:w-36 max-sm:flex-row w-full justify-between ">
                                    <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins"> Name </div>
                                    <div class=" text-[0.75rem] text-cardBody font-poppins">   
                                    <span         
               >

                 {`${item.documentName} `} &nbsp;


               </span>
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                                  <div class="text-[0.875rem] text-cardBody font-poppins">Creation Date</div>
                                  <div class="text-[0.75rem] text-cardBody font-poppins">
                                  <span>{` ${moment(item.creationDate).format("ll")}`}</span>
                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                                  <div class="text-[0.875rem] text-cardBody font-poppins">Uploaded By</div>
                                  <div class="text-[0.75rem] text-cardBody font-poppins">
                                  <span>{` ${item.uploadedBy}`}</span>
                                  </div>
                              </div>
                            
                              <div>
           
     
                         <StyledPopconfirm
                           // title="Do you want to delete?"
                           title={
                             <FormattedMessage
                               id="app.doyouwishtodelete?"
                               defaultMessage="Do you wish to delete?"
                             />
                           }
                           onConfirm={() => deleteDocumentTask(item.documentId)}
                         >
                           <DeleteIcon
                             type="delete"
                             style={{ cursor: "pointer",color:"red", fontSize: "1rem" }}
                           />
                         </StyledPopconfirm>
                 
     
           </div>
                               
                                
                              
                           

                             

                   
                            </div>
                        </div>


                    )
                })}
      </div>




      {/* AddTaskProjectDrawerModal and AddTaskNotesDrawerModal components go here */}
    </>
  );
};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
  
    userId: auth.userDetails.userId,
    documentsByTaskId:task.documentsByTaskId,
    fetchingDocumentsByTaskId: task.fetchingDocumentsByTaskId,
    fetchingDocumentsByTaskIdError: task.fetchingDocumentsByTaskIdError,

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getTaskDocument,
        deleteDocumentTask
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(LinkedTaskDocument);
   
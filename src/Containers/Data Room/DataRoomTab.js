import React, { useState, lazy, Suspense } from 'react';
import { StyledTabs } from '../../Components/UI/Antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BundleLoader } from '../../Components/Placeholder';
import HandymanIcon from '@mui/icons-material/Handyman';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {handleDataroomNotesDrawerModal} from "./DataRoomAction";
import { Tooltip } from 'antd';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddDataRoomNotesDrawerModal from './AddDataRoomNotesDrawerModal';
import AddDocumentModals from '../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals';
import {
    handleDocumentUploadModal,

  } from "../Customer/CustomerAction";
  import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from 'react-intl';
import TaskDataCardList from './TaskDataCardList';

const DataRoomTab = (props) => {
    const [rowdata, setrowData] = useState({});

    const handleRowData = (item) => {
      setrowData(item);
    };
    const [qcMain, setQcMain] = useState(true);
    const [openQc, setOpenQc] = useState(false);

    const handleMainQc = () => {
        setQcMain(true)
        setOpenQc(false)
    }
    const handleOpenQc = () => {
        setQcMain(false)
        setOpenQc(true)
    }

    const [repairMain, setRepairMain] = useState(true);
    const [openRepair, setOpenRepair] = useState(false);

    const handleMainRepair = () => {
        setRepairMain(true)
        setOpenRepair(false)
    }
    const handleOpenRepair = () => {
        setRepairMain(false)
        setOpenRepair(true)
    }
    return (
        <div>
            <StyledTabs>
                {!props.inspectionRequiredInd &&
                    <TabPane
                        tab={
                            <>
                              
                                    Chats
                               
                            </>
                        }
                        key="1">
                        <Suspense fallback={<BundleLoader />}>
                        <div>
                      {/* <Tooltip title="Notes">
                        <NoteAltIcon
                         className=" !text-xl cursor-pointer text-green-800"
                          onClick={() => {
                           // handleRowData();
                            props.handleDataroomNotesDrawerModal(true);
                         
                          }}
                         
                        />
                      </Tooltip> */}
                      {/* <NotesForm/> */}
                    </div>
                        </Suspense>
                    </TabPane>}
                    <TabPane
              tab={
                <>
                  <InsertDriveFileIcon 
                  style={{fontSize:"1.1rem"}}
                  />
                  <span class=" ml-1">
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                    {/* Documents */}
                  </span>
                  {/* {activeKey === "2" && ( */}
                    <>
                     <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                          id="app.uploaddocument"
                          defaultMessage="Upload Document"
                        />
                        }
                      >
                      <PlusOutlined
                        type="plus"
                        //tooltipTitle="Upload Document"
                        tooltiptitle={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleDocumentUploadModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                       
                      />
                     </Tooltip>
                    </>
                  {/* )} */}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedDocuments /> */}
              </Suspense>
            </TabPane>
               
                    <TabPane
                        tab={
                            <>
                                <span>

                                    Tasks
                                </span>
                            </>
                        }
                        key="3">
                        <Suspense fallback={<BundleLoader />}>
                        <TaskDataCardList/>
                        </Suspense>


                    </TabPane>
             
            </StyledTabs>
            <AddDataRoomNotesDrawerModal
        rowdata={rowdata}
        addDrawerDataroomNotesModal={props.addDrawerDataroomNotesModal}
        handleDataroomNotesDrawerModal={props.handleDataroomNotesDrawerModal}
      />
        <AddDocumentModals
           //customerId={customerId}
            documentUploadModal={props.documentUploadModal}
            handleDocumentUploadModal={props.handleDocumentUploadModal}
          />
        </div>
    )
}

const mapStateToProps = ({ auth,datRoom,customer }) => ({
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    addDrawerDataroomNotesModal: datRoom.addDrawerDataroomNotesModal,
    documentUploadModal: customer.documentUploadModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleDataroomNotesDrawerModal,
            handleDocumentUploadModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DataRoomTab);


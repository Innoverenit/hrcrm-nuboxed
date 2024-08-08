import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { handleCandidateUpdateEmploymentModal } from "../../../../../CandidateAction";
import { CurrencySymbol } from "../../../../../../../Components/Common";
import {
  getCandidateEmploymentDetails,
  setCandidateEditEmployment,
  deleteCandidateEmploymentTable,
} from "../../../../../CandidateAction";
import {  Tooltip } from "antd";
import styled from "styled-components";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
const UpdateCandidateEmploymentModal = lazy(()=>import("../Employment/UpdateCandidateEmploymentModal"));
class CandidateEmploymentTable extends Component {
  componentDidMount() {
    const { getCandidateEmploymentDetails, candidateId } = this.props;
    getCandidateEmploymentDetails(this.props.candidateId);
  }

  render() {
    const {
      handleCandidateUpdateEmploymentModal,
      fetchingCandidateEmploymentDetails,
      fetchingCandidateEmploymentDetailsError,
      candidateEmploymentDetails,
      updateCandidateEmploymentModal,
      setCandidateEditEmployment,
      deleteCandidateEmploymentTable,
    } = this.props;

    // const { emailCredential, fetchingEmailCredential } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Company Name",
        title: (
          <FormattedMessage
            id="app.companyname"
            defaultMessage="Company Name"
          />
        ),
        dataIndex: "companyName",
         width: "15%"
      },
      {
        //title: "Designation",
        title: (
          <FormattedMessage id="app.designationType" defaultMessage="Designation" />
        ),
        dataIndex: "designationType",
        width: "12%"
      },
      {
        //title: "Start Date",
        title: (
          <FormattedMessage id="app.start" defaultMessage="Start" />
        ),
        dataIndex: "startDate",
        width: "12%",
        render: (name, item, i) => {
          return <span>{dayjs(item.startDate).format("DD/MM/YYYY")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage id="app.end" defaultMessage="End" />,
        dataIndex: "endDate",
        width: "12%",
        render: (name, item, i) => {
          return <span>{dayjs(item.endDate).format("DD/MM/YYYY")}</span>;
        },
      },
      //combine and show salary +curr+type
      {
        title: "Salary",
         width:"12%",
        render: (name, item, i) => {
          return (
            <span>
               <CurrencySymbol currencyType={item.currency} />
               {`${item.salary} ${item.salaryType}`}
              </span>
          );
        },
      },

      {
        title: (
          <FormattedMessage id="app.remarks" defaultMessage="Remarks" />
        ),
        width:"10%",
        dataIndex: "description",
      },
     
     
      // {
      //   title:"Document",
      //   dataIndex:"documentType",
      //   width:"12%",

      // },
      // {
      //   title: "",
      //   dataIndex: "id",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     return (
      //       <StyledPopconfirm
      //         //title="Do you want to delete?"
      //         title={<FormattedMessage
      //           id="app.doyouwanttodelete?"
      //           defaultMessage="Do you want to delete?"
      //         />}
      //         onConfirm={() => deleteCandidateEmploymentTable(item.id)}
      //       >
      //         <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
      //         {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
      //       </StyledPopconfirm>
      //     );
      //   },
      // },
      {
        title: "",
        dataIndex: "documentTypeId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer",fontSize:"0.8rem" }}
              />
            </a>
          );
        },
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon
              type="edit"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
              onClick={() => {
                setCandidateEditEmployment(item);
                handleCandidateUpdateEmploymentModal(true);
              }}
            />
          );
        },
      },
    ];

    if (fetchingCandidateEmploymentDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
     <div className=' flex justify-end sticky top-28 z-auto'>
     <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.5rem]">Company Name</div>
       <div className=" md:w-[8.1rem]">Designation</div>
       <div className=" md:w-[13.1rem] ">Start</div>
       <div className=" md:w-[8.5rem] ">End</div>
       <div className=" md:w-[8.2rem] ">Salary</div>
       <div className="md:w-[8.5rem]">Remarks</div>

      </div>

      
      {candidateEmploymentDetails.map((item) => { 

                    return (
                      <div class="w-wk">
                      <div class=" flex rounded-xl justify-between bg-white mt-[0.5rem]  h-[2.75rem] items-center p-3">
                        <div class="flex">
                          <div className=" flex font-medium flex-row md:w-[20.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Name
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem] font-poppins md:w-[10.1rem]">
                              {item.companyName}
                            </div>
                         
       
                          <div className=" flex font-medium flex-col md:w-[2.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Country
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
       {item.designationType}
                            </div>
                          </div>
                      
                        </div>
                      
                          <div className=" flex font-medium flex-row md:w-[9.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Refurbish
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            {dayjs(item.startDate).format("DD/MM/YYYY")}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[9.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            {dayjs(item.endDate).format("DD/MM/YYYY")}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[11.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>
                   <CurrencySymbol currencyType={item.currency} />
                   {`${item.salary} ${item.salaryType}`}
                  </span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                         {item.description}
                            </div>
                          </div>
                    
                          <div class="flex flex-row w-[5%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                            <a
                  href={`${base_url}/document/${item.documentId}`}
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
                              <Tooltip title="Edit">
                                <BorderColorIcon
                                  style={{ cursor: "pointer", fontSize: "1rem" }}
                                  onClick={() => {
                                    setCandidateEditEmployment(item);
                                    handleCandidateUpdateEmploymentModal(true);
                                  }}
                                />
                              </Tooltip>
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

        {/* <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={candidateEmploymentDetails}
          Loading={
            fetchingCandidateEmploymentDetails ||
            fetchingCandidateEmploymentDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        /> */}

        <UpdateCandidateEmploymentModal
          updateCandidateEmploymentModal={updateCandidateEmploymentModal}
          handleCandidateUpdateEmploymentModal={
            handleCandidateUpdateEmploymentModal
          }
        />
        {/* )} */}
        {/* <StyledModal
                    title={"Configure"}
                    width="36%"
                    // height="50%"
                    visible={this.state.emailModalVisible}
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={this.handleEmailModalVisible}
                    footer={null}
                >
                    <EditEmailForm handleEmailModalVisible={this.handleEmailModalVisible} />
                </StyledModal> */}
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  candidateEmploymentDetails: candidate.candidateEmploymentDetails,
  fetchingCandidateEmploymentDetails:
    candidate.fetchingCandidateEmploymentDetails,
  fetchingCandidateEmploymentDetailsError:
    candidate.fetchingCandidateEmploymentDetailsError,
  updateCandidateEmploymentModal: candidate.updateCandidateEmploymentModal,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateEmploymentDetails,
      setCandidateEditEmployment,
      handleCandidateUpdateEmploymentModal,
      deleteCandidateEmploymentTable,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEmploymentTable);


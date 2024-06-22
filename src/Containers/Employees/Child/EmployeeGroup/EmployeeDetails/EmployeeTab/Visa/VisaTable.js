import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";
import {getVisaDetails,
  deleteVisa,
  handleUpdateVisaModal,
  setEditVisa
} from "../../../../../../Profile/ProfileAction"
import DownloadIcon from "@mui/icons-material/Download";
import { base_url } from "../../../../../../../Config/Auth";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import { Tooltip } from "antd";
const UpdateVisaModal =lazy(()=>import("./UpdateVisaModal"));

class VisaTable extends Component {
  componentDidMount() {
    // debugger;
    const { getVisaDetails, userId } = this.props;
    // console.log(employeeId);
    if (userId) {
      getVisaDetails(userId);
    }
  }

  render() {
    console.log(this.props.userId);
    const {
      visaDetails,
      fetchingVisaDetails,
      fetchingVisaDetailsError,
      handleUpdateVisaModal,
      updateVisaModal,
      singleEmployee,
      user,
      setEditVisa,
      employeeId,
      deleteVisa,
    } = this.props;
    console.log(employeeId);



    // if (fetchingEducationDetailsError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>

<div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
<div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
<div className=" md:w-[6.5rem]">
<FormattedMessage
        id="app.country"
        defaultMessage="Country"
      /></div>

<div className="md:w-[10.1rem]">
    <FormattedMessage id="app.type" defaultMessage="Type" /></div>
       <div className="md:w-[7.1rem]">
       <FormattedMessage
id="app.startDate"
defaultMessage="Start Date"
/></div>
             <div className=" md:w-[8.1rem]">
             <FormattedMessage id="app.endDate" defaultMessage="End Date" /></div>

        

<div className="w-[10.2rem]"></div>

</div>


{visaDetails.map((item) => { 


          return (
              <div>
                  <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                      >
                           
                           <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                              <Tooltip>
                                <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                
                                  <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                      
{item.country}


                                  </div>
                                  </div>
                              </Tooltip>
                              </div>
                              </div>
                      </div>
                      <div class="flex">

                   
                    
                      <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                      
                        <div class="text-sm text-cardBody font-poppins">
                        {item.type}
                        </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                      
                      <div class="text-sm text-cardBody font-poppins">
                      <span>{dayjs(item.startDate).format("DD/MM/YYYY")}</span>
                      </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                         
                         <div class="text-sm text-cardBody font-poppins">
       
           <div className="font-normal text-sm text-cardBody font-poppins">
           <span>{dayjs(item.endDate).format("DD/MM/YYYY")}</span>
           </div>
       
                         </div>
                     </div>

               
                    </div>
                    <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
         
                    <>
                    <a
              href={`${base_url}/document/${item.documentId}`}
              target="_blank"
            >
              {user.userAccessInd === true ? (
              <DownloadIcon
                type="download"
                // onClick={() => startDownload()}
                style={{ cursor: "pointer",fontSize: "1rem" }}
              />
              ):null}
            </a>
</>
       
        </div>
                      <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          

                          <div class=" text-sm text-cardBody font-poppins text-center">
                          <BorderColorIcon 
  style={{ cursor: "pointer", fontSize: "1rem" }}
  onClick={() => {
    setEditVisa(item);
    handleUpdateVisaModal(true);
  }}
/>

                          </div>
                      </div>
                      <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          

                          <div class=" text-sm text-cardBody font-poppins text-center">
                          <StyledPopconfirm
  title="Do you want to delete?"
  onConfirm={() => deleteVisa(item.visaId)}
>
  <DeleteIcon
    type="delete"
    style={{ cursor: "pointer", fontSize: "1rem", color: "red" }}
  />
</StyledPopconfirm>

                          </div>
                      </div>

                    
                   
                  </div>
              </div>


          )
      })}
          
</div>
        {/* {emailCredential && ( */}
        {/* <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={visaDetails}
          loading={fetchingVisaDetails || fetchingVisaDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.courseType || ""}</p>
                <p>{record.specialization || ""}</p>
              </>
            );
          }}
        /> */}
 <UpdateVisaModal
          updateVisaModal={updateVisaModal}
          handleUpdateVisaModal={handleUpdateVisaModal}
        />
     
      </>
    );
  }
}

const mapStateToProps = ({ profile,auth, employee }) => ({
  visaDetails:profile.visaDetails,
  userId:auth.userDetails.userId,
  user:auth.userDetails,
  updateVisaModal:profile.updateVisaModal,
  fetchingVisaDetails:profile.fetchingVisaDetails,
  fetchingVisaDetailsError:profile.fetchingVisaDetailsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getVisaDetails,
      deleteVisa,
      handleUpdateVisaModal,
      setEditVisa
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(VisaTable);

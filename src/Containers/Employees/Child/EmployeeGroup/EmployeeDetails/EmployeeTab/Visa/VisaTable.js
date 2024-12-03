import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";

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
import MergeTypeIcon from '@mui/icons-material/MergeType';
import PublicIcon from '@mui/icons-material/Public';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import DateRangeIcon from '@mui/icons-material/DateRange';
const UpdateVisaModal =lazy(()=>import("./UpdateVisaModal"));

class VisaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    // debugger;
    const { getVisaDetails, userId } = this.props;
    // console.log(employeeId);
    if (userId) {
      getVisaDetails(userId);
      this.fetchMenuTranslations();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "1109",//0 Country
        "71",//1 Type
        "176",//2 Start Date
        "126",//3  End Date
        "1259"// Do you want to delete?"
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

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

<div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
<div className=" flex justify-between w-[100%] text-lm p-1 bg-transparent font-bold sticky  z-10">
<div className=" max-md:w-[6.5rem] w-[6.5rem] text-sm text-[#00A2E8]">
<PublicIcon className=" !text-icon text-[#1E213D] "/>{this.state.translatedMenuItems[0]}</div>

<div className="max-md:w-[10.1rem] w-[10.1rem]">
<MergeTypeIcon className=" !text-icon  text-[#006600]"/>{this.state.translatedMenuItems[1]}</div>
       <div className="max-md:w-[7.1rem] w-[7.1rem]">
       <DateRangeIcon className=" !text-icon text-[#4B2206]"/>  {this.state.translatedMenuItems[2]}</div>
             <div className=" max-md:w-[10.2rem] w-[10.2rem]">
             <InsertInvitationIcon className=" !text-icon text-[#D64045]"/>  {this.state.translatedMenuItems[3]}</div>

        

<div className="max-md:w-[10.2rem] w-[10.2rem]"></div>

</div>


{visaDetails.map((item) => { 


          return (
              <div>
                  <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1"
                      >
                           
                           <div className=" flex  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                              <Tooltip>
                                <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                
                                  <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                      
{item.country}


                                  </div>
                                  </div>
                              </Tooltip>
                              </div>
                              </div>
                      </div>
                      <div class="flex">

                   
                    
                      <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                      
                        <div class="text-xs  font-poppins">
                        {item.type}
                        </div>
                    </div>

                    <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                      
                      <div class="text-xs  font-poppins">
                      <span>{dayjs(item.startDate).format("DD/MM/YYYY")}</span>
                      </div>
                  </div>
                  <div className=" flex  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                         
                         <div class="text-xs  font-poppins">
       
           <div className=" text-xs  font-poppins">
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
                type="download" className=" cursor-pointer !text-icon "
                // onClick={() => startDownload()}
                
              />
              ):null}
            </a>
</>
       
        </div>
                      <div className=" flex ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          

                          <div class=" text-xs  font-poppins text-center">
                          <BorderColorIcon  className=" cursor-pointer !text-icon "
  onClick={() => {
    setEditVisa(item);
    handleUpdateVisaModal(true);
  }}
/>

                          </div>
                      </div>
                      <div className=" flex ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          

                          <div class=" text-xs  font-poppins text-center">
                          <StyledPopconfirm
  title= {this.state.translatedMenuItems[4]}
  onConfirm={() => deleteVisa(item.visaId)}
>
  <DeleteIcon className=" cursor-pointer !text-icon text-red-600"
    type="delete"
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
        <Suspense>
 <UpdateVisaModal
          updateVisaModal={updateVisaModal}
          handleUpdateVisaModal={handleUpdateVisaModal}
        />
     </Suspense>
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

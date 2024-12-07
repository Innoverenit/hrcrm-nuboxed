import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getAllRequirementTable} from "../Requirement/RequirementAction"
import InfiniteScroll from "react-infinite-scroll-component";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PortraitIcon from '@mui/icons-material/Portrait';
import ContactsIcon from '@mui/icons-material/Contacts';

class AllRequirementTable extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show1:false,
      profileId: "",
      contactId: "",
      candidateId: "",
      editModal: false,
      stageList: [],
      recruitmentId: "",
      skillSetData: "",
      candidatePostData: {},
      searchText: '',
      searchedColumn: '',
      subTableVisible: false
    };
  }

  handleClickCandidateName = (recruitmentId) => {
    this.setState({
       subTableVisible: !this.state.subTableVisible,
       recruitmentId:recruitmentId
      })
  };
  handleCandidateDataSet = (data) => {
    this.setState({ candidatePostData: data })
  }
  handleSkillsetChoose = (data) => {
    this.setState({ skillSetData: data })
  }

  handleEditModal = (data) => {
    this.setState({ editModal: data });
  };
 
  // handleRecruitertModal = (data) => {
  //   this.setState({ recruiterModal: data });
  // };
  handleError = (recruitmentId, profileId) => {
    debugger;
    this.setState({ recruitmentId: recruitmentId, profileId: profileId });
    this.props.handleSponsorModal(true);
    // message.error("Select sponser");
    // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
  };
  handleIconClick = (profileId, candidateId, stageList,recruitmentId) => {
    debugger;
    this.setState({ show: true, profileId, candidateId, stageList,recruitmentId });

  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };

  handleReasonOfDelete() {
    this.setshow(false);
    this.setshowHis(false);
    this.setshowFeed(false);
    this.setshowPayment(false);
    this.setshowRes(true);
    // setorderId(orderId);
  }

  componentDidMount() {
  this.props.getAllRequirementTable(this.props.orgId)
   
  }
  render() {
    const{requirementTable,fetchingAllRequirementTable} =this.props;
    
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <>
  <div className=' flex sticky z-auto'>
  <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-white" >
  <div className=" flex max-sm:hidden   justify-between items-end !text-lm font-poppins  font-bold   w-[100%]   p-1 bg-transparent sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
        <div className=" max-md:w-[8.1rem] w-[6.1rem] text-sm text-[#00A2E8]"> <WorkHistoryIcon className="!text-icon  "/> Job ID</div>
        <div className=" max-md:w-[4.2rem] w-[6.2rem]"> <RecentActorsIcon className="!text-icon  "/> Requirement</div>
        <div className="max-md:w-[5.8rem] w-[5.8rem]"> <CategoryIcon className="!text-icon text-[#42858c] "/> Category</div>
        <div className="max-md:w-[8.5rem] w-[6.5rem]"> <AcUnitIcon className="!text-icon  text-[#c42847]"/> Customer</div>
        <div className="max-md:w-[3.8rem] w-[4.8rem]"> <EventIcon className="!text-icon text-[#5A189A] "/> Created</div> 
        <div className="max-md:w-[5.2rem] w-[5.2rem]"> <RecentActorsIcon className="!text-icon text-[#84a59d] "/> Recruiter</div>
        <div className="max-md:w-[1.5rem] w-[1.5rem]"> On</div>
        <div className="max-md:w-[3.3rem] w-[3.3rem]"> <EventIcon className="!text-icon  "/> Start</div>
        <div className="max-md:w-[3.3rem] w-18"> <EventIcon className="!text-icon text-[#f42c04] "/> Duration</div>
        <div className="max-md:w-[3.3rem] w-16"> <AccessAlarmIcon className="!text-icon  text-[#c42847]"/> Billing</div>
        <div className="max-md:w-[3.3rem] w-16"> <PortraitIcon className="!text-icon  text-[#e4eb2f]"/> Talent</div>
        <div className="max-md:w-[3.3rem] w-16"> <ContactsIcon className="!text-icon text-[#d64933] "/> Contact</div>

      </div>
      <InfiniteScroll
        dataLength={requirementTable.length}
        loader={fetchingAllRequirementTable?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"86vh"}
      >
        {requirementTable.map((item) => {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");

          const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
                              <div className="flex  justify-between text-xs  font-poppins bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                              
                                <div class="flex">
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row border-l-2 border-green-500 bg-[#eef2f9]  max-sm:justify-between ">

                                    <div class=" text-sm justify-center  font-poppins">
                                    {item.jobOrder}
                                    </div>
                                </div>
                             
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                    <div class="  text-center">
                                    {item.requirementName}

                                    </div>
                                    <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                    <div class="  text-center">
                                    {item.category}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                    <div class="  text-center">
                                    {item.customerName}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36  max-sm:flex-row w-36 max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">

                                    <div class="  text-center">
                                    {item.recruitOwner}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                                

                                    <div class="  text-center">
                                    {item.creationDate}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                                

                                    <div class="  text-center">
                                    {/* {item.creationDate} */}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                                

                                    <div class="  text-center">
                                    {/* {item.creationDate} */}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                                

                                    <div class="  text-center">
                                    {/* {item.creationDate} */}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                                

                                    <div class="  text-center">
                                    {item.billing}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                                

                                    <div class="  text-center">
                                    {item.candidatetList}

                                    </div>
                                </div>
                                <div className=" flex max-md:w-36 w-36 max-sm:flex-row  max-sm:justify-between items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                                

                                    <div class="  text-center">
                                    {item.candidatetList}

                                    </div>
                                </div>
         
                   </div>
             
                            </div>
                        </div>
           </div>
          );
        })}
         </InfiniteScroll>
      </div>
      </div>
 
    
      </>
    );
  }
}

const mapStateToProps = ({ auth, requirement }) => ({
  user: auth.userDetails,
  requirementTable:requirement.requirementTable,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  fetchingAllRequirementTable:requirement.fetchingAllRequirementTable

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getAllRequirementTable
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementTable);


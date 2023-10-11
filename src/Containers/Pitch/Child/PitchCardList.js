// import React from 'react'

// function PitchCardList() {
//   return (
//     <div>PitchCardList</div>
//   )
// }

// export default PitchCardList




import React, { useEffect, useState} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import UpdateLPitchModal from "../Child/UpdateLPitchModal"
import ExploreIcon from "@mui/icons-material/Explore";
//import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from "@mui/icons-material/Delete";
// import { getCountries } from "../../../Auth/AuthAction";
import { Link } from "../../../Components/Common";
import {
  getPitch,
  deletePitchData,
  handleUpdatePitchModal,
  setEditPitch,
  updateTypeForPitch
} from "../PitchAction";
import ReactCountryFlag from 'react-country-flag';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { Button, Tooltip } from "antd";
// import StatusCustomerToggle from "./StatusCustomerToggle";
import { FormattedMessage } from "react-intl";
// import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
// import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import { BundleLoader } from "../../../Components/Placeholder";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import OpenCETmodal from "./OpenCETmodal";

const ButtonGroup = Button.Group;

const PitchCardList = (props) => {

  useEffect(() => {
    props.getPitch(props.userId);
    // props.getSectors();
    // props.getCountries();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
//   const { deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingLeads,leadsAllData  } = props;

//   if (fetchingLeads) {
//     return <BundleLoader />;
//   }

  return (
    <>
   <OnlyWrapCard>
   {props.pitchData.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
       
         const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
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
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div className="flex justify-between mt-4 max-sm:flex-col"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-60 mb-4  max-sm:w-full">
                                <div className="flex max-sm:w-full"> 
<div>
<SubTitle>
            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle>
</div>
                                   <div class="w-[4%]">

                                   </div>

                                        <div class="max-sm:w-full" >
                                        <Tooltip>
                                          <div class="max-sm:w-full justify-between flex md:flex-col">
                                            <h4 class=" text-[0.875rem] text-cardBody font-poppins">
                                            Name
                                            </h4>
                                            <h4 class="text-[0.75rem] text-cardBody font-poppins cursor-pointer">
                                           {item.name}     
         {/* <Link
           toUrl={`leads/${item.leadsId}`}
          title={`${item.name}`}
        >{item.name}</Link>&nbsp;&nbsp;
        {date === currentdate ? (
          <span
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null} */}
       
                                            </h4>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div className=" flex font-medium flex-col  md:w-44 max-sm:flex-row w-full justify-between ">
                           <h4 class=" text-[0.875rem] text-cardBody font-poppins"> Phone # </h4>
                           <h4 class=" text-[0.75rem] text-cardBody font-poppins">   
                           {`${item.countryDialCode} ${item.phoneNumber}`}
                           </h4>
                       </div>
                       <div className=" flex font-medium flex-col  md:w-40 max-sm:flex-row w-full justify-between ">
                           <h4 class=" text-[0.875rem] text-cardBody font-poppins"> Company </h4>
                           <h4 class=" text-[0.75rem] text-cardBody font-poppins">   
                           <Link
        //    toUrl={`leads/${item.leadsId}`}
        //   title={`${item.companyName}`}
        >{item.name}</Link>
                           </h4>
                       </div>
                       <div class="rounded-full bg-white  h-5 cursor-pointer w-8">
                    {item.url !== null ? (
              <Tooltip title={item.url}>
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green" ,fontSize: "0.8rem",}}
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>
                                <div className=" flex font-medium flex-col  md:w-52 max-sm:flex-row w-full justify-between ">
                           
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins"> Sector </h4>
                                    <h4 class=" text-[0.75rem] text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                </div>
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                                  

                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins">Country</h4>
                                    <h4 class=" text-[0.75rem] text-cardBody font-poppins">
                                    <ReactCountryFlag countryCode="IN" svg />
                                    <ReactCountryFlag
                          countryCode={item.country}
                          svg
                          style={{
                            width: '1em',
                            height: '1em',
                          }}
                          title={item.country}
                        />
                        &nbsp;
                        {item.address && item.address.length && item.address[0].country}
                                    </h4>
                                </div>
                                <div class="flex flex-row md:w-[11%] max-sm:flex-row w-full justify-between">

<div>
<ButtonGroup>
<RoleButton
 type="Warm"
 iconType="	fas fa-burn"
 // tooltip="Warm"
 tooltip={<FormattedMessage
   id="app.warm"
   defaultMessage="Warm"
 />}
 role={item.type}
 onClick={() =>{
 const typ="Warm"
   props.updateTypeForPitch(item.investorleadsId,typ)
 }}
/>
</ButtonGroup>
</div>    


     <div>
     <ButtonGroup>
<RoleButton
 type="Hot"
 iconType="fas fa-mug-hot"
 // tooltip="Hot"
 tooltip={<FormattedMessage
   id="app.hot"
   defaultMessage="Hot"
 />}
 role={item.type}
 onClick={() =>{
  const typ="Hot"
   props.updateTypeForPitch(item.investorleadsId,typ)
 }}
/>
</ButtonGroup>
</div>
     <div>
<ButtonGroup>
<RoleButton
 type="Cold"
 iconType="far fa-snowflake"
 // tooltip="Cold"
 tooltip={<FormattedMessage
   id="app.cold"
   defaultMessage="Cold"
 />}
 role={item.type}
 onClick={() => {
  const typ="Cold"
   props.updateTypeForPitch(item.investorleadsId,typ)
 }}
/>
</ButtonGroup>
</div>
<div>
<AssignmentLateIcon
style={{fontSize: "1rem"}}
//onClick={()=>{props.handleCETmodal(true)}}
/>
</div>
     </div>  
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins">Assigned to</h4>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              )}
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full justify-between">
                       
                       <h4 class=" text-[0.875rem] text-cardBody font-poppins">Owner</h4>

                       <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </span>
                   </div>
                   <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins">Qualified</h4>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">
                {/* qual */}
                                    </div>
                                    <div>
{/* <StatusCustomerToggle
            // type={props.convertInd ? "primary" : "danger"}
            // leadsId={item.leadsId}
            // convertInd={item.convertInd}
          /> */}
</div>
                                </div>
                                {/* <div class="flex max-sm:flex-row w-full justify-between md:flex-col"> */}
                                <div class="flex flex-col w-[5%] max-sm:flex-row">
                                <div>
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                   props.setEditPitch(item);
                   props.handleUpdatePitchModal(true);
                handleSetCurrentLeadsId(item);
                  
                }}
              />
            </Tooltip>
        
            </div>
                        <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deletePitchData(item.investorleadsId)}
          >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", color: "red" ,fontSize: "0.8rem",}}
            />
            {/* )} */}
          </StyledPopconfirm>
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col w-[2%] max-sm:flex-row">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{
                // color:
                //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
            <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
          </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize:"0.8rem"  }}
                // onClick={() => {
                //   handleSetCurrentLeadsId(item);
                //   props.handleLeadsEmailDrawerModal(true);
                // }}
              />
            </Tooltip> </div>
           
                      </div>    
                      </div>
                            </div>
                        // </div>


                    )
                })}
      </OnlyWrapCard>
      <UpdateLPitchModal
        // item={currentLeadsId}
        updatePitchModal={props.updatePitchModal}
        // updateLeadsModal={updateLeadsModal}
        handleUpdatePitchModal={props.handleUpdatePitchModal}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      {/* <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      /> */}
      {/* <OpenCETmodal 
      openCETmodal={props.openCETmodal}
      handleCETmodal={props.handleCETmodal}
      /> */}
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector,pitch }) => ({
//   leadsAllData: leads.leadsAllData,
  userId: auth.userDetails.userId,
  updatePitchModal:pitch.updatePitchModal,

  pitchData:pitch.pitchData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getPitch,
        deletePitchData,
        handleUpdatePitchModal,
        setEditPitch,
        updateTypeForPitch
    //   getLeads,
    //   getSectors,
    //   deleteLeadsData,
    //   setEditLeads,
    //   handleUpdateLeadsModal,
    //   handleLeadsEmailDrawerModal,
    //   getLeadDetailsById,
    //   getCountries,
    //   updateTypeForLead,
    //   handleCETmodal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchCardList);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}

import React, { useEffect, useState ,lazy} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ExploreIcon from "@mui/icons-material/Explore";
import { DeleteOutlined } from "@ant-design/icons";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
    getTeamPitch,
  deletePitchData,
  handleUpdatePitchModal,
  setEditPitch,
  handlePitchNotesDrawerModal,
  updateTypeForPitch,
  handleAssimodal
} from "../PitchAction";
import ReactCountryFlag from 'react-country-flag';
import AddchartIcon from '@mui/icons-material/Addchart';  
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
const OpenASSimodal =lazy(()=>import("./OpenASSimodal"));
const AddPitchNotesDrawerModal =lazy(()=>import("./AddPitchNotesDrawerModal"));
const UpdateLPitchModal =lazy(()=>import("./UpdateLPitchModal"));
const StatusPitchToggle =lazy(()=>import("../Child/StatusPitchToggle"));

const ButtonGroup = Button.Group;

const PitchTeamCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getTeamPitch(props.userId,page,"creationdate");
    setPage(page + 1);
    // props.getSectors();
    // props.getCountries();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getTeamPitch(props.currentUser?props.currentUser:props.userId,page,
      props.filter?props.filter:"creationdate"

      );
}
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
   const { user,deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingTeamPitch,leadsAllData  } = props;

  // if (fetchingTeamPitch) {
  //   return <BundleLoader />;
  // }

  return (
    <>
 <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
    <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" md:w-[5.5rem]"></div>
        <div className=" md:w-32 "><FormattedMessage
                  id="app.phoneno#"
                  defaultMessage="phoneno#"
                /></div>
        <div className="md:w-32"><FormattedMessage
                  id="app.country"
                  defaultMessage="country"
                /></div>
        <div className="md:w-52"><FormattedMessage
                  id="app.company"
                  defaultMessage="company"
                /></div>
        <div className="md:w-24"><FormattedMessage
                  id="app.assignedto"
                  defaultMessage="assignedto"
                /></div>
        <div className="md:w-20"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        <div className="md:w-20"><FormattedMessage
                  id="app.qualify"
                  defaultMessage="qualify"
                /></div>
        {/* <div className="w-12">Action</div> */}

      </div>
      <InfiniteScroll
        dataLength={props.teamPitch.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamPitch?<div class="flex justify-center" >Loading...</div>:null}
        height={"75vh"}
      >
  { !fetchingTeamPitch && props.teamPitch.length === 0 ?<NodataFoundPage />:props.teamPitch.map((item,index) =>  {
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
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-11 items-center p-1"
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                     <div class="flex justify-between">
                                <div className=" flex font-medium flex-col w-[12rem]   max-sm:w-full">
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
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                            {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-[0.82rem] flex text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
                                                {/* <Link
                                                 toUrl={`customer/${item.customerId}`}
                                                 title={`${item.name}`} 
                                               > */}
                                               {item.firstName}
                                               &nbsp;
                                               {item.middleName}
                                               &nbsp;
                                               {item.lastName}
                                               {/* </Link> */}
                                               &nbsp;&nbsp;
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] mt-[0.4rem] font-bold">
                                                   New
                                                 </span>
                                               ) : null}
                                              
                                                                                   </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex flex-row items-center md:w-3/12 max-sm:flex-row w-full max-sm:justify-between">

<div><ButtonGroup>
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
   props.updateTypeForPitch(item.investorLeadsId,typ)
 }}
/>
</ButtonGroup></div>

  


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
   props.updateTypeForPitch(item.investorLeadsId,typ)
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
   props.updateTypeForPitch(item.investorLeadsId,typ)
 }}
/>
</ButtonGroup>
</div>

</div>  
     </div>  
                                <div class="flex justify-between md:ml-4">
                                <div className=" flex font-medium flex-col  md:w-44 max-sm:flex-row w-full max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Phone # </div> */}

                           <div class="text-[0.82rem] text-cardBody font-poppins">
  {item.countryDialCode && item.phoneNumber
    ? `${item.countryDialCode} ${item.phoneNumber}`
    : 'No Data'}
</div>

                       </div>
                       <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-[0.82rem] text-cardBody font-poppins">
                                    <ReactCountryFlag
                          countryCode={item.countryAlpha2Code}
                          svg
                          style={{
                            width: '1em',
                            height: '1em',
                          }}
                        />
                        &nbsp;
                       {item.address && item.address.length && item.address[0].country}
                                    </div>
                              </div>
                              </div>
                       <div class="flex justify-between  max-sm:mb-2 ">
                       <div className=" flex font-medium flex-col  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Company </div> */}
                           <div className="text-[0.82rem] text-cardBody font-poppins">
                           {item.companyName || "No Data"}
</div>

                       </div>
                       <div class="rounded-full bg-white  h-5 cursor-pointer w-8">
                    {item.url !== null ? (
              <Tooltip title={item.url}>
                <span class="cursor-pointer"
                  //type="edit"
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green" ,fontSize: "1rem",}}
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>
                                {/* <div className=" flex font-medium flex-col  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Sector </div>
                                    <div class=" text-[0.82rem] text-cardBody font-poppins">   
                                    {item.sector}
                                    </div>
                                </div> */}
                                </div>
                               
          
     <div class="md:w-[1%]"></div>
     <div class="flex justify-between max-sm:mb-1 md:items-center">
     <div class="flex justify-between max-sm:w-[50%] ">
     <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                    
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
     <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                       
                       {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</div> */}

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
                               
                         
                   <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Qualify</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                {/* qual */}
                                    </div>
                                    <div>
<StatusPitchToggle
            type={props.convertInd ? "primary" : "danger"}
            investorLeadsId={item.investorLeadsId}
            convertInd={item.convertInd}
          />
</div>
                                </div>
                                <div class="flex flex-col justify-evenly w-6 max-sm:flex-row max-sm:w-[10%]">
                                <div >
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  props.handlePitchNotesDrawerModal(true);
                  handleSetCurrentLeadsId(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>

            </div>
            <div>
<Tooltip
        title={
          <FormattedMessage id="app.activity" defaultMessage="Activity" />
        }
      >
<AddchartIcon
style={{fontSize: "1rem",cursor: 'pointer',}}
onClick={()=>{
  props.handleAssimodal(true)
  handleRowData(item)
  }}
/>
</Tooltip>
</div>
</div>
                                </div>
                                <div class="flex max-sm:flex-row  justify-evenly md:w-20 max-sm:w-[25%] ">
                               
                                <div class="flex flex-col w-6 max-sm:flex-row">
                                {user.imInd === true  &&  user.pitchUpdateInd === true && (  
                                <div>
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{  color: "grey",cursor: "pointer",fontSize: "1rem" }}
                onClick={() => {
                   props.setEditPitch(item);
                   props.handleUpdatePitchModal(true);
                handleSetCurrentLeadsId(item);
                  
                }}
              />
            </Tooltip>
        
            </div>
                                )}
                               
                        <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deletePitchData(item.investorleadsId)}
          >
               <Tooltip title="Delete">
           
             {user.imInd === true  &&  user.plantDeleteInd === true && ( 
            <DeleteOutlined
              type="delete"
              style={{ cursor: "pointer", color: "red" ,fontSize: "1rem",}}
            />
             )} 
              </Tooltip>
          </StyledPopconfirm>
                        </div>
                            
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col w-6 max-sm:flex-row">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span class="cursor-pointer">
            <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "1rem"
              }}/>
            </span>
          </Tooltip>
          </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize:"1rem"  }}
                // onClick={() => {
                //   handleSetCurrentLeadsId(item);
                //   props.handleLeadsEmailDrawerModal(true);
                // }}
              />
            </Tooltip> </div>
           
                      </div> 
                      
                    </div>
                    </div>
                      </div>
                            </div>
                         


                    )
                })}
                  </InfiniteScroll>
      </div>
      <UpdateLPitchModal
        item={currentLeadsId}
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
      <OpenASSimodal 
        rowdata={rowdata}
        openASSImodal={props.openASSImodal}
      handleAssimodal={props.handleAssimodal}
      />
         <AddPitchNotesDrawerModal 
       item={currentLeadsId}
        addDrawerPitchNotesModal={props.addDrawerPitchNotesModal}
        handlePitchNotesDrawerModal={props.handlePitchNotesDrawerModal}
      />
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector,pitch }) => ({
//   leadsAllData: leads.leadsAllData,
user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingTeamPitch:pitch.fetchingTeamPitch,
  addDrawerPitchNotesModal:pitch.addDrawerPitchNotesModal,
  updatePitchModal:pitch.updatePitchModal,
  openASSImodal:pitch.openASSImodal,
  teamPitch:pitch.teamPitch
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamPitch,
        deletePitchData,
        handleUpdatePitchModal,
        setEditPitch,
        updateTypeForPitch,
        handlePitchNotesDrawerModal,
        handleAssimodal

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchTeamCardList);
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
        <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i>
      </Button>
    </Tooltip>
  );
}

import React, { useEffect, useState ,lazy} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExploreIcon from "@mui/icons-material/Explore";
import { DeleteOutlined } from "@ant-design/icons";
import { MultiAvatar } from "../../../Components/UI/Elements";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
    getAllPitch,
    deletePitchData
} from "../PitchAction";
import dayjs from "dayjs";
import AddchartIcon from '@mui/icons-material/Addchart';  
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../Components/Placeholder";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
const AddPitchNotesDrawerModal =lazy(()=>import("./AddPitchNotesDrawerModal"));
const UpdateLPitchModal =lazy(()=>import("../Child/UpdateLPitchModal"));
const StatusPitchToggle =lazy(()=>import("../Child/StatusPitchToggle"));
const OpenASSimodal =lazy(()=>import("./OpenASSimodal"));

const ButtonGroup = Button.Group;

const PitchAllCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    props.getAllPitch(page,"creationdate");
    setPage(page + 1);
    // props.getSectors();
    // props.getCountries();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllPitch(props.currentUser?props.currentUser:page,
      props.filter?props.filter:"creationdate"
 

      );
      setPage(page + 1);
}
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
   const { user,deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingAllPitch,leadsAllData  } = props;

  if (fetchingAllPitch) {
    return <BundleLoader />;
  }

 

  return (
    <>
 <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
 <div className=" flex justify-between max-sm:hidden w-[99%] p-1 bg-transparent font-bold sticky z-10">
        <div className=" w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.6rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" w-[5.1rem] max-xl:w-[3rem]"></div>
        <div className=" w-[5.3rem] max-xl:w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.mobile#"
                  defaultMessage="mobile#"
                /></div>
        <div className="w-[3.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className="w-[12.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.122rem]"><FormattedMessage
                  id="app.company"
                  defaultMessage="company"
                /></div>
                    <div className="w-[4.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.Source"
                  defaultMessage="Source"
                /></div>
                     <div className="w-[3.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.Sector"
                  defaultMessage="Sector"
                /></div>
        <div className="w-[4.122rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Assigned</div>
        <div className="w-[3.21rem] max-xl:text-[0.65rem] max-xl:w-[3.2rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner" 
                /></div>
        <div className="w-[10.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.4rem]"><FormattedMessage
                  id="app.qualify"
                  defaultMessage="qualify"
                /></div>


      </div>
      <InfiniteScroll
        dataLength={props.allPitchData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllPitch?<div class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
        style={{overflowX:"hidden"}}
      >
  { !fetchingAllPitch && props.allPitchData.length === 0 ?<NodataFoundPage />:props.allPitchData.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//  const countryCode = item.address[0].country_alpha2_code   
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
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                      <div>
                      <div
          className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
        >
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium  w-[12rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                          <div className="flex max-sm:w-full items-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> 
<div>

      <MultiAvatar
        primaryTitle={item.name}
        imageId={item.imageId}
        imageURL={item.imageURL}
        imgWidth={"1.8em"}
        imgHeight={"1.8em"}
      />
    
</div>
                             <div class="w-[4%]">

                             </div>

                                  <div class="max-sm:w-full" >
                                  <Tooltip>
                                    <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                      {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">
                                      Name
                                      </div> */}
                                      <div class=" text-[0.82rem] max-sm:text-[0.82rem] flex text-blue-500  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] font-semibold  cursor-pointer">
                                          
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
                                           <span class="text-[tomato] mt-[0.4rem] font-bold" >
                                             New
                                           </span>
                                         ) : null}
                                        
                                                                             </div>
                                      </div>
                                  </Tooltip>
                                  </div>
                                  </div>
                          </div>
                          <div class="flex flex-row items-center w-[6.1rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">






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
<div><ButtonGroup>
<RoleButton1
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
<RoleButton2
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
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium   w-[7rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                     {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Phone # </div> */}

                     <div class="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
{item.countryDialCode && item.phoneNumber
? `${item.countryDialCode} ${item.phoneNumber}`
: 'None'}
</div>

                 </div>
                 <div className=" flex font-medium  w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                            

                            {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Country</div> */}
                            <div class=" text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            {/* <CountryFlag1 countryCode={countryCode} />
                &nbsp;
                {countryCode} */}
                              </div>
                        </div>
                        <div className=" flex font-medium   w-[12.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                     {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Company </div> */}
                     <div className="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.companyName || "None"}
</div>

                 </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                
                 <div className=" flex font-medium   w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                     {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Company </div> */}
                     <div className="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.source || "None"}
</div>

                 </div>
                 <div className=" flex font-medium   w-[5.12rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                     {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Company </div> */}
                     <div className="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.sector || "None"}
</div>

                 </div>
                 <div className=" flex font-medium  w-[5.21rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                              {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Assigned</div> */}

                              <div class=" text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              
                              <span>
                {item.assignedTo === null ? (
          "None"
        ) : (
          <>
          {item.assignedTo === item.ownerName ? (
            
            null
          ) : (
            <Tooltip title={item.assignedTo}> 
                    <MultiAvatar
                      primaryTitle={item.assignedTo}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                        </Tooltip>
                  )}
                  </>
        )}
                </span>
       
                              </div>
                          </div>
                          <div className=" flex font-medium  w-[3.5rem] max-xl:w-[2.5rem] max-lg:w-[2.4rem]  max-sm:flex-row  max-sm:justify-between max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                 
                 {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Owner</div> */}

                 <span>
                 <Tooltip title={item.ownerName}>
          <div class="max-sm:flex justify-end">
          <Tooltip title={item.ownerName}>
        <MultiAvatar
          primaryTitle={item.ownerName}
          imageId={item.ownerImageId}
          imgWidth={"1.9rem"}
          imgHeight={"1.9rem"}
        />
      </Tooltip>
      </div>
    </Tooltip>
      </span>
             </div>
                          </div>
                          
                          
                         
    
<div class="flex max-sm:justify-between max-sm:w-wk items-center">
<div class="flex justify-between items-center max-sm:w-[50%] ">


                         
             <div class="rounded-full bg-white  h-5 cursor-pointer w-8 max-xl:w-[1.5rem]">
              {item.url !== null ? (
        <Tooltip title={item.url}>
          <span className=" cursor-pointer"
            //type="edit"
           
            onClick={() => {}}
          >
            {" "}
            <a href={`item.url`} target="_blank">
              <ExploreIcon
              className="!text-icon cursor-pointer text-[green]"
              />
            </a>
          </span>
        </Tooltip>
      ) : null}
                  </div>  
             <div className=" flex font-medium flex-col w-12 max-xl:w-[2rem] max-sm:flex-row  max-sm:justify-between max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                              {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Qualify</div> */}
   
                  
                              <div class=" text-[0.82rem]  font-poppins">
          {/* qual */}
                              </div>
                              <div>
                              {item.companyName ? (
                              <Tooltip title="Qualify? Pitch will move to Investor section!">
                  <ConnectWithoutContactIcon
                    onClick={() => {
                      handleRowData(item);
                      props.handlePitchConvertModal(true);
                   
                    }}
                    className="!text-icon cursor-pointer text-[blue]"
                  />
                </Tooltip>
                  ) : (
                    <Tooltip title="Company name is required to enable qualification action">
                      <ConnectWithoutContactIcon
                        className="!text-icon cursor-not-allowed text-gray-400"
                      />
                    </Tooltip>
                  )}
{/* <StatusPitchToggle
      type={props.convertInd ? "primary" : "danger"}
      investorLeadsId={item.investorLeadsId}
      convertInd={item.convertInd}
    /> */}
</div>
                          </div>
                          <div class="flex max-sm:flex-row  justify-between md:w-20 max-sm:w-[25%] ">
                                                <div >
                                    <Tooltip title="Notes">
                      <NoteAltIcon
                                onClick={() => {
                                  props.handlePitchNotesDrawerModal(true);
                                  handleSetCurrentLeadsId(item);
                                }}
                                className="!text-icon cursor-pointer text-[green]"
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
                                className="!text-icon cursor-pointer text-blue-500"

                                onClick={()=>{
                                props.handleAssimodal(true)
                                handleRowData(item)
                                }}
                                />
                                </Tooltip>
                                </div>                                
                                  
                                      <div>
                                                <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
                                        <span class="cursor-pointer" >
                                        <LocationOnIcon   className="!text-icon cursor-pointer text-[#960a0a]"/>
                                        </span>
                                      </Tooltip>
                                      </div>
                                      <div>
                                      <Tooltip title={item.email}>
                                          <MailOutlineIcon
                                            type="mail"
                                            className="!text-icon cursor-pointer text-green-400"
                                            // onClick={() => {
                                //   handleSetCurrentLeadsId(item);
                                //   props.handleLeadsEmailDrawerModal(true);
                                // }}
                              />
                            </Tooltip> </div>
                            {user.imInd === true  &&  user.pitchUpdateInd === true && (  
                                                <div>
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                className="!text-icon cursor-pointer text-[tomato]"
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
                            onConfirm={() => props.deletePitchData(item.investorLeadsId,props.userId)}
                          > <Tooltip title="Delete">
                            {user.imInd === true  &&  user.plantDeleteInd === true && ( 
                            <DeleteOutlined
                              type="delete"
                              className="!text-icon text-[red] cursor-pointer"
                              
                            />
                            )} 
                            </Tooltip>
                          </StyledPopconfirm>
                                        </div>
                
                
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
  fetchingAllPitch:pitch.fetchingAllPitch,
  addDrawerPitchNotesModal:pitch.addDrawerPitchNotesModal,
  updatePitchModal:pitch.updatePitchModal,
  openASSImodal:pitch.openASSImodal,
  allPitchData:pitch.allPitchData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getAllPitch,
         deletePitchData,
        // handleUpdatePitchModal,
        // setEditPitch,
        // updateTypeForPitch,
        // handlePitchNotesDrawerModal,
        // handleAssimodal
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchAllCardList);
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
          color: role === type ? "red" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
       <i className={`${iconType} text-base max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton1({ type, iconType, tooltip, role, size, onClick }) {
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
          color: role === type ? "orange" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
         <i className={`${iconType} text-base max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton2({ type, iconType, tooltip, role, size, onClick }) {
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
          color: role === type ? "blue" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
         <i className={`${iconType} text-base max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}


import React, { useEffect, useState ,lazy,Suspense} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { connect } from "react-redux";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import ExploreIcon from "@mui/icons-material/Explore";
import { DeleteOutlined } from "@ant-design/icons";
import { MultiAvatar } from "../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
    getTeamPitch,
  deletePitchData,
  handleUpdatePitchModal,
  setEditPitch,
  handlePitchNotesDrawerModal,
  updateTypeForPitch,
  handleAssimodal,
  handleAddresspitchModal
} from "../PitchAction"; 
import { Button, Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../Components/Placeholder";
import AddPitchAdressModal from "./AddPitchAdressModal";
const OpenASSimodal =lazy(()=>import("./OpenASSimodal"));
const AddPitchNotesDrawerModal =lazy(()=>import("./AddPitchNotesDrawerModal"));
const UpdateLPitchModal =lazy(()=>import("./UpdateLPitchModal"));
const PitchSearchedData =lazy(()=>import("./PitchSearchedData"));

const ButtonGroup = Button.Group;

const PitchTeamCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
          "110",//0 Name
          "546",//1 Mobile
          "277",//2 Company
          "279",//3 source
          "278",//4 sector
          "76",//5 Assigned  
           "77",//Owner     
          "1114",//6 qualify
          "271" , // 7 Hot
          "272",  // 8Warm
          "273",  //9 Cold"
          "100", //10  New
        "1453", //  11"Qualify? Pitch will move to Investor section!
        "1454", // 12 Company name is required to enable qualification action
        "316",// 13 Notes
        "1165", // 14 Activity
        "170", // 15 Edit
        "1259",  // 16 Do you want to delete?
        "84"

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);


  useEffect(() => {
    props.getTeamPitch(props.userId,page);
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

      );
}
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
   const { user,deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingTeamPitch,leadsAllData  } = props;

  // if (fetchingTeamPitch) {
  //   return <BundleLoader />;
  // }

  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <div>
    {props.serachedPitchData.length > 0 ? (
<PitchSearchedData
serachedPitchData={props.serachedPitchData}
/>
) : (
    <>
  <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
    <div class="w-[90%]">
 <div className=" flex justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" text-xs font-bold font-poppins w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.6rem]">
        {translatedMenuItems[0]}
        {/* Name */}
                </div>
        <div className=" w-[5.1rem] max-xl:w-[3rem]"></div>
        <div className="  text-xs font-bold font-poppins w-[5.3rem] max-xl:w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[1]} 
        {/* Mobile */}
                </div>
        <div className="w-[3.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className="text-xs font-bold font-poppins w-[12.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.122rem]">
        {translatedMenuItems[2]}
        {/* Company */}
           </div>
         <div className="text-xs font-bold font-poppins w-[4.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {translatedMenuItems[3]}
               {/* Source */}
           </div>
          <div className="text-xs font-bold font-poppins w-[3.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                {translatedMenuItems[4]} 
                     {/* Sector */}
                </div>
        <div className="text-xs font-bold font-poppins w-[3.521rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[5]}
          {/* Assigned */}
          </div>
          <div className="text-xs font-bold font-poppins w-[3.521rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[6]}
          {/* Owner */}
          </div>
          {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[9.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            Score
          
            </div>
            )}
        <div className="text-xs font-bold font-poppins w-[10.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.4rem]">
        {translatedMenuItems[7]}
        {/* Qualify */}
                </div>
                </div>
      </div>
      <InfiniteScroll
        dataLength={props.teamPitch.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamPitch?<div class="flex justify-center" >Loading...</div>:null}
        height={"80vh"}
        style={{overflowX:"hidden",scrollbarWidth:"thin"}}
      >
  { !fetchingTeamPitch && props.teamPitch.length === 0 ?<NodataFoundPage />:props.teamPitch.map((item,index) =>  {
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
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col  p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[12rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                                <div className="flex max-sm:w-full items-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> 
<div>

            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />     
</div>
                          <div>
                                   </div>
                                        <div class="max-sm:w-full ml-1" >
                                        <Tooltip>
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                            {/* name  */}
                                            <div class=" text-xs max-sm:text-xs flex text-blue-500  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] font-semibold  cursor-pointer">                                         
                                               {item.firstName}
                                               &nbsp;
                                               {item.middleName}
                                               &nbsp;
                                               {item.lastName}
                                               {/* </Link> */}
                                               &nbsp;&nbsp;
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] mt-[0.4rem] font-bold" >
                                                   {translatedMenuItems[10]} {/* New */}
                                                 </span>
                                               ) : null}
                                              
                                                                                   </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex flex-row items-center w-[6.8rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">
                                                  <div>
                                                  <ButtonGroup>
                                              <RoleButton
                                              type="Hot"
                                              iconType="fas fa-mug-hot"
                                              // tooltip="Hot"
                                              tooltip= {translatedMenuItems[8]}
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
                                      tooltip= {translatedMenuItems[9]}
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
                                      tooltip= {translatedMenuItems[10]}
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
                                                      <div className=" flex  w-[8rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                                                             
                                                                <div class="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                        {item.countryDialCode && item.phoneNumber
                                          ? `${item.countryDialCode} ${item.phoneNumber}`
                                          : 'None'}
                                      </div>

                                                            </div>
                                                            <div className=" flex   w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                                          
                                                                    </div>
                                                                    <div className=" flex  w-[12.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                                                                {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Company </div> */}
                                                                <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                                                {item.companyName || "None"}
                                      </div>

                                                            </div>
                                                                    </div>
                                                                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            
                                                            <div className=" flex  w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                                             {/* Company  */}
                                                                <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                                                {item.source || "None"}
                                      </div>

                                                            </div>
                                                            <div className=" flex  w-[4.12rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                                              {/* Company */}
                                                                <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                                                {item.sector || "None"}
                                      </div>

                                                            </div>
                                                            <div className=" flex w-[2.21rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                                                                      {/* Assigned */}

                                                                          <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                                                          
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
                                                             <div className=" flex  w-[2.5rem] max-xl:w-[2.5rem] max-lg:w-[2.4rem]  max-sm:flex-row  max-sm:justify-between max-xl:text-[0.65rem] max-lg:text-[0.45rem]">                                          
                                                            <span>
                                                            <Tooltip title={item.ownerName}>
                                                      <div class="max-sm:flex justify-end">
                                                      <Tooltip title={item.ownerName}>
                                                    <MultiAvatar
                                                      primaryTitle={item.ownerName}
                                                      imageId={item.ownerImageId}
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                                  </Tooltip>
                                                  </div>
                                                </Tooltip>
                                                  </span>
                                                        </div>
                                                              </div>     
                                                              {props.user.aiInd && (
           <div className=" flex  justify-center  w-[9.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}      
                                          <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                                          <div className=" flex  flex-col w-4 max-xl:w-[2rem] max-sm:flex-col  max-sm:justify-evenly max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                                                          
                                                                          <div>
                                                                          {item.companyName ? (
                                                                          <Tooltip title= {translatedMenuItems[12]}>
                                                              <ConnectWithoutContactIcon
                                                                onClick={() => {
                                                                  handleRowData(item);
                                                                  props.handlePitchConvertModal(true);
                                                              
                                                                }}
                                                                className="!text-icon cursor-pointer text-[blue]"
                                                              />
                                                            </Tooltip>
                                                              ) : (
                                                                <Tooltip title= {translatedMenuItems[13]}>
                                                                  <ConnectWithoutContactIcon
                                                                    className="!text-icon cursor-not-allowed text-gray-400"
                                                                  />
                                                                </Tooltip>
                                                              )}
                                   
                                      </div>
                                      </div>
                                      <div class="rounded-full bg-white  h-5 cursor-pointer w-4 max-xl:w-[1.5rem]">
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
                                                                   
                                                                 
                                                                   
                                                              <div class="flex max-sm:justify-evenly max-sm:w-wk items-center justify-end">
                                                                                              <div >
                                                                                            <Tooltip title= {translatedMenuItems[14]}>
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
                                                                                title= {translatedMenuItems[15]}
                                                                              >
                                                                   <i class="fab fa-connectdevelop text-[#8332ac]"  

                                                                        onClick={()=>{
                                                                          props.handleAssimodal(true)
                                                                          handleRowData(item)
                                                                          }}
                                                                        ></i>
                                                                        </Tooltip>
                                                                            </div>                                                                               
                                                                                       <div>
                                                                                            <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
                                                                                    <span class="cursor-pointer" >
                                                                                    <AddLocationAltIcon   className="!text-icon cursor-pointer text-[#8e4bc0]"/>
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
                                                                                    <Tooltip title= {translatedMenuItems[16]}>
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
                                                                                    title= {translatedMenuItems[17]}
                                                                                    onConfirm={() => props.deletePitchData(item.investorLeadsId,props.userId)}
                                                                                  > <Tooltip title= {translatedMenuItems[18]}>
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
                                                          )
                                                      })}
                                                        </InfiniteScroll>
                                            </div>
                                            <Suspense fallback={<BundleLoader />}>
                                            <UpdateLPitchModal
                                              item={currentLeadsId}
                                              updatePitchModal={props.updatePitchModal}
                                              translateText={props.translateText}
                                              selectedLanguage={props.selectedLanguage}
                                              translatedMenuItems={props.translatedMenuItems}
                                              // updateLeadsModal={updateLeadsModal}
                                              handleUpdatePitchModal={props.handleUpdatePitchModal}
                                              // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
                                            />                                      
                                            <OpenASSimodal 
                                              rowdata={rowdata}
                                              openASSImodal={props.openASSImodal}
                                            handleAssimodal={props.handleAssimodal}
                                            />
                                            <AddPitchAdressModal
        item={rowdata}
         type="investorLeads"
         addressPitchModal={props.addressPitchModal}
         handleAddresspitchModal={props.handleAddresspitchModal}
      /> 
                                              <AddPitchNotesDrawerModal 
                                              item={currentLeadsId}
                                              addDrawerPitchNotesModal={props.addDrawerPitchNotesModal}
                                              handlePitchNotesDrawerModal={props.handlePitchNotesDrawerModal}
                                            />
                                            </Suspense>
                                          </>
                                          )}
                                          </div>
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
                                        teamPitch:pitch.teamPitch,
                                        serachedPitchData:pitch.serachedPitchData,
                                        addressPitchModal: pitch.addressPitchModal
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
                                              handleAssimodal,
                                              handleAddresspitchModal
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
                                                color: role === type ? "red" : "grey",
                                              }}
                                              ghost={role !== type}
                                              onClick={onClick}
                                            >
                                            <i className={`${iconType} text!-icon max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
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
                                              <i className={`${iconType} text!-icon  max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
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
                                              <i className={`${iconType} text!-icon  max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
                                            </Button>
                                          </Tooltip>
                                        );
                                      }

import React, { useEffect, useState,lazy, Suspense} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ExploreIcon from "@mui/icons-material/Explore";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { MultiAvatar } from "../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { BundleLoader, } from "../../../Components/Placeholder";
import {
  getPitch,
  getPitchHot,
  getPitchWarm,
  getPitchCold,
  deletePitchData,
  handleUpdatePitchModal,
  setEditPitch,
  handlePitchNotesDrawerModal,
  updateTypeForPitch,
  handleAssimodal,
  handlePitchConvertModal
} from "../PitchAction";
import AddchartIcon from '@mui/icons-material/Addchart';  
import { Button, Tooltip } from "antd";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import CountryFlag1 from "../../Settings/Category/Country/CountryFlag1";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateLPitchModal =lazy(()=>import("../Child/UpdateLPitchModal"));
const OpenASSimodal =lazy(()=>import("./OpenASSimodal"));
const AddPitchNotesDrawerModal =lazy(()=>import("./AddPitchNotesDrawerModal"));
const AddConvertPitchStatusModal =lazy(()=>import("./PitchDetails/AddConvertPitchStatusModal"));


const ButtonGroup = Button.Group;

const PitchSearchedData = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  // useEffect(() => {
  //   props.getPitch(props.userId,page,"creationdate");
  //   props.getPitchHot(props.userId, page,"creationdate","hot");
  //   props.getPitchCold(props.userId, page,"creationdate","cold");
  //   props.getPitchWarm(props.userId, page,"creationdate","warm");
  //   setPage(page + 1);
  //   // props.getSectors();
  //   // props.getCountries();
  // }, []);
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


  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
   const { user,deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingPitch,leadsAllData  } = props;

  // if (fetchingPitch) {
  //   return <BundleLoader />;
  // }

  

  return (
    
    <>
  <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
    <div className=" flex justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold sticky max-xl:text-[0.65rem]  max-lg:text-[0.45rem] !text-lm z-10">
    <div className=" w-[6.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem] mr-2 text-sm   text-white bg-red-600  justify-center ">
      Type
      </div>
        <div className=" w-[8.1rem]  max-xl:w-[9.6rem]">
        name
          </div>
        <div className=" w-[5.1rem] max-xl:w-[3rem]"></div>
        <div className=" w-[7.3rem] max-xl:w-[5.1rem] ">
          mobile #
          </div>
        <div className="w-[1.5rem] "> </div>
        <div className="w-[12.12rem]  max-xl:w-[5.122rem]">
       company</div>
                    <div className="w-[5.12rem] ">
                    Source
                      
                      </div>
                     <div className="w-[5.121rem] ">
                    Sector
                      </div>
                 <div className="w-[5.23rem]  max-xl:w-[8.2rem]">
      Category
          </div>
          <div className="w-[4.236rem]  max-xl:w-[8.2rem]">
          Shares #
          </div>
          <div className="w-[4.236rem]  max-xl:w-[8.2rem] truncate">
         First Meeting
          </div>
          <div className="w-[4.238rem]  max-xl:w-[8.2rem]">
         Value
          </div>
        <div className="w-[5.122rem] ">
          Assigned
          </div>
        <div className="w-[3.21rem] max-xl:text-[0.65rem] max-xl:w-[3.2rem] max-lg:text-[0.45rem]">
       owner
          </div>
        <div className="w-[8.6rem]  max-xl:w-[7.4rem]">
       qualify
          </div>


      </div>
    { !props.fetchingPitchHot && props.serachedPitchData.length === 0 ?<NodataFoundPage />:props.serachedPitchData.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
   const Category=item.pvtAndIntunlInd?"Institutional":"Private"
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//  const countryCode = item.address[0].country_alpha2_code  
const countryCode = item.countryAlpha2Code  
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
                            <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                       <div class="flex flex-row items-center mt-1  border-l-2 border-green-500 bg-[#eef2f9] w-[6.1rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">
                                        <div>
                                              <ButtonGroup>
                                              <RoleButton
                                              type="Hot"
                                              iconType="fas fa-mug-hot"
                                              tooltip="Hot"
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
                                                tooltip="Warm"
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
                                                tooltip="Cold"
                                                role={item.type}
                                                onClick={() => {
                                                const typ="Cold"
                                                props.updateTypeForPitch(item.investorLeadsId,typ)
                                                }}
                                                />
                                                </ButtonGroup>
                                                </div>

                                                </div>  


                                <div className=" flex font-medium ml-gap mt-1  bg-[#eef2f9]    w-[11rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                                <div className="flex max-sm:w-full   items-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> 
                                    <div className="">

                                                <MultiAvatar
                                                  primaryTitle={item.name}
                                                  imageId={item.imageId}
                                                  imageURL={item.imageURL}
                                                  imgWidth={"1.8rem"}
                                                  imgHeight={"1.8rem"}
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
      
     </div>  
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                        <div className=" flex font-medium ml-gap mt-1  bg-[#eef2f9]  h-8  w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                  

                                  {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                    </div>
                              </div>
                                <div className=" flex font-medium ml-gap mt-1  bg-[#eef2f9] h-8   w-[7rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Phone # </div> */}

                                          <div class="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                  {item.countryDialCode && item.phoneNumber
                    ? `${item.countryDialCode} ${item.phoneNumber}`
                    : 'None'}
                </div>

                       </div>
                       
                              <div className=" flex font-medium ml-gap mt-1  bg-[#eef2f9] h-8   w-[9.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Company </div> */}
                           <div className="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                           {item.companyName || "None"}
</div>

                       </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      
                       <div className=" flex font-medium ml-gap mt-1  bg-[#eef2f9]  h-8   w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Company </div> */}
                           <div className="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                           {item.source || "None"}
</div>

                       </div>
                       <div className=" flex font-medium  ml-gap mt-1  bg-[#eef2f9]  h-8   w-[5.12rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"> Company </div> */}
                           <div className="text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                           {item.sector || "None"}
</div>

                       </div>
                       <div className=" flex font-medium ml-gap mt-1  bg-[#eef2f9]  h-8 items-center w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {Category}
                                    </div>
                                </div>
                                <div className=" flex font-medium ml-gap mt-1  bg-[#eef2f9]  h-8 items-center w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.unitOfShare}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center mt-1  bg-[#eef2f9]  ml-gap h-8 w-[5.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[5.121rem] mt-1  ml-gap  bg-[#eef2f9]  h-8 max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.shareCurrency} {item.valueOfShare}
                                    </div>
                                </div>
                       <div className=" flex font-medium center mt-1  bg-[#eef2f9] ml-gap   h-8  w-[4.21rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class=" mt-1  bg-[#eef2f9]  h-8 text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    
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
                                <div className=" flex font-medium   mt-1 ml-gap   bg-[#eef2f9]  h-8  w-[2.5rem] max-xl:w-[2.5rem] max-lg:w-[2.4rem]  max-sm:flex-row  max-sm:justify-between max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                       
                       {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Owner</div> */}

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
                   <div className=" flex font-medium flex-col mt-1  bg-[#eef2f9] ml-gap   h-8  w-4 max-xl:w-[2rem] max-sm:flex-row  max-sm:justify-between max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                                    {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Qualify</div> */}
         
                        
                                    <div class=" text-[0.82rem]    font-poppins">
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

</div>
                                </div>    
          
     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
     <div class="flex justify-between items-center max-sm:w-[50%] mt-1  ml-gap  bg-[#eef2f9]  h-8  ">
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
        title="Activity" 
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
           <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
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
                  {/* </InfiniteScroll> */}
      </div>

    
      <Suspense fallback={<BundleLoader />}>

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
          <AddConvertPitchStatusModal
           rowdata={rowdata}
          //  handleRowData={handleRowData}
           addPitchConvertModal={props.addPitchConvertModal}
           handlePitchConvertModal={props.handlePitchConvertModal}
           /></Suspense>
    </>
   
  );
};

const mapStateToProps = ({ auth, leads, sector,pitch }) => ({
//   leadsAllData: leads.leadsAllData,
user: auth.userDetails,
addPitchConvertModal:pitch.addPitchConvertModal,
  userId: auth.userDetails.userId,
  fetchingPitch:pitch.fetchingPitch,
  addDrawerPitchNotesModal:pitch.addDrawerPitchNotesModal,
  updatePitchModal:pitch.updatePitchModal,
  openASSImodal:pitch.openASSImodal,
  pitchData:pitch.pitchData,
  pitchDataHot:pitch.pitchDataHot,
  pitchDataWarm:pitch.pitchDataWarm,
  pitchDataCold:pitch.pitchDataCold,
  fetchingPitchHot:pitch.fetchingPitchHot,
  fetchingPitchWarm:pitch.fetchingPitchWarm,
  fetchingPitchCold:pitch.fetchingPitchCold,
  serachedPitchData:pitch.serachedPitchData

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getPitch,
        getPitchHot,
  getPitchWarm,
  getPitchCold,
        deletePitchData,
        handleUpdatePitchModal,
        setEditPitch,
        updateTypeForPitch,
        handlePitchNotesDrawerModal,
        handleAssimodal,
        handlePitchConvertModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchSearchedData);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.1rem";
  } else {
    size = ".95rem";
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
       <i className={`${iconType} !text-icon max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton1({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.1rem";
  } else {
    size = ".95rem";
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
         <i className={`${iconType} !text-icon max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton2({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.1rem";
  } else {
    size = ".95rem";
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
         <i className={`${iconType} !text-icon max-sm:text-[0.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}
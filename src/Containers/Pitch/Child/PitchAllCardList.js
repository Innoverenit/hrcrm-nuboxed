
import React, { useEffect, useState ,lazy} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExploreIcon from "@mui/icons-material/Explore";
import { DeleteOutlined } from "@ant-design/icons";
import { MultiAvatar } from "../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
    getAllPitch
} from "../PitchAction";
import dayjs from "dayjs";
import AddchartIcon from '@mui/icons-material/Addchart';  
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../Components/Placeholder";
import CountryFlag1 from "../../Settings/Category/Country/CountryFlag1";
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

  if (isMobile){
    return (
      <>
   <div class="rounded-lg  p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
    
        <InfiniteScroll
          dataLength={props.allPitchData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingAllPitch?<div class="flex justify-center">Loading...</div>:null}
          height={"75vh"}
        >
     {props.allPitchData.map((item) => { 
   const currentdate = dayjs().format("DD/MM/YYYY");
   const date = dayjs(item.creationDate).format("DD/MM/YYYY");
   const countryCode = item.address[0].country_alpha2_code   
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
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem]  p-3"
                >
                                       <div class="flex justify-between">
                                 
                                  <div className="flex max-sm:w-full items-center"> 
  <div>

              <MultiAvatar
                primaryTitle={item.name}
                imageId={item.imageId}
                imageURL={item.imageURL}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
           
  </div>
                                    
  
                                          <div class="max-sm:w-full" >
                                          <Tooltip>
                                            
                                              
                                              <div class=" text-[0.82rem] text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                  
                                                 
                                                 {item.firstName}
                                                 &nbsp;
                                                 {item.middleName}
                                                 &nbsp;
                                                 {item.lastName}
                                                 {/* </Link> */}
                                                 &nbsp;&nbsp;
                                                 {date === currentdate ? (
                                                   <span
                                                   class="text-[tomato] font-bold">
                                                     New
                                                   </span>
                                                 ) : null}
                                                
                                                                                     </div>
                                             
                                          </Tooltip>
                                          </div>
                                          </div>
                                  
                                  
  
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
                                  <div class="flex justify-between md:ml-4">
                                 
                             {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Phone # </div> */}
  
                             <div class="text-[0.82rem] text-cardBody font-poppins">
    {item.countryDialCode && item.phoneNumber
      ? `${item.countryDialCode} ${item.phoneNumber}`
      : 'Not available'}
  </div>
  
                         
                         
                                    
  
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                    <CountryFlag1 countryCode={countryCode} />
                        &nbsp;
                        {countryCode}
                                      </div>
                                
                                </div>
                         <div class="flex justify-between  max-sm:mb-2 ">
                         
                             {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Company </div> */}
                             <div className="text-[0.82rem] text-cardBody font-poppins">
                             {item.companyName || "Not Available"}
  </div>
  
                         
                        
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
                                 
            
       
       <div class="flex justify-between max-sm:mb-1 md:items-center">
      
      
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
                                  
                                 
                                  <div >
                      <Tooltip title="Notes">
         <NoteAltIcon
                  onClick={() => {
                    props.handlePitchNotesDrawerModal(true);
                    handleSetCurrentLeadsId(item);
                  }}
                  className="!text-base cursor-pointer text-[green]"
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
  className="!text-base cursor-pointer text-blue-500"
  onClick={()=>{
    props.handleAssimodal(true)
    handleRowData(item)
    }}
  />
  </Tooltip>
  </div>
  
                                  
                                  
                                 
                                  <div class="flex flex-col w-6 max-sm:flex-row">
                                  {user.imInd === true  &&  user.pitchUpdateInd === true && (  
                                  <div>
              <Tooltip title="Edit">
                <BorderColorIcon
                   className="!text-base cursor-pointer text-[tomato]"
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
              // onConfirm={() => deletePitchData(item.investorleadsId)}
            >
              <Tooltip title="Delete">
               {user.imInd === true  &&  user.plantDeleteInd === true && ( 
              <DeleteOutlined
                type="delete"
                className="!text-base text-[red] cursor-pointer"
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
              <span class="cursor-pointer"
               
              >
              <LocationOnIcon  className="!text-base cursor-pointer text-[#960a0a]"/>
              </span>
            </Tooltip>
            </div>
            <div>
            <Tooltip title={item.email}>
                <MailOutlineIcon
                  type="mail"
                  className="!text-base cursor-pointer text-green-400"
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

  }

  return (
    <>
 <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
  <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12.1rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" md:w-[8.5rem]"></div>
        <div className=" md:w-[7.1rem] "><FormattedMessage
                  id="app.phoneno#"
                  defaultMessage="phoneno#"
                /></div>
        <div className="md:w-[8.2rem]"><FormattedMessage
                  id="app.country"
                  defaultMessage="country"
                /></div>
        <div className="md:w-[17.1rem]"><FormattedMessage
                  id="app.company"
                  defaultMessage="company"
                /></div>
        <div className="md:w-[7.1rem]"><FormattedMessage
                  id="app.assignedto"
                  defaultMessage="assignedto"
                /></div>
        <div className="md:w-[3.2rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        <div className="md:w-[9.8rem]"><FormattedMessage
                  id="app.qualify"
                  defaultMessage="qualify"
                /></div>
        {/* <div className="w-12">Action</div> */}

      </div>
      <InfiniteScroll
        dataLength={props.allPitchData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllPitch?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
  { !fetchingAllPitch && props.allPitchData.length === 0 ?<NodataFoundPage />:props.allPitchData.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
 const countryCode = item.address[0].country_alpha2_code   
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
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-11 items-center p-1"
                               
                                >
                                     <div class="flex justify-between">
                                <div className=" flex font-medium flex-col w-[13.5rem]   max-sm:w-full">
                                <div className="flex max-sm:w-full items-center"> 
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
                                            {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-[0.82rem] text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
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
                                                 <span
                                                 class="text-[tomato] font-bold">
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
                                <div className=" flex font-medium flex-col  md:w-[9.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Phone # </div> */}

                           <div class="text-[0.82rem] text-cardBody font-poppins">
  {item.countryDialCode && item.phoneNumber
    ? `${item.countryDialCode} ${item.phoneNumber}`
    : 'Not available'}
</div>

                       </div>
                       <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-[0.82rem] text-cardBody font-poppins">
                                  <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                    </div>
                              </div>
                              </div>
                       <div class="flex justify-between  max-sm:mb-2 ">
                       <div className=" flex font-medium flex-col  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                           {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Company </div> */}
                           <div className="text-[0.82rem] text-cardBody font-poppins">
                           {item.companyName || "Not Available"}
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
     <div class="flex justify-between items-center max-sm:w-[50%] ">
     <div className=" flex font-medium flex-col md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                    
                                    <span>
                        {item.assignedTo === null ? (
                  "Not available"
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
     <div className=" flex font-medium flex-col md:w-[3.5rem]  max-sm:flex-row w-full max-sm:justify-between">
                       
                       {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                       <span>
                       <Tooltip title={item.ownerName}> 
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                // imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
                    </Tooltip>
            </span>
                   </div>
                               
                         
                   <div className=" flex font-medium flex-col md:w-16 max-sm:flex-row w-full max-sm:justify-between ">
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
                className="!text-base cursor-pointer text-[green]"
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
                                <div class="flex max-sm:flex-row   md:w-20 max-sm:w-[25%] ">
{/*                                
                                <div class="flex flex-col w-6 max-sm:flex-row">
                                {user.imInd === true  &&  user.pitchUpdateInd === true && (  
                                <div>
            <Tooltip title="Edit">
              <BorderColorIcon
                className="!text-base cursor-pointer text-[tomato]"
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
            // onConfirm={() => deletePitchData(item.investorleadsId)}
          >
            <Tooltip title="Delete">
             {user.imInd === true  &&  user.plantDeleteInd === true && ( 
            <DeleteOutlined
              type="delete"
              className="!text-base text-[red] cursor-pointer"
            />
             )} 
             </Tooltip>
          </StyledPopconfirm>
                        </div>
                            
                        <div>
            

                    </div>
                    </div> */}
                    <div class="flex flex-col w-6 max-sm:flex-row">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span class="cursor-pointer"
             
            >
            <LocationOnIcon   className="!text-base cursor-pointer text-[#960a0a]"/>
            </span>
          </Tooltip>
          </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                className="!text-base cursor-pointer text-green-400"
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
        // deletePitchData,
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
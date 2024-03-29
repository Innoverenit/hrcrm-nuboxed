import React, { useEffect, useState, } from "react";
import { StyledPopconfirm, } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { MultiAvatar } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "../../../../Components/Common";
import {
  getJunkedLeads,
  deleteLeadsData,
  setEditLeads,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  reInstateJunkLeads
} from "../../../Leads/LeadsAction";
import { Button, Tooltip,  } from "antd";
import { FormattedMessage } from "react-intl";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";

const ButtonGroup = Button.Group;

const LeadsJunkList = (props) => {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    props.getJunkedLeads(props.userId);
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

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const { deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingJunkedLeads,junkedLeadsData  } = props;

  // if (fetchingJunkedLeads) {
  //   return <BundleLoader />;
  // }
  const handleLoadMore = () => {
      setPage(page + 1);
      props.getJunkedLeads(props.userId);
};
if (isMobile){
  return (
    <>
 <div class="rounded-lg  p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
 
      <InfiniteScroll
        dataLength={junkedLeadsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingJunkedLeads?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
      {junkedLeadsData.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
         const countryCode = item.address[0].country_alpha2_code
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
                    <div
                className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
              >
                              <div class="flex justify-between items-center w-wk ">
                          <div className=" flex font-medium flex-col w-[13rem]   max-sm:w-full">
                          <div className="flex max-sm:w-full"> 
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
                                    <div class="max-sm:w-full justify-between flex md:flex-col">
                                     
                                      <h4 class="text-[0.82rem] text-cardBody font-semibold  font-poppins cursor-pointer">
                                      {item.name}
                                     &nbsp;&nbsp;
                                     {date === currentdate ? (
    <span
    class="text-xs text-[tomato] font-bold"
    >
      New
    </span>
  ) : null}   

 
                                      </h4>
                                      </div>
                                  </Tooltip>
                                  </div>
                                  </div>
                          </div>

                          <div class="flex flex-row items-center md:w-[11%] max-sm:flex-row w-full max-sm:justify-between">

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
props.updateTypeForLead(item.leadsId,typ)
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
props.updateTypeForLead(item.leadsId,typ)
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
props.updateTypeForLead(item.leadsId,typ)
}}
/>
</ButtonGroup>
</div>
</div>  
</div>
<div class="flex justify-between items-center w-wk "> 
                          <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                     <h4 class=" text-[0.82rem] text-cardBody font-poppins">  
                     {item.countryDialCode && item.phoneNumber ? (
`${item.countryDialCode} ${item.phoneNumber}`
) : (
"Not Available"
)} 
                    
                     </h4>
                 </div>
                 <div className=" flex font-medium flex-col justify-center md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                            <h4 class=" text-[0.82rem] text-cardBody font-poppins">
                            <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                            </h4>
                        </div>
               
                 </div>
                 <div class="flex justify-between items-center w-wk "> 
                 <div className=" flex font-medium flex-col justify-center  md:w-40 max-sm:flex-row w-full max-sm:justify-between ">
                     <h4 class=" text-[0.82rem] text-cardBody font-semibold  font-poppins">   
                     <Link to={`leads/${item.leadsId}`} title={item.companyName || "Not Available"}>
{item.companyName || "Not Available"}
</Link>

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
            <a href={`https://www.${item.url}`} target="_blank">
              <OpenInBrowserIcon
                className=" !text-base cursor-pointer text-green-800"
              />
            </a>
          </span>
        </Tooltip>
      ) : null}
                  </div>
                 
                          <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between ">
                              <h4 class=" text-[0.82rem] text-cardBody font-poppins">   
                              {item.sector}
                              </h4>
                          </div>
                          </div>
                          <div class="flex justify-between items-center w-wk "> 
                          <div className=" flex font-medium flex-col justify-center md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

                              <div class=" text-[0.82rem] text-cardBody font-poppins">
                              
                              <div>
                      {item.assignedTo === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                          <MultiAvatar
                            primaryTitle={item.assignedTo}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        )}
                        </>
              )}
                      </div>
       
                              </div>
                          </div>
                          <div className=" flex font-medium flex-col justify-center md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                 
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
                              <div class=" text-[0.75rem] text-cardBody font-poppins">

                              </div>
                              <div>
<Button type="primary"
onClick={()=>{props.reInstateJunkLeads(item.leadsId)}}
>
Resinstate
</Button>
</div>
                          </div>
                         
                          <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                          <div>
      <Tooltip title="Edit">
        <BorderColorIcon
        className="!text-base cursor-pointer text-[tomato]"
          onClick={() => {
            props.setEditLeads(item);
            handleUpdateLeadsModal(true);
            handleSetCurrentLeadsId(item);
              
          }}
        />
      </Tooltip>
  
      </div>
                  <div>
                  <StyledPopconfirm
      title="Do you want to delete?"
      onConfirm={() => deleteLeadsData(item.leadsId)}
    >
      <DeleteOutlined
        type="delete"
        className=" !text-base cursor-pointer text-[red]"
      />
    </StyledPopconfirm>
                  </div>
                  <div>
      

              </div>
              </div>
              <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[10%]">
                <div>
              <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
      <span
        style={{
          cursor: "pointer",
        }}
      >
      <LocationOnIcon    className="!text-base cursor-pointer text-[#960a0a]"/>
      </span>
    </Tooltip>
    </div>
    <div>
    <Tooltip title={item.email}>
        <MailOutlineIcon
          type="mail"
          className="!text-base cursor-pointer text-green-400"
          onClick={() => {
            handleSetCurrentLeadsId(item);
            props.handleLeadsEmailDrawerModal(true);
          }}
        />
      </Tooltip> </div>
     
                </div>  
                <div class="w-[2%]"></div> 
                </div>  
                </div>
                      </div>
                    )
                })}
                </InfiniteScroll>
      </div>
      <UpdateLeadsModal
        item={currentLeadsId}
        updateLeadsModal={updateLeadsModal}
        handleUpdateLeadsModal={handleUpdateLeadsModal}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      />
    </>
  );
}


  return (
    <>
  <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
 <div className=" flex  w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
 <div className=" md:w-[12.1rem]">Name</div>
        <div className=" md:w-[9.1rem]"></div>
        <div className=" md:w-[7.2rem] ">Phone #</div>
        <div className="md:w-[8.8rem]">Country</div>
        <div className="md:w-[10.5rem]">Company</div>
        <div className="md:w-[6.8rem]">Sector</div> 
        <div className="md:w-[8.2rem]">Assigned to</div>
        <div className="md:w-[5.5rem]">Owner</div>
        <div className="md:w-[7.3rem]">Reinstate</div>
        <div className="w-12">Action</div>

      </div>
      <InfiniteScroll
        dataLength={junkedLeadsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingJunkedLeads?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
      {junkedLeadsData.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
         const countryCode = item.address[0].country_alpha2_code
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
                      <div className="flex rounded-xl  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3">
                              <div class="flex"> 
                          <div className=" flex font-medium flex-col w-[13rem]   max-sm:w-full">
                          <div className="flex max-sm:w-full"> 
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
                                    <div class="max-sm:w-full justify-between flex md:flex-col">
                                     
                                      <div class="text-[0.82rem] text-cardBody font-semibold  font-poppins cursor-pointer">
                                      {item.name}
                                     &nbsp;&nbsp;
                                     {date === currentdate ? (
    <div class="text-xs text-[tomato] font-bold" 
      
    >
      New
    </div>
  ) : null}   

 
                                      </div>
                                      </div>
                                  </Tooltip>
                                  </div>
                                  </div>
                          </div>

                          <div class="flex flex-row items-center md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between">

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
props.updateTypeForLead(item.leadsId,typ)
}}
/>
</ButtonGroup>
</div>    


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
props.updateTypeForLead(item.leadsId,typ)
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
props.updateTypeForLead(item.leadsId,typ)
}}
/>
</ButtonGroup>
</div>
</div>  
</div>
<div class="flex"> 
                          <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                     <div class=" text-[0.82rem] text-cardBody font-poppins">  
                     {item.countryDialCode && item.phoneNumber ? (
`${item.countryDialCode} ${item.phoneNumber}`
) : (
"Not Available"
)} 
                    
                     </div>
                 </div>
                 <div className=" flex font-medium flex-col justify-center md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                            <div class=" text-[0.82rem] text-cardBody font-poppins">
                            <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                            </div>
                        </div>
               
                 </div>
                 <div class="flex"> 
                 <div className=" flex font-medium flex-col justify-center  md:w-40 max-sm:flex-row w-full max-sm:justify-between ">
                     <div class=" text-[0.82rem] text-cardBody font-semibold  font-poppins">   
                     <Link to={`leads/${item.leadsId}`} title={item.companyName || "Not Available"}>
{item.companyName || "Not Available"}
</Link>

                     </div>
                 </div>
                 <div class="rounded-full bg-white  h-5 cursor-pointer w-8">
              {item.url !== null ? (
        <Tooltip title={item.url}>
          <div
            //type="edit"
            class="cursor-pointer"
            onClick={() => {}}
          >
            {" "}
            <a href={`https://www.${item.url}`} target="_blank">
              <OpenInBrowserIcon
                className=" !text-base cursor-pointer text-green-800"
              />
            </a>
          </div>
        </Tooltip>
      ) : null}
                  </div>
                 
                          <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between ">
                              <div class=" text-[0.82rem] text-cardBody font-poppins">   
                              {item.sector}
                              </div>
                          </div>
                          </div>
                          <div class="flex mb-1"> 
                          <div className=" flex font-medium flex-col justify-center md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

                              <div class=" text-[0.82rem] text-cardBody font-poppins">
                              
                              <div>
        {item.assignedTo === null ? (
          "None"
        ) : (
          <MultiAvatar
            primaryTitle={item.assignedTo}
            imgWidth={"1.8em"}
            imgHeight={"1.8em"}
          />
        )}
      </div>
       
                              </div>
                          </div>
                          <div className=" flex font-medium flex-col justify-center md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                 
                 <div>
        <MultiAvatar
          primaryTitle={item.ownerName}
          imageId={item.ownerImageId}
          imageURL={item.imageURL}
          imgWidth={"1.8rem"}
          imgHeight={"1.8rem"}
        />
      </div>
             </div>
             <div className=" flex font-medium items-center  md:w-32 max-sm:flex-row w-full  ">
                              <div class=" text-[0.75rem] text-cardBody font-poppins">

                              </div>
                              <div>
<Button type="primary"
onClick={()=>{props.reInstateJunkLeads(item.leadsId)}}
>
Resinstate
</Button>
</div>
                          </div>
                         
                          <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                          <div>
      <Tooltip title="Edit">
        <BorderColorIcon
          className="!text-base cursor-pointer text-[tomato]"
          onClick={() => {
            props.setEditLeads(item);
            handleUpdateLeadsModal(true);
            handleSetCurrentLeadsId(item);
              
          }}
        />
      </Tooltip>
  
      </div>
                  <div>
                  <StyledPopconfirm
      title="Do you want to delete?"
      onConfirm={() => deleteLeadsData(item.leadsId)}
    >
         <Tooltip title="Delete">
      <DeleteOutlined
        type="delete"
        className=" !text-base cursor-pointer text-[red]"
      />
      </Tooltip>
    </StyledPopconfirm>
                  </div>
                  <div>
      

              </div>
              </div>
              <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[10%]">
                <div>
              <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
      <div className=""
       
      >
      <LocationOnIcon  className="!text-base cursor-pointer text-[#960a0a]"/>
      </div>
    </Tooltip>
    </div>
    <div>
    <Tooltip title={item.email}>
        <MailOutlineIcon
          type="mail"
          className="!text-base cursor-pointer text-green-400"
          onClick={() => {
            handleSetCurrentLeadsId(item);
            props.handleLeadsEmailDrawerModal(true);
          }}
        />
      </Tooltip> </div>
     
                </div>  
                <div class="w-[2%]"></div> 
                </div>  
                </div>
                      </div>
                    )
                })}
                </InfiniteScroll>
      </div>
      <UpdateLeadsModal
        item={currentLeadsId}
        updateLeadsModal={updateLeadsModal}
        handleUpdateLeadsModal={handleUpdateLeadsModal}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      />
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  junkedLeadsData: leads.junkedLeadsData,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingJunkedLeads:leads.fetchingJunkedLeads
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJunkedLeads,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      // getCountries,
      updateTypeForLead,
      reInstateJunkLeads
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsJunkList);
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
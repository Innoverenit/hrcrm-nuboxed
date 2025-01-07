
import React, {  useState, lazy, useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Tooltip, Select } from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Link } from 'react-router-dom';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import EmptyPage from "../../../Main/EmptyPage";




const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function ReportsConvertedListOrg(props) {


  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
      '271', // 0
  '110', // 1name
  '378', // 2  Work
  '278', // 3 Sector
  '279', // 4Source
  '279', // 5source
  '1109', // 6  Country
  '213', // 7Quotation
  '328', // 8 Pipeline
   '76', // 9Assigned
  '77', // 10  Owner
  '248', // 11 Customer
  '100', //12  New
  '73', //13 Contact
  '99',//Opportunity 14
  '393',//Pulse 15
  '316',//notes16
  '170',//17 edit

 
   
  
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



console.log(page)
if(props.gettingReportConvertOrg){
    return <BundleLoader/>
}
const {user}=props
  return (
    <>
       <div className=' flex  sticky  z-auto h-[89vh]'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden  w-[98%] justify-between p-1 bg-transparent font-bold sticky font-poppins text-xs  z-10">
            <div className=" w-[18.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.7rem] max-lg:w-[9.31rem]">
            {/* Name */}{translatedMenuItems[1]}
            </div>
            <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.5rem] max-lg:w-[3.32rem] ">
           {/* Work */}{translatedMenuItems[2]}
            </div>
            <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem] max-lg:w-[3.33rem]">
           {/* Sector */}{translatedMenuItems[3]}
            </div>
            <div className=" w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
             {/* Source */}{translatedMenuItems[4]}
            </div>
            <div className=" w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] max-lg:w-[3.35rem] ">
             {/* Country */}{translatedMenuItems[6]}
            </div>
            <div className="w-[6.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem] max-lg:w-[3.36rem]">
             {/* Quotation */}{translatedMenuItems[7]}
            </div>
            <div className="w-[3.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[1.8rem]">
          {/* Pipeline */}{translatedMenuItems[8]}
            </div>
            <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[4.2rem]">
             {/* Assigned */}{translatedMenuItems[9]}
            </div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {/* Owner */}{translatedMenuItems[10]}
            </div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Customer */}{translatedMenuItems[11]}
           
            </div>
            {/* <div className="w-[3.8rem]"></div> */}

          </div>
       

            {!props.gettingReportConvertOrg && props.reportConvertedOrg.length === 0 ? <EmptyPage/> : props.reportConvertedOrg.map((item, index) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
              const diff = Math.abs(
                dayjs().diff(dayjs(item.lastRequirementOn), "days")
              );
             
              return (
                <div>
                  <div className="flex rounded justify-between max-sm:  bg-white mt-[0.5rem] h-8 max-sm:h-[9rem] items-center p-1 "

                  >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex font-medium  w-[17rem] max-xl:w-[7rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                          <div>
                            {/* <Tooltip title={item.name}> */}
                            <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                            {/* </Tooltip> */}
                          </div>
                          <div class="w-[4%]"></div>

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:">
                                <div class="flex text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
                                    >
                                     {translatedMenuItems[12]} {/* New */}
                                    </div>
                                  ) : null}
                               
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex font-medium  items-center max-sm:w-auto  w-[7.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {`${item.countryDialCode} ${item.phoneNumber}`}
                        </div>

                      </div>
                      <div className=" flex font-medium  items-center max-sm:w-auto  w-[6.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                        {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.sector}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex font-medium max-sm:w-auto  items-center  w-[7.215rem] max-xl:w-[4rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.source}
                        </div>

                      </div>
                      <div className=" flex font-medium max-sm:w-auto  justify-center w-[5.1rem] max-xl:w-[3.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">


                        {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                        <div class=" text-sm  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        
                        </div>
                      </div>


                      <div className=" flex font-medium  max-sm:w-auto w-[4.1rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                        <div class=" text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.oppNo}

                        </div>
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  max-sm:w-auto w-[5.82rem] max-sm:flex-row  max-sm:justify-between ">
                       
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${item.totalProposalValue/1000}K`}
      </div>
    )}
                      </div>
                      {/* <div className=" flex font-medium  md:w-96 max-sm:flex-row w-full max-sm:justify-between ">
                                

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.weight}

                                    </div>
                                </div> */}
                      <div className=" flex font-medium items-center max-sm:w-auto   w-[3rem] max-xl:w-[8rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Assigned</div> */}

                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">None</div>
                            ) : (
                              <>
                                {item.assignedTo === item.ownerName ? (

                                  null
                                ) : (
                                  <MultiAvatar2
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
                      <div className=" flex font-medium items-center max-sm:w-auto  w-24 max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
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
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                  

                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] ml-1 max-sm:flex-row max-sm:w-[10%]">
                        <div>
                          <Tooltip title={item.url}>
                            {item.url !== "" ? (
                              <div
                                //type="edit"
                                style={{ cursor: "pointer" }}
                                onClick={() => { }}
                              >
                                {" "}
                                <a href={`https://${item.url}`} target="_blank">
                                  <ExploreIcon
                                    className=" !text-icon cursor-pointer text-[green]"

                                  />
                                </a>
                              </div>
                            )
                              : <div class=" w-3">

                              </div>
                            }
                          </Tooltip>

                        </div>
                        <div>
                          <div  >
                            {" "}
                            {user.pulseAccessInd === true && <MonitorHeartIcon
                              className=" !text-icon cursor-pointer text-[#df9697]"
                            />}
                          </div>
                        </div>
                        <div>


                        </div>
                      </div>

                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                        <div>
                          <Tooltip title={translatedMenuItems[13]}>
                            <ContactsIcon
                              className=" !text-icon cursor-pointer text-[#709ab3]"
                           
                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title={translatedMenuItems[14]}>
                            <LightbulbIcon
                              className=" !text-icon cursor-pointer text-[#AF5910]"
                           
                            />
                          </Tooltip>

                        </div>
                      </div>
                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                        <div>
                          <Tooltip title= {translatedMenuItems[15]}>
                            <MonitorHeartIcon
                              className=" !text-icon cursor-pointer text-[#df9697]"
                            

                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title= {translatedMenuItems[16]}>
                            <NoteAltIcon
                              className=" !text-icon cursor-pointer text-[#28a355]"
                           

                            />
                          </Tooltip>

                        </div>
                      </div>

                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                        <div >
                          <Tooltip overlayStyle={{ maxWidth: "300px" }} >

                            <LocationOnIcon
                              className=" !text-icon cursor-pointer text-[#960A0A]"

                            />

                          </Tooltip>
                        </div>
                        <div>
                          {props.user.customerUpdateInd === true && user.crmInd === true && (
                            <Tooltip title={translatedMenuItems[17]}>
                              <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]"

                              
                              />
                            </Tooltip>
                          )}
                      

                        </div>
                      </div>

                    </div>
                  </div>
                </div>


              )
            })}
        
        </div>
      </div>


     

    
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
}) => ({
    user: auth.userDetails,

});
const mapDispatchToProps = (dispatch,) =>
  bindActionCreators(
     {

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ReportsConvertedListOrg);


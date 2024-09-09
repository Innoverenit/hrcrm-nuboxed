import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactsIcon from '@mui/icons-material/Contacts';
import {getProspectTableData} from "../../../Dashboard/DashboardAction";
import { Tooltip ,Popconfirm,Button} from "antd";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

function InvestorDealJumpstartDrawerCard (props) {

    return (
      <>
       <div className=' flex justify-end sticky z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[92.5%] justify-between p bg-transparent font-bold sticky  z-10">
            <div className=" w-[18.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
              <FormattedMessage
                id="app.name"
                defaultMessage="Name"
              />
            </div>
            
            <div className=" w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">
              <FormattedMessage
                id="app.country"
                defaultMessage="Country"
              />

            </div>
            <div className="w-[3.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
              <FormattedMessage
                id="app.pipeline"
                defaultMessage="Pipeline"
              />

            </div>
            {/* <div className="md:w-[3.9rem]">
        <FormattedMessage
                        id="app.weighted"
                        defaultMessage="Weighted"
                      />
          
          </div> */}
            <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
              <FormattedMessage
                id="app.assigned"
                defaultMessage="Assigned"
              />

            </div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] ">
              <FormattedMessage
                id="app.owner"
                defaultMessage="Owner"
              />
            </div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
              <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              />
            </div>
            <div className="w-[3.8rem]"></div>

          </div>
          {/* <InfiniteScroll
            dataLength={customerByUserId.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingCustomers || fetchingCustomerPagination ? <div class="flex justify-center">Loading...</div> : null}
            height={"75vh"}
          > */}

            {props.modalData.map((item, index) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
              const countryCode = item.address[0].countryAlpha2Code
              const diff = Math.abs(
                dayjs().diff(dayjs(item.lastRequirementOn), "days")
              );
              const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
                } 
           Street : ${item.address && item.address.length && item.address[0].street
                }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${(item.address && item.address.length && item.address[0].country) || ""
                } 
           PostalCode : ${item.address && item.address.length && item.address[0].postalCode
                } `;
              return (
                <div>
                  <div className="flex rounded-xl justify-between max-sm:flex-col  bg-white mt-[0.5rem] h-8 max-sm:h-[9rem] items-center p-1 "

                  >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex font-medium flex-col w-[17rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
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
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
                                    >
                                      New
                                    </div>
                                  ) : null}
                                  {/* <a class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[blue] cursor-pointer" 
                            href={`customer/${item.customerId}`}>{item.name} </a>
                              &nbsp;&nbsp;
        {date === currentdate ? (
          <div class="text-xs"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </div>
        ) : null}
        */}
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
                      <div className=" flex font-medium max-sm:w-auto  items-center  w-[7.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.source}
                        </div>

                      </div>
                      <div className=" flex font-medium max-sm:w-auto flex-col justify-center w-[5.1rem] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">


                        {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                        <div class=" text-sm  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <CountryFlag1 countryCode={countryCode} />
                          {/* &nbsp;
                          {countryCode} */}
                        </div>
                      </div>


                      <div className=" flex font-medium flex-col max-sm:w-auto w-[4.1rem] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                        <div class=" text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.oppNo}

                        </div>
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium flex-col max-sm:w-auto w-[5.82rem] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                        {/* {item.totalProposalValue > 0 && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${item.totalProposalValue}`}
      </div>
    )} */}
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${item.totalProposalValue/1000}K`}
      </div>
    )}
                      </div>
                      {/* <div className=" flex font-medium flex-col md:w-96 max-sm:flex-row w-full max-sm:justify-between ">
                                

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.weight}

                                    </div>
                                </div> */}
                      <div className=" flex font-medium items-center max-sm:w-auto  flex-col w-[3rem] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
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
                      <div className=" flex font-medium items-center max-sm:w-auto flex-col w-24 max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
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

                      <div className=" flex font-medium justify-center flex-col w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

                        <div class=" text-sm  font-poppins"></div>
                        <Popconfirm
                          title="Change status to Account?"
                          //onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {props.user.erpInd === true && (
                            <Button type="primary"
                              style={{ width: "8rem" }}>
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] " >
                                {item.convertInd === 0 && "Convert"}
                                {item.convertInd === 1 && "In progress"}
                                {item.convertInd === 2 && "Converted"}
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>

                      <div class="flex flex-col w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] ml-1 max-sm:flex-row max-sm:w-[10%]">
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
                                    className=" !text-xl cursor-pointer text-[green]"

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
                          <div
                            style={{ fontSize: "0.8rem" }}
                            // onClick={() => {
                            //   props.getCustomerDetailsById(item.customerId);
                            //   props.getCustomerKeySkill(item.customerId);
                            //   //   this.props.getCustomerDocument(item.customerId );

                            //   props.handleCustomerDrawerModal(item, true);
                            // }}
                          >
                            {" "}
                            {props.user.pulseAccessInd === true && <MonitorHeartIcon
                              className=" !text-xl cursor-pointer text-[#df9697]"
                            />}
                          </div>
                        </div>
                        <div>


                        </div>
                      </div>

                      <div class="flex flex-col w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                        <div>
                          <Tooltip title="Contact">
                            <ContactsIcon
                              className=" !text-xl cursor-pointer text-[#709ab3]"
                              // onClick={() => {
                              //   handleCustomerContactDrawerModal(true);
                              //   handleSetCurrentCustomer(item);
                              // }}

                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title="Opportunity">
                            <LightbulbIcon
                              className=" !text-xl cursor-pointer text-[#AF5910]"
                              // onClick={() => {
                              //   handleCustomerOpportunityDrawerModal(true);
                              //   handleSetCurrentCustomer(item);
                              //   handleRowData(item);
                              // }}

                            />
                          </Tooltip>

                        </div>
                      </div>
                      <div class="flex flex-col w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                        <div>
                          <Tooltip title="Pulse">
                            <MonitorHeartIcon
                              className=" !text-xl cursor-pointer text-[#df9697]"
                              // onClick={() => {
                              //   handleCustomerPulseDrawerModal(true);
                              //   handleSetCurrentCustomer(item);
                              // }}

                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title="Notes">
                            <NoteAltIcon
                              className=" !text-xl cursor-pointer text-[#4bc076]"
                              // onClick={() => {
                              //   handleCustomerNotesDrawerModal(true);
                              //   handleSetCurrentCustomer(item);
                              //   handleRowData(item);
                              // }}

                            />
                          </Tooltip>

                        </div>
                      </div>

                      <div class="flex flex-col w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                        <div >
                          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>

                            <LocationOnIcon
                              className=" !text-xl cursor-pointer text-[#960A0A]"

                            />

                          </Tooltip>
                        </div>
                        <div>
                       
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                className=" !text-xl cursor-pointer text-[tomato]"

                  
                              />
                            </Tooltip>
                        

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
  const mapStateToProps = ({dashboard,auth }) => ({
    fetchingProspectTableData:dashboard.fetchingProspectTableData,
    user: auth.userDetails,
    prospectTableData: dashboard.prospectTableData,
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getProspectTableData,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDealJumpstartDrawerCard);
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import CategoryIcon from "@mui/icons-material/Category";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ExploreIcon from "@mui/icons-material/Explore";
import {
  getDeletedDistributors,
  handleDistributorActivityTableModal,
} from "./AccountAction";
import dayjs from "dayjs";

function AccountDeleteTable(props) {
  useEffect(() => {
    props.getDeletedDistributors();
  }, []);

  const {
    handleUpdateDistributorModal,
    updateDistributorModal,
    deletedDistributors,
  } = props;
  const [currentDistributorId, setCurrentDistributorId] = useState("");
  function handleSetCurrentDistributorId(distributorId) {
    setCurrentDistributorId(distributorId);
  }
  return (
    <>
      <div className=" flex  sticky  z-auto">
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent  sticky items-end z-10">
            <div class=" flex justify-between text-xs font-poppins  font-bold  w-[100%]  ">
              <div className="text-[#00A2E8] text-base w-[10%] ml-2 md:w-[23%]">
                {" "}
                <CategoryIcon className="!text-base  text-[#e4eb2f]" />{" "}
                {props.translatedMenuItems[0]}
                {/* Name */}
              </div>
              <div className="w-[13.1rem] md:w-[13.1rem]">
                {" "}
                <MobileFriendlyIcon className="!text-icon text-[#41ead4] " />{" "}
                {props.translatedMenuItems[1]}
                {/* Mobile */}
              </div>
              <div className=" md:w-[15.2rem] w-[15.2rem]">
                {" "}
                <ExploreIcon className=" !text-icon cursor-pointer text-[green]" />
                {props.translatedMenuItems[28]}
                {/* Website */}
              </div>
              <div className="md:w-[13.8rem] w-[13.8rem]">
                {" "}
                <AddLocationAltIcon className=" !text-icon cursor-pointer text-[#8e4bc0]" />
                {props.translatedMenuItems[18]}
                {/* Address */}
              </div>
              <div className="md:w-[13.5rem] w-[13.5rem]">
                {" "}
                {props.translatedMenuItems[29]}
                {/* City */}
              </div>
              <div className="md:w-[5.2rem] w-[5.2rem]">
                {" "}
                {props.translatedMenuItems[30]}
                {/* Pin Code */}
              </div>
              <div className="md:w-[2.2rem]"></div>
              <div className="md:w-[2.2rem]"></div>
              <div className="w-12"></div>
            </div>
          </div>
          {deletedDistributors.map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex">
                    <div className=" flex  md:w-[15.1rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                      <div class="text-xs flex ml-gap items-center  font-semibold  font-poppins cursor-pointer">
                        {item.name}
                      </div>
                    </div>

                    <div className=" flex   md:w-[12.1rem]  justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">
                      <div class="flex ml-gap items-center text-xs  font-poppins">
                        {item.dialCode} {item.phoneNo}
                      </div>
                    </div>
                  </div>

                  <div className=" flex  md:w-[14.5rem]  justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class="flex ml-gap items-center text-xs  font-poppins">
                      {item.url}
                    </div>
                  </div>
                  <div className=" flex  md:w-[14.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-semibold  font-poppins">
                     
                    </div>
                  </div>

                  <div className=" flex  md:w-[13.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs flex ml-gap items-center font-semibold  font-poppins">
                     
                    </div>
                  </div>
                  <div className=" flex  md:w-[13.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs flex ml-gap items-center  font-semibold  font-poppins">
                     
                    </div>
                  </div>

                  <div class="flex md:items-center"></div>
                  <div class="flex  w-[2%] items-center justify-center h-8 bg-[#eef2f9] ml-gap max-sm:flex-row max-sm:w-[6%]">
                    <div>
                      <Tooltip title="Activity">
                        <span>
                          <HourglassFullIcon
                            className="text-blue-600 !text-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              props.handleDistributorActivityTableModal(true);
                              handleSetCurrentDistributorId(item.distributorId);
                            }}
                          />
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class=" mt-3" />
    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  fetchingDeletedDistributors: distributor.fetchingDistributors,
  fetchingDeletedDistributorsError: distributor.fetchingDistributorsError,
  deletedDistributors: distributor.deletedDistributors,
  userId: auth.userDetails.userId,
  addDistributorActivityTableModal:distributor.addDistributorActivityTableModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedDistributors,
      handleDistributorActivityTableModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDeleteTable);

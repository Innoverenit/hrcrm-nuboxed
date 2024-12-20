import dayjs from "dayjs"; 
import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { getMileageByUserId, deleteMileageVoucher, handleMileageVoucherIdDrwer } from "../MileageAction";
import { base_url } from "../../../Config/Auth";
import axios from "axios";
const MileageVoucherIdDrawer = lazy(() => import("./MileageVoucherIdDrawer"));

const MileageApprovedStatusCard = ({ userId,statusType, handleMileageVoucherIdDrwer, mileageVoucherIdDrawer, }) => {
    const [approvedMileages, setApprovedMileages] = useState([]);
  const [expand, setExpand] = useState(false);
  const [voucherId, setVoucherId] = useState("");
  const [pageNo, setPageNo] = useState(0);

  const handleExpand = (vid) => {
    setExpand(!expand);
    setVoucherId(vid);
  };

  const getApprovedMileage = async (userId,statusType, pageNo) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Authorization token is missing.");
      return; 
    }

    try {
        const response = await axios.get(
          `${base_url}/api/v1/mileage/status/${userId}/${statusType}/${pageNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      setApprovedMileages(response.data); 
    } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response);
        } else {
          console.error("Error fetching mileage data:", error);
        }
    }
  };

  useEffect(() => {
    if (statusType) {
      getApprovedMileage(userId,statusType, pageNo);
    }
  }, [userId,statusType, pageNo]);

  const loadMore = () => {
    setPageNo(prevPage => prevPage + 1);
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green'; 
      case 'Pending':
        return '#e1d16c';
      case 'Rejected':
        return 'red'; 
      default:
        return 'gray';
    }
  };
  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600'; 
      case 'Pending':
        return 'text-[#e1d16c]';
      case 'Rejected':
        return 'text-red-600'; 
      default:
        return 'text-gray-600'; 
    }
  };

  return (
    <>
      <div className="rounded m-1 p-1 w-[100%] overflow-scroll h-[29rem] shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
          <span className="pl-2 pr-4 relative">
            <span className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "></span>
            <span className="font-semibold text-xs -heading font-poppins"> {statusType} </span>
          </span>
        </div>
        {approvedMileages.map((item) => {
          return (
            <div key={item.voucherId}>
              <div className="flex justify-between mt-4" style={{ borderBottom: "3px dotted #515050" }}>
                <div className="flex font-medium flex-col w-72 mb-1 ">
                  <Tooltip>
                    <div className="text-sm font-poppins">Voucher ID</div>
                    <div className="text-xs text-blue-500 font-poppins cursor-pointer">
                      <div onClick={() => { handleExpand(item.voucherId); handleMileageVoucherIdDrwer(true); }}>
                        {item.voucherId}
                      </div>
                    </div>
                  </Tooltip>
                  <div className="flex font-medium flex-col w-max">
                    <div className="text-xs font-poppins"></div>
                    <div className="text-xs font-poppins">
                      <div
                        style={{
                          border: `2px solid ${getStatusBorderColor(item.status)}`,
                          padding: "0px 0.62em",
                          textAlign: "center",
                          margin: "2px",
                          borderRadius: "0.62em",
                        }}
                      >
                        <div className={getStatusTextColor(item.status)}>{item.status}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex font-medium flex-col w-52 ml-1 ">
                  <div className="text-sm font-poppins">Voucher Date</div>
                  <div className="text-xs font-poppins">{dayjs(item.voucherDate).format("MMM Do YY")}</div>
                </div>

                <div className="flex font-medium flex-col w-36 ">
                  <div className="text-sm font-poppins">Amount</div>
                  <div className="text-xs font-poppins">€ {item.amount}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MileageVoucherIdDrawer
        voucherId={voucherId}
        mileageVoucherIdDrawer={mileageVoucherIdDrawer}
        handleMileageVoucherIdDrwer={handleMileageVoucherIdDrwer}
      />
    </>
  );
};

const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,
  mileageVoucherIdDrawer: mileage.mileageVoucherIdDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MileageApprovedStatusCard);

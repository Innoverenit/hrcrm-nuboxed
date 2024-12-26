import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInvoiveL } from "../AccountAction";
import { Select, Input, Button } from "antd";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import { BundleLoader } from "../../../../Components/Placeholder";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import CategoryIcon from "@mui/icons-material/Category";
import ApartmentIcon from "@mui/icons-material/Apartment";
const { Option } = Select;
function InvouiceSTable(props) {
  const [pageNo, setPageNo] = useState(0);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [trackId, settrackId] = useState("");
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getInvoiveL(props.particularRowData.procureOrderInvoiceId);
  }, []);
  const [particularRowData, setParticularRowData] = useState({});
  const [currency, setCurrency] = useState("");
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setData(props.invoiceL);
  }, [props.invoiceL]);

  return (
    <>
      <div className=" flex sticky  z-auto">
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold !text-lm font-poppins sticky z-10">
            <div class="w-[8.5rem] text-[#00A2E8]">
              <CategoryIcon className="!text-icon text-[#00A2E8]  text-sm" />
              {props.translatedMenuItems[129]}
            </div>
            <div class="w-[8.5rem]">
              <ApartmentIcon className="!text-icon text-[#1e7a54]   " />
              {props.translatedMenuItems[122]}
            </div>
            <div class="w-[8.5rem]">{props.translatedMenuItems[19]}</div>
            <div className=" md:w-[5.1rem]">
              {props.translatedMenuItems[125]}
            </div>
            <div className=" md:w-[5.1rem]">
              {props.translatedMenuItems[22]}
            </div>
            <div className=" md:w-[5.01rem] ">Additional</div>
            <div className="md:w-[13rem]">{props.translatedMenuItems[147]}</div>
          </div>
          <div class="">
            {props.invoiceL.length ? (
              <>
                {props.invoiceL.length === 0
                  ? "No data available"
                  : props.invoiceL.map((item) => {
                      const currentdate = dayjs().format("DD/MM/YYYY");
                      const date = dayjs(item.creationDate).format(
                        "DD/MM/YYYY"
                      );
                      return (
                        <>
                          <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                            <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                              <div className=" flex items-center font-medium justify-between  ml-gap h-8  flex-row w-[6.2rem] border-l-2 border-green-500 bg-[#eef2f9] mt-1 ">
                                <div class=" font-normal max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                  {item.newProductId}
                                </div>
                              </div>
                              <div className="flex items-center ml-gap mt-1 bg-[#eef2f9] h-8 w-[5.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                <div class="  max-xl:text-[0.65rem] text-xs font-poppins truncate">
                                  {item.productFullName}
                                </div>
                              </div>
                              <div className="flex items-center ml-gap mt-1 bg-[#eef2f9] h-8 w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                  {item.newOrderNo}
                                </div>
                              </div>
                              <div className="flex items-center ml-gap mt-1 bg-[#eef2f9] h-8  w-[7.21rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                {item.unit}
                              </div>
                              <div className="flex items-center ml-gap mt-1 bg-[#eef2f9] h-8 w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                  {item.price}
                                </div>
                              </div>
                              <div className="flex items-center ml-gap mt-1 bg-[#eef2f9] h-8  w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                  {item.additional}
                                </div>
                              </div>
                              <div className="flex items-center ml-gap mt-1 bg-[#eef2f9] h-8  w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                  {item.totalPrice}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
              </>
            ) : !props.invoiceL.length && !props.fetchingInvoiceL ? (
              <NodataFoundPage />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  currencies: auth.currencies,
  fetchingInvoiceL: distributor.fetchingInvoiceL,
  invoiceL: distributor.invoiceL,
  invoiceO: distributor.invoiceO,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvoiveL,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvouiceSTable);

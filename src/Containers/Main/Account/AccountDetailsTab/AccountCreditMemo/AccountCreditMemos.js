
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../Components/Placeholder";
import axios from 'axios';
import {base_url2} from "../../../../../Config/Auth";

function AccountCreditMemos(props) {

   
    const [data1, setData1] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [error, setError] = useState(null);

      const fetchData1 = async () => {
        try {
          const response = await axios.get(`${base_url2}/creditmemo/creditMemoList/${props.distributorId}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData1(response.data);
          setLoading1(false);
        } catch (error) {
          setError(error);
          setLoading1(false);
        }
      };
  useEffect(() => {
  fetchData1();
  }, []);


  return (
    <>
      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-y-auto  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[9.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Customer</div>
            <div className=" w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Order #</div>
            <div className=" w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Invoice</div>
            <div className=" w-[7.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Transaction ID</div>
            <div className="w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Type</div>
            <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Date</div>
            <div className="w-[7.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Amount</div>
            <div className="w-[7.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">"Mode</div>
            <div className="w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Received </div>
            <div className="w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Owner</div>
          </div>
          <div className=" overflow-scroll h-[67vh]">
            {data1.map((item) => {
              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium   w-[12.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderSourceName}
                      </div>

                    </div>

                    <div className=" flex font-medium   w-[10.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderId}
                      </div>

                    </div>

                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium  w-[10.11rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.transactionNumber}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[9.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.paymentType}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[8.01rem]  max-xl:w-[6.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      {` ${dayjs(item.date).format("DD-MM-YY")}`}

                    </div>
                  </div>
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                      <div className=" flex font-medium   w-[10.03rem] max-xl:w-[4.03rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentAmount} &nbsp; {item.orderCurrencyName}
                        </div>

                      </div>
                      <div className=" flex font-medium   w-[11.04rem] max-xl:w-[8.54rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentModeName}
                        </div>

                      </div>
                   

                    
                      <div className=" flex font-medium   w-[7.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins">
                          <span>
                            <MultiAvatar
                              primaryTitle={item.salesExecutive}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </span>
                        </div>

                      </div>

                   

                  </div>
                </div>
                </div>


              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ distributor, leads, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
//   distributor
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreditMemos);

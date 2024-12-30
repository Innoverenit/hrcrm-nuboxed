import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { Select,} from "antd";
import { Link } from "react-router-dom";
import {
  getOpportunityCUser,
} from "./AccountAction";
import dayjs from "dayjs";



const { Option } = Select;

function OpportunityCTable(props) {



  useEffect(() => {
   
    props.getOpportunityCUser();
  }, []);
 
 


  const {
    handleUpdateAccountModal,
    handleAccountModal,
    handleCustomerOpportunityDrawerModal,
  } = props;

  
  return (
    <>

        <div className=" flex  sticky  z-auto">
          <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-white">
            <div className=" flex max-sm:hidden   w-[94%]  justify-between p-1 bg-transparent sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
              <div class=" flex justify-between items-end !text-lm font-poppins  font-bold  w-[100%]  ">
              <div className="w-[10.2rem] max-md:w-[9.2rem]">Order No</div>
              </div>
            </div>
    
                <>
                  {props.coOppoListByUser.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                   
                    return (
                      <div>
                        <div className="flex  justify-between  bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                           </div>
                        </div>
                      </div>
                    );
                  })}
              
            </>
          </div>
        </div>
    
      <Suspense fallback={<BundleLoader />}>

      </Suspense>
    </>
  );
}
const mapStateToProps = ({ distributor, auth, catgCustomer, customer }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  coOppoListByUser:distributor.coOppoListByUser
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getOpportunityCUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityCTable);

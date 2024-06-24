import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getDeletedDistributors,
    handleDistributorActivityTableModal,
} from "./AccountAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";

function AccountDeleteTable(props) {
    useEffect(() => {
        props.getDeletedDistributors();
    }, []);

    const [currentDistributorId, setCurrentDistributorId] = useState("");

    function handleSetCurrentDistributorId(distributorId) {
        setCurrentDistributorId(distributorId);
    }
    return(
        <>
        <OnlyWrapCard style={{height:"80vh"}}>
        {props.deletedDistributors.map((item) => {
          return (
            <>
             <div className="flex justify-between mt-2 "
                          // style={hrStyle}
                          style={{
                            borderBottom: "3px dotted #515050"
                          }}
                        >
         <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
         <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm  font-medium font-poppins">
        
        Name
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem]  font-poppins">
       {item.descend}
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm  font-medium font-poppins">
        
        Mobile
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem]  font-poppins">
        {item.dialCode} {item.phoneNo}
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm  font-medium font-poppins">
        
        Website
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem]  font-poppins">
        {item.url} 
        </div>
        
        </div>
        
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm  font-medium font-poppins">
        
        Address
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem]  font-poppins">
        {item.addresses[0].address1 || ""} ${item.addresses[0]
              .address2 || ""} ${item.addresses[0].street || ""} ${item.addresses[0].city || ""}`;
          
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm  font-medium font-poppins">
        
        City
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem]  font-poppins">
        <span>
                  {item.addresses[0].city || ""}
                </span>
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm  font-medium font-poppins">
        
        Pin Code
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem]  font-poppins">
        {item.addresses[0].pinCode || ""}
        </div>
        
        </div>
       
         </div>
        
        
        
        
                        </div>
            </>
          )
        })}
        
          </OnlyWrapCard>
         
        </>
        )
      }
      const mapStateToProps = ({ distributor, auth }) => ({
        fetchingDeletedDistributors: distributor.fetchingDistributors,
        fetchingDeletedDistributorsError: distributor.fetchingDistributorsError,
        deletedDistributors: distributor.deletedDistributors,
        userId: auth.userDetails.userId,
        addDistributorActivityTableModal: distributor.addDistributorActivityTableModal
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
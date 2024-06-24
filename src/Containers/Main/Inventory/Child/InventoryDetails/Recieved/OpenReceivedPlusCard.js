import React, { useEffect } from 'react'
import { getPhoneDetails } from "../../../../Refurbish/RefurbishAction";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const OpenReceivedPlusCard = (props) => {

    useEffect(() => {
        props.getPhoneDetails(props.item.phoneId);
    }, []);

    return (
        <>
        <div className="flex rounded-xl  mt-4 bg-pink-200 h-8 items-center p-1 " >
                <div class="flex">
                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                          {props.phoneDetails.receiveCompany}
                        
                        </div>

                        <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            {props.phoneDetails.receiveModel}
                   
                          </div>

                        </div>
                        <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-sm  font-poppins">

                            {props.phoneDetails.receiveIMEI}
                       
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[4.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">

                          {props.phoneDetails.receiveOS}
                      
                        </div>
                      </div>

                      <div className=" flex font-medium  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          {props.phoneDetails.receiveGB}
                     
                        </div>
                      </div>
                      <div className=" flex font-medium  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          {props.phoneDetails.receiveColor}
                    
                        </div>
                      </div>
                      <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          {props.phoneDetails.receiveCondition}
                    
                        </div>
                      </div>
                      </div>
                      </div>
                     
                   
        </>
    );
}
const mapStateToProps = ({ refurbish, auth }) => ({
    phoneDetails: refurbish.phoneDetails
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneDetails
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OpenReceivedPlusCard);


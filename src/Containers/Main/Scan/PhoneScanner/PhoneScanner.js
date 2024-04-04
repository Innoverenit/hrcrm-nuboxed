import React, { useEffect } from 'react'
import { getPhoneDetails } from "../../../../Containers/Main/Refurbish/RefurbishAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SpareTaskTab from './SpareTaskTab';

const PhoneScanner = (props) => {

    useEffect(() => {
        props.getPhoneDetails(props.match.params.phoneId)
    }, [])

    console.log(props.phoneDetails)
    return (
        <>
            <div class=" bg-white overflow-y-auto max-sm:h-[68vh]">
                <div className=' mt-2 ml-3 max-sm:flex flex md:flex-col max-sm:justify-between'>
                    <div class="">
                    <div class=" flex mt-1">
                        <span className=' font-bold'>OEM :</span> {props.phoneDetails.company}
                    </div>
                    <div class=" flex mt-1">
                        <span className=' font-bold'>Model :</span> {props.phoneDetails.model}
                    </div>
                    <div class=" flex mt-1">
                        <span className=' font-bold'>IMEI :</span> {props.phoneDetails.imei}
                    </div>
                    <div class=" flex mt-1">
                        <span className=' font-bold'>OS :</span> {props.phoneDetails.os}
                    </div>
                    </div>
                    <div class="">
                    <div class=" flex mt-1">
                        <span className=' font-bold'>GB :</span> {props.phoneDetails.gb}
                    </div>
                    <div class=" flex mt-1">
                        <span className=' font-bold'>Color :</span> {props.phoneDetails.color}
                    </div>
                    <div class=" flex mt-1">
                        <span className=' font-bold'>Condition :</span> {props.phoneDetails.condition}
                    </div>
                    <div class=" flex mt-1">
                        <span className=' font-bold'>Issue :</span> {props.phoneDetails.issue}
                    </div>
                    </div>
                </div>
                <div class=" ml-3">
                    <SpareTaskTab phoneDetails={props.phoneDetails} phoneId={props.match.params.phoneId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PhoneScanner);


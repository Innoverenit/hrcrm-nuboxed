import React, { useEffect } from 'react'
import { getPhoneDetails } from "../RefurbishAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const PhoneDetailsByPhoneId = (props) => {

    useEffect(() => {
        props.getPhoneDetails(props.phoneId)
    }, [])

    console.log(props.phoneDetails)
    return (
        <>
            <div>OEM :{props.phoneDetails.company}</div>
            <div>Model :{props.phoneDetails.model}</div>
            <div>IMEI :{props.phoneDetails.imei}</div>
            <div>OS :{props.phoneDetails.os}</div>
            <div>GB :{props.phoneDetails.gb}</div>
            <div>Color :{props.phoneDetails.color}</div>
            <div>Condition :{props.phoneDetails.condition}</div>
            <div>Issue :{props.phoneDetails.issue}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetailsByPhoneId);


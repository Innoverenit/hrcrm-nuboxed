import React, { useEffect } from 'react'
import { getPhoneDetails } from "../RefurbishAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const PhoneDetailsByPhoneId = (props) => {

    useEffect(() => {
        props.getPhoneDetails(props.RowData.phoneId)
    }, [])


    return (
        <>
            phone detaisl
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


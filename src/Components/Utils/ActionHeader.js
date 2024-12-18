import React from 'react';
import PropTypes from 'prop-types';


const ActionHeader = (props) => {
    return (
        <div class="h-10  pt-1 flex justify-between items-center content-center  shadow-md ">
            <div >{props.leftComponent}</div>
            <div>{props.rightComponent}</div>
        </div>
    )
}
ActionHeader.propTypes = {
    leftComponent: PropTypes.element,
    rightComponent: PropTypes.element
}
export default  ActionHeader;

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Switch } from "antd";

class NotificationRow extends Component {
    render() {
        const { label, enabled, onChange } = this.props;
        return (
            <div class=" flex flex-no-wrap mb-[10px]" >
                <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">{label || ''}</div>
                <Switch
                    checked={enabled || false}
                    onChange={onChange || null}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                />
            </div>
        );
    }
}
NotificationRow.propTypes = {
    label: PropTypes.string,
    enabled: PropTypes.bool,
    onChange: PropTypes.func,
}
export default NotificationRow;
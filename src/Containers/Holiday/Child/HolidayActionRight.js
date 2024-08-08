import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {
    EyeInvisibleOutlined, PlusOutlined,
  
    
  } from '@ant-design/icons';
import { Button } from "antd";

import { StyledSelect } from "../../../Components/UI/Antd";
import { handleHolidayModal } from "../HolidayAction"


const Option = StyledSelect.Option;

class HolidayActionRight extends React.Component {
    state = {
        isClicked: "import",
    };
    componentDidMount() {
        // this.props.getUsers();
    }
    handleClicked = (value) => {
        this.setState({
            isClicked: value,
        });
    };
    render() {
        const { handleHolidayModal } = this.props
        return (
            <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
                <Button
                    type="primary"
                    onClick={() => handleHolidayModal(true)}

                >
                    <PlusOutlined type="plus" />
                </Button>
            
            </div>
        );
    }
}

const mapStateToProps = ({ holiday }) => ({
    addHolidayModal: holiday.addHolidayModal,
  
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleHolidayModal
}, dispatch);
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HolidayActionRight)
);

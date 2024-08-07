import React from 'react';
import { Icon, Button } from 'antd';
import { StyledSelect } from "../../../../Components/UI/Antd";

const Option = StyledSelect.Option;

class VoIPActionRight extends React.Component {

    render() {
        const { handleIntegrationModal } = this.props;
        return (
            <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
                <Button type='primary' onClick={() => handleIntegrationModal(true)}><Icon type='plus' /></Button>
            </div>
        )
    }
}


export default VoIPActionRight; 
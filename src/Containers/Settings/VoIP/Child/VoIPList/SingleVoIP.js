import React, { Component } from 'react'

import axios from 'axios';
import { base_url } from "../../../../Config/Auth";
import { BussinessCard } from "../../../../Components/UI/Elements";

class SingleVoIP extends Component {
    render() {
        const { VoIP:sid } = this.props
       

        return (
            // <>
            <BussinessCard
                imageId={}
                primaryTitle={sid}
                // secondaryTitle={}
                hideSecondaryAvatar
                // subtitle1={}
                subtitle1Icon={'trophy'}
            // subtitle2={user.phoneNo || ' n/a'}
            handlePreview={() => this.props.handleTeamDrawer(user, true)}
            // handleClick={() => history.push(`team/${user.userId}`)}
            />
            // </>
        )
    }
}
export default (SingleVoIP);
import React, { Component } from 'react';
import { ActionHeader } from '../../../../Components/Utils';
import AccountDetailsHeaderLeft from './AccountDetailsHeaderLeft';

class AccountDetailsHeader extends Component {
    render() {
        return (
            <div>
                <ActionHeader
                    leftComponent={<AccountDetailsHeaderLeft distributorData={this.props.distributorData}
                    selectedLanguage={this.props.selectedLanguage}
                    translateText={this.props.translateText} />}
                    rightComponent={<></>}
                />
            </div>
        )
    }
}

export default AccountDetailsHeader;
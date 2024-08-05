import React, { Component } from 'react';
import { ActionHeader } from '../../../Components/Utils';
import AccountActionLeft from './AccountActionLeft';
import AccountActionRight from './AccountActionRight';

class AccountHeader extends Component {
    render() {
        const {
            handleDistributorModal,
            viewType,
            setDistributorViewType,
            handleAccountImportModal,
            setCurrentData,
            currentData,
            handleClear,
        } = this.props;

        return (
            <>
                <ActionHeader
                    leftComponent={
                        <AccountActionLeft
                        selectedLanguage={this.props.selectedLanguage}
                        translateText={this.props.translateText}
                            viewType={viewType}
                            setDistributorViewType={setDistributorViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                        />
                    }
                    rightComponent={
                        <AccountActionRight
                            selectedLanguage={this.props.selectedLanguage}
                            translateText={this.props.translateText}
                            viewType={viewType}
                            handleAccountImportModal={handleAccountImportModal}
                            handleDistributorModal={handleDistributorModal}
                        />
                    }
                />
            </>
        )
    }
}

export default AccountHeader;

import React, { Component,lazy, Suspense } from 'react';
import { ActionHeader } from '../../../Components/Utils';
import { BundleLoader } from "../../../Components/Placeholder";
const  AccountActionLeft = lazy(() => import("./AccountActionLeft"));
const  AccountActionRight = lazy(() => import("./AccountActionRight"));

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
            <Suspense fallback={<BundleLoader />}>
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
                </Suspense>
            </>
        )
    }
}

export default AccountHeader;

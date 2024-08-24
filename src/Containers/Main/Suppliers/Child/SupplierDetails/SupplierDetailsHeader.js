import React, { Component, lazy, Suspense} from 'react';
import { ActionHeader } from '../../../../../Components/Utils';
import { BundleLoader } from "../../../../../Components/Placeholder";
const SupplierDetailsHeaderLeft =lazy(()=>import("./SupplierDetailsHeaderLeft"));
class SupplierDetailsHeader extends Component {
    render() {
        return (
            <div>
                <Suspense fallback={<BundleLoader />}>
                <ActionHeader
                    leftComponent={<SupplierDetailsHeaderLeft 
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}/>}
                    rightComponent={<></>}
                   
                />
                </Suspense>
            </div>
        )
    }
}

export default SupplierDetailsHeader;
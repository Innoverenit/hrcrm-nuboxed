import React, { Suspense,lazy } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddSuppliersForm =lazy(()=>import("./AddSuppliersForm"));

const AddSuppliersModal = (props) => {
    const { addSuppliersModal, handleSuppliersModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
              title={props.translatedMenuItems[13]} 
                width="60%"
                visible={addSuppliersModal}
                closable
                destroyOnClose
                onClose={() => handleSuppliersModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddSuppliersForm   translatedMenuItems={props.translatedMenuItems} {...formProps} 
                    //  translateText={this.props.translateText}
                    //  selectedLanguage={this.props.selectedLanguage}
                     />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddSuppliersModal;

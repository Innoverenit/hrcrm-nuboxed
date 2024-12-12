import React, { Suspense,lazy } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddSuppliersForm =lazy(()=>import("./AddSuppliersForm"));

const AddSuppliersModal = (props) => {
    const { addSuppliersModal, handleSuppliersModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
              title={props.translatedMenuItems[40]} 
                width="50%"
                visible={addSuppliersModal}
                closable
                destroyOnClose
                onClose={() => handleSuppliersModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddSuppliersForm   translatedMenuItems={props.translatedMenuItems} {...formProps}                
                    translateText={props.translateText}
                    selectedLanguage={props.selectedLanguage}
                     />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddSuppliersModal;

import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";

const DistributorPaidForm = lazy(() => import("./DistributorPaidForm"));
const OrderPaymentTable = lazy(() => import("./OrderPaymentTable"));

const PaidButtonModal = ({
    addPaidButtonModal,
    handlePaidModal,
    particularRowData,
    distributorId,
    type,
    selectedLanguage,
    translateText,
    activeTab,
    translatedMenuItems,
    modalTitleKey,
}) => {

    const getTranslation = (keyIndex, fallback = "Default Modal Title") => {
        return translatedMenuItems && translatedMenuItems[keyIndex] 
             ? translatedMenuItems[keyIndex] : fallback;};

      const modalTitle = getTranslation(modalTitleKey, "Default Modal Title");  
    
   
    
    return (
        <StyledDrawer
            title={`${modalTitle} - ${particularRowData.newOrderNo}`}
            width="70%"
            visible={addPaidButtonModal}
            destroyOnClose
            maskClosable={false}
            onClose={() => handlePaidModal(false)}
            footer={null}
        >
            <Suspense fallback={<BundleLoader />}>
                {type === "incomplete" ? (
                    <>
                        <DistributorPaidForm
                            particularRowData={particularRowData}
                            distributorId={distributorId}
                            type={type}
                            selectedLanguage={selectedLanguage}
                            translateText={translateText}
                            activeTab={activeTab}
                            translatedMenuItems={translatedMenuItems}
                        />
                        <OrderPaymentTable
                            particularRowData={particularRowData}
                            type={type}
                            selectedLanguage={selectedLanguage}
                            translateText={translateText}
                            activeTab={activeTab}
                            translatedMenuItems={translatedMenuItems}
                        />
                    </>
                ) : (
                    <OrderPaymentTable
                        particularRowData={particularRowData}
                        selectedLanguage={selectedLanguage}
                        translateText={translateText}
                        activeTab={activeTab}
                        translatedMenuItems={translatedMenuItems}
                    />
                )}
            </Suspense>
        </StyledDrawer>
    );
};

export default PaidButtonModal;


import React, { Component, Suspense, lazy } from "react";
import { StyledDrawer, } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import CommerceOpenTrackDrawerCard from "./CommerceOpenTrackDrawerCard";


function CommerceOpenTrackDrawer (props) {
    
        const {
            OpenTrack,
            setOpenTrack,
            ...formProps
        } =props;
        return (
            <>
                <StyledDrawer
                    title={`Order ID - ${props.rowData.newOrderNo}`}
                    width="60%"
                    height="45%"
                    visible={OpenTrack}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() =>  setOpenTrack(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <CommerceOpenTrackDrawerCard
                        OpenTrack={OpenTrack}
                        setOpenTrack={setOpenTrack}
                       newOrderNo={props.rowData.newOrderNo}
                        orderPhoneId={props.rowData.orderPhoneId}
                        />
                       
                    </Suspense>

                </StyledDrawer>
            </>
        );  
}

export default CommerceOpenTrackDrawer;

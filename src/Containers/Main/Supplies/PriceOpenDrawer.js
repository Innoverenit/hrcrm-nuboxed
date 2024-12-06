import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import PriceUpdateTable from "./PriceUpdateTable";



class PriceOpenDrawer extends Component {
    render() {
        const { priceOpen, setPriceOpen } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Updated Price"
                    width="90%"                   
                    visible={priceOpen}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => setPriceOpen(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                  <PriceUpdateTable
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}/>
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default PriceOpenDrawer;

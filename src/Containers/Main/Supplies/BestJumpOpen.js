import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import BestBeforeTable from "./BestBeforeTable";

class BestJumpOpen extends Component {
    render() {
        const { open, setOpen } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="BEST BEFORE"
                    width="80%"                   
                    visible={open}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => setOpen(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                  <BestBeforeTable
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}
                  />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default BestJumpOpen;

import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import ReOrderOpenTable from "./ReOrderOpenTable";


class ReOrderOpen extends Component {
    render() {
        const { setreOpen, reOpen } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="ReOrder"
                    width="80%"                   
                    visible={reOpen}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => setreOpen(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                  <ReOrderOpenTable
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}/>
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default ReOrderOpen;

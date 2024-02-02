import React, { Component, Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer} from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UpdateSuppliesForm =lazy(()=>import("./UpdateSuppliesForm"));


class UpdateSuppliesFormDrawer extends Component {
    render() {
        const { updateSuppliesDrawer, handleUpdateSupplieDrawer,particularDiscountData } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Update Material"
                    width="60%"                   
                    visible={updateSuppliesDrawer}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleUpdateSupplieDrawer(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                    <UpdateSuppliesForm particularDiscountData={particularDiscountData}/>
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSuppliesFormDrawer);

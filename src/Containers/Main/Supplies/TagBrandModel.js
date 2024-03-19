import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";

const TaggedBrandTable = lazy(() => import("./TaggedBrandTable"))
const BrandModelTable = lazy(() => import("./BrandModelTable"))


function TagBrandModel(props) {
    const { addBrandModel, handleBrandModel } = props;
    return (
        <div>
            <StyledDrawer
                title={`Tag Brand - ${props.particularDiscountData.suppliesName}`}
                width="60%"
                visible={addBrandModel}
                onClose={() => handleBrandModel(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {props.particularDiscountData.mainInd ?
                        <TaggedBrandTable particularDiscountData={props.particularDiscountData} />
                        : <BrandModelTable particularDiscountData={props.particularDiscountData} />}
                </Suspense>

            </StyledDrawer>
        </div>
    );
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TagBrandModel);

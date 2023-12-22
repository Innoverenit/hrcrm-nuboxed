import React, { useState,lazy,Suspense } from 'react';
import { StyledTabs } from '../../../Components/UI/Antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { FolderOpenTwoTone } from '@ant-design/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BundleLoader } from '../../../Components/Placeholder'

const AddCatalogueInProduction=lazy(()=>import('./ProductionTab/AddCatalogueInProduction'));
const OpenRepairTable=lazy(()=>import('./OpenRepairTable'));
const ProductionRepairOrder=lazy(()=>import('./ProductionRepairOrder'));
const OpenQcTable =lazy(()=>import('./OpenQcTable'));
const ProductionOrderListById=lazy(()=>import('./ProductionOrderListById'));

const OrderPhoneTab = (props) => {

    const [qcMain, setQcMain] = useState(true);
    const [openQc, setOpenQc] = useState(false);

    const handleMainQc = () => {
        setQcMain(true)
        setOpenQc(false)
    }
    const handleOpenQc = () => {
        setQcMain(false)
        setOpenQc(true)
    }

    const [repairMain, setRepairMain] = useState(true);
    const [openRepair, setOpenRepair] = useState(false);

    const handleMainRepair = () => {
        setRepairMain(true)
        setOpenRepair(false)
    }
    const handleOpenRepair = () => {
        setRepairMain(false)
        setOpenRepair(true)
    }
    return (
        <div>
            <StyledTabs>
                {!props.inspectionRequiredInd &&
                    <TabPane
                        tab={
                            <>
                                <span onClick={handleMainQc}>
                                    <BorderColorIcon />&nbsp; QC
                                </span>
                                &nbsp;&nbsp;
                                <span onClick={handleOpenQc}>
                                    <FolderOpenTwoTone />
                                </span>

                            </>
                        }
                        key="1">
                            <Suspense fallback={<BundleLoader/>}>
                        {openQc ? <OpenQcTable /> : qcMain ? <ProductionOrderListById /> : null}
                        </Suspense>
                    </TabPane>}
                <TabPane
                    tab={
                        <>
                            <span onClick={handleMainRepair}>
                                {/* <BorderColorIcon />&nbsp; */}
                                Process
                            </span>
                            &nbsp;&nbsp;
                            <span onClick={handleOpenRepair}>
                                {/* <FolderOpenTwoTone /> */}
                            </span>

                        </>
                    }
                    key="2">
                        <Suspense fallback={<BundleLoader/>}>
                    {repairMain ? <ProductionRepairOrder inspectionRequiredInd={props.inspectionRequiredInd} /> :
                        openRepair ? <OpenRepairTable /> : null}
</Suspense>
                </TabPane>
                <TabPane
                    tab={
                        <>
                            <span>
                                {/* <BorderColorIcon />&nbsp; */}
                                Production
                            </span>
                        </>
                    }
                    key="3">
                                     <Suspense fallback={<BundleLoader/>}>
                                     <AddCatalogueInProduction />
                </Suspense>
                  

                </TabPane>
            </StyledTabs>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPhoneTab);


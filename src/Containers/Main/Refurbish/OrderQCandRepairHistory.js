import React, { useState, lazy, Suspense } from 'react';
import { StyledTabs } from '../../../Components/UI/Antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BundleLoader } from '../../../Components/Placeholder'
const TechnicianListByOrderId =lazy(()=>import('./TechnicianListByOrderId'));
const RepairTechnicianList =lazy(()=>import('./RepairTechnicianList'));


const OrderQCandRepairHistory = (props) => {

    const [activeKey, setActiveKey] = useState(false)
    const handleTabChange = (key) => {
        setActiveKey(key)
    }
    return (
        <div>
            <StyledTabs
                defaultActiveKey="1"
                onChange={handleTabChange}
            >
                <TabPane
                    tab={
                        <>
                            <span >
                                QC
                            </span>
                        </>
                    }
                    key="1">
                    <Suspense fallback={<BundleLoader />}>
                        <TechnicianListByOrderId rowData={props.rowData} />
                    </Suspense>
                </TabPane>
                <TabPane
                    tab={
                        <>
                            <span>
                                Repair
                            </span>
                        </>
                    }
                    key="2">
                    <Suspense fallback={<BundleLoader />}>
                        <RepairTechnicianList rowData={props.rowData} />
                    </Suspense>
                </TabPane>

            </StyledTabs>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderQCandRepairHistory);


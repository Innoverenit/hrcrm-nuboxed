import React, { useState, lazy, Suspense } from 'react';
import { StyledTabs } from '../../../../Components/UI/Antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BundleLoader } from '../../../../Components/Placeholder'

const AddingSpareList = lazy(() => import('./AddingSpareList'));
const AddingTaskList = lazy(() => import('./AddingTaskList'));


const SpareTaskTab = (props) => {

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
                                Spare
                            </span>
                        </>
                    }
                    key="1">
                    <Suspense fallback={<BundleLoader />}>
                        <AddingSpareList
                            phoneDetails={props.phoneDetails}
                            phoneId={props.phoneId} />
                    </Suspense>
                </TabPane>
                <TabPane
                    tab={
                        <>
                            <span>
                                Task
                            </span>
                        </>
                    }
                    key="2">
                    <Suspense fallback={<BundleLoader />}>
                        <AddingTaskList
                            phoneDetails={props.phoneDetails}
                            phoneId={props.phoneId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SpareTaskTab);


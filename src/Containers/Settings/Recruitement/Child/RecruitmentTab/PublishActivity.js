import React, {  } from "react";
import { Popconfirm,Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    LinkProcessPublish
} from "../../../SettingsAction";
function PublishActivity(props){

function onClick(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false)

    function handleToggleCollection(item) {
        props.LinkProcessPublish(
            {
                recruitmentProcessId:this.props.recruitmentProcessId
            },
            // props.paymentId,
            // props.userId,
        );
    }
}

    return (
        <>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                <Popconfirm
                    title="Confirm received"
                    onConfirm={onClick}
                    onCancel={null}
                    okText="Ok"
                    cancelText="Cancel"
                >
                   <Button 
                   style={{marginLeft:"12px"}}
                //    type="primary"
                //    htmlType="submit"
                   loading={props.linkingProcessPublish}

                   >
                               Publish
                             </Button> 
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ settings,auth, collection }) => ({
    // fetchingTodayDistributor: collection.fetchingTodayDistributor,
    // userId: auth.userDetails.userId,
    processPublish:settings.processPublish,
    linkingProcessPublish:settings.linkingProcessPublish
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            LinkProcessPublish
            // linkDistributorPaymentByFinance
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(PublishActivity);

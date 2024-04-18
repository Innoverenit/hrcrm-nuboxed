import React, { Component } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { productPublishToggle } from "../../ProductAction";

class LobToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        };
    }

    onChange = (checked) => {
        this.setState({ toggle: checked });
        // this.props.productPublishToggle({
        //     publishInd: this.props.item.publishInd ? false : true
        // },
        //     this.props.item.productId,
        //     this.props.groupId);
    };

    render() {
        return (
            <>
                <div>
                    <Popconfirm
                        title="Do you want to publish?"
                        onConfirm={() => {
                            this.onChange();
                        }}
                        onCancel={null}
                        okText="Ok"
                        cancelText="Cancel"
                    >
                        <Switch
                            checked={this.props.publishInd}
                            //   disabled={this.props.collectInd}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                    </Popconfirm>
                </div>
            </>
        );
    }
}
const mapStateToProps = ({ auth, lead }) => ({
    userId: auth.userDetails.userId,
    groupId: auth.userDetails.groupId,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            //productPublishToggle,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(LobToggle);

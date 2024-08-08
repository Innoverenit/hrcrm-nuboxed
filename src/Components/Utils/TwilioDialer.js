import React, { Component } from 'react';
import { Modal } from 'antd'
import {
    EyeInvisibleOutlined, PhoneOutlined,
  } from '@ant-design/icons';
import { MultiAvatar } from "../../Components/UI/Elements";

class TwillioDialer extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {

        return (

            <div>
                {/* <Button type="primary" onClick={this.showModal}> Open Modal  </Button> */}
                <Modal
                    footer={null}
                    title="User Name"
                    visible={this.state.visible}
                    OnOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{ color: '#0f0f0f', backgroundColor: '#333' }}
                    bodyStyle={{ color: '#0f0f0f', backgroundColor: '#333' }}
                >

<div class=" flex flex-row flex-wrap items-center self-start justify-center grow shrink h-auto mr-auto ">
<div class=" flex flex-col flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
                            <MultiAvatar primaryTitle="A" large />
                            <br />
                            <PhoneOutlined type='phone' style={{ color: 'red', fontSize: 30 }} />
                        </div>
                    </div>
                </Modal>
            </div>


        );
    }
}
export default TwillioDialer;

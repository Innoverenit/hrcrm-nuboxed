import React, { Component } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { base_url } from "../../../../Config/Auth";
import { Player } from "video-react";

import "video-react/dist/video-react.css";

// const YoutubePlayerForm = lazy(() => import("./YoutubePlayerForm"));

class AddPlayerModal extends Component {
    state = { visible: false };

    showModal = () => {
      this.setState({
        visible: true
      });
    };
  
    hideModal = () => {
      this.setState({
        visible: false
      });
    };
  
    pause = () => {
      this.player.pause();
    };
  render() {
    const {
      addPlayerModal,
      handlePlayerModal,
    //   youtubeLink,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          // title="Youtube"
          title={<FormattedMessage
            id="app.youtube"
            defaultMessage="Youtube"
             />}
          width="60%"
          visible={addPlayerModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"3rem"}}
          onCancel={() => handlePlayerModal(false)}
          footer={null}
        >
             <Player
            autoPlay
            ref={ref => {
              this.player = ref;
            }}

          >
            <source
           
           src={`${base_url}/videoClips/${this.props.videoClipsId}`}
              type="video/mp4"
            />
          </Player>
        </StyledDrawer>
      </>
    );
  }
}

export default AddPlayerModal;

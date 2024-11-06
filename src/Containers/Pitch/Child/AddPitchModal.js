import React, { lazy, Suspense ,Component} from 'react';
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledTabs } from "../../../Components/UI/Antd";
const PitchForm =lazy(()=>import("../Child/PitchForm"));
const TabPane = StyledTabs.TabPane;

class AddPitchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
     "426",//pitch
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    const handleClose = () => {
      window.location.reload(true);
    };
    const { addLeadsModal, handleLeadsModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
         title= {this.state.translatedMenuItems[0]}
     
        width={drawerWidth}
          visible={this.props.addPitchModal}
          destroyOnClose
          maskClosable={false}
          onClose={() => {
           // handleClose();
            this.props.handlePitchModal(false)}}
          // onClose={() => this.props.handlePitchModal(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          <PitchForm
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
          />{" "}      
        </Suspense>       
        </StyledDrawer>
      </>
    );
  }
}

export default AddPitchModal;

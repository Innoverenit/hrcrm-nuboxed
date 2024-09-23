
import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PlusOutlined } from "@ant-design/icons";
import {  StyledTabs } from "../../../../Components/UI/Antd";
import {handleCreateShiftDrawer} from "./LocationAction";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BallotIcon from '@mui/icons-material/Ballot';

const ShftLocsTable =lazy(()=>import("./ShftLocsTable"));
const ALoctionTable=lazy(()=>import("./ALoctionTable"));
const LocationCreateShiftDrawer=lazy(()=>import("./LocationCreateShiftDrawer"));

const TabPane = StyledTabs.TabPane;

class LocationShiftDrawerTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
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
        "1017",//0 Shift
        "1638",//1 Allocation
        "104",//2 Create"
              
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    const {handleCreateShiftDrawer,createShiftDrawer,  storedLoc}=this.props;
    return (
      <>
        <div class="w-full ">
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <TrackChangesIcon className="!text-icon text-[#49393b]"/>
                 
               <span class=" ml-1 !text-tab">{this.state.translatedMenuItems[0]}</span>
              

                  {activeKey === "1" && (
                    <>
                  
                    <PlusOutlined
                        type="plus"
                        title={this.state.translatedMenuItems[2]}
                        onClick={() => handleCreateShiftDrawer(true)}
                        className=" flex !text-icon ml-1 items-center"
                        
                      />
                     
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               <ShftLocsTable   storedLoc={storedLoc}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                   <BallotIcon className="!text-icon text-[#4b644a]"/>
                 
                 
               <span class=" ml-1 !text-tab">{this.state.translatedMenuItems[1]}</span>
              

                  {activeKey === "2" && (
                    <>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ALoctionTable storedLoc={storedLoc}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
          </StyledTabs>
        </div>
        <Suspense fallback={null}>
          <LocationCreateShiftDrawer
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          storedLoc={storedLoc}
createShiftDrawer={createShiftDrawer}
          handleCreateShiftDrawer={handleCreateShiftDrawer}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({location,auth}) => ({
  createShiftDrawer:location.createShiftDrawer
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    handleCreateShiftDrawer
  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocationShiftDrawerTab);


import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
const ReinstateCellTable =lazy(()=>import("./ReinstateCellTable"));
const UsersCellCard=lazy(()=>import("./UsersCellCard"));
const LocationCellForm=lazy(()=>import("./LocationCellForm"));
const TabPane = StyledTabs.TabPane;

class LocationCellTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      value: 1,
      breadCumb: false,
      breadCumb1: false,
      carrierSub: false,
         recriutmentdashboard: false,
      shipperPopover:false,
      translatedMenuItems: [],
    };


  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "744",//0
       
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

  handleRecruitCarrierClick = () => {
    this.setState({ 
      carrierSub:false,
      breadCumb1:true,
      shipperPopover: false,
     });
  };
  handleRecruitClick = () => {
    this.setState({ 
      carrierSub:false,
      breadCumb:true,
      shipperPopover: false,
     });
  };

  handleSubscr = () => {
    this.setState({ 
      shipperPopover: true,
      breadCumb:false,
      carrierSub:false
     });

    console.log(this.state.breadCumb);
  };
  
  handleCarrierSubscr = () => {
    this.setState({ 
      carrierSub: true,
      breadCumb1:false,
      shipperPopover:false
     });

    console.log(this.state.breadCumb);
  };

  componentDidMount() {
    //  this.props.clearReducerState();
    this.setState({ breadCumb: false });
    this.fetchMenuTranslations();
  }

 

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };


  render() {
    const {
      handleShipperSubscriptionModal,
      addShipperSubscriptionModal,
      handleCarrierSubscriptionModal,
      addCarrierSubscriptionModal,
    } = this.props;
    const { activeKey, translatedMenuItems } = this.state;

    return (
      <>
        <div className="flex flex-no-wrap">
          <div className="w-full">
            <TabsWrapper  style={ {height: "81vh"}}>
              <StyledTabs defaultActiveKey="1" type="card" onChange={this.handleTabChange}     forceRender={true}>
                <TabPane
                  tab={
                    <>
                              <span onClick={this.handleRecruitClick}>
                     
                      <span className="font-poppins ml-[0.25em]">
                      {this.state.translatedMenuItems[0]} {/* Cell */}
                      </span>
                      </span>
                      {activeKey === "1" && (
                        <>
                         
                             <span
                    className="ml-4"
                          type="area-chart"
                         
                          onClick={() => {
                            this.handleSubscr();
                          }}
                          size="0.875em"                         
                          >
                          <DeleteIcon className=" text-red-600 !text-icon"
                           />
                          </span>
                        </>
                      )}
                    </>
                  }
                  key="1"
                >
                   {this.state.shipperPopover ? (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  <ReinstateCellTable
                   storedLoc={this.props.storedLoc}
                   translateText={this.props.translateText}
                   selectedLanguage={this.props.selectedLanguage} />
                </Suspense>
              ) :(
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <LocationCellForm storedLoc={this.props.storedLoc}
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage} />
                  </Suspense>
                  
                )}
                  
                </TabPane>

                <TabPane tab="User" key="2">
                <Suspense fallback={"Loading ..."}>
                    <UsersCellCard storedLoc={this.props.storedLoc}
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage} />
                    </Suspense>
                </TabPane>
            
              </StyledTabs>
            </TabsWrapper>
          </div>
        </div>
       
      </>
    );
  }
}

const mapStateToProps = ({ countrys, equipment, configure, role, languages }) => ({
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationCellTab);
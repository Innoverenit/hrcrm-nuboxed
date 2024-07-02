
import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import UsersMachineCard from "../Location/UsersMachineCard"
import ReinstateCellTable from "./ReinstateCellTable";
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
                     Cell
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
                          <DeleteIcon
                            style={{ color: "red", fontSize: "1rem" }}
                          
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
                  />
                </Suspense>
              ) :(
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <LocationCellForm storedLoc={this.props.storedLoc} />
                  </Suspense>
                  
                )}
                  
                </TabPane>

                <TabPane tab="User" key="2">
                    <UsersCellCard storedLoc={this.props.storedLoc} />
                </TabPane>
            

                {/* <TabPane tab="Machinery" key="3">
            
                <UsersMachineCard
                storedLoc={this.props.storedLoc}
                />
                   
                </TabPane> */}
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

// import React,{lazy } from "react";
// import { StyledTabs } from "../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../Components/UI/Layout";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { DeleteOutlined } from "@ant-design/icons";
// const LocationCellForm=lazy(()=>import("./LocationCellForm"));
// const UsersCellCard=lazy(()=>import("./UsersCellCard"));

// const TabPane = StyledTabs.TabPane;

// function LocationCellTab(props) {

//     return (
//         <>
//             <TabsWrapper>
//             <StyledTabs defaultActiveKey="1" type="card">
              
//                 <TabPane
//                     tab={
//                         <div>
//                             Cell
//                             <DeleteOutlined
//                                 onClick={() => {
                                 
//                                     console.log("Delete button clicked");
//                                 }}
//                                 className="!text-base cursor-pointer text-[red] ml-2"
//                             />
//                         </div>
//                     }
//                     key="1"
//                 >
//                     <div>
//                         <LocationCellForm storedLoc={props.storedLoc} />
//                     </div>
//                 </TabPane>

//                 <TabPane tab="User" key="2">
//                     <UsersCellCard storedLoc={props.storedLoc} />
//                 </TabPane>
//             </StyledTabs>
//         </TabsWrapper>
//         </>
//     );
// }

// const mapStateToProps = ({ settings, auth }) => ({

// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({

//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(LocationCellTab);









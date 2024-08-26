import React, { Component,lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import HandymanIcon from '@mui/icons-material/Handyman';
import SourceIcon from '@mui/icons-material/Source';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Quality from "../Quality/Quality"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BrandCategory from "../BrandCategory/BrandCategory";
import QuizIcon from '@mui/icons-material/Quiz';
import FeedBack from "./FeedBack";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FeedbackIcon from '@mui/icons-material/Feedback';

const ItemTask = lazy(() =>
  import("../ItemTask/ItemTask")
);
const BrandModel = lazy(() =>
  import("../Brand&Model/BrandModel")
);
const ShipBy = lazy(() =>
  import("../ShipBy/ShipBy")
);


const TabPane = StyledTabs.TabPane;

class OrderTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "0",
      value: 1,
    };
  }



  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
      case "0":
        return       <ItemTask />;
        case "1":
          return     <ShipBy/>;
          case "2":
            return     <BrandModel/>;
            case "3":
              return     <BrandCategory/>;
            case "4":
              return     <Quality/>;
              case "5":
                return     <FeedBack/>;

      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
           <div class="flex flex-nowrap" >
          <div class ="w-[100%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                {this.props.user.repairInd === true && (
                <TabPane
                  tab={
                    <>
                      < HandymanIcon  className=" !text-icon" />
                     
                      <span class=" ml-1 text-sm" >
                      Repair Task
                      </span>
                      <Badge
                count={this.props.itemTaskCount.ItemTaskCount}
                overflowCount={999} offset={[ 0, -16]}
              > </Badge>
                    </>
                  }
                  key="0"
                >
             
                </TabPane>
               )}
                <TabPane
                  tab={
                    <>
                     
                      
                     <LocalShippingIcon className=" !text-icon"/> <span class=" ml-1 text-sm">
                        Ship By
                      </span>
                     
                      <Badge
                count={this.props.shipByCount.shipByCount}
                overflowCount={999} offset={[ 0, -16]}
              > </Badge>
                    </>
                  }
                  key="1"
                >
                  {/* <Suspense>
                    <ShipBy />
                  </Suspense> */}
                </TabPane>
                    <TabPane
                  tab={
                    <>
                     
                      <QuizIcon className=" !text-icon"/> <span class=" ml-1 text-sm">
                        Brand Model
                      </span>
                    </>
                  }
                  key="2"
                >
                  {/* <Suspense>
                    <BrandModel />
                  </Suspense> */}
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <SourceIcon  className=" !text-icon"/>
                      <span class=" ml-1 text-sm">
                     Category
                      </span>
                    </>
                  }
                  key="3"
                >
                 
                </TabPane>
              {/* <TabPane
                  tab={
                    <>
                      <SourceIcon />
                      <span class=" ml-1">
                        Model
                      </span>
                    </>
                  }
                  key="3"
                >
                 
                </TabPane> */}
                <TabPane
                  tab={
                    <>
                      <VerifiedUserIcon className=" !text-icon"/>
                      <span class=" ml-1 text-sm">
                       Quality
                      </span>
                      <Badge
                count={this.props.qualityCount.QualityCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                      
                      </Badge>
                    </>
                  }
                  key="4"
                >

                </TabPane>
                <TabPane
                  tab={
                    <>
                      < FeedbackIcon className=" !text-icon"/>
                      <span class=" ml-1 text-sm">
                       FeedBack
                      </span>
                      <Badge
                count={this.props.feedBackCount.FeedbackCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                      
                      </Badge>
                    </>
                  }
                  key="5"
                >

                </TabPane>
              </StyledTabs>
              <Suspense fallback={<div>Loading...</div>}>
                {this.renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({auth ,itemTask,shipBy,quality,settings}) => ({
  user: auth.userDetails,
  itemTaskCount:itemTask.itemTaskCount,
  shipByCount:shipBy.shipByCount,
  qualityCount:quality.qualityCount,
  feedBackCount:settings.feedBackCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderTab);






// import React, { Component,lazy, Suspense } from "react";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../Components/UI/Layout";
// import { connect } from "react-redux";
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// const ItemTask = lazy(() =>
//   import("../ItemTask/ItemTask")
// );

// const TabPane = StyledTabs.TabPane;

// class OrderTab extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeKey: "1",
//       value: 1,
//     };
//   }

//   onChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   handleTabChange = (key) => this.setState({ activeKey: key });
//   render() {
//     return (
//       <>
//            <div class="flex flex-nowrap" >
//           <div class ="w-[70%]" >
//             <TabsWrapper>
//               <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
//                 <TabPane
//                   tab={
//                     <>
//                       <MonetizationOnIcon />
//                       <span class=" ml-1" >
//                       Item task
//                       </span>
//                     </>
//                   }
//                   key="0"
//                 >
//                   <Suspense>
//                     <ItemTask />
//                   </Suspense>
//                 </TabPane>
               
             
//               </StyledTabs>
//             </TabsWrapper>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ }) => ({});
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(OrderTab);

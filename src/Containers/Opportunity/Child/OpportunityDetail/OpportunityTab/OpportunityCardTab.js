
import React, { Component } from "react";
import Tabs from "react-draggable-tabs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Icon } from "antd";
// import { ShoppingOutlined} from '@ant-design/icons';
import // addDraggableOpportunity,
  // getOpportunityCard,
  "../../../OpportunityAction";

class OpportunityCardTab extends Component {
  constructor(props) {
    super(props);
    this.moveTab = this.moveTab.bind(this);
    // this.selectTab = this.selectTab.bind(this);
    // this.addTab = this.addTab.bind(this);
    this.state = {
      sequence: 1,
    };
    // this.props.fetchingOpportunityCard.map((item) => {
    this.state = {
      tabs: [
        {
          cardId: 1,
          content: <>{this.props.cardName}</>,

          active: true,
          display: (
            <>
              <span>
                
                <Icon type="shopping" />
                Quotes
              </span>
            </>
          ),
        },
        {
          cardId: 2,
          content: "RecruitPro",
          active: true,
          display: (
            <>
              <span>
                <i class="fas fa-print"></i>
                Recruit Pro
              </span>
            </>
          ),
        },
      ],
    };
    // });
  }

  moveTab(dragIndex, hoverIndex) {
    console.log();
    this.setState((state, props) => {
      // addDraggableOpportunity();
      let newTabs = [...state.tabs];
      newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);

      return { tabs: newTabs };
    });
  }

  componentDidMount() {
    // this.props.getOpportunityCard(this.props.userId);
    for (let i = 0; i < 10; i++) {
      console.log("sequence");
      this.setState({ sequence: ++this.state.sequence });
    }
  }
  render() {
    const activeTab = this.state.tabs.filter((tab) => tab.active === true);
    return (
      <>
        <div>
          <Tabs
            moveTab={this.moveTab}
            selectTab={this.selectTab}
            tabs={this.state.tabs}
          ></Tabs>
          {activeTab.length !== 0 ? activeTab[0].display : ""}
        </div>
        ;
      </>
    );
  }
}
const mapStateToProps = ({ opportunity, auth, task }) => ({
  userId: auth.userDetails.userId,
  // fetchingOpportunityCard: opportunity.fetchingOpportunityCard,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOpportunityCard,
      // addDraggableOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityCardTab);

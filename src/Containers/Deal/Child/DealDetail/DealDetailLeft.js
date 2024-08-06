import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const DealDetailTab = lazy(() => import("./DealTabs/DealDetailTab"));
const DealCards=lazy(()=>import("./Dealcards/DealCards"));

class DealDetailLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      account: {},
      isError: false,
    };
  }
 

  render() {
    const {
      user: {
        metaData: { productStatus },
      },
      dealDetailsbyID,
    } = this.props;
    const { account } = this.state;

    return (
      <div class="block">
        <div>
        <DealCards
          dealDetailsbyID={dealDetailsbyID}
          account={account}
          updateAccount={this.updateAccount}
          setAccount={this.setAccount}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
        />
        </div>
        
        
          <div class="w-[89vw]">
         <DealDetailTab
         dealDetailsbyID={dealDetailsbyID}
          />
          </div>
       </div>
    );
  }
}
const mapStateToProps = ({ deal, auth }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealDetailLeft);


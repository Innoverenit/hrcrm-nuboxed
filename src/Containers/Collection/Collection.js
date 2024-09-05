import React, { Suspense, lazy, Component } from "react";
import CollectionHeader from "./Child/CollectionHeader";
import {
  setCollectionViewType,
  getTodayCustomer,
  setCustomerSubViewType, 
  setDistributorViewType,
  getTodayDistributor,
} from "./CollectionAction";
import { getAllCustomersList, getAllDistributorsList } from "./CollectionAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
const CollectionDistributorTab = lazy(() =>
  import("./CollectionTab/CollectionDistributorTab")
);

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      activeKey1: "1",
      currentData: "",
      currentData1: "",
    };
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  handleTabChange1 = (key) => this.setState({ activeKey1: key });

  handleClear = () => {
    this.setState({ currentData: "" });
    if (this.props.subViewCustomer === "receive") {
      this.props.getTodayCustomer();
    } else if (this.props.subViewCustomer === "all") {
      this.props.getAllCustomersList();
    }
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleClear1 = () => {
    this.setState({ currentData1: "" });
    if (this.props.subViewDistributor === "receive") {
      this.props.getTodayDistributor();
    } else if (this.props.subViewDistributor === "all") {
      this.props.getAllDistributorsList();
    }
  };
  setCurrentData1 = (value) => {
    this.setState({ currentData1: value });
  };

  render() {
    const {
      setCollectionViewType,
      viewType,
      user,
      subViewCustomer,
      subViewDistributor,
    } = this.props;
    const { activeKey, activeKey1 } = this.state;
    return (
      <>
       <Suspense fallback={<BundleLoader />}>
        <CollectionHeader
         translateText={this.translateText}
         selectedLanguage={this.selectedLanguage}
          setCollectionViewType={setCollectionViewType}
          setCustomerSubViewType={setCustomerSubViewType}
          setDistributorViewType={setDistributorViewType}
          viewType={viewType}
          activeKey={activeKey}
          activeKey1={activeKey1}
          subViewCustomer={subViewCustomer}
          subViewDistributor={subViewDistributor}
          functionName={user.functionName}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          handleClear1={this.handleClear1}
          currentData1={this.state.currentData1}
          setCurrentData1={this.setCurrentData1}
        />
     
           <CollectionDistributorTab
            translateText={this.translateText}
            selectedLanguage={this.selectedLanguage}
              handleTabChange1={this.handleTabChange1}
             activeKey1={activeKey1}
           /> 
         
        </Suspense>

      </>
    );
  }
}

const mapStateToProps = ({ collection, auth }) => ({
  user: auth.userDetails,
  viewType: collection.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCollectionViewType,
      setCustomerSubViewType,
      setDistributorViewType,
      getTodayCustomer,
      getAllCustomersList,
      getTodayDistributor,
      getAllDistributorsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Collection);

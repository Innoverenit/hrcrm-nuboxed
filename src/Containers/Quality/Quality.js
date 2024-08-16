import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQualityViewType } from "./QulityAction";
import QaCardList from "../Main/Refurbish/QaCardList";
import QulityHeader from "./QulityHeader";
import QulityProductionTable from "./QulityProductionTable";
import { BundleLoader } from "../../Components/Placeholder";
class Quality extends Component {
  state = { currentData: "" };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    console.log(this.props.viewType === "production")
    const { setQualityViewType, viewType } = this.props;
    return (
      <React.Fragment>
        <QulityHeader
        
          setQualityViewType={setQualityViewType}
          translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "production" ? (
            <QulityProductionTable 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            />
          )
          :this.props.viewType === "repair" ? (
            <QaCardList 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            />
          )
          :null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ qulity, auth }) => ({
  viewType: qulity.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setQualityViewType,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Quality);

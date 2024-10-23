import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQualityViewType } from "./QulityAction";
import QaCardList from "../Main/Refurbish/QaCardList";
import QulityHeader from "./QulityHeader";
import QulityProductionTable from "./QulityProductionTable";
import { BundleLoader } from "../../Components/Placeholder";
class Quality extends Component {
  state = { currentData: "" ,
    viewType: this.props.viewType || 'production',

  };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  componentDidMount() {
    const {  productionInd } = this.props.user.moduleMapper;
  const {qualityAccessInd} = this.props.user;
    // If productionInd is false initially, switch to "repir"
    if (!productionInd && qualityAccessInd ) {
      this.setState({ viewType: 'repair' });
    } else {
      // Default case if none of the conditions match
      this.setState({ viewType: 'production' });
    }
  }
  handleViewChange = (type) => {
    this.setState({ viewType: type });
  };
  render() {
    console.log(this.props.viewType === "production")
    const { setQualityViewType } = this.props;
    const { viewType } = this.state;
    return (
      <React.Fragment>
         <Suspense fallback={<BundleLoader />}>
        <QulityHeader
        
          setQualityViewType={setQualityViewType}
          translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
          viewType={viewType}
          handleViewChange={this.handleViewChange}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />

       
          {viewType === "production" && this.props.user.moduleMapper.productionInd === true ? (
            <QulityProductionTable 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            />
          )
          :viewType === "repair" && this.props.user.qualityAccessInd === true  ? (
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
  user: auth.userDetails,
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

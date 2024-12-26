import React,{lazy,Suspense} from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url2 } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import UploadMaterialModal from "./UploadMaterialModal"
import UploadIcon from '@mui/icons-material/Upload';
import { Tooltip } from "antd";
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { handleSuppliesModal,handleUploadMaterialModal,handleImageSuppliesModal,handleNewAriival,handleBestbefore } from "./SuppliesAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import UploadImageModalSupplies from "./UploadImageModalSupplies";
import NewArrivalAddModal from "./NewArrivalAddModal";
import BestbeforeModal from "./BestbeforeModal";

const SuppliesAddModal=lazy(()=>import("./SuppliesAddModal"));

class SuppliesActionRight extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  // componentDidMount() {
  //   this.fetchMenuTranslations();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
  //     this.fetchMenuTranslations();
  //   }
  // }

  // fetchMenuTranslations = async () => {
  //   try {
  //     const itemsToTranslate = [
  //       "85",//0
  //       "294",//1
  //       "104",//2
  //       "796",//3
        
  //     ];

  //     const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
  //     this.setState({ translatedMenuItems: translations });
  //   } catch (error) {
  //     console.error('Error translating menu items:', error);
  //   }
  // };
  render() {
    const { handleSuppliesModal, addSuppliesModal,bestBeforemodal, user, viewType,handleNewAriival,handleBestbefore,newArivalmodal } = this.props;

    return (
      <>
      <div className="flex">
      {
          viewType === "all" ?
          <Tooltip title="Export Supplies">
            <CloudDownloadIcon
            className="cursor-pointer"
              href={`${base_url2}/export/supplies`}
            />     
          </Tooltip>
          : null}
          
          <Tooltip title= {this.props.translatedMenuItems[3]}>
            <Button
            style={{background: "green", color:"white"}}
              className="export"
              onClick={() => this.props.handleImageSuppliesModal(true)}
              type=" primary"
              //default
             // href={`${base_url}/export/product?orgId=${organizationId}`}
            >
            Upload Image
            </Button>
          </Tooltip>
         <Tooltip placement="left" title={this.props.translatedMenuItems[7]}>
            <Button
              type="primary"
              style={{background: "green", color:"white"}}
              ghost
              onClick={() => this.props.handleUploadMaterialModal(true)}
            >
             <UploadIcon className=" !text-icon"/>
             {this.state.translatedMenuItems[1]}
             
             
            </Button>
          </Tooltip>
          <Tooltip title="Best Before">
        <Button
         type="primary"
         onClick={() => handleBestbefore(true)}>
            <StarBorderPurple500Icon
            className="cursor-pointer !text-base"
             
            />   
           Best Before
            </Button>  
          </Tooltip>
      <Tooltip title="New Arrivals">
        <Button
         type="primary"
         onClick={() => handleNewAriival(true)}>
            <DateRangeIcon
            className="cursor-pointer !text-base"
             
            />   
            New Arrivals
            </Button>  
          </Tooltip>
  
        {viewType === "all" && (
          <Tooltip placement="left" title={this.props.translatedMenuItems[8]}>
            <Button
              type="primary"
              onClick={() => handleSuppliesModal(true)}
            ><DataSaverOnIcon className="!text-icon"/>
             {/* Add */}
             {this.state.translatedMenuItems[0]}
            </Button>
          </Tooltip>
        )}
          </div>
<Suspense >
        <SuppliesAddModal
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
          handleSuppliesModal={handleSuppliesModal}
          addSuppliesModal={addSuppliesModal}
          translatedMenuItems={this.state.translatedMenuItems}
        />
         <NewArrivalAddModal
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
         handleNewAriival={handleNewAriival}
         newArivalmodal={newArivalmodal}
          translatedMenuItems={this.state.translatedMenuItems}
        />
          <BestbeforeModal
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
         handleBestbefore={handleBestbefore}
         bestBeforemodal={bestBeforemodal}
          translatedMenuItems={this.state.translatedMenuItems}
        />
         <UploadImageModalSupplies
        uploadImageListSupplies={this.props.uploadImageListSupplies}
        handleImageSuppliesModal={this.props.handleImageSuppliesModal}
        />
          <UploadMaterialModal
          handleUploadMaterialModal={this.props.handleUploadMaterialModal}
          uploadMaterialModal={this.props.uploadMaterialModal}
          translatedMenuItems={this.state.translatedMenuItems}
        />
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ supplies, auth }) => ({
  addSuppliesModal: supplies.addSuppliesModal,
  user: auth.userDetails,
  uploadMaterialModal:supplies.uploadMaterialModal,
  uploadImageListSupplies:supplies.uploadImageListSupplies,
  newArivalmodal: supplies.newArivalmodal,
  bestBeforemodal:supplies.bestBeforemodal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSuppliesModal,
      handleUploadMaterialModal,
      handleImageSuppliesModal,
      handleNewAriival,
      handleBestbefore
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SuppliesActionRight)
);

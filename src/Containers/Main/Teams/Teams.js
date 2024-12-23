import React, {  useEffect,useState,Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { handleTeamsModal, setTeamsViewType } from "./TeamsAction";
const TeamsList =lazy(()=> import('./TeamsList'));
const PerformanceManagement =lazy(()=> import('./PerformanceManagement'));
const TeamsHeader =lazy(()=> import('./TeamsHeader'));
const TeamsModal =lazy(()=> import('./TeamsModal'));
const TeamsCardList =lazy(()=> import('./TeamsCard.js/TeamsCardList'));


function Teams (props) {

  const {
    viewType,
    addTeamsModal,
    handleTeamsModal,
    setTeamsViewType,
    user
  } = props;
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
          const itemsToTranslate = [
           "110", // 'Name',//0
           "1139", // 'Team Lead',//1
           "1163" // 'Team Members',//2
           ];
        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  return (
    <React.Fragment>
       <Suspense fallback={<BundleLoader />}>
      <TeamsHeader       
       translateText={props.translateText}      
       selectedLanguage={props.selectedLanguage}
        viewType={viewType}
        handleTeamsModal={handleTeamsModal}
        setTeamsViewType={setTeamsViewType}
      />
      <TeamsModal       
       translateText={props.translateText}
       translatedMenuItems={translatedMenuItems}
       selectedLanguage={props.selectedLanguage}
        addTeamsModal={addTeamsModal}
        handleTeamsModal={handleTeamsModal}
      />
      {  viewType === "table" ?
       <TeamsCardList        
       translateText={props.translateText}
       translatedMenuItems={translatedMenuItems}
       selectedLanguage={props.selectedLanguage}/>
       :viewType==="teams" ?
       <TeamsList
       
       translateText={props.translateText}
       translatedMenuItems={translatedMenuItems}
       selectedLanguage={props.selectedLanguage}/> 

           :viewType==="client" ?
         <PerformanceManagement/> 

        :null}
    
      </Suspense>
    </React.Fragment>
  );
}
const mapStateToProps = ({ teams, auth }) => ({
role: auth.userDetails.role,
department: auth.userDetails.department,
user: auth.userDetails,
viewType: teams.viewType,
addTeamsModal: teams.addTeamsModal,
});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    setTeamsViewType,
    handleTeamsModal,
  },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(Teams);
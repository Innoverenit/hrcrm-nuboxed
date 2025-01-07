import React, { Suspense,useState,useEffect} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LeadsTeamWarmcard from './LeadsTeamWarmcard';
import LeadsTeamColdCard from './LeadsTeamColdCard';
import LeadsTeamHotcard from './LeadsTeamHotcard';
import SearchedData from './SearchedData';



const LeadsTeamCardList = (props) => {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
              '271', // 0
          '110', // 1
          '102', // 2
          '1109', // 3
          '277', // 4
          '278', // 5
          '279', // 6
          '280', // 7
          '76', // 8
          '1335', // 9
          '77', // 10
          '1114', // 11
          '272', //12
          '273', //13
          '185',//Address 14
'316',//notes15
'1165',// 16activity
'140',// 17 email
'170',//18 edit
'1259',//19 "Do you want to delete?"
'1581',//20
            ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  return (
    <div>
       <Suspense fallback={"Loading.."}>
       {props.serachedData.length > 0 ? (
    <SearchedData
    serachedData={props.serachedData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={translatedMenuItems}
  fetchingLeadsInputSearchData={props.fetchingLeadsInputSearchData}
    />
  ) : (
        <>
<LeadsTeamHotcard
 handleCheckboxChange={props.handleCheckboxChange}
 selectedUser={props.selectedUser}
 showCheckboxes={props.showCheckboxes}
 selectedDeals={props.selectedDeals}
 translateText={props.translateText}
 selectedLanguage={translatedMenuItems}
translatedMenuItems={translatedMenuItems}
/>
<LeadsTeamWarmcard
handleCheckboxChange={props.handleCheckboxChange}
selectedUser={props.selectedUser}
showCheckboxes={props.showCheckboxes}
selectedDeals={props.selectedDeals}
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={translatedMenuItems}
/>
<LeadsTeamColdCard
handleCheckboxChange={props.handleCheckboxChange}
selectedUser={props.selectedUser}
showCheckboxes={props.showCheckboxes}
selectedDeals={props.selectedDeals}
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={translatedMenuItems}
/>
        </>
            )}
       </Suspense>
    </div>
  )
}

const mapStateToProps = ({leads}) => ({
  serachedData:leads.serachedData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators ({

},
dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTeamCardList);

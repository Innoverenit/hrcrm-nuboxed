import React, { useState, Suspense, lazy, useEffect } from "react";
import {
  setCollectionViewType,
  getTodayDistributor,
  setCustomerSubViewType,
  setDistributorViewType
} from "../CollectionAction";
import CreditMemoList from "./CreditMemoList"
import { getAllDistributorsList } from "../CollectionAction";
import { connect } from "react-redux";
import LockIcon from '@mui/icons-material/Lock';
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import CloseCreditMemoList from "./CloseCreditMemoList";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Tooltip } from "antd";
const DistributorCollectionTableToday = lazy(() => import("../Distributor/DistributorCollectionTableToday"));
const DistributorColletcionArchive = lazy(() => import("../Distributor/DistributorColletcionArchive"));
const DistributorCollectionTableAll = lazy(() => import("../Distributor/DistributorCollectionTableAll"));
const DistributorSummaryTable = lazy(() => import("../Distributor/DistributorSummaryTable"));

const TabPane = StyledTabs.TabPane;

function CollectionDistributorTab(props) {
  const [
    selectedTodayRowDistributor,
    setSelectedTodayRowDistributor,
  ] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
         "204", //  "Receivables",//0
          "1680",  // Reconsile",//1
          "1357" , // "Credit Memo",//2
          "1367",  // close
           "1168"
          

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

  const [selectedRowDistributor, setSelectedRowDistributor] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  const [showCloseCreditMemoList, setShowCloseCreditMemoList] = useState(false);



  function handleTabChange(key) {
    setActiveKey(key);
  }

  function handleClearReturnCheck() {
    setSelectedRowDistributor([]);
  }

  function handleClearCheck() {
    setSelectedTodayRowDistributor([]);
  }


  const rowSelectionTodayForDistributor = {
    onChange: (selectedTodayRowKeys, selectedTodayRow) => {
      setSelectedTodayRowDistributor(selectedTodayRow);
      console.log(
        `selectedTodayRowKeys: ${selectedTodayRowKeys}`,
        "selectedTodayRow: ",
        selectedTodayRow
      );
    },
  };
  const renderTabContent = (key) => {
    switch (key) {
      case "1":
        return     <div> 
               <DistributorCollectionTableToday
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
                rowSelectionTodayForDistributor={
                  rowSelectionTodayForDistributor
                }
                handleClearCheck={handleClearCheck}
              />
            </div>;
      case "2":
        return  <div>  <DistributorColletcionArchive
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
       handleClearReturnCheck={handleClearReturnCheck}
     /></div>;
        case "3":
            return  <div>   <Suspense fallback={"Loading ..."}>
            {showCloseCreditMemoList ? (
              <CloseCreditMemoList 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>
            ) : (
              <CreditMemoList 
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>
            )}
          </Suspense></div>;
           case "4":
            return  <div>  <DistributorSummaryTable
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
          
         /></div>;

      default:
        return null;
    }
  };

  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey={activeKey} onChange={handleTabChange}>
        <TabPane
            tab={
              <>
                <span class="!text-tab">
                  <i class="fas fa-hand-holding-usd text-[#9e7682]"></i>&nbsp; 
                  {translatedMenuItems[4]}   
                </span>
                &nbsp;
                {activeKey === "4" && <></>}
              </>
            }
            key="4"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              {/* <DistributorCollectionTableToday
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
                rowSelectionTodayForDistributor={
                  rowSelectionTodayForDistributor
                }
                handleClearCheck={handleClearCheck}
              /> */}
            </Suspense>
          </TabPane>

          <TabPane
            tab={
              <>
                <span class="!text-tab">
                  <i class="fas fa-hand-holding-usd text-[#9e7682]"></i>&nbsp; 
                  {translatedMenuItems[0]}  
                </span>
                &nbsp;
                {activeKey === "1" && <></>}
              </>
            }
            key="1"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              {/* <DistributorCollectionTableToday
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
                rowSelectionTodayForDistributor={
                  rowSelectionTodayForDistributor
                }
                handleClearCheck={handleClearCheck}
              /> */}
            </Suspense>
          </TabPane>



          <TabPane
            tab={
              <>
                <span className="!text-tab">
                  <i class="fas fa-archive text-[#42bfdd]"></i>&nbsp;
                  {translatedMenuItems[1]}   
                </span>
                &nbsp;
              </>
            }
            key="2"
          >
            <Suspense fallback={"Loading ..."}>

              {/* <DistributorColletcionArchive
                 translateText={props.translateText}
                 selectedLanguage={props.selectedLanguage}
                handleClearReturnCheck={handleClearReturnCheck}
              /> */}
            </Suspense>
          </TabPane>


       
          <TabPane
  tab={
    <>
      <span  class="!text-tab" onClick={() => {
        setShowCloseCreditMemoList(false);
        setActiveKey("3");
      }}>
         <CreditCardIcon className="!text-icon text-[#edd382] mr-1"/>&nbsp;
        {translatedMenuItems[2]}
      </span>
      {activeKey === "3" && (
        <>
          <Tooltip title= {translatedMenuItems[3]}>
      
    
            <LockIcon
              onClick={() => setShowCloseCreditMemoList(true)}
              className="!text-icon cursor-pointer ml-1"
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            />
          </Tooltip>
        </>
      )}
    </>
  }
  key="3"
>
  {/* <Suspense fallback={"Loading ..."}>
    {showCloseCreditMemoList ? (
      <CloseCreditMemoList 
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}/>
    ) : (
      <CreditMemoList 
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}/>
    )}
  </Suspense> */}
</TabPane>




        

        

        </StyledTabs>
        <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
      </TabsWrapper>
    </>
  );
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
      getTodayDistributor,
      getAllDistributorsList,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionDistributorTab);

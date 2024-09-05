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
import { FormattedMessage } from "react-intl";
import CloseCreditMemoList from "./CloseCreditMemoList";
import { Tooltip } from "antd";
const DistributorCollectionTableToday = lazy(() => import("../Distributor/DistributorCollectionTableToday"));
const DistributorColletcionArchive = lazy(() => import("../Distributor/DistributorColletcionArchive"));
const DistributorCollectionTableAll = lazy(() => import("../Distributor/DistributorCollectionTableAll"));


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
          "922",  // Archive",//1
          "1357" , // "Credit Memo",//2
                 // close
   
          

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


  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey={activeKey} onChange={handleTabChange}>
          <TabPane
            tab={
              <>
                <span>
                  <i class="fas fa-hand-holding-usd"></i>&nbsp; 
                  {translatedMenuItems[0]}   {/* <FormattedMessage
                    id="app.receivable"
                    defaultMessage="Receivables"
                  /> */}
                </span>
                &nbsp;
                {activeKey === "1" && <></>}
              </>
            }
            key="1"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              <DistributorCollectionTableToday
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
                rowSelectionTodayForDistributor={
                  rowSelectionTodayForDistributor
                }
                handleClearCheck={handleClearCheck}
              />
            </Suspense>
          </TabPane>



          <TabPane
            tab={
              <>
                <span>
                  <i class="fas fa-archive"></i>&nbsp;
                  {translatedMenuItems[1]}   {/* <FormattedMessage
                    id="app.archive"
                    defaultMessage="Archive"
                  /> */}
                </span>
                &nbsp;
              </>
            }
            key="2"
          >
            <Suspense fallback={"Loading ..."}>

              <DistributorColletcionArchive
                 translateText={props.translateText}
                 selectedLanguage={props.selectedLanguage}
                handleClearReturnCheck={handleClearReturnCheck}
              />
            </Suspense>
          </TabPane>


       
          <TabPane
  tab={
    <>
      <span onClick={() => {
        setShowCloseCreditMemoList(false);
        setActiveKey("3");
      }}>
        <i className="fas fa-archive"></i>&nbsp;
        {translatedMenuItems[2]} {/* <FormattedMessage id="app.creditmemo" defaultMessage="Credit Memo" /> */}
      </span>
      {activeKey === "3" && (
        <>
          <Tooltip title= "Close">
          {/* {translatedMenuItems[3]}> */}
    
            <LockIcon
              onClick={() => setShowCloseCreditMemoList(true)}
              className="!text-icon cursor-pointer ml-1"
            />
          </Tooltip>
        </>
      )}
    </>
  }
  key="3"
>
  <Suspense fallback={"Loading ..."}>
    {showCloseCreditMemoList ? (
      <CloseCreditMemoList 
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}/>
    ) : (
      <CreditMemoList 
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}/>
    )}
  </Suspense>
</TabPane>




        

          {/* <TabPane
            tab={
              <>
                <span>
                <GroupsIcon />
                &nbsp;
                <FormattedMessage
                              id="app.all"
                              defaultMessage="All"
                  /> 
                </span>
                &nbsp;
              </>
            }
            key="3"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              <DistributorCollectionTableAll/>
            </Suspense>
          </TabPane> */}


        </StyledTabs>
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

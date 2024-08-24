import React, { useState, Suspense, lazy } from "react";
import {
  setCollectionViewType,
  getTodayDistributor,
  setCustomerSubViewType,
  setDistributorViewType
} from "../CollectionAction";
import CreditMemoList from "./CreditMemoList"
import { getAllDistributorsList } from "../CollectionAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
const DistributorCollectionTableToday = lazy(() => import("../Distributor/DistributorCollectionTableToday"));
const DistributorColletcionArchive = lazy(() => import("../Distributor/DistributorColletcionArchive"));
const DistributorCollectionTableAll = lazy(() => import("../Distributor/DistributorCollectionTableAll"));


const TabPane = StyledTabs.TabPane;

function CollectionDistributorTab(props) {
  const [
    selectedTodayRowDistributor,
    setSelectedTodayRowDistributor,
  ] = useState([]);

  const [selectedRowDistributor, setSelectedRowDistributor] = useState([]);
  const [activeKey, setActiveKey] = useState("1");

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
                  <i class="fas fa-hand-holding-usd"></i>&nbsp; <FormattedMessage
                    id="app.receivable"
                    defaultMessage="Receivables"
                  />
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
                  <i class="fas fa-archive"></i>&nbsp;<FormattedMessage
                    id="app.archive"
                    defaultMessage="Archive"
                  />
                </span>
                &nbsp;
              </>
            }
            key="2"
          >
            <Suspense fallback={"Loading ..."}>

              <DistributorColletcionArchive

                handleClearReturnCheck={handleClearReturnCheck}
              />
            </Suspense>
          </TabPane>




          <TabPane
            tab={
              <>
                <span>
                  <i class="fas fa-archive"></i>&nbsp;<FormattedMessage
                    id="app.creditmemo"
                    defaultMessage="Credit Memo"
                  />
                </span>
                &nbsp;
              </>
            }
            key="3"
          >
            <Suspense fallback={"Loading ..."}>
              <CreditMemoList/>
{/* 
              <DistributorColletcionArchive

                handleClearReturnCheck={handleClearReturnCheck}
              /> */}
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

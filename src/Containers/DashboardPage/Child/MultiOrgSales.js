import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleSalesModal} from "../RegionalDashAction"
import { JumpStartBox } from "../../../Components/UI/Elements";


function MultiOrgSales(props) {
  const [totalOrgValue, setTotalOrgValue] = useState(0);
  const [rowdata, setrowdata] = useState("");
  const handleRowData = (data) => {
    setrowdata(data);
  };
  const {
    handleSalesModal,
    addSalesModal
  } = props;
  useEffect(() => {
    const totalValue = props.multiOrgRecords.reduce(
      (accumulator, region) => accumulator + region.orgValue,
      0
    );
    setTotalOrgValue(totalValue);
  }, [props.multiOrgRecords]);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    // props.getRegions(props.organizationId);
    // props.getRegionRecords(currentYear);
  }, []);

  const colors = [
    "linear-gradient(270deg,#F15753,orange)", 
    "linear-gradient(270deg,#3db8b5,#41e196)",
    "linear-gradient(270deg,#5786ea,#20dbde)",
    // "linear-gradient(270deg,#ff8f57,#ffd342)",
  ];

  return (
    <>
     
     <div className="flex flex-col w-full">
      <div>
  <JumpStartBox
    noProgress
    cursorData={"pointer"}
    value={totalOrgValue}
    title="Total"
  />
  </div>

  <div className="flex w-full mt-8 max-sm:flex-col">
    {props.multiOrgRecords.map((region, index) => (
      <React.Fragment key={index}>
        {/* Check if sales for the region is not 0 */}
        {region.sales !== 0 && (
          <div key={index} className="flex w-wk">
            <JumpStartBox
              bgColor={colors[index % colors.length]} 
              noProgress
              // jumpstartClick={() => {
              //   handleSalesModal(true);
              //   handleRowData(region);
              // }}
              // jumpstartClick={()=>handleSalesModal(true);
              // handleRowData(item);}
              cursorData={"pointer"}
              value={region.orgValue}
              title={region.orgName}
              // sLoading={props.user.fetchingJumpstartInvestor}
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

    {/* <AddSalesDrawerModal
      rowdata={rowdata}
      regionRecords={props.regionRecords}
      tabKey={props.tabKey}
      handleTabClick={props.handleTabClick}
      handleRowData={handleRowData}
        addSalesModal={addSalesModal}
        handleSalesModal={handleSalesModal}
      /> */}
    </>
  );
}

const mapStateToProps = ({ dashboard, region,dashboardRegional, auth }) => ({
  user: auth.userDetails,
  regions: region.regions,
  regionRecords:dashboard.regionRecords,
  addSalesModal:dashboardRegional.addSalesModal,
  organizationId: auth.userDetails.organizationId,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getRegions,
      handleSalesModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MultiOrgSales);


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplieSupplierList,setSuppliesSupplierType  } from "../SuppliesAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import SuppliesCardToggle from "./SuppliesCardToggle";
import { Tooltip,Button } from "antd";

const ButtonGroup = Button.Group;

function SuppliersCardTable(props) {
  useEffect(() => {
    props.getSupplieSupplierList(props.particularDiscountData.suppliesId);
  }, []);

  const [hasMore, setHasMore] = useState(true);

  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);

  const { handleUpdateShipperModal } = props;


  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // props.emptysUPPLIERS();
  }, []);


  return (
    <>
      <div className=' flex justify-end sticky  z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[8.1rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            {/* <div className=" md:w-[5.1rem]">
              <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
            </div>
            <div className=" md:w-[6.8rem] ">  <FormattedMessage id="app.email" defaultMessage="Email" /></div>
            <div className="md:w-[7.8rem]">
              <FormattedMessage id="app.address" defaultMessage="Address" />

            </div>
            <div className="md:w-[7.9rem]">
              <FormattedMessage id="app.city" defaultMessage="City" />

            </div>
            <div className="md:w-[5.2rem]">
              <FormattedMessage id="app.pinCode" defaultMessage="PinCode" />
            </div> */}

            <div className="w-[3.8rem]">
            </div>
          </div>
          <div class="overflow-x-auto h-[64vh]">
            <InfiniteScroll
              dataLength={props.supplieSupplerList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplieSupplerList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"75vh"}
            >
              {props.supplieSupplerList.length ?
                <>
                  {props.supplieSupplerList.map((item) => {
                    return (
                      <>
                        <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3"

                        >
                          <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"
                                  to={`${item.supplierId}`}
                                  title={`${item.supplierName}`}
                                >{item.supplierName}</Link>

                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">



                              {/* <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {item.dialCode} {item.phoneNo}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {item.emailId}
                              </div>

                            </div>


                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
          ${(item.address && item.address.length && item.address[0].street) || ""}`}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].city) ||
                                  ""}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].postalCode) ||
                                  ""}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">*/}
<div class=" font-normal text-[0.85rem] text-cardBody font-poppins">

 <SuppliesCardToggle
item={item}
suppliesId={props.particularDiscountData.suppliesId}
 />
</div>
</div>
{item.supplierSuppliesInd && (
<div class="flex flex-row items-center md:w-[6rem] max-sm:flex-row w-full max-sm:justify-end">
                  

                  <div>
                    <ButtonGroup>
                      <RoleButton
                        type="A1"
                        // iconType="fas fa-mug-hot"
                        tooltip="A1"
                        role={item.type}
                        onClick={() => {
                          props.setSuppliesSupplierType({
                            type:"A1",
                            supplierId:item.supplierId,
                            suppliesId:props.particularDiscountData.suppliesId,
                            supplierSuppliesInd:"true",
                          });
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton1
                        type="A2"
                        // iconType="fas fa-burn"
                        tooltip="A2"
                        role={item.type}
                        onClick={() => {
                          props.setSuppliesSupplierType({
                            type:"A2",
                            supplierId:item.supplierId,
                            suppliesId:props.particularDiscountData.suppliesId,
                            supplierSuppliesInd:"true",
                          });
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton2
                        type="A3"
                        // iconType="far fa-snowflake"
                        tooltip="A3"
                        role={item.type}
                        onClick={() => {
                          props.setSuppliesSupplierType({
                            type:"A3",
                            supplierId:item.supplierId,
                            suppliesId:props.particularDiscountData.suppliesId,
                            supplierSuppliesInd:"true",
                          });
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>)}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.supplieSupplerList.length &&
                  !props.fetchingSupplieSupplerList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>
      </div>


    </>
  )
}
const mapStateToProps = ({  supplies, auth }) => ({
  supplieSupplerList: supplies.supplieSupplerList,
  userId: auth.userDetails.userId,
  fetchingSupplieSupplerList:supplies.fetchingSupplieSupplerList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplieSupplierList,
      setSuppliesSupplierType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersCardTable);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "black" : "grey",
          background: role === type ? "chartreuse":null,
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        {/* <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i> */}
        <div class="text-base">A1</div>
      </Button>
    </Tooltip>
  );
}
function RoleButton1({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "orange" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        {/* <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i> */}
        <div class="text-base">A2</div>
      </Button>
    </Tooltip>
  );
}
function RoleButton2({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "blue" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        {/* <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i> */}
        <div class="text-base">A3</div>
      </Button>
    </Tooltip>
  );
}
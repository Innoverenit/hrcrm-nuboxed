import React, { useEffect, useState,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { DatePicker } from "antd";
import {
    getPurchaseSuppliersList,
    handlePoLocationModal,
    handlePoListModal,
    handleTermsnConditionModal,
    addCurrencyInPo,
    updatePOContact,
    getSupplierContactList
} from "../../../SuppliersAction"
import { Button, Select, Tooltip } from 'antd';
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import NodataFoundPage from '../../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import { TerminalSharp } from "@mui/icons-material";
import { getCurrency } from "../../../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const PoLocationModal  = lazy(() => import("./PoLocationModal"));
const POSupplierDetailsModal  = lazy(() => import("./POSupplierDetailsModal"));
const TermsnConditionModal  = lazy(() => import("./TermsnConditionModal"));
const { Option } = Select;

function PurchaseOrderTable(props) {

  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [contact, setContact] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
           "PO",//0
            "Created",//1
            "Location",//2
            "Delivery",//3
            "Contact",//4
            "Currency ",//5
            "Value",//6
            

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        // setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

    useEffect(() => {
        props.getCurrency()
        props.getSupplierContactList(props.supplier.supplierId);
        props.getPurchaseSuppliersList(props.supplier.supplierId);
    }, []);
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }

    const handleUpdate = (poSupplierDetailsId) => {
        const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') + 'T00:00:00Z' : null;
        const data = {
            expectDeliveryDate:formattedDate,
          poContactPersonId:contact,
          poCurrency: currency
          
        };
        props.updatePOContact(data, poSupplierDetailsId);
    
        setEditedFields((prevFields) => ({ ...prevFields, [poSupplierDetailsId]: undefined }));
        setEditContactId(null);
      };
    const handleEditClick = (poSupplierDetailsId, itemContact,expectDeliveryDate,poCurrency) => {
       
        setEditContactId(poSupplierDetailsId);
        setContact(itemContact)
        setSelectedDate(expectDeliveryDate);
        setCurrency(poCurrency)
      };

      const handleCancelClick = (poSupplierDetailsId) => {
        setEditedFields((prevFields) => ({ ...prevFields, [poSupplierDetailsId]: undefined }));
        setEditContactId(null);
      };
    const handleChangeCurrency = (value) => {
        setCurrency(value)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }

    const handleContactChange = async (value) => {
        setContact(value);
       
      };

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>
            <div className=' flex  sticky z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=" w-[15.1rem]  max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                        {translatedMenuItems[0]} {/* <FormattedMessage
                                id="app.po"
                                defaultMessage="PO ID"
                            /> */}
                            </div>
                        <div className=" w-[14.1rem]   old max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                        {translatedMenuItems[1]}    {/* <FormattedMessage
                                id="app.created"
                                defaultMessage="Created" /> */}
                        </div>
                        <div className=" w-[14.1rem]  max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                        {translatedMenuItems[2]} {/* <FormattedMessage
                                id="app.location"
                                defaultMessage="Location" /> */}
                        </div>
                        <div className=" w-[14.12rem]   max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                        {translatedMenuItems[3]}  {/* Delivery */}
                        </div>
                        <div className=" w-[14.12rem]  max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                        {translatedMenuItems[4]} {/* Contact */}
                        </div>
                       
                        <div className=" w-[14.13rem]    max-xl:text-[0.65rem] max-xl:w-[16.13rem]">
                        {translatedMenuItems[5]}  {/* <FormattedMessage
                                id="app.currency"
                                defaultMessage="Currency" /> */}
                        </div>
                        <div className=" w-[14.11rem]   max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                        {translatedMenuItems[6]}  {/* <FormattedMessage
                                id="app.value"
                                defaultMessage="Value" /> */}
                        </div>
                        <div className=" md:w-[5.1rem]">

                        </div>
                        <div className=" md:w-[12.1rem]">

                        </div>
                        <div className=" md:w-[5.1rem]"> </div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.purchaseList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingPurchaseSupplierList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"67vh"}
                            style={{scrollbarWidth:"thin"}}
                        >
                            {props.purchaseList.length ? <>
                                {props.purchaseList.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 p-1" >
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                    <div className=" flex  w-[14.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" underline font-bold max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                                            <span
                                                                class=" text-sky-700 cursor-pointer"
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.handlePoListModal(true)
                                                                }}>
                                                                {item.newPoNumber}
                                                            </span>
                                                            {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato]">
                                                                    New
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[5.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs  font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.userName}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[16.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" max-xl:text-[0.65rem] text-xs  font-poppins">

                                                            {item.locationName}
                                                        </div>
                                                    </div>
                                                    <div className="flex md:w-[16rem] ml-2 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.poSupplierDetailsId ? (
                                         <DatePicker
                                         style={{marginLeft:"0.5rem"}}
                                       // defaultValue={dayjs(item.borrowDate)}
               value={selectedDate ? dayjs(selectedDate) : null} 
               onChange={(date, dateString) => setSelectedDate(dateString)}
               picker="date" 
             />
                  ) : (
                    <div className="font-normal text-xs  font-poppins">
 
                        {item.expectDeliveryDate ? dayjs(item.expectDeliveryDate).format("ll") : ""}
                        </div>
                  )}
                </div>
              </div>

                                                    <div className="flex  md:w-[17rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.poSupplierDetailsId ? (
               <select
               className="customize-select"
               style={{ width: "70%" }}
               value={contact}
               onChange={(e) => handleContactChange(e.target.value)}
             >
               <option value="" >Select a contact</option>
               {props.contactSupplier.map((contactItem, contactIndex) => (
                 <option key={contactIndex} value={contactItem.contactPersonId}>
                   {contactItem.firstName} {contactItem.lastName}
                 </option>
               ))}
             </select>
                  ) : (
                    <div className=" text-xs font-poppins">{item.poContactPersonName}</div>
                  )}
                </div>
              </div>
              <div className="flex  md:w-[17rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.poSupplierDetailsId ? (
               <select
               className="customize-select"
               style={{ width: "70%" }}
               value={currency}
                                                                

               onChange={(e) => handleChangeCurrency(e.target.value)}
             >
               <option value="" >Select Currency</option>
               {props.currencies.map((currencyItem, currencyIndex) => (
                 <option key={currencyIndex} value={currencyItem.currency_name}>
                   {currencyItem.currency_name} 
                 </option>
               ))}
             </select>
                  ) : (
                    <div className=" text-xs  font-poppins">{item.poCurrency}</div>
                  )}
                </div>
              </div>
           
                                                    <div className=" flex   w-[12.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs  font-poppins">

                                                            {item.poValue}
                                                        </div>
                                                    </div>
                                                    <div className="flex w-[6rem] ml-1 max-sm:flex-row max-sm:w-auto">
                <div className="flex">
                  {editContactId === item.poSupplierDetailsId ? (
                    <>
                      <Button onClick={() => handleUpdate(item.poSupplierDetailsId)}>
                        Save
                      </Button>
                      <Button onClick={() => handleCancelClick(item.poSupplierDetailsId)} style={{ marginLeft: '0.5rem' }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Tooltip title="Update Info">
                    <BorderColorIcon
                      tooltipTitle="Edit"
                    
                      onClick={() => handleEditClick(item.poSupplierDetailsId, item.contact,item.expectDeliveryDate,item.poCurrency )}
                      className="!text-icon cursor-pointer flex items-center justify-center text-[tomato]"
                    />
                        </Tooltip>
                  )}
                </div>
               
              </div>
                                                    <div className=" flex  w-[11.01rem] max-xl:w-[18.01rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs  font-poppins">
                                                            {item.locationName === null ? <Button
                                                                type="primary"
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.handlePoLocationModal(true)
                                                                }}
                                                            >
                                                                <FormattedMessage
                                                                    id="app.movetoinventory"
                                                                    defaultMessage="Move To Inventory"
                                                                />
                                                            </Button> : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs  font-poppins">
                                                            <Tooltip title="Terms and condition">
                                                                <TerminalSharp
                                                                    onClick={() => {
                                                                        handleRowData(item)
                                                                        props.handleTermsnConditionModal(true)
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.purchaseList.length
                                    && !props.fetchingPurchaseSupplierList ? <NodataFoundPage /> : null}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
            <PoLocationModal
                supplierId={props.supplier.supplierId}
                rowData={rowData}
                addlocationInPo={props.addlocationInPo}
                handlePoLocationModal={props.handlePoLocationModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            <POSupplierDetailsModal
                supplierId={props.supplier.supplierId}
                rowData={rowData}
                addPoListmModal={props.addPoListmModal}
                handlePoListModal={props.handlePoListModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
                
            />
            <TermsnConditionModal
                rowData={rowData}
                addTermsnCondition={props.addTermsnCondition}
                handleTermsnConditionModal={props.handleTermsnConditionModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    purchaseList: suppliers.purchaseList,
    contactSupplier: suppliers.contactSupplier,
    userId: auth.userDetails.userId,
    addlocationInPo: suppliers.addlocationInPo,
    addPoListmModal: suppliers.addPoListmModal,
    addTermsnCondition: suppliers.addTermsnCondition,
    currencies: auth.currencies,
    fetchingPurchaseSupplierList: suppliers.fetchingPurchaseSupplierList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseSuppliersList,
            handlePoLocationModal,
            handlePoListModal,
            handleTermsnConditionModal,
            getCurrency,
            addCurrencyInPo,
            updatePOContact,
            getSupplierContactList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderTable);
import React, { useEffect, useState, useMemo, lazy } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input } from "antd";

// import AddBundleModal from "./Child/AddBundleModal"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    inputCareerDataSearch,
    getLeadsTabData,
    getBundleData, 
    getLeadsDateWise, 
    handleStripeModal, 
    handleBundleModal,
    handleLeadsModal,
    setLeadsCardData, 
    handlePayOptionModal, 
    emptyLeads, 
    getPaymentBadgeCount,
    updatePaidLeads, 
    notUpdatePaidLeads, 
     getRecords, 
     handleEmptyTruckModal, 
    //  handleEmptyTruckCarrierModal
} from '../../Leads/LeadsAction';
//  import "../leads.scss";
import { handleLoadCarModal, setRequirementsData } from '../../Requirement/RequirementAction'
import { FloatButton } from 'antd';
import { MainForBroker } from '../../../Components/UI/Layout';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import AddEmptyTruckModal from "../../Leads/Child/AddEmptyTruckModal"
import ReactCountryFlag from 'react-country-flag';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
 import AddLeadsModal from '../../Leads/Child/AddLeadsModal';
import { AudioOutlined, StarOutlined} from '@ant-design/icons';
import AddROwCarDetails from '../../Requirement/Child/AddROwCarDetails'

const { Search } = Input;
function Myleads(props) {
    const [page, setPage] = useState(0);
    const [pageNo, setPage1] = useState(0);

    const [currentData, setCurrentData] = useState("");
    const [buttonText, setButtonText] = useState("Submit");
    const [rowOrderDatas, setrowOrderDatas] = useState("");
    // const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    // console.log("abv",props.selectedLanguage)
    // console.log("abv1",translatedMenuItems)

    // useEffect(() => {
    //   const fetchMenuTranslations = async () => {
    //     try {
    //       const itemsToTranslate = [
    //         'Order Date', 
    //         'Delivery Date', 
    //         'Duration', 
    //         'Order #', 
    //         'Bid',   
    //       ];

    //       const translations = await translateText(itemsToTranslate, props.selectedLanguage);
    //       setTranslatedMenuItems(translations);
    //     } catch (error) {
    //       console.error('Error translating menu items:', error);
    //     }
    //   };

    //   fetchMenuTranslations();
    // }, [props.selectedLanguage]);

    function handleRowOrderDatas(orderId) {
        setrowOrderDatas(orderId);
      }

    useEffect(() => {
      
            setPage(page + 1);
            props.getLeadsTabData(props.serviceId,);
             props.getRecords(props.serviceId);
      
    }, [])

    const handleLoadMore = () => {
        setTimeout(() => {
            setPage(page + 1);
            props.getLeadsTabData(props.serviceId);
            props.getRecords(props.serviceId);
        }, 100);
    }
    // useEffect(() => {
    //   return () => props.emptyLeads();
    // }, [])

    const handleChange = (e) => {
        setCurrentData(e.target.value);
      };
    const [rowDatas, setrowDatas] = useState("");
    function handleRowDatas(item) {
        setrowDatas(item);
    }
    const { translatedMenuItems } = props;

    const buttonStyle = {
        borderRadius: "17px",
        fontSize: "16px",
        color: "#5986FB",
        fontFamily: "Poppins",
        fontWeight: "500",
        width: "5rem"
    }


    // const handleButtonClick = () => {
    //     if (buttonText === "Submit" && currentData && currentData.trim() !== "") {
    
    //        props.inputCareerDataSearch(currentData,);
    //       // setCurrentData("");
    //       setButtonText("Clear"); 
    //     } else if (buttonText === "Clear") {
    //       // setPage(pageNo + 1);
    //       props.getLeadsTabData(props.serviceId);
    //     //   props.ClearReducerDataOfLoad()
    //       setCurrentData("");
    //       setButtonText("Submit"); 
    //     } else {
         
    //       console.error("Input is empty. Please provide a value.");
    //     }
    //   };

      const suffix = (
        <AudioOutlined
          onClick={SpeechRecognition.startListening}
    
          // onClick={() => {
          //   // this.handleContactPopoverVisibleChange();
          //   // handleLinkContactModal(true);
          // }}
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
    
    
        />
      );
      const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
      console.log(transcript)
      useEffect(() => {
        // props.getCustomerRecords();
        if (transcript) {
          console.log(">>>>>>>", transcript);
          setCurrentData(transcript);
        }
        }, [ transcript]);
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
               

                <button
                   style={{backgroundColor:"#5f92ff",borderRadius: "1rem",padding: "0.25rem 1rem"}}
                   onClick={() => props.handleEmptyTruckModal(true)}
                >
            <h10 class="text-white"> +</h10> <label class=" font-montserrat cursor-pointer text-white text-base font-bold">{translatedMenuItems[34]}</label>
                
                </button>

            </div>
            <MainForBroker style={{ height: "68vh" }}>
                <div className="border border-gray-300 p-1 inline-flex items-center rounded-md w-max ml-1">
                    <span className="pl-2 pr-4 relative">
                        <span
                            className="absolute left-0 top-0 bottom-0 w-3 bg-blue-500 rounded-l-md -mt-1 -mb-1 -ml-2 "

                        ></span>
                        <span class="font-semibold text-base -heading font-montserrat"> {props.translatedMenuItems[25]}:&nbsp;&nbsp; {props.recordData.count}</span>

                    </span>

                </div>
                {/* <Button onClick={() => props.handleLoadAvailableButton()}>{props.translatedMenuItems[26]}</Button> */}
                {/* <Search
      
      placeholder="Search by Order ID"
      enterButton={buttonText}
      style={{width:"22em"}}
     
      size="large"
      suffix={suffix}
      onSearch={handleButtonClick}  
      onChange={handleChange}
    
    value={currentData}
     
    /> */}

<div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-28">Order Date</div>
        <div className=" w-[4.2rem]">From</div>
        <div className=" w-16 ">To</div>
        <div className="w-32">Delivery Date</div>
        <div className=" w-32">Expected Price</div>
        <div className="">Cars</div>
        <div className="w-24">Order No</div>
        <div className="w-20">Offers</div>
        <div className="w-12">Action</div>
        {/* <div className="header-item"></div> */}
        {/* <div className="header-item"></div>
        <div className="header-item"></div> */}
      </div>
                {props.showLeadsAllTable.map((item) => {
                    const currentdate = dayjs().format("YYYY/MM/DD");
                    const date = dayjs(item.creationDate).format("YYYY/MM/DD");
                    const result = currentdate === date
                    const LocAdd = `${item.loadingAddresses[0].city}`;
                    const LocAdd1 = `${item.unloadingAddresses
                    [0].city}`;
                    const country = `${item.loadingAddresses[0].countryAlpha2Code}`
                    const country1 = `${item.unloadingAddresses[0].countryAlpha2Code}`
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-1 "
                                style={{
                                    border: "2px solid white "
                                }}>

                                <div className=" flex font-bold flex-col w-36 ">

                                    {/* <Link to={`/cardInfo/${item.requirementId}`}     > */}
                                    <Tooltip title={item.categoryName}>
                                        <h4 class=" text-sm  font-montserrat">
                                            {/* {result ? <span style={{ color: "red", fontWeight: "600" }}>New</span> : null} {translatedMenuItems[2]}:  */}
                                            {` ${dayjs(item.availabilityDate).subtract(1, 'day').format("DD-MM-YYYY")}`}
                                        </h4>
                                        {/* <h4 class=" text-sm  font-montserrat flex items-center">
                                            <ReactCountryFlag
                                                countryCode={country}
                                                svg
                                                style={{
                                                    width: '1em',
                                                    height: '1em',
                                                }}
                                                title={country}
                                            />
                                            &nbsp;
                                            {country},
                                            &nbsp;
                                            {LocAdd}
                                        </h4> */}

                                    </Tooltip>
                                    {/* </Link> */}
                                </div>
                                <div className=" flex font-bold flex-col w-36 ">
  <h4 class=" text-sm  font-montserrat flex items-center">
                                          
                                            {country},
                                            &nbsp;
                                            {LocAdd}
                                        </h4>

                                </div>
                                <div className=" flex font-bold flex-col w-32 ">
  <h4 class=" text-sm  font-montserrat flex items-center">
                                          
                                            {country1},
                                            &nbsp;
                                            {LocAdd1}
                                        </h4>

                                </div>
                                <div className=" flex font-bold flex-col  w-56 ">
                                    {/* {delivery date} */}
                                    <h4 class=" text-sm  font-montserrat"> 
                                    {/* {props.translatedMenuItems[3]}:  */}
                                    {`  ${dayjs(item.deliveryFromDate).subtract(1, 'day').format("DD-MM-YYYY")}`}</h4>
                                    {/* <h4 class=" text-sm  font-montserrat flex items-center">
                                        <ReactCountryFlag
                                            countryCode={country1}
                                            svg
                                            style={{
                                                width: '1em',
                                                height: '1em',
                                            }}
                                            title={country1}
                                        />
                                        &nbsp;
                                        {country1},
                                        &nbsp;
                                        {LocAdd1}
                                    </h4> */}

                                    {/* <h4 class=" text-sm  font-montserrat">
                        {item.endDate === null ? null : dayjs(item.endDate).format("ll")}
                      </h4> */}
                                </div>
                                
                                {/* <div className=" flex font-bold flex-col ">
                                        <Tooltip title={item.subCategoryName}>
                                            Delivery Date
                                            <h4 class=" text-sm  font-montserrat">{translatedMenuItems[3]}: {`  ${dayjs(item.endDate).format("DD-MM-YYYY")}`}</h4>

                                            <h4 class="text-sm  font-montserrat">
                                                {item.endDate}
                                            </h4>
                                        </Tooltip>
                                    </div> */}

                                <div className=" flex font-bold flex-col w-32 ">
                                    {/* Duration */}

                                    {/* <h4 class=" text-sm  font-montserrat">{translatedMenuItems[14]}</h4> */}
                                    <h4 class=" text-sm  font-montserrat">
                                    € {item.expectedPrice} 
                                    </h4>
                                </div>
                                <div className=" flex font-bold flex-col w-12 ">
                                    {/* # Cars */}
                                    {/* <h4 class=" text-sm  font-montserrat">{translatedMenuItems[15]}</h4> */}

                                    <h4 class=" text-sm  font-montserrat"
                                        onClick={() => {
                                            props.handleLoadCarModal(true)
                                            props.setRequirementsData(item);
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            color: "#5986FB",
                                        }}

                                    >
                                        <u>{item.noOfCars}</u>
                                    </h4>
                                </div>
                                <div className=" flex font-bold flex-col w-40 ">
                                    {/* Order No */}
                                    {/* <h4 class=" text-sm  font-montserrat">{translatedMenuItems[16]}</h4> */}

                                    <h4 class=" text-sm  font-montserrat">
                                        {item.newOrderNo}
                                    </h4>
                                </div>
                                <div className=" flex font-bold flex-col w-32 ">
                                    {/* Order No */}
                                    {/* <h4 class=" text-sm  font-montserrat">Full Truck</h4> */}

                                    <h4 class=" text-sm  font-montserrat">
                                        {/* {item.newOrderNo} */}
                                        {item.fullLoadTruckInd===true?"Yes":"No"}
                                    </h4>
                                </div>


                                <div class="w-16 mr-4">
                                    {props.approveInd === true &&
                                        <Button
                                            style={{ backgroundColor: "#586CB3", borderRadius: "1rem", padding: "0.25rem 1rem" }}
                                            onClick={() => { handleRowDatas(item); props.handleLeadsModal(true) }}
                                            // onClick={() => {
                                            //     if (item.fullLoadTruckInd === true) {
                                            //         props.handleLeadsModal(true);
                                            //         handleRowDatas(item);
                                            //     } else {
                                            //         props.handleBundleModal(true);
                                            //         // handleRowDatas(item);
                                            //         handleRowOrderDatas(item.orderId);
                                            //         props.getBundleData(item.orderId,props.serviceId,pageNo);
                                            //     }
                                            //     // props.handleLeadsModal(true);
                                                
                                            // }}
                                        >
                                            {/* Bid */}
                                            <h4 class=" text-white text-base font-bold"> {translatedMenuItems[6]}</h4>

                                        </Button>}
                                </div>

                            </div>
                        </div>


                    )
                })}

            </MainForBroker>
            {page < props.pageCount ?
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <FloatButton.Group style={{ width: "8rem", height: "5rem" }} >
                        <Button
                            style={{
                                color: "#5986FB",
                                fontWeight: "600",
                                fontSize: "15px",
                                padding: "0.25rem 1rem",
                                boxShadow: "0px 0px 5px 2px #d2e2ed",
                                borderRadius: "22px"
                            }}
                            onClick={() => handleLoadMore()}
                        >Load More</Button>
                    </FloatButton.Group>
                </div> : null}
            {/* <AddBundleModal
            orderId={rowOrderDatas}
            bundleCarrierData={props.bundleCarrierData}
                addBundleModal={props.addBundleModal}
                handleBundleModal={props.handleBundleModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
            /> */}
            <AddLeadsModal
                rowDatas={rowDatas}
                translatedMenuItems={props.translatedMenuItems}
                addLeadsModal={props.addLeadsModal}
                handleLeadsModal={props.handleLeadsModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            <AddEmptyTruckModal
                translateText={props.translateText}
                translatedMenuItems={props.translatedMenuItems}
                selectedLanguage={props.selectedLanguage}
                addEmptyTruckModal={props.addEmptyTruckModal}
                handleEmptyTruckModal={props.handleEmptyTruckModal}
            />
            <AddROwCarDetails
                handleLoadCarModal={props.handleLoadCarModal}
                addLoadCarModal={props.addLoadCarModal}
                setEditingRequirementsData={props.setEditingRequirementsData}
                translatedMenuItems={props.translatedMenuItems}

            />

        </>
    );

}
const mapStateToProps = ({ leads, auth, setting, requirement }) => ({
    listCount: leads.showLeadsAllTable.length && leads.showLeadsAllTable[0].listCount || "",
    pageCount: leads.showLeadsAllTable.length && leads.showLeadsAllTable[0].pageCount || "",
    serviceId: auth.serviceDetails.serviceId,
    showLeadsAllTable: leads.showLeadsAllTable,
    addEmptyTruckModal: leads.addEmptyTruckModal,
    endDate: leads.endDate,
    startDate: leads.startDate,
    type: leads.type,
    paidIndicator: leads.paidIndicator,
    fetchingLeadsTabData: leads.fetchingLeadsTabData,
    addStripeModal: leads.addStripeModal,
    openPayOptionModal: leads.openPayOptionModal,
     approveInd: auth.serviceDetails.approveInd,
    // creditPayModal: setting.creditPayModal,
     recordData: leads.recordData,
     addLeadsModal: leads.addLeadsModal,
    bundleCarrierData:leads.bundleCarrierData,
    addBundleModal: leads.addBundleModal,
    setEditingRequirementsData: requirement.setEditingRequirementsData,
    addLoadCarModal: requirement.addLoadCarModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getLeadsTabData,
            getLeadsDateWise,
            handleStripeModal,
            handleEmptyTruckModal,
            setLeadsCardData,
            handlePayOptionModal,
            emptyLeads,
            getPaymentBadgeCount,
            updatePaidLeads,
             getRecords,
            // notUpdatePaidLeads,
             handleLeadsModal,
            handleBundleModal,
            handleLoadCarModal,
            setRequirementsData,
            inputCareerDataSearch,
            getBundleData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Myleads);
const Desc = styled.div`
  height: 2em;
`;

const CatgryName = styled.div`
  font-size: 1rem;
  color: black;
    font-weight: 600;
    white-space: nowrap;
    @media only screen and (max-width: 600px) {
      width: 99%;
      font-size: 0.8rem;
    white-space: nowrap;
    }
`;
const SubCatgryName = styled.div`
  font-size: 1rem;
  color: black;
    font-weight: 600;
    white-space: nowrap;
    @media only screen and (max-width: 600px) {
      width: 85%;
      font-size: 0.8rem;
    white-space: nowrap;
    }
`;
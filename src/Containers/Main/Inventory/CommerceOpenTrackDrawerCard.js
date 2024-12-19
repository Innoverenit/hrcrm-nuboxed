import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';

const { Option } = Select;

function CommerceOpenTrackDrawerCard(props) {
    const [pageNo, setPageNo] = useState(0);
    
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trackDataList, settrackDataList] = useState([
      {
        "statusCode": 200,
        "statusFlag": true,
        "status": "SUCCESS",
        "errorDetails": null,
        "trackHeader": {
        "strShipmentNo": "B32242001",
        "strRefNo": "",
        "strCNType": "CP",
        "strCNTypeCode": "BF014",
        "strCNTypeName": "AVENUE ROAD",
        "strCNProduct": "LITE",
        "strModeCode": "",
        "strMode": "",
        "strCNProdCODFOD": "",
        "strOrigin": "BANGALORE",
        "strOriginRemarks": "Booked By",
        "strBookedDate": "21062017",
        "strBookedTime": "15:30:25",
        "strPieces": "1",
        "strWeightUnit": "KG",
        "strWeight": "0.1000",
        "strDestination": "MUMBAI",
        "strStatus": "Delivered",
        "strStatusTransOn": "21062017",
        "strStatusTransTime": "1614",
        "strStatusRelCode": "",
        "strStatusRelName": "",
        "strRemarks": "SIGN",
        "strNoOfAttempts": "1",
        "strRtoNumber": ""
        },
        "trackDetails": [
        {
        "strCode": "BKD",
        "strAction": "Booked",
        "strManifestNo": "",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "",
        "strActionDate": "21062017",
        "strActionTime": "1530",
        "sTrRemarks": ""
        },
        {
        "strCode": "OBMD",
        "strAction": "In Transit",
        "strManifestNo": "B7701202",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1533",
        "sTrRemarks": ""
        },
        {
        "strCode": "OPMF",
        "strAction": "In Transit",
        "strManifestNo": "B7701203",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1533",
        "sTrRemarks": ""
        },
        {
        "strCode": "IBMD",
        "strAction": "In Transit",
        "strManifestNo": "B7701202",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1533",
        "sTrRemarks": ""
        },
        {
        "strCode": "CDOUT",
        "strAction": "In Transit",
        "strManifestNo": "",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1546",
        "sTrRemarks": ""
        },
        {
        "strCode": "CDIN",
        "strAction": "In Transit",
        "strManifestNo": "",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1555",
        "sTrRemarks": ""
        },
        {
        "strCode": "IPMF",
        "strAction": "In Transit",
        "strManifestNo": "B7701203",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1603",
        "sTrRemarks": "0.00"
        },
        {
        "strCode": "IBMD",
        "strAction": "In Transit",
        "strManifestNo": "B7701202",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1603",
        "sTrRemarks": ""
        },
        {
        "strCode": "OBMD",
        "strAction": "In Transit",
        "strManifestNo": "B7701202",
        "strOrigin": "BANGALORE SURFACE APEX",
        "strDestination": "MUMBAI APEX",
        "strActionDate": "21062017",
        "strActionTime": "1603",
        "sTrRemarks": ""
        },
        {
        "strCode": "OUTDLV",
        "strAction": "Out For Delivery",
        "strManifestNo": "",
        "strOrigin": "MUMBAI APEX",
        "strDestination": "",
        "strActionDate": "21062017",
        "strActionTime": "1611",
        "sTrRemarks": ""
        },
        
        {
        "strCode": "DLV",
        "strAction": "Delivered",
        "strManifestNo": "",
        "strOrigin": "MUMBAI APEX",
        "strDestination": "",
        "strActionDate": "21062017",
        "strActionTime": "1614",
        "sTrRemarks": "SIGN"
        }
        ]
        }
    ]);
    const [date, setDate] = useState('');
    const [trackId, settrackId] = useState('');
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
   "660", // 'Order', // 0
   "218" ,// 'Packet', // 1
   "1486" ,// 'Track', // 2
 "660"   // ' Status', // 3
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

      const fetchTrackDetailsList = async () => {
        try {
          const response = await axios.get(`${base_url2}/dummy/${props.orderPhoneId}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          settrackDataList(response.data.trackDetails || []);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
 const handleInputChange = (value, key, dataIndex) => {
        const updatedData = trackDataList.map((item) =>
            item.procureOrderInvoiceId === key ? { ...item, [dataIndex]: value } : item
        );
        settrackDataList(updatedData);
        const updatedTrackId = updatedData.find(item => item.procureOrderInvoiceId === key)?.trackId;
    settrackId(updatedTrackId);
    };

      const handleEditClick = (procureOrderInvoiceId) => {
        setEditsuppliesId(procureOrderInvoiceId);
      };
      const handleCancelClick = (procureOrderInvoiceId) => {
        setEditedFields((prevFields) => ({ ...prevFields, [procureOrderInvoiceId]: undefined }));
        setEditsuppliesId(null);
      };

    const handlePostChange =  async (item) => {
        let updatedItem={
            shippingDate: new Date(date).toISOString(),
          trackId:trackId?trackId:item.trackId,
          procureOrderInvoiceId:item.procureOrderInvoiceId,
        }
        // props.updateOrdrSuplrItems(data);
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${props.token}`
          };

            const response = await axios.put(`${base_url2}/invoice/order/ship`, updatedItem, { headers });
            console.log("API Response:", response.data);
        settrackDataList(prevData => 
              prevData.map(cat =>
                cat.procureOrderInvoiceId === item.procureOrderInvoiceId ? response.data : cat
              )
            );
        
            setEditsuppliesId(null);
        
          } catch (error) {
            // Handle errors
            console.error("Error updating item:", error);
            setEditsuppliesId(null);
          }
      };

   
 useEffect(()=> {
  fetchTrackDetailsList();
 },[props.orderPhoneId]);

    
    const [particularRowData, setParticularRowData] = useState({})
    const handleRowData = (item) => {
        setParticularRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }
    const handleChangeCurrency = (val) => {
        setCurrency(val)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }

    const [hasMore, setHasMore] = useState(true);



    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[0]} ID</div>
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[1]} ID</div>
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[2]}</div>
                        <div className="md:w-[7.1rem]"> Date</div>
                        <div className="md:w-[7.1rem]">Origin</div>
                        <div className="md:w-[7.1rem]">Destination</div>
                    </div>
                    <div class="">
                        
                    {trackDataList.length ? (
                <>
                    {trackDataList.map((item, index) => {
                        return item.trackDetails?.map((detail, i) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                           {item.orderPhoneId}
                                                           

                                                        </div>
                                                        {/* {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null} */}
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.packetId}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        <span
                                                                    // class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                       // handleRowData(item);
                                                                        // props.handleInvoiceModal(true);
                                                                    }}
                                                                > 
                                                                {item.trackId}
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {detail.strCode}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                        {dayjs(detail.strActionDate).format("DD/MM/YYYY")} {detail.strActionTime}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                        {detail.strOrigin}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                        {detail.strDestination}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                         </>
                                 );
                                });
                            })}
                        </>
                    ) : !trackDataList.length && !loading ? (
                        <NodataFoundPage />
                    ) : null}
                    </div>
                </div>
            </div>
          
        </>
    )
}
const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CommerceOpenTrackDrawerCard);

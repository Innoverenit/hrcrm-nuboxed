import React, { useState,useRef, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button,Badge,Input } from "antd";
import { getAllShipper } from "../Shipper/ShipperAction";
import dayjs from "dayjs";

import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getDispatchList,
  addFinalDispatchData,
  handlePickupDateModal,
  updateDispatchInspectionButton,
  handleCreateAWB,
  handleInventoryDispatchModal,
  handleCreateAddPack,
  handlepackId,
  clearDispatch,
  getCompleteDispatchSearch
} from "./InventoryAction"
import DispatchToggle from "./DispatchToggle"
import {handleProductionNotesModal} from "../Refurbish/RefurbishAction"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { withRouter } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import DispatchPhoneListModalInventory from "./Child/InventoryDetails/Dispatch/DispatchPhoneListModalInventory";
import SubOrderList from "../Account/AccountDetailsTab/AccountOrderTab/SubOrderList";
import RefurbishNoteAll from "../Refurbish/RefurbishNoteAll";
import DispatchPackedToggle from "./Child/InventoryDetails/Dispatch/DispatchPackedToggle";
import DispatchValidationToggle from "./Child/InventoryDetails/Dispatch/DispatchValidationToggle";
import DispatchOrderAwbModal from "./Child/InventoryDetails/Dispatch/DispatchOrderAwbModal";
import AddpackDrawer from "./AddpackDrawer";
import AddpackID from "./AddpackID";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UpdateIcon from '@mui/icons-material/Update';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import jsPDF from "jspdf";
import "jspdf-autotable";
import CommerceOpenTrackDrawer from "./CommerceOpenTrackDrawer";
import CommerceOpenTrackDrawerCard from "./CommerceOpenTrackDrawerCard";

// Repair -Dis-2




function DispatchCommerceAndRepairTableOut(props) {
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const[OpenTrack,setOpenTrack]=useState(false);

  const minRecordingTime = 3000; // 3 seconds
const timerRef = useRef(null);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    setPageNo(pageNo + 1);
    if(props.viewType === "repair"){
      props.getDispatchList(props.locationDetailsId,pageNo,"Repair");
    }
    else if(props.viewType === "commerce") {
    props.getDispatchList(props.locationDetailsId,pageNo,"Procure");
    }
    props. clearDispatch();
  }, []);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '672', // 0
'260', // 1
'780', // 2
'1408', // 3 Packed by
'772', // 4
'887', // 5
"1606",// 'Pick up', // 6
'1486', // 7 Track
'142', // 8 status
             
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
  
  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = () => {
    const callPageMapd = props.allDispatchList && props.allDispatchList.length &&props.allDispatchList[0].pageCount
    setTimeout(() => {
      const {
        getDispatchList,
       // userDetails: { employeeId },
      } = props;
      if  (props.allDispatchList)
      {
        if (pageNo < callPageMapd) {
            setPageNo(pageNo + 1);
            getDispatchList(props.locationDetailsId,pageNo); 
      }
      if (pageNo === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  const [rowData, setRowData] = useState({})

  const handleRowData = (item) => {
    setRowData(item)
  }
  const [checkAwb, setCheckAwb] = useState(false)

  const handleCheckAwb = () => {
      setCheckAwb(!checkAwb)
  }

 const handleOpenTrack = ()=>{
    setOpenTrack(!OpenTrack);
  }
const AWBtst=[
  {
      "userId": "EMP16818052295222021",
      "orderPhoneId": "ORDPG71890357520182024",
      "locationId": "LDS65468903772222023",
      "orderInventoryLocationLinkId": "OILLG87418979421182024",
      "createAt": "2024-07-18T05:55:42.818Z",
      "activeInd": true,
      "transferInd": 2,
      "phoneCount": 0,
      "count": 0,
      "contactPersonId": "COIG1030765006232024",
      "newOrderNo": "000118072024",
      "inspectionInd": 0,
      "phoneReceiveCount": 6,
      "repairRemainingQuantity": 0,
      "phoneRemainingQuantity": 0,
      "qcStartInd": 3,
      "qcRepairInd": 3,
      "dispatchPhoneCount": 6,
      "dispatchInspectionInd": 3,
      "dispatchedBy": "null",
      "dispatchDate": "null",
      "shipperId": "null",
      "pickedInd": false,
      "stopDispatchInspectionUser": "EMP88224136459212024",
      "stopDispatchInspectionDate": "2024-07-18T06:09:23.663Z",
      "stopDispatchInspectionUserName": "Test Ku Manager",
      "unloadingAddresses": [
          {
              "addressId": null,
              "addressType": null,
              "address1": null,
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "Nilamskj",
              "postalCode": null,
              "country": null,
              "longitude": null,
              "latitude": null,
              "creatorId": null,
              "state": null,
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": null,
              "countryAlpha3Code": null
          }
      ],
      "pickUpAddress": [
          {
              "addressId": "ADIF24591555098182024",
              "addressType": null,
              "address1": "",
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "",
              "postalCode": null,
              "country": "",
              "longitude": "",
              "latitude": "",
              "creatorId": null,
              "state": "",
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": "IN",
              "countryAlpha3Code": "IND"
          }
      ],
      "dispatchReceivedInd": false,
      "newAwbNo": "4354564",
      "weight": 0.0,
      "materialCount": 0,
      "inventoryReceiveInd": false,
      "offerPrice": 0.0,
      "finalPrice": 0.0,
      "expectedPrice": 0.0,
      "mismatchOrderInd": false,
      "cannotRepairCount": 0,
      "pickUpDate": "2024-07-17T18:30:00Z",
      "orderCompleteInd": false,
      "pageCount": 6,
      "dataCount": 20,
      "listCount": 102
  },
  {
      "userId": "EMP16818052295222021",
      "orderPhoneId": "ORDPG4586083473992024",
      "locationId": "LDS65468903772222023",
      "orderInventoryLocationLinkId": "OILLG8438439003992024",
      "createAt": "2024-07-09T05:37:32.026Z",
      "activeInd": true,
      "transferInd": 2,
      "phoneCount": 0,
      "count": 0,
      "contactPersonId": "COIG1030765006232024",
      "newOrderNo": "000109072024",
      "inspectionInd": 0,
      "phoneReceiveCount": 6,
      "repairRemainingQuantity": 6,
      "phoneRemainingQuantity": 6,
      "qcStartInd": 3,
      "qcRepairInd": 3,
      "dispatchPhoneCount": 6,
      "dispatchInspectionInd": 4,
      "dispatchedBy": "null",
      "dispatchDate": "null",
      "shipperId": "null",
      "pickedInd": false,
      "stopDispatchInspectionUser": "EMP88224136459212024",
      "stopDispatchInspectionDate": "2024-07-09T06:11:51.817Z",
      "stopDispatchInspectionUserName": "Test Ku Manager",
      "unloadingAddresses": [
          {
              "addressId": null,
              "addressType": null,
              "address1": null,
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "Chamilkens",
              "postalCode": null,
              "country": null,
              "longitude": null,
              "latitude": null,
              "creatorId": null,
              "state": null,
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": null,
              "countryAlpha3Code": null
          }
      ],
      "pickUpAddress": [
          {
              "addressId": "ADIF244566826392024",
              "addressType": null,
              "address1": "",
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "",
              "postalCode": null,
              "country": "",
              "longitude": "",
              "latitude": "",
              "creatorId": null,
              "state": "",
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": "IN",
              "countryAlpha3Code": "IND"
          }
      ],
      "dispatchReceivedInd": false,
      "newAwbNo": "null",
      "weight": 0.0,
      "materialCount": 0,
      "inventoryReceiveInd": false,
      "offerPrice": 0.0,
      "finalPrice": 0.0,
      "expectedPrice": 0.0,
      "mismatchOrderInd": false,
      "cannotRepairCount": 0,
      "pickUpDate": "2024-07-08T18:30:00Z",
      "orderCompleteInd": false,
      "pageCount": 6,
      "dataCount": 20,
      "listCount": 102
  },
  {
      "userId": "EMP16818052295222021",
      "orderPhoneId": "ORDPG1567078640632024",
      "locationId": "LDS65468903772222023",
      "orderInventoryLocationLinkId": "OILLG7738984419032024",
      "createAt": "2024-07-03T12:29:20.164Z",
      "activeInd": true,
      "transferInd": 2,
      "phoneCount": 0,
      "count": 0,
      "contactPersonId": "COIG1030765006232024",
      "newOrderNo": "000103072024",
      "inspectionInd": 0,
      "phoneReceiveCount": 5,
      "repairRemainingQuantity": 6,
      "phoneRemainingQuantity": 6,
      "qcStartInd": 3,
      "qcRepairInd": 3,
      "dispatchPhoneCount": 5,
      "dispatchInspectionInd": 4,
      "dispatchedBy": "null",
      "dispatchDate": "null",
      "shipperId": "null",
      "pickedInd": false,
      "stopDispatchInspectionUser": "EMP3230714710282024",
      "stopDispatchInspectionDate": "2024-07-03T13:34:08.966Z",
      "stopDispatchInspectionUserName": "Rakesh sahoo",
      "unloadingAddresses": [
          {
              "addressId": null,
              "addressType": null,
              "address1": null,
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": null,
              "postalCode": null,
              "country": null,
              "longitude": null,
              "latitude": null,
              "creatorId": null,
              "state": null,
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": null,
              "countryAlpha3Code": null
          }
      ],
      "pickUpAddress": [
          {
              "addressId": "ADIF2753392581032024",
              "addressType": null,
              "address1": "",
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "",
              "postalCode": null,
              "country": "",
              "longitude": "",
              "latitude": "",
              "creatorId": null,
              "state": "",
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": "IN",
              "countryAlpha3Code": "IND"
          }
      ],
      "dispatchReceivedInd": false,
      "newAwbNo": "765644",
      "weight": 0.0,
      "materialCount": 0,
      "inventoryReceiveInd": false,
      "offerPrice": 0.0,
      "finalPrice": 0.0,
      "expectedPrice": 0.0,
      "mismatchOrderInd": false,
      "cannotRepairCount": 0,
      "pickUpDate": "2024-07-02T18:30:00Z",
      "orderCompleteInd": false,
      "pageCount": 6,
      "dataCount": 20,
      "listCount": 102
  },
  {
    "userId": "EMP16818052295222021",
    "orderPhoneId": "ORDPG6454078640632024",
    "locationId": "LDS65468903772222023",
    "orderInventoryLocationLinkId": "OILLG7738984419032024",
    "createAt": "2024-07-03T12:29:20.164Z",
    "activeInd": true,
    "transferInd": 2,
    "phoneCount": 0,
    "count": 0,
    "contactPersonId": "COIG1030765006232024",
    "newOrderNo": "000103072024",
    "inspectionInd": 0,
    "phoneReceiveCount": 5,
    "repairRemainingQuantity": 6,
    "phoneRemainingQuantity": 6,
    "qcStartInd": 3,
    "qcRepairInd": 3,
    "dispatchPhoneCount": 5,
    "dispatchInspectionInd": 4,
    "dispatchedBy": "null",
    "dispatchDate": "null",
    "shipperId": "null",
    "pickedInd": false,
    "stopDispatchInspectionUser": "EMP3230714710282024",
    "stopDispatchInspectionDate": "2024-07-03T13:34:08.966Z",
    "stopDispatchInspectionUserName": "Rakesh sahoo",
    "unloadingAddresses": [
        {
            "addressId": null,
            "addressType": null,
            "address1": null,
            "address2": null,
            "houseNo": null,
            "town": null,
            "street": null,
            "city": null,
            "postalCode": null,
            "country": null,
            "longitude": null,
            "latitude": null,
            "creatorId": null,
            "state": null,
            "employeeId": null,
            "contactPersonId": null,
            "countryCode": null,
            "countryAlpha2Code": null,
            "countryAlpha3Code": null
        }
    ],
    "pickUpAddress": [
        {
            "addressId": "ADIF2753392581032024",
            "addressType": null,
            "address1": "",
            "address2": null,
            "houseNo": null,
            "town": null,
            "street": null,
            "city": "",
            "postalCode": null,
            "country": "",
            "longitude": "",
            "latitude": "",
            "creatorId": null,
            "state": "",
            "employeeId": null,
            "contactPersonId": null,
            "countryCode": null,
            "countryAlpha2Code": "IN",
            "countryAlpha3Code": "IND"
        }
    ],
    "dispatchReceivedInd": false,
    "newAwbNo": "null",
    "weight": 0.0,
    "materialCount": 0,
    "inventoryReceiveInd": false,
    "offerPrice": 0.0,
    "finalPrice": 0.0,
    "expectedPrice": 0.0,
    "mismatchOrderInd": false,
    "cannotRepairCount": 0,
    "pickUpDate": "2024-07-02T18:30:00Z",
    "orderCompleteInd": false,
    "pageCount": 6,
    "dataCount": 20,
    "listCount": 102
}
]
const exportTemplateCMRPage = async () => {
  var doc = new jsPDF();

  var name1 = `1 `
  var name12 =`Absender (Name, Adresse, Land)	`
  var name11 =`Sender (name, address, country)	`
  var name2 = `INTERNATIONALER FRACHTBRIEF`
  var name2a1 = `INTERNATIONAL CONSIGNEMENT NOTE`
  var name2a2 = `Diese Beförderung unterliegt, unbeschadet anders `
  var name2a3 =`lautender Bestimmungen, dem Übereinkommen über `
  var name2a4 =`den Vertrag über den internationalen Güterkraftverkehr 
  (CMR).`
  var name2a5 =`This carriage is subject, notwithstanding any`
  var name2a6 =`clause to the contrary, to the Convention on the`
  var name2a7 =`Contract for the international Carriage of goods`
  var name2a8 =`by road (CMR).`
  var name2a9 =`No (CMR)`
  var name3 = `2`
  var name31 = `Empfänger (Name, Adresse, Land)`
  var name32 = `Consignee (name, address, country)`
  var name4 = `16`
  var name41 = `Frachtführer (Name, Adresse, Land)`
  var name42 = `Carrier (name, address, country)`
  var name5 = `3`
  var name51 = `Auslieferort des Gutes (Ort, Land)`
  var name52 = `Place of delivery of the goods (place, country)`
  var name6 = `17`
  var name61 = `Nachfolgender Frachtführer (Name, Adresse, Land)`
  var name62 = `Successive carriers (name, address, country)`
  var name7A = `4`
  var name7A1 = `Ort und Datum der Übernahme des Gutes (Ort, Land, Datum)`
  var name7A2 = `4Place and date of taking over the goods (place, country, date)`
  var name7B = `5`
  var name7B1 = `Beigefügte Dokumente`
  var name7B2 = `Documents attached`
  var name8 = `18`
  var name81 = `Vorbehalte und Bemerkungen der Frachtführer`
  var name82 = `Carrier's reservations and observations`
  var name9A = `6`
  var name9A1 = `Kennzeichen u. Nummern`
  var name9A2 = `Marks and Nos`
  var name9B = `7`
  var name9B1 = `Anzahl der Pakete`
  var name9B2 = `Number of pakages`
  var name9C = `8`
  var name9C1 = `Art der Verpackung`
  var name9C2 = `Method of packing`
  var name9D = `9`
  var name9D1 = `Bezeichnung des Gutes*`
  var name9D2 = `Nature of the goods*`
  var name10A = `10`
  var name10A1 = `Statistiknr.`
  var name10A2 = `Statistical nr.`
  var name10B = `11`
  var name10B1 = `Bruttogew. kg`
  var name10B2 = `Gross weight kg`
  var name10C = `12`
  var name10C1 = `Volumen in m3`
  var name10C2 = `Volume in m3`
  var name11A1 = `UN-Nr.`
  var name11A = `Ben. s. Nr. 9`
  var name11A2 = `name s. nr. 9`
  var name11B = `Gefahrzettelmuster-Nr.`
  var name11B1 = `Hazard label sample no.`
  var name11C = `Verp.-Grp.`
  var name11C1 = `Pack. group`
  var name13 = `13`
  var name131 = `Anweisungen des Absenders (Zoll-, amtl. Behandlungen, Sondervorschriften, etc.)`
  var name132 = `Sender's instructions`
  var name19 = `19`
  var name191 = `Zu bezahlen vom`
  var name192 = `To be paid by`
  var asender=`Absender`
  var sender=`Sender`
  var war=`Währung`
  var currency=`Currency`
  var empf=`Empfänger`
  var consi=`Consignee`
  var farchat=`Fracht`
  var carriage=`Carriage`
  var erma=`Ermäßigung`
  var reduct=`Reductions`
  var zusci=`Zwischensumme`
  var balance=`Balance`
  var zhusci=`Zuschläge`
  var supplimentc=`Supplement charges`
  var nebenge=`Nebengebühren`
  var additioncg=`Additional charges`
  var snosotigies=`Sonstiges`
  var misuilenous=`Miscellaneous`
  var gesmtbe=`Gesamtbetrag`
  var totalbepaid=`Total to be paid`
  var name14 = `14`
  var ruckwer=`Ruckerstattung`
  var cashofdeli=`Cash on delivery`
  var name15 = `15`
  var name151 = `Frachtzahlungsanweisungen`
  var name152 = `Instruction as to payement carriage`
  var name153 = `Frei/Carriage paid`
  var name154 = `Unfrei/Carriage forward`
  var name20 = `20`
  var name201 = `Besondere Vereinbarungen`
  var name202 = `Special agreements`
  var name21 = `21`
  var name211 = `Ausgefertigt in`
  var name212 = `Established in`
  var name22 = `22`
  var name221 = `Signatur und Stempel des Absenders`
  var name222 = `Signature and stamp of the sender`
  var name23 = `23`
  var name231 = `Unterschrift und Stempel des Frachtführers`
  var name232 = `Signature and stamp of the carrier`
  var name24 = `24`
  var name241 = `Unterschrift und Stempel des Empfängers`
  var name242 = `Signature and stamp of the consignee`
  var name243 = `Gut empfangen`
  var name244 = `Goods received`
  var name245 =`Ort`
  var name246 =`Place`
  var name247 =`am`
  var name248 =`on`
  var value = "4"
  var header = `Exemplar für
Copy for`
  doc.setFont("Montserrat");
  doc.setFillColor(77, 208, 225);
  doc.rect(0, 0, 230, 13, 'F');
  doc.setFontSize(25);
  doc.text(value, 3, 8)
  doc.setFontSize(12);
  doc.text(header, 11, 5)

  //box-1
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(5, 13, 100, 22); // x, y, width, height //make box 2
  doc.text(name1, 8, 19);
  doc.setFontSize(7);
  doc.text(name12, 11, 18);
  doc.text(name11, 11, 21);
  // doc.text("Content/Text of box -1", 8, 23);
  //box-2
  doc.setFontSize(7);
  doc.setDrawColor(0, 0, 0)
  doc.rect(105, 13, 100, 22); ///make box 1
  doc.text(name2, 105, 17);
  doc.text(name2a1, 105, 20);
  doc.setFontSize(6);
  doc.text(name2a2, 105, 27);
  doc.text(name2a3, 105, 29);
  doc.text(name2a4, 105, 31);
  doc.text(name2a5, 160, 26);
  doc.text(name2a6, 160, 28);
  doc.text(name2a7, 160, 30);
  doc.text(name2a8, 160, 32);
  doc.setFontSize(10);
  doc.text(name2a9, 160, 20);
  
  //box-3
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(5, 35, 100, 22); // x, y, width, height //make box 2
  doc.text(name3, 8, 40);
  doc.setFontSize(7);
  doc.text(name31, 11, 39);
  doc.text(name32, 11, 42);
  // doc.text("Content/Text of box -3", 8, 43);
  // box 4
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(105, 35, 100, 22); ///make box 1
  doc.text(name4, 110, 40);
  doc.setFontSize(7);
  doc.text(name41, 115, 39);
  doc.text(name42, 115, 42);
  // doc.text("Content/Text of box -4", 110, 43);
  //box -5
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(5, 57, 100, 22); // x, y, width, height //make box 2
  doc.text(name5, 8, 61);
  doc.setFontSize(7);
  doc.text(name51, 11, 60);
  doc.text(name52, 11, 63);
  //box -6
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(105, 57, 100, 22); ///make box 1
  doc.text(name6, 110, 61);
  doc.setFontSize(7);
  doc.text(name61, 115, 60);
  doc.text(name62, 115, 63);
  // box -7A
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(5, 79, 100, 13); // x, y, width, height //make box 2
  doc.text(name7A, 8, 83);
  doc.setFontSize(7);
  doc.text(name7A1, 11, 82);
  doc.text(name7A2, 11, 85);
  // //box-7B
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(5, 92, 100, 13); // x, y, width, height //make box 2
  doc.text(name7B, 8, 97);
  doc.setFontSize(7);
  doc.text(name7B1, 11, 96);
  doc.text(name7B2, 11, 99);

  //box -8
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(105, 79, 100, 26);
  doc.text(name8, 110, 83);
  doc.setFontSize(7);
  doc.text(name81, 115, 82);
  doc.text(name82, 115, 85);
  //box-9
  doc.setFontSize(10);
  doc.setDrawColor(0, 0, 0)
  doc.rect(5, 105, 115, 50); // x, y, width, height //make box 2
  doc.text(name9A, 7, 113);
  doc.setFontSize(7);
  doc.text(name9A1, 10, 112);
  doc.text(name9A2, 10, 115);
  doc.setFontSize(10);
  doc.text(name9B, 39, 113);
  doc.setFontSize(7);
  doc.text(name9B1, 42, 112);
  doc.text(name9B2, 42, 115);
  doc.setFontSize(10);
  doc.text(name9C, 63, 113);
  doc.setFontSize(7);
  doc.text(name9C1, 66, 112);
  doc.text(name9C2, 66, 115);
  doc.setFontSize(10);
  doc.text(name9D, 90, 113);
  doc.setFontSize(7);
  doc.text(name9D1, 92, 112);
  doc.text(name9D2, 92, 115);
  // box-10
  doc.setFontSize(10);
  doc.rect(120, 105, 28, 62);
  doc.rect(148, 105, 28, 62);
  doc.rect(176, 105, 29, 62);
  doc.text(name10A, 123, 113);
  doc.setFontSize(7);
  doc.text(name10A1, 128, 112);
  doc.text(name10A2, 128, 115);
  doc.setFontSize(10);
  doc.text(name10B, 152, 113);
  doc.setFontSize(7);
  doc.text(name10B1, 157, 112);
  doc.text(name10B2, 157, 115);
  doc.setFontSize(10);
  doc.text(name10C, 180, 113);
  doc.setFontSize(7);
  doc.text(name10C1, 185, 112);
  doc.text(name10C2, 185, 115);
  // box-11
  doc.setFontSize(6);
  doc.setDrawColor(0, 0, 0)
  doc.rect(5, 155, 115, 12);
  doc.text(name11A1, 6, 159);
  doc.text(name11A, 20, 159);
  doc.text(name11A2, 20, 165);
  doc.text(name11B, 50, 159);
  doc.text(name11B1, 50, 165);
  doc.text(name11C, 80, 159);
  doc.text(name11C1, 80, 165);
  // //box -12
  doc.setFontSize(10);
  doc.rect(5, 167, 100, 53);
  doc.text(name13, 7, 175);
  doc.setFontSize(7);
  doc.text(name131, 12, 174);
  doc.text(name132, 12, 177);

  //box 13 table
  doc.setFontSize(10);
  doc.text(name19, 106, 171);
  doc.setFontSize(7);
  doc.text(name191, 110, 170);
  doc.text(name192, 110, 173);
  doc.text(asender, 130, 170);
  doc.text(sender, 130, 173);
  doc.text(war, 157, 170);
  doc.text(currency, 157, 173);
  doc.text(empf, 180, 170);
  doc.text(consi, 180, 173);
  doc.text(farchat, 106, 177);
  doc.text(carriage, 106, 180);
  doc.text(erma, 106, 183);
  doc.text(reduct, 106, 186);
  doc.text(zusci, 106, 191);
  doc.text(balance, 106, 194);
  doc.text(zhusci, 106, 197);
  doc.text(supplimentc, 106, 200);
  doc.text(nebenge, 106, 203);
  doc.text(additioncg, 106, 206);
  doc.text(snosotigies, 106, 209);
  doc.text(misuilenous, 106, 212);
  doc.text(gesmtbe, 106, 216);
  doc.text(totalbepaid, 106, 219);
  doc.rect(105, 167, 25, 53);
  doc.rect(130, 167, 25, 53);
  doc.rect(155, 167, 25, 53);//column
  doc.rect(180, 167, 25, 53);

  doc.rect(105, 167, 100, 7);
  doc.rect(105, 174, 100, 14); //row
  doc.rect(105, 188, 100, 26);
  doc.rect(105, 214, 100, 6);

  doc.rect(130, 174, 75, 7); //sub-row-row2
  doc.rect(130, 181, 75, 7);

  doc.rect(130, 188, 75, 6); //sub-row-row3
  doc.rect(130, 194, 75, 7);
  doc.rect(130, 201, 75, 6); //sub-row
  doc.rect(130, 207, 75, 7);

  //box-14
  doc.setFontSize(10);
  doc.rect(5, 220, 200, 9);
  doc.text(name14, 8, 224);
  doc.setFontSize(7);
  doc.text(ruckwer, 14, 223);
  doc.text(cashofdeli, 14, 226);
  // box -15
  doc.setFontSize(10);
  doc.rect(5, 229, 100, 11); // x, y, width, height //make box 2
  doc.text(name15, 8, 234);
  doc.setFontSize(7);
  doc.text(name151, 14, 231);
  doc.text(name152, 14, 233.5);
  doc.text(name153, 11, 236.5);
  doc.text(name154, 11, 239.5);
  //box-16
  doc.setFontSize(10);
  doc.rect(5, 240, 100, 11); // x, y, width, height //make box 2
  doc.text(name21, 8, 244);
  doc.setFontSize(7);
  doc.text(name211, 14, 243);
  doc.text(name212, 14, 246);
  //box -17   
  doc.setFontSize(10);     
  doc.rect(105, 229, 100, 22);
  doc.text(name20, 110, 233);
  doc.setFontSize(7);
  doc.text(name201, 115, 232);
  doc.text(name202, 115, 235);

  // box -18
  doc.setFontSize(10);
  doc.rect(5, 251, 67, 25); // x, y, width, height //make box 2
  doc.text(name22, 8, 255);
  doc.setFontSize(7);
  doc.text(name221, 14, 272);
  doc.text(name222, 14, 275);
  //box-19
  doc.setFontSize(10);
  doc.rect(72, 251, 66, 25); // x, y, width, height //make box 2
  doc.text(name23, 77, 255);
  doc.setFontSize(7);
  doc.text(name231, 82, 272);
  doc.text(name232, 82, 275);
  //box -20       
  doc.setFontSize(10);
  doc.rect(138, 251, 67, 25);
  doc.text(name24, 140, 257);
  doc.setFontSize(7);
  doc.text(name241, 145, 272);
  doc.text(name242, 145, 275);
  doc.text(name243, 145, 256);
  doc.text(name244, 145, 259);
  doc.text(name245, 145, 263);
  doc.text(name246, 145, 266);
  doc.text(name247, 160, 263);
  doc.text(name248, 160, 266);

  //footer
  doc.setFillColor(77, 208, 225);
  doc.rect(0, 276, 230, 15, 'F');

  doc.save(`CMR ${dayjs().format("L")}`);

}
const {
  transcript,
  listening,
  resetTranscript,
  browserSupportsSpeechRecognition
} = useSpeechRecognition();
useEffect(() => {
  // props.getCustomerRecords();
  if (transcript) {
    console.log(">>>>>>>", transcript);
    setCurrentData(transcript);
  }
  }, [ transcript]);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter&&e.target.value.trim() === "") {
        //setPageNo(pageNo + 1);
        setPageNo(0);
        props.getDispatchList(props.locationDetailsId,0,"Procure");
        props.clearDispatch();
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.getCompleteDispatchSearch(props.locationDetailsId,"Procure",currentData);
      setSearchOnEnter(true);  //Code for Search
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleStartListening = () => {
    setStartTime(Date.now());
    setIsRecording(true);
    SpeechRecognition.startListening();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    }, minRecordingTime);
  };
  const suffix = (
    <MicIcon
      onClick={handleStartListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    if (transcript.trim() !== "") {
      setCurrentData(transcript);
      props.getCompleteDispatchSearch(props.locationDetailsId,"Procure",transcript);
      setSearchOnEnter(true);
    }
  };
  useEffect(() => {
    if (!listening && isRecording) {
      handleStopListening();
    }
  }, [listening]);
  useEffect(() => {
    if (isRecording && !listening) {
      // If recording was stopped but less than 5 seconds have passed, restart listening
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minRecordingTime) {
        SpeechRecognition.startListening();
      } else {
        setIsRecording(false);
      }
    }
  }, [listening, isRecording, startTime]);

  return (
    <>
     <div class=" w-72 ml-1 max-sm:w-28">
          <Input
            placeholder= "Search by OrderNo"
            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
             value={currentData}
        
          />
        </div>
        <div className=' flex  sticky  z-auto'>
          <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className=" flex max-sm:hidden justify-between w-[86%]  p-1 bg-transparent font-bold !text-lm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] sticky items-end z-10">
              <div className=" w-[15.51rem] text-sm text-[#00A2E8] truncate max-md:  max-xl:w-[5.5rem]">
              <DynamicFeedIcon className='!text-icon  text-[#3ac427]'/>  
              {translatedMenuItems[0]}
                </div>
              <div className="w-[6.9rem] truncate max-md:w-[3.5rem]  max-xl:w-[3.5rem]">
                {/* Units" /> */}
                {translatedMenuItems[1]}
                </div>
              <div className="w-[10.03rem] truncate max-md:w-[5.01rem] max-xl:w-[5.001rem]">
                {/* Inspection" /> */}
                <BookmarkAddedIcon className="!text-icon  text-[#d64933]"/>  {translatedMenuItems[2]}
                </div>

              <div className="w-[6.3rem] truncate max-md:w-[5.03rem] max-xl:w-[5.03rem]">
                {/* Packed ?" /> */}
                <AccountCircleIcon className="!text-icon  text-[#832161]"/>{translatedMenuItems[3]}
                </div>
              <div className="w-[7.4rem] truncate max-md:w-[10.2rem] max-xl:w-[5.3rem]">
                {/* "Delivery" /> */}
                <LocalShippingIcon className='!text-icon  text-[#832161]'/>  {translatedMenuItems[4]}
                </div>
              <div className=" w-[9.03rem] truncate max-md:w-[8.03rem] max-xl:w-[6.03rem]">
                {/* Shipper" /> */}
                <LocalShippingIcon className='!text-icon  text-[#6ba368]'/> {translatedMenuItems[5]}
                </div>
              < div className=" w-[8.2rem] truncate max-md:w-[4.5rem] max-xl:w-[5.5rem]">
              {/* pickup" /> */}
              <   RvHookupIcon className='!text-icon mr-1 text-[#6ba368]'/> {translatedMenuItems[6]}
              </div>
              <div className="w-[3.9rem] truncate max-md:w-[3.51rem] max-xl:w-[3.5rem]">
               
               {/*   Track */} <GpsFixedIcon className='!text-icon    text-[#42bfdd]' /> {translatedMenuItems[7]}
               </div>
              <div className=" w-[8.2rem] truncate max-md:w-[4.20rem] max-xl:w-[4.20rem]">
                {/* Status" /> */}
                <UpdateIcon className='!text-icon text-[#ff66b3]' /> {translatedMenuItems[8]}
                </div>
               
              {/* <div className="w-[3.1rem] truncate max-md:w-[3.51rem] max-xl:w-[3.5rem]">
                Pick Up" />
                {translatedMenuItems[9]}
                </div> */}
             
            </div>
            <InfiniteScroll
              dataLength={props.allDispatchList.length}
              // dataLength={AWBtst.length}
               next={handleLoadMore}
               hasMore={hasMore}
               loader={props.fetchingDispatchList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
              style={{ overflowX: "hidden", scrollbarWidth:"thin" }}
              endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
            >
              {
              props.allDispatchList.length 
              // AWBtst.length
              ? 
              <>
                {
                props.allDispatchList
                .map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.createAt).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div className="flex rounded justify-between mt-1 bg-white items-center py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex  w-[7.2rem] border-l-2  h-8 border-green-500 bg-[#eef2f9] max-xl:w-[5.2rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                            <div class="text-xs flex items-center ml-gap font-bold underline font-poppins cursor-pointer   max-sm:text-sm text-blue-600">
                              <div
                                onClick={() => {
                                  handleRowData(item);
                                  props.handleInventoryDispatchModal(true);
                                }}
                              >{item.newOrderNo}</div>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-[0.65rem] font-bold text-[tomato]">
                                  New
                                </div>
                              ) : null}
                            </div>
                          </div>
                          





                                                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[6.8rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            {/* <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.awbCount || 0}
                                                                overflowCount={999}
                                                            > */}
                                                                <Button
                                                                    style={{ boxShadow: "#faad14 1px 2px 0px 0px" }}
                                                                    class=" bg-green-500"
                                                                    onClick={() => {
                                                                       
                                                                      props.handleCreateAddPack(true);
                                                                      handleRowData(item)
                                                                  }
                                                                  }
                                                                ><span className='!text-[#faad14]'>
                                                                  Add Pack
                                                                  </span></Button>
                                                           
                                                        </div>
                                                    </div>
                                                  
                        </div>

                        <div class="flex max-sm:justify-between max-sm:w-wk items-center ">


                          <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9]  w-[6.14rem] max-xl:w-[2.6rem] max-lg:w-[2.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  ml-gap font-poppins  max-sm:text-sm">
                              {item.dispatchPhoneCount}/{item.phoneReceiveCount}
                            </div>
                          </div>
                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[8.5rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                              {item.dispatchInspectionInd === 0 ?
                                <Button
                                  loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingDispatchInspectionButton}
                                  onClick={() => {
                                    handleRowData(item);
                                    props.updateDispatchInspectionButton({ dispatchInspectionInd: 1 }, item.orderPhoneId, props.locationDetailsId)
                                  }}
                                  style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
                                  Start
                                </Button>
                                : item.dispatchInspectionInd === 2 ||
                                  item.dispatchInspectionInd === 3 ||
                                  item.dispatchInspectionInd === 4 ?
                                  <div class=" text-[green]">Completed</div>
                                  : item.dispatchInspectionInd === 1 ?
                                    <div class=" text-[tomato]">
                                  In Progress
                                    </div> :
                                    null}
                            </div>
                          </div>
                          <div> 
                            <Tooltip title="CRM"><PictureAsPdfIcon onClick={exportTemplateCMRPage} className=" !text-icon text-red-600"/> </Tooltip> </div>
                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[5.8rem] max-xl:w-[4.8rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs ml-gap items-center  font-poppins  max-sm:text-sm">
                              {item.dispatchInspectionInd === 0 || item.dispatchInspectionInd === 1 ?
                                null : <DispatchPackedToggle
                                  locationDetailsId={props.locationDetailsId}
                                  item={item}
                                />}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]  w-[6.78rem] max-xl:w-[4.58rem] max-lg:w-[3.58rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  ml-gap items-center  font-poppins  max-sm:text-sm">
                              {item.shipperName === "null" ? "" : item.shipperName}
                            </div>
                          </div>
                          <div  className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]  w-[8.78rem]" >Shhiper name usd$</div>
                                                   
                                                                   <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.51rem] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm cursor-pointer text-blue-600"  onClick={() => {
                                                                  handleOpenTrack();
                                                                  handleRowData(item);              
                                                              }}>
                              "HHHHH"
                            </div>
                          </div>
                          <div className="flex w-[3.8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                                                               <GpsFixedIcon className="!cursor-pointer text-[#42bfdd]"
                                                                onClick={() => {
                                                                  props.handlepackId(true);
                                                                  handleRowData(item)              
                                                              }}
                                                               />
                                                                   </div>
                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.51rem] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                              {item.pickUp === "null" ? "" : dayjs(item.pickUp).format("DD-MM-YYYY")}
                            </div>
                          </div>
                        </div>
                        
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                       
                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.01rem] max-xl:w-[5.01rem] max-lg:w-[3.71rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                              {/* {item.unloadingAddresses && item.unloadingAddresses[0].city && item.newAwbNo==="null" ? <Button type="primary"
                                onClick={() => {
                                  handleRowData(item);
                                  props.handleCreateAWB(true)
                                  
                                }}disabled={item.dispatchReceivedInd} >Create AWB</Button> : item.newAwbNo=== "null" ? "" :item.newAwbNo} */}
                            </div>
                          </div>
                    
                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.2rem] max-xl:w-[4.2rem] max-lg:w-[2.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                              {item.status === "null" ? "" : item.status}
                            </div>
                          </div>

                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5rem] max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                              {item.dispatchInspectionInd === 4 && item.newAwbNo &&
                                <DispatchValidationToggle
                                  locationDetailsId={props.locationDetailsId}
                                  item={item}
                                />}
                            </div>
                          </div>
                          <div class="flex items-center justify-end h-8 ml-gap bg-[#eef2f9] md:w-[2rem] max-sm:flex-row max-sm:w-[6%]">
                            <div>
                            <Tooltip title="Notes">
                                                        <NoteAltIcon
                                                            className="!text-icon text-[green] cursor-pointer"
                                                            // style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleProductionNotesModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>
                            </div>
                          </div>

                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5rem] max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                              {/* {item.dispatchInspectionInd === 4 && item.newAwbNo && */}
                                <DispatchToggle
                                  //locationDetailsId={props.locationDetailsId}
                                  item={item}
                                />
                                {/* } */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {checkAwb && (item.orderId === rowData.orderId) &&
                   
                                                <SubOrderList orderId={rowData.orderId}
                                                translateText={props.translateText}
                                                selectedLanguage={props.selectedLanguage} />
                                            }
                                             {OpenTrack && (item.orderPhoneId === rowData.orderPhoneId) &&
                   
                  <CommerceOpenTrackDrawerCard  
                                         newOrderNo={rowData.newOrderNo}
                                          orderPhoneId={rowData.orderPhoneId}
                                          translateText={props.translateText}
                                          selectedLanguage={props.selectedLanguage}
                                          />
               }
                    </div>
                  );
                })}
              </>
                : !props.allDispatchList.length
                  && !props.fetchingDispatchList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>


        <RefurbishNoteAll
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
                    />
      <DispatchPhoneListModalInventory
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
        rowData={rowData}
        handleInventoryDispatchModal={props.handleInventoryDispatchModal}
        inventoryDispatchModal={props.inventoryDispatchModal}
      />
      <DispatchOrderAwbModal
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
        rowData={rowData}
        addCreateAwb={props.addCreateAwb}
        handleCreateAWB={props.handleCreateAWB}
      />
       <AddpackDrawer
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
        rowData={rowData}
        handleCreateAddPack={props.handleCreateAddPack}
        addPackData={props.addPackData}
        viewType={props.viewType}
      />
       <AddpackID
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
        rowData={rowData}
        handlepackId={props.handlepackId}
        addPackDataID={props.addPackDataID}
      />
      {/* <CommerceOpenTrackDrawer
             rowData={rowData}
      OpenTrack={OpenTrack}
      setOpenTrack={setOpenTrack}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
      /> */}
    </>
  );
}

const mapStateToProps = ({ shipper, inventory, auth, dispatch,refurbish }) => ({
  allDispatchList: inventory.allDispatchList,
  allShipper: shipper.allShipper,
  inventoryDispatchModal:inventory.inventoryDispatchModal,
  openPickupDateModal: inventory.openPickupDateModal,
  updatingDispatchInspectionButton: inventory.updatingDispatchInspectionButton,
  pickUpModal: inventory.pickUpModal,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  fetchingDispatchList: inventory.fetchingDispatchList,
  addCreateAwb: inventory.addCreateAwb,
  productioNoteModal: refurbish.productioNoteModal,
  addPackData:inventory.addPackData,
  addPackDataID:inventory.addPackDataID
  // locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllShipper,
      getDispatchList,
      handlePickupDateModal,
      updateDispatchInspectionButton,
      addFinalDispatchData,
      handleCreateAWB,
      handleInventoryDispatchModal,
      handleProductionNotesModal,
      handleCreateAddPack,
      handlepackId,
      clearDispatch,
      getCompleteDispatchSearch
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DispatchCommerceAndRepairTableOut)
);

// import React, { useEffect,useState,useRef,useCallback } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Select } from "../../../Components/UI/Elements";
// import Tooltip from '@mui/material/Tooltip';
// import { BundleLoader } from "../../../Components/Placeholder";
// import {Button} from "antd";
// import "../Subscription.scss";
// import {getNewSubscription} from "../SubscriptionAction";
// import { InfoCircleTwoTone,  DeleteOutlined,
//   MinusOutlined,
//   PlusOutlined } from "@ant-design/icons";
// import Carousel from "react-elastic-carousel";
// import { base_url } from "../../../Config/Auth";

// const { Option } = Select;

// function SubscriptionNewCard (props) {
    
//     const [page, setPage] = useState(0);
//     const [hasMore, setHasMore] = useState(true);
//     const [loading, setLoading] = useState(false);
    
//     const carouselRef = useRef(null);
//     const observer = useRef();

//   useEffect(() => {
//    props.getNewSubscription(props.orgId);
//   }, []);



//   const [units, setUnits] = useState({});

//   const handleQuantityChange = (event, productId) => {
//     const newUnit = parseInt(event.target.value, 10);
//     if (!isNaN(newUnit) && newUnit >= 1) {
//       setUnits((prevUnits) => ({
//         ...prevUnits,
//         [productId]: newUnit,
//       }));
//     }
//   };

//   const handleIncrement = (productId) => {
//     const newUnit = (units[productId] || 0) + 1;
//     setUnits((prevUnits) => ({
//       ...prevUnits,
//       [productId]: newUnit,
//     }));
//   };

//   const handleDecrement = (productId) => {
//     if (units[productId] > 1) {
//       const newUnit = units[productId] - 1;
//       setUnits((prevUnits) => ({
//         ...prevUnits,
//         [productId]: newUnit,
//       }));
//     }
//   };


//   if (props.fetchingSuscrption) {
//     return <BundleLoader />;
//   }

//   const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 500, itemsToShow: 2 },
//     { width: 768, itemsToShow: 4, itemToScroll: 4 },
//     { width: 1100, itemsToShow: 5, itemToScroll: 5 },
//   ];

//   const handleAddToCart = (productId) => { 
//         let data={
           
//           iteamsDTO: {
//               currency:"CU008",
//               productType:"product",
//               productId:productId,
//               unit: units[productId] || 1,
//             },
          
//             orderPhoneId:props.invencartItem.orderPhoneId ? props.invencartItem.orderPhoneId :null ,
//             userId:props.userId,
//             orgId:props.organizationId
            
//           }
  
//         // props.LinkInventoryItem(data);
//       }
   
      

//       const next = () => {
//         if (carouselRef.current) {
//           carouselRef.current.next();
//         }
//       };
    
//       const previous = () => {
//         if (carouselRef.current) {
//           carouselRef.current.prev();
//         }
//         if (page > 0) {
//           setPage(prevPage => prevPage - 1);
//           setHasMore(true); // Allow fetching more pages again
//         }
//       };
    
//  const drb=[
//     {
//         "productId": "PD10985606347262024",
//         "imageId": "IMG63239261156262024",
//         "categoryName": "Tablet",
//         "subCategoryName": "SamsungTab",
//         "name": "Samsung Tab1plus",
//         "productFullName": "Samsung Tab1plus Tablet SamsungTab 128 GB Blue",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "subAttributeName": "Blue",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "Good Products",
//         "quantity": 0,
//         "creationDate": "2024-06-26T08:38:45.185Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "articleNo": "A343",
//         "pageCount": 1,
//         "workflowName": "test",
//         "remainingQuantity": 0,
//         "brand": "Samsung",
//         "model": "Sm33",
//         "newProductNo": "000126062024",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD53184577525202024",
//         "categoryName": "Phone",
//         "name": "S21 Ultra",
//         "productFullName": "S21 Ultra Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-20T10:17:43.748Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Samsung",
//         "model": "S21 Ultra",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD82633750042202024",
//         "categoryName": "Phone",
//         "name": "Note 20 Ultra",
//         "productFullName": "Note 20 Ultra Phone  256 GB ",
//         "attributeId": "PAD7202845042202024",
//         "attributeName": "256 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-20T10:16:55.727Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Samsung",
//         "model": "Note 20 Ultra",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD27559816181202024",
//         "categoryName": "Phone",
//         "name": "iPhone12 Pro",
//         "productFullName": "iPhone12 Pro Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-20T09:45:48.514Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iPhone 12 Pro",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD209467454372024",
//         "categoryName": "Phone",
//         "name": "Samsung",
//         "productFullName": "Samsung Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-07T11:45:21.859Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Samsung",
//         "model": "S22",
//         "warrantyInd": false,
//         "priceB2B": 125622.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD3051284317262024",
//         "categoryName": "Phone",
//         "name": "iPhone 14 Plus",
//         "productFullName": "iPhone 14 Plus Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-06T05:17:34.339Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iPhone 14 Plus",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD5822321921262024",
//         "categoryName": "Phone",
//         "name": "iPhone 14",
//         "productFullName": "iPhone 14 Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-06T05:16:30.163Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iPhone 14",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD7113635780662024",
//         "categoryName": "Phone",
//         "name": "Iphone 13",
//         "productFullName": "Iphone 13 Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-06T05:15:34.374Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iPhone 13",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD9901400225152024",
//         "categoryName": "Phone",
//         "name": "iPhone 14 Pro Max",
//         "productFullName": "iPhone 14 Pro Max Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-05T07:08:27.119Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iPhone 14 Pro Max",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD2904037061852024",
//         "categoryName": "Phone",
//         "name": "iPhone 14",
//         "productFullName": "iPhone 14 Phone  128 GB ",
//         "attributeId": "PAD4049861335652024",
//         "attributeName": "128 GB",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-05T05:41:45.953Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "workflowName": "test",
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iPhone 14 Pro Max",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD4423292825632024",
//         "categoryName": "Phone",
//         "name": "App Mobo",
//         "productFullName": "App Mobo Phone  256 Gb",
//         "attributeId": "PAD664118186932024",
//         "attributeName": "256",
//         "subAttributeName": "Gb",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "good",
//         "quantity": 0,
//         "creationDate": "2024-06-03T12:21:42.562Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "articleNo": "y78",
//         "pageCount": 1,
//         "workflowName": "test",
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iPhone15",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     },
//     {
//         "productId": "PD7715107643832024",
//         "categoryName": "Phone",
//         "name": "Mobile",
//         "productFullName": "Mobile Phone  128 Gb",
//         "attributeId": "PAD9154809827032024",
//         "attributeName": "128",
//         "subAttributeName": "Gb",
//         "price": 0.0,
//         "productPrice": 0.0,
//         "maxDiscount": 0.0,
//         "tax": 0.0,
//         "description": "null",
//         "quantity": 0,
//         "creationDate": "2024-06-03T12:07:36.491Z",
//         "allowedDiscount": 0.0,
//         "distributorMaxMargin": 0.0,
//         "distributorAllowedMargin": 0.0,
//         "marginType": "Percentage",
//         "active": true,
//         "orderAmount": 0.0,
//         "orderValue": 0.0,
//         "consumerMaxMargin": 0.0,
//         "consumerMarginType": "Amount",
//         "gstIncludeInd": true,
//         "distributorMarginInd": true,
//         "customerMarginInd": false,
//         "actualProductPrice": 0.0,
//         "consumerAllowedMargin": 0.0,
//         "distributorMaxDiscount": 0.0,
//         "distributorAllowedDiscount": 0.0,
//         "distributorOfferInd": false,
//         "offerInd": false,
//         "openingInventory": 0,
//         "closingingInventory": 0,
//         "units": 0,
//         "pickupStatusInd": false,
//         "publishInd": true,
//         "subscriptionInd": false,
//         "pageCount": 1,
//         "remainingQuantity": 0,
//         "brand": "Apple",
//         "model": "iphone15",
//         "warrantyInd": false,
//         "priceB2B": 0.0,
//         "listCount": 12,
//         "datacount": 50
//     }
// ]

//   return (
//     <>

//     <div class="h-[24rem] overflow-auto">

//     <div class="flex"> 
//     <Carousel
//     // ref={carouselRef}
//     pagination={false}
//     breakPoints={breakPoints}
//     style={{ minHeight: "6em", justifyContent: "center" }}
//     class="w-2/12 mt-8 ml-margin10"
//     // onNextEnd={next}
//     // onPrevEnd={previous}
//                    >
//                   {
//                 //   props.newSubscriptionList
//                 props.newSubscriptionList.map((item,index) => {
//                     //  const currentdate = dayjs().format("YYYY/MM/DD");
//                     //  const date = dayjs(item.creationDate).format("YYYY/MM/DD");
//                     //  const isLastElement = index === props.products.length - 1;
//                      return (
//                       <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
//                         <div  className="card-element">
//     <div class=" h-[18rem] flex-col flex bg-stone-100 items-center scale-90 hover:scale-95 ease-in  duration-500 hover:shadow-lg  w-[18rem] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 object-cover object-center max-sm:w-48 flex-grow-3 md:flex-grow-0">
//     <div class="mt-1"> 
//     <Tooltip title={item.productFullName} placement="top" arrow>
                                 
//                                  <Header>{item.productFullName || ""}</Header>
//                                </Tooltip>
//     </div>
//     <div class="max-sm:mr-0 md:flex  my-2 h-hwk">
//                                   <div class="object-cover object-center  flex items-center">
//                                     <div>
//                                 <img
//                                             src={`${base_url}/image/${item.imageId}`} alt=""
//                                             style={{ height: "8rem", width: "8rem", borderRadius: "20px" }}
//                                         />
//                                          <h3>{item.newProductNo} </h3>  
//                                          </div>
//                                                           </div>  
                                                                                                       
//                                                           <div class="w-40  flex justify-between max-sm:flex items-center  flex-col">
//                                                           <div class=" flex justify-evenly place-items-baseline flex-col max-sm:w-48  flex-auto ">
//                                                           <div className="add-minus-quantity">
//           <span>          
//                  {/* <MinusOutlined 
//                   onClick={() => handleDecrement(item.productId)}
//                  />
//           </span>
        
//           <input type="number"  
//            value={units[item.productId] || 1}
//             onChange={(event) => handleQuantityChange(event, item.productId)}
//           min="1" 
//           step="1" 
//           />
         
//           <span

//           > */}
//           {/* <PlusOutlined 
//           onClick={() => handleIncrement(item.productId)} 
//           /> */}
//           </span>

//         </div>                                                                               
//                                                                 </div>
                                                               
//                                                           <h3 class=" mt-2 h-4 font-bold text-xs ">
//                                                             {item.subscriptionName}
//                                                           </h3>
//                                                           <h3 class=" mt-2 h-4 font-bold text-xs ">
//                                                             {item.noOfAppointments}
//                                                           </h3> 
//                                                         </div>

//                                                         </div>
                                                        
//                                                         <div class="flex justify-between m-2 w-wk max-sm:w-40 items-baseline md: " >
//                                                         <div class="h-6 overflow-hidden p-2 text-center"
//                                                               dangerouslySetInnerHTML={{
//                                                                 __html: item.description,
//                                                               }}
//                                                             ></div>
//                                                             {item.description === "<h3></h3>\n" ? null : (
//                                                               <Tooltip
//                                                                 style={{ backgroundColor: "red" }}
//                                                                 title={
//                                                                   <div class="h-4 overflow-auto p-2 text-center text-white"
//                                                                     dangerouslySetInnerHTML={{
//                                                                       __html: item.description,
//                                                                     }}
//                                                                   ></div>
//                                                                 }
//                                                                 placement="top"
//                                                                 arrow
//                                                               >
//                                                                 <span
//                                                                   style={{
//                                                                     cursor: "pointer",
//                                                                   }}
//                                                                 >                                                       
//                                                                   <InfoCircleTwoTone class=" flex items-center"/>
//                                                                 </span>
//                                                               </Tooltip>
//                                                             )}
//                                                           </div>
//                                                           <div class="mt-px flex  justify-end w-wk m-1">
//                        <div className=" py-1 px-4 bg-slate-100 border-2 border-blue-300 hover:bg-ShopBlue cursor-pointer"                                                                                                      
                                                              
//                                                               >
//                                                                   <div class=" text-gray-700 font-light text-base  flex  justify-center items-center hover:text-white cursor-pointer">
//                                                              Update
//                                                               </div>
//                                                               </div>
// </div>
//                        </div>
//                        </div>
//                      </div>
//                     );
//                   })}
//                  </Carousel> 
//                   {/* {!hasMore && <p className="text-center text-red-500">End of the list.</p>} */}
//             </div>     
//    </div>
//    </>
//   );
// }
// const mapStateToProps = ({ subscription,auth }) => ({
//   newSubscriptionList: subscription.newSubscriptionList,
//   fetchingSuscrption:subscription.fetchingSuscrption,
//   userId: auth.userDetails.userId,
//   orgId: auth.userDetails.organizationId,
//   organizationId: auth.userDetails.organizationId,
  
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getNewSubscription,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionNewCard);

// const Header = styled.div`
//   text-overflow: ellipsis;
//   text-align: center;
//   white-space: nowrap;
//   overflow: hidden;
//   height: 2em;
//   font-size: 1.3em;
//   font-family: Poppins;
//   font-weight: 700;
//   @media only screen and (max-width: 600px) {
//     text-overflow: ellipsis;

// white-space: nowrap;
// overflow: hidden;
// height: 2em;
// font-size: 1.3em;
// font-family: Poppins;
// font-weight: 700;
// width:100%
// text-align:center
//   }
// `;


// const Price = styled.div`
//   height: 1.5em;
//   font-weight: 700;
//   font-family: Poppins;
//   font-size: 1em;
// `;
// const Price1 = styled.div`
//   height: 3.5em;
//   font-weight: 700;
//   font-family: Poppins;
//   font-size: 1em;
//   display: grid;
//   width: -webkit-fill-available;
//   place-items: baseline;
//   white-space: pre;
// `;
// const Price2 = styled.div`
//   height: 1.5em;
//   font-weight: 700;
//   font-family: Poppins;
//   font-size: 1em;
//   text-decoration-line: line-through;
// `;
// const Size = styled.div`
//   height: 2.5em;
//   font-weight: 700;
//   font-family: Poppins;
//   font-size: 1em;
//   display: grid;
//   width: -webkit-fill-available;
//   place-items: baseline;
//   white-space: pre;
// `;  


import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import {addSuscrptions,getSubscrptions,addSubRules} from "../SubscriptionAction"
import { Card, Button, Input, Switch,Select, Form } from 'antd';


const { Option } = Select;


const SubscriptionManager = (props) => {
  const [subscriptions, setSubscriptions] = useState([]);

  const [isLoadingRuleType, setIsLoadingRuleType] = useState(false);

  const [touchedRuleType, setTouchedRuleType] = useState(false);


  const [ruleType, setRuleType] = useState([]);

  const [isLoadingSector, setIsLoadingSector] = useState(false);
  
  useEffect(() => {
    
   
    props.getSubscrptions(props.orgId);
 
}, [props.orgId]);
console.log(props.subscriptionsFormData)
useEffect(() => {
  // Check if data is available
  if (props.subscriptionsFormData.length > 0) {
    
    setSubscriptions(props.subscriptionsFormData);
  }
}, [props.subscriptionsFormData]);

  const addSubscription = () => {
    setSubscriptions([
      ...subscriptions,
      { callInd: false, noOfcalls: '', perMonthValue: '', subscriptionId: null, subscriptionName: '', publishInd: false,ruleDto:[] }
    ]);
  };

  const removeSubscription = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.subscriptionId !== id));
  };

  const handleInputChange = (index, field, value) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions[index][field] = value;
    setSubscriptions(newSubscriptions);
  };

  const handleSwitchChange = (index, field, checked,ruleIndex) => {
    const newSubscriptions = [...subscriptions];
    const rule = updatedSubscription.ruleDto[ruleIndex];
    newSubscriptions[index][field] = checked;
    setSubscriptions(newSubscriptions);

    const updatedSubscription = newSubscriptions[index];
    let data = {
      callInd: updatedSubscription.callInd,
      description: "",
      liveInd: true,
      noOfcalls: updatedSubscription.noOfcalls || 0,
      orgId: props.orgId,
      perMonthValue: updatedSubscription.perMonthValue || 0,
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionName: updatedSubscription.subscriptionName,
      userId: props.userId,
      publishInd: updatedSubscription.publishInd,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.rulevalue : null
    };
    props.addSuscrptions(data,updatedSubscription.subscriptionId);
  };




  const handleRuleChange = (subIndex, ruleIndex, field, value) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions[subIndex].ruleDto[ruleIndex][field] = value;
    setSubscriptions(newSubscriptions);
  };

  const handlePressEnter = (index,ruleIndex) => {
    const updatedSubscription = subscriptions[index];
   
    const rule = updatedSubscription.ruleDto ? updatedSubscription.ruleDto[ruleIndex] : null;
    console.log({
      callInd: updatedSubscription.callInd,
      createdBy: "string",
      creationDate: "2024-08-05T07:22:47.795Z",
      description: "string",
      liveInd: true,
      noOfcalls: updatedSubscription.noOfcalls || 0,
      orgId: "string",
      perMonthValue: updatedSubscription.perMonthValue || 0,
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionName: updatedSubscription.subscriptionName,
      updatedBy: "string",
      updationDate: "2024-08-05T07:22:47.796Z",
      userId: "string",
      publishInd: updatedSubscription.publishInd
    });
    let data={
      callInd: updatedSubscription.callInd,
      // createdBy: "string",
      // creationDate: "2024-08-05T07:22:47.795Z",
      description: "",
      liveInd: true,
      noOfcalls: updatedSubscription.noOfcalls || 0,
      orgId: props.orgId,
      perMonthValue: updatedSubscription.perMonthValue || 0,
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionName: updatedSubscription.subscriptionName,
      // updatedBy: "string",
      // updationDate: "2024-08-05T07:22:47.796Z",
      userId: props.userId,
      publishInd: updatedSubscription.publishInd,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.rulevalue : null
    }
    props.addSuscrptions(data,updatedSubscription.subscriptionId)
  };


  const addRule = (subIndex) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions[subIndex].ruleDto.push({
      subscriptionRuleId: null,
      ruletypeId: null, // Initially null until an event is selected
      rulevalue: ''
    });
    setSubscriptions(newSubscriptions);
  };


  const handleSelectRuleType = () => {
    if (!touchedRuleType) {
     
      fetchSelectRuleType();

      setTouchedRuleType(true);
    }
  };



  const fetchSelectRuleType = async () => {
    setIsLoadingRuleType(true);
    try {
      const apiEndpoint = ` ${base_url}/task/todo/taskType-eventType/subscription/drop-down/${props.orgId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setRuleType(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingRuleType(false);
    }
  };

  const handleValueChange = (index, ruleIndex) => {
    const updatedSubscription = subscriptions[index];
   
    const rule = updatedSubscription.ruleDto ? updatedSubscription.ruleDto[ruleIndex] : null;

    console.log({
    
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.rulevalue : null,
      orgId: props.orgId,
      userId:props.userId
    });
    let data={
      subscriptionId: updatedSubscription.subscriptionId || null,
      subscriptionRuleId: rule ? rule.subscriptionRuleId : null, // Print null if rule doesn't exist
      ruleTypeId: rule ? rule.ruletypeId : null,                 // Print null if rule doesn't exist
      ruleValue: rule ? rule.rulevalue : null
    }
    props.addSubRules(data)
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={addSubscription}>Add Subscription</Button>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        height: '500px', 
        overflowY: 'scroll', 
        marginTop: '20px', 
        border: '1px solid #ccc', 
        padding: '10px' 
      }}>

        {subscriptions.map((sub, subIndex) => (
          <Card
            // key={index}
            key={sub.subscriptionId || subIndex}
            style={{ width: 300, margin: '10px' }}
            // actions={[
            //    <Button type="primary" htmlType="submit">Submit</Button>,
            //   <Button type="danger" onClick={() => removeSubscription(sub.subscriptionId)}>Remove</Button>
            // ]}
          >
            <Form layout="vertical">
              <Form.Item
                label="Name"
                required
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input
                  value={sub.subscriptionName}
                  onChange={(e) => handleInputChange(subIndex, 'subscriptionName', e.target.value)}
                  placeholder="Enter name"
                  onPressEnter={() => handlePressEnter(subIndex)}
                />
              </Form.Item>
              <Form.Item
                label="Per month value"
                required
                rules={[{ required: true, message: 'Please enter the per month value' }]}
              >
                <Input
                  value={sub.perMonthValue}
                  onChange={(e) => handleInputChange(subIndex, 'perMonthValue', e.target.value)}
                  placeholder="Enter per month value"
                  onPressEnter={() => handlePressEnter(subIndex)}
                />
              </Form.Item>
              <Form.Item label="Calls">
                <Switch
                  checked={sub.callInd}
                    checkedChildren="Yes"
                        unCheckedChildren="No"
                  onChange={(checked) => handleSwitchChange(subIndex, 'callInd', checked)}
                />
                {sub.callInd && (
                  <Input
                    value={sub.noOfcalls}
                    onChange={(e) => handleInputChange(subIndex, 'noOfcalls', e.target.value)}
                    style={{ marginTop: '10px' }}
                    placeholder="Enter calls value"
                    onPressEnter={() => handlePressEnter(subIndex)}
                  />
                )}
              </Form.Item>
              <Form.Item label="Publish">
                <Switch
                  checked={sub.publishInd}
                    checkedChildren="Yes"
                        unCheckedChildren="No"
                  onChange={(checked) => handleSwitchChange(subIndex, 'publishInd', checked)}
                />
              </Form.Item>
              <div>
                <h4>More Rules</h4>
                {sub.ruleDto.map((rule, ruleIndex) => (
                  <div key={ruleIndex} style={{ display: 'flex', marginBottom: '10px' }}>
                    <Select
                      value={rule.ruletypeId}
                      onFocus={handleSelectRuleType}
                      loading={isLoadingRuleType}
                      onChange={(value) => handleRuleChange(subIndex, ruleIndex, 'ruletypeId', value)}
                      style={{ width: 120, marginRight: '10px' }}
                      placeholder="Select event"
                    >
                        {ruleType.map(rule => (
          <Option key={rule.
            typeId
            } value={rule.
              typeId
              }>
            {rule.type}
          </Option>
        ))}
                    </Select>
                    <Input
                      value={rule.rulevalue}
                      onChange={(e) => handleRuleChange(subIndex, ruleIndex, 'rulevalue', e.target.value)}
                      placeholder="Enter value"
                     
                      onPressEnter={() => handleValueChange(subIndex, ruleIndex)}
                      disabled={!rule.ruletypeId} // Disable until event is selected
                    />
                  </div>
                ))}
                <Button type="dashed" onClick={() => addRule(subIndex)} style={{ width: '100%' }}>
                  + Add Rule
                </Button>
              </div>
            </Form>
          </Card>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth,subscription, partner }) => ({
  orgId:auth.userDetails.organizationId,
  userId:auth.userDetails.userId,
  token: auth.token,
  subscriptionsFormData: subscription.subscriptionsFormData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSuscrptions,
      getSubscrptions,
      addSubRules
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionManager);
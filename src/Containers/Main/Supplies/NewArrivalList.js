// import React, {  useEffect, useState  } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getContactData} from "../../Contact/ContactAction"
// import { Tooltip,Button,Input ,Popconfirm, Checkbox} from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
// import dayjs from "dayjs";
// import EventRepeatIcon from '@mui/icons-material/EventRepeat';
// import { MultiAvatar2 } from "../../../Components/UI/Elements";


// function NewArrivalList(props) {


//   useEffect(() => {
//     props.getContactData(props.userId);
//   }, []);

//   const [particularRowData, setParticularRowData] = useState({});

//   function handleSetParticularOrderData(item) {
//     setParticularRowData(item);
// }
// const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         setLoading(true); 
//         const itemsToTranslate = [
//         "110",// 'Name',//0
//       ];
//       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
//         setTranslatedMenuItems(translations);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.error('Error translating menu items:', error);
//       }
//     };

//     fetchMenuTranslations();
//   }, [props.selectedLanguage]);


  

// const {handleProcureNotesDrawerModal,
//   addDrawerProcureNotesModal
// } = props;
//   return (
//     <div>
  
//     <>
//     <div class="rounded m-1 max-sm:m-1 p-1 w-[99%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
//         <div className=" flex  w-[90%] justify-between  p-1 bg-transparent font-bold sticky  z-10">
//         <div className=" md:w-[0.25rem] "> </div>
//         <div className=" md:w-[2rem] "> <Checkbox></Checkbox></div>
//                         <div className="font-bold w-[43.5rem] flex items-center font-poppins text-xs ">{translatedMenuItems[0]} </div>
                       
                      
//         </div>
        
//           {props.contactData.map((item) => {
//             const currentDate = dayjs().format("DD/MM/YYYY");
//             const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
//             return (
//                 <div>
//                 <div
// className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
//                                      max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
//                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
//                         <div>
//                         <Checkbox></Checkbox> 
//                         </div>
//                         <div className=" flex items-center  md:w-[14rem] max-sm:flex-row max-sm:justify-between  ">
//                             <div class=" text-xs flex items-center  font-poppins">
//                                 {item.fullName}
//                             </div>
//                             {date === currentDate ? (
//                                 <span className=" text-[0.65rem] text-[tomato] font-bold" >
//                                  {translatedMenuItems[9]} 
//                                 </span>
//                               ) : null}
//                         </div>
                      
//                         </div>
//                 </div>
//             </div>
//             );
//           })}
       
//       </div>
    
//     </>

//   </div>
//   );



// }

// const mapStateToProps = ({ contact,auth }) => ({
//   orgId: auth.userDetails.organizationId,
//   userId: auth.userDetails.userId,
//   contactData:contact.contactData
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(

//     {

//         getContactData,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NewArrivalList);


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContactData } from "../../Contact/ContactAction";
import { Checkbox, Button, Tooltip } from "antd";
import dayjs from "dayjs";
import axios from "axios"; // Import axios for the POST request

function NewArrivalList(props) {
  const [particularRowData, setParticularRowData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.getContactData(props.userId);
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "110",// 'Name',//0
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
  // Handle individual checkbox selection
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selected) => selected !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  // Handle select all checkboxes
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]); // Deselect all
    } else {
      setSelectedItems(props.contactData); // Select all
    }
    setSelectAll(!selectAll);
  };

  // Send the selected data to the dummy POST URL
  const sendSelectedData = async () => {
    try {
      const payload = selectedItems.map((item) => ({
        name: item.fullName,
        contactId: item.contactId,
        customerId: item.customerId,
      }));

      const response = await axios.post("https://dummyurl.com/api/submit", payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error sending selected data:", error);
    }
  };

  



  return (
    <div>
      <div className="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
        <div className="flex w-[90%] justify-between p-1 bg-transparent font-bold sticky z-10">
            <div  className="md:w-[0.25rem]"></div>
          <div className="md:w-[2rem]">
            <Tooltip title="Select All"><Checkbox checked={selectAll} onChange={handleSelectAll} /></Tooltip>
          </div>
          <div className="font-bold w-[43.5rem] flex items-center font-poppins text-xs">
            {translatedMenuItems[0]}
          </div>
        </div>
<div className=" overflow-x-auto h-[75vh]">
        {props.contactData.map((item) => {
          const currentDate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");

          return (
            <div key={item.id}>
              <div
                className="flex rounded justify-between bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg max-sm:bg-gradient-to-b max-sm:from-blue-200
                  max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
              >
                <div className="flex max-sm:justify-between max-sm:w-wk items-center">
                  <div>
                    <Checkbox
                      checked={selectedItems.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </div>
                  <div className="flex items-center md:w-[14rem] max-sm:flex-row max-sm:justify-between">
                    <div className="text-xs flex items-center font-poppins">
                      {item.fullName}
                    </div>
                    {date === currentDate ? (
                      <span className="text-[0.65rem] text-[tomato] font-bold">
                        {translatedMenuItems[9]}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      <Button type="primary" onClick={sendSelectedData} disabled={selectedItems.length === 0}>
        Send Selected Data
      </Button>
    </div>
  );
}

const mapStateToProps = ({ contact, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  contactData: contact.contactData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NewArrivalList);

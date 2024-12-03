// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getItemData } from "./SuppliesAction";
// import { Checkbox, Button, Tooltip } from "antd";
// import dayjs from "dayjs";

// function NewArrivalList(props) {
//   const [particularRowData, setParticularRowData] = useState({});
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectAll, setSelectAll] = useState(true); // Set to true by default
//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     props.getItemData(props.orgId);
//   }, []);

//   useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         setLoading(true);
//         const itemsToTranslate = [
//           "110", // 'Name',
//         ];
//         const translations = await props.translateText(
//           itemsToTranslate,
//           props.selectedLanguage
//         );
//         setTranslatedMenuItems(translations);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.error("Error translating menu items:", error);
//       }
//     };

//     fetchMenuTranslations();
//   }, [props.selectedLanguage]);

//   // Set selectedItems to all items once newStepItemData is loaded
//   useEffect(() => {
//     if (props.newStepItemData.length > 0) {
//       setSelectedItems(props.newStepItemData);
//       setSelectAll(true); // Set to true by default
//     }
//   }, [props.newStepItemData]);

//   // Handle individual checkbox selection
//   const handleCheckboxChange = (item) => {
//     setSelectedItems((prevSelected) => {
//       if (prevSelected.includes(item)) {
//         return prevSelected.filter((selected) => selected !== item);
//       } else {
//         return [...prevSelected, item];
//       }
//     });

//     // Ensure 'select all' is updated if a single item is unchecked
//     if (selectedItems.length + 1 === props.newStepItemData.length) {
//       setSelectAll(true);
//     } else {
//       setSelectAll(false);
//     }
//   };

//   // Handle select all checkboxes
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedItems([]); // Deselect all
//     } else {
//       setSelectedItems(props.newStepItemData); // Select all
//     }
//     setSelectAll(!selectAll);
//   };

//   return (
//     <div>
//       <div className="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:hidden">
//         <div className="flex w-[90%] justify-between p-1 bg-transparent font-bold sticky z-10">
//           <div className="md:w-[0.25rem]"></div>
//           <div className="md:w-[2rem]">
//             <Tooltip title="Select All">
//               <Checkbox checked={selectAll} onChange={handleSelectAll} />
//             </Tooltip>
//           </div>
//           <div className="font-bold w-[43.5rem] flex items-center font-poppins text-xs">
//             {translatedMenuItems[0]}
//           </div>
//         </div>
//         <div className="overflow-x-auto h-[75vh]">
//           {props.newStepItemData.map((item) => {
//             const currentDate = dayjs().format("DD/MM/YYYY");
//             const date = dayjs(item.creationDate).format("DD/MM/YYYY");

//             return (
//               <div key={item.id}>
//                 <div
//                   className="flex rounded justify-between bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg max-sm:bg-gradient-to-b max-sm:from-blue-200
//                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
//                 >
//                   <div className="flex max-sm:justify-between max-sm:w-wk items-center">
//                     <div>
//                       <Checkbox
//                         checked={selectedItems.includes(item)}
//                         onChange={() => handleCheckboxChange(item)}
//                       />
//                     </div>
//                     <div className="flex items-center md:w-[14rem] max-sm:flex-row max-sm:justify-between">
//                       <div className="text-xs flex items-center font-poppins">
//                         {item.suppliesName}
//                       </div>
//                       {date === currentDate ? (
//                         <span className="text-[0.65rem] text-[tomato] font-bold">
//                           {translatedMenuItems[9]}
//                         </span>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         {/* <Button
//             type="primary"
//             disabled={selectedItems.length === 0}
//           >
//             Send Selected
//           </Button> */}
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = ({ supplies, auth }) => ({
//   orgId: auth.userDetails.organizationId,
//   userId: auth.userDetails.userId,
//   newStepItemData: supplies.newStepItemData,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getItemData,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(NewArrivalList);

import React, { useEffect } from "react";
import { Checkbox, Tooltip } from "antd";
import ContactsIcon from '@mui/icons-material/Contacts';
import PixIcon from '@mui/icons-material/Pix'
const NewArrivalListStep1 = ({ 
    selectedItems, 
    setSelectedItems, 
    selectAll, 
    setSelectAll, 
    getItemData, 
    newStepItemData, 
    orgId 
}) => {
   
    useEffect(() => {
        getItemData(orgId); // Fetch item data when the component is loaded
    }, [orgId, getItemData]);
    useEffect(() => {
        if (newStepItemData.length > 0) {
          setSelectedItems(newStepItemData);
          setSelectAll(true); // Set to true by default
        }
      }, [newStepItemData]);
    // Handle individual checkbox selection
    const handleCheckboxChange = (item) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(item)
                ? prevSelected.filter((selected) => selected !== item)
                : [...prevSelected, item]
        );
        setSelectAll(selectedItems.length + 1 === newStepItemData.length);
    };

    // Handle select all checkbox
    const handleSelectAll = () => {
        setSelectedItems(selectAll ? [] : newStepItemData);
        setSelectAll(!selectAll);
    };

    return (
        <div>
              <div className="rounded m-1 max-sm:m-1 h-[82vh] p-1 w-[99%] overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:hidden">
             <div className="flex w-[90%] justify-between p-1 bg-transparent font-bold sticky !text-lm items-end font-poppins z-10">
             <div className="md:w-[0.25rem]"></div>
             <div className="md:w-[2rem]">
            <Tooltip title="Select All">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </Tooltip>
            </div>
            <div className=" w-[16rem] truncate text-[#00A2E8] text-sm">
            <ContactsIcon className='!text-icon'/> Name
          </div>
          <div className="w-[35.5rem] truncate">
          <PixIcon className='!text-icon '/>  Unit
          </div>
          </div>
            <div className="overflow-x-auto h-[75vh]">
                {newStepItemData.map((item) => (
                    <div key={item.id}>
                         <div
                  className="flex rounded  bg-white mt-1 h-8 items-center  border-l-2 border-green-500 bg-[#eef2f9] py-ygap max-sm:rounded-lg max-sm:bg-gradient-to-b max-sm:from-blue-200
                    max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                >      <div className="border-l-2 border-green-500 bg-[#eef2f9]">
                        <Checkbox
                            checked={selectedItems.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                        /></div>
                         <div className="flex items-center h-8 ml-gap bg-[#eef2f9] justify-start md:w-[23rem] max-sm:flex-row max-sm:justify-between">
                         <div className="text-xs flex items-center font-poppins">
                       {item.suppliesName}
                        </div>
                        </div>
                        <div className="flex items-center h-8 ml-gap bg-[#eef2f9] justify-center md:w-[30rem] max-sm:flex-row max-sm:justify-between">
                         <div className="text-xs flex items-center font-poppins">
                       {item.unit}
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default NewArrivalListStep1;

// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getContactDistributor } from "../../Contact/ContactAction";
// import { Checkbox, Button, Tooltip } from "antd";
// import dayjs from "dayjs";
// import Swal from "sweetalert2";
// import axios from "axios"; 
// import { base_url2 } from "../../../Config/Auth";

// function NewArrivalList(props) {
//   const [particularRowData, setParticularRowData] = useState({});
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     props.getContactDistributor(props.userId);
//   }, []);
//   useEffect(() => {
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
//   // Handle individual checkbox selection
//   const handleCheckboxChange = (item) => {
//     setSelectedItems((prevSelected) => {
//       if (prevSelected.includes(item)) {
//         return prevSelected.filter((selected) => selected !== item);
//       } else {
//         return [...prevSelected, item];
//       }
//     });
//   };

//   // Handle select all checkboxes
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedItems([]); // Deselect all
//     } else {
//       setSelectedItems(props.contactDistributor); // Select all
//     }
//     setSelectAll(!selectAll);
//   };

//   // Send the selected data to the dummy POST URL
//   const sendSelectedData = async () => {
//     try {
//       // const payload = selectedItems.map((item) => ({
//       //   contcts:item.contactId,
//       // }));
//       const payload = selectedItems.map((item) => item.contactId);
//       const response = await axios
//       .post(`${base_url2}/newArrivalsMaterials/sendEmail/${props.orgId}`, payload, {
//         headers: {
//           Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
//         },
//       })
//       console.log("Response:", response.data);
//       Swal.fire({
//         icon: 'success',
//         title: 'Email sent Successfully!',
//         // showConfirmButton: false,
//         // timer: 1500
//       })
//     } catch (error) {
//       console.error("Error sending selected data:", error);
//     }
//   };

  



//   return (
//     <div>
//       <div className="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:hidden">
//         <div className="flex w-[90%] justify-between p-1 bg-transparent font-bold sticky z-10">
//             <div  className="md:w-[0.25rem]"></div>
//           <div className="md:w-[2rem]">
//             <Tooltip title="Select All"><Checkbox checked={selectAll} onChange={handleSelectAll} /></Tooltip>
//           </div>
//           <div className="font-bold w-[43.5rem] flex items-center font-poppins text-xs">
//             {translatedMenuItems[0]}
//           </div>
//         </div>
// <div className=" overflow-x-auto h-[75vh]">
//         {props.contactDistributor.map((item) => {
//           const currentDate = dayjs().format("DD/MM/YYYY");
//           const date = dayjs(item.creationDate).format("DD/MM/YYYY");

//           return (
//             <div key={item.id}>
//               <div
//                 className="flex rounded justify-between bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg max-sm:bg-gradient-to-b max-sm:from-blue-200
//                   max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
//               >
//                 <div className="flex max-sm:justify-between max-sm:w-wk items-center">
//                   <div>
//                     <Checkbox
//                       checked={selectedItems.includes(item)}
//                       onChange={() => handleCheckboxChange(item)}
//                     />
//                   </div>
//                   <div className="flex items-center md:w-[14rem] max-sm:flex-row max-sm:justify-between">
//                     <div className="text-xs flex items-center font-poppins">
//                       {item.fullName}
//                     </div>
//                     {date === currentDate ? (
//                       <span className="text-[0.65rem] text-[tomato] font-bold">
//                         {translatedMenuItems[9]}
//                       </span>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         </div>
//       </div>

//       <Button type="primary" onClick={sendSelectedData} disabled={selectedItems.length === 0}>
//         Send Selected Data
//       </Button>
//     </div>
//   );
// }

// const mapStateToProps = ({ contact, auth }) => ({
//   orgId: auth.userDetails.organizationId,
//   userId: auth.userDetails.userId,
//   contactDistributor: contact.contactDistributor,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getContactDistributor,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(NewArrivalList);


import React, { useEffect } from "react";
import { Checkbox, Tooltip } from "antd";

const NewArrivalList = ({ 
    selectedItems, 
    setSelectedItems, 
    getContactDistributor, 
    contactDistributor, 
    userId 
}) => {

    useEffect(() => {
        getContactDistributor(userId); // Fetch contact data when the component is loaded
    }, [userId, getContactDistributor]);

    // Handle individual checkbox selection
    const handleCheckboxChange = (item) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(item)
                ? prevSelected.filter((selected) => selected !== item)
                : [...prevSelected, item]
        );
    };

    // Handle select all checkbox
    const handleSelectAll = () => {
        setSelectedItems(contactDistributor.length === selectedItems.length ? [] : contactDistributor);
    };
console.log(contactDistributor)
    return (
        <div>
             <div className="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:hidden">
             <div className="flex w-[90%] justify-between p-1 bg-transparent font-bold sticky z-10">
             <div className="md:w-[0.25rem]"></div>
             <div className="md:w-[2rem]">
            <Tooltip title="Select All">
                <Checkbox
                    checked={contactDistributor.length === selectedItems.length}
                    onChange={handleSelectAll}
                />
            </Tooltip>
            </div>
            <div className="font-bold w-[19.5rem] flex items-center font-poppins text-xs">
           Contact Name
          </div>
          <div className="font-bold w-[42.5rem] flex items-center font-poppins text-xs">
           Customer Name
          </div>
            </div>
            <div className="overflow-x-auto h-[75vh]">
                {contactDistributor.map((item) => (
                    <div key={item.contactId}>
                        <div
                  className="flex rounded  bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg max-sm:bg-gradient-to-b max-sm:from-blue-200
                    max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                >
                        <Checkbox
                            checked={selectedItems.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                        />
                         <div className="flex items-center md:w-[14rem] max-sm:flex-row max-sm:justify-between">
                         <div className="text-xs flex items-center font-poppins">
                        {item.fullName}
                        </div>
                        </div>
                        <div className="flex items-center md:w-[13rem] max-sm:flex-row max-sm:justify-between">
                         <div className="text-xs flex items-center font-poppins">
                        {item.customerName}
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

export default NewArrivalList;

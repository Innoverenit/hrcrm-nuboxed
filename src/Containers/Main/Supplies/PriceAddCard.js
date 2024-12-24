
import React, { useEffect, useState,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCategory,
} from "../../Settings/Category/CategoryList/CategoryListAction";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { Button, Input, Select,Switch, Popconfirm,message } from "antd";
import { getMaterialCurrency, createMaterialCurrency,materialPricetype,getPriceFactor,clearPriceFactor
 } from "./SuppliesAction";
import {getSaleCurrency} from "../../Auth/AuthAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EmptyPage from "../EmptyPage";
import { base_url2 } from "../../../Config/Auth";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import { BundleLoader } from "../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
const { Option } = Select;

function PriceAddCard(props) {

  const [editedFields, setEditedFields] = useState({});
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [isBestSeller, setIsBestSeller] = useState(false); 
  const [rowToggleStates, setRowToggleStates] = useState({});
  const [reduceData, setreduceData] = useState([]);


  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(props.priceFactorData?.p1 || "1");
const [inputValue2, setInputValue2] = useState(props.priceFactorData?.p2 || "");
const [inputValue3, setInputValue3] = useState(props.priceFactorData?.p3 || "");
const [inputValue4, setInputValue4] = useState(props.priceFactorData?.p4 || "");
const [inputValue5, setInputValue5] = useState(props.priceFactorData?.p5 || "");
const [inputValue6, setInputValue6] = useState(props.priceFactorData?.p6 || "");
const [inputValue7, setInputValue7] = useState(props.priceFactorData?.p7 || "");
const [inputValue8, setInputValue8] = useState(props.priceFactorData?.p8 || "");
const [sMarkUp, setsMarkUp] = useState(props.priceFactorData?.markUp || "");
const [isEditingMarkUp, setIsEditingMarkUp] = useState(false);
  const [dtouched, setDTouched] = useState(false);
  const [ctouched, setcTouched] = useState(false);
useEffect(() => {
  setreduceData(props.priceFactorData);
}, [props.priceFactorData]);
  useEffect(() => {
    props.getMaterialCurrency(props.particularDiscountData.suppliesId);
    props.getPriceFactor(props.particularDiscountData.suppliesId)
    props.clearPriceFactor()
  }, []);




  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
     "85",   //  "Add ",//0
       "241", //   "Currency",//1
      "657",  //   "Price",//2
      "71",  //   "Type",
       "154", //   "Submit",//3
       "1078", //      " Save",
       "1079", //      "Cancel"  
     "14", //  Catagory
     "110", //name
      "771",//Final

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  useEffect(() => {
    setData(props.materialCurrency.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.materialCurrency]);

  const handleAddRow = () => {
    const newRow = {
      currencyId: '',
      suppliesPrice: '',
      suppliesPriceB2C: '',
      vat: '',
      catagoryId:"",


    };
    setRows([...rows, newRow]);
  };
  const sendInputPutRequest =  async (item) => {
    
    try {
        const response = await axios.post(`${base_url2}/supplies/suppliesFactor`,item, {  
        
       });
      
      //  dispatch(getPriceFactor(props.particularDiscountData.suppliesId));
       if (response.data === 'Successfully !!!!') {
        setreduceData((prevData) =>
          prevData.map((cat) =>
            // Update the item where suppliesFactorId matches
            cat.suppliesFactorId === item.suppliesFactorId
              ? { ...cat, ...response.data } // Spread the updated response data over the existing item
              : cat // If not matching, return the existing item
          )
        );
      } else {
        console.log(response.data);
      }
      } catch (error) {
        console.error("Error updating item:", error);
      }
  };
  const sendPutRequest =  async (item) => {
    
    try {
        const response = await axios.post(`${base_url2}/supplies/update/markup/${props.particularDiscountData.suppliesId}`,item, {  
        
       });
      
      //  dispatch(getPriceFactor(props.particularDiscountData.suppliesId));
       if (response.data === 'Successfully !!!!') {
        setreduceData((prevData) =>
          prevData.map((cat) =>
            // Update the item where suppliesFactorId matches
            cat.suppliesFactorId === item.suppliesFactorId
              ? { ...cat, ...response.data } // Spread the updated response data over the existing item
              : cat // If not matching, return the existing item
          )
        );
      } else {
        console.log(response.data);
      }
      } catch (error) {
        console.error("Error updating item:", error);
      }
  };
  const handleInputBlur = (p2,p3,e) => {
    const value = e.target.value === '' ? '1' : e.target.value; 
    setInputValue(value);
    sendInputPutRequest({ p1: value,
      p2:p2,
      p3:p3,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId

     });
  };

  const handleInputBlur2 = (p1,p3,e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue2(value);
    sendInputPutRequest({ p2: value,
      p1:p1,
      p3:p3,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };
  const handleInputBlur3 = (p1,p2,e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue3(value);
    sendInputPutRequest({ p3: value,
      p1:p1,
      p2:p2,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };
  const handleInputBlur4 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue4(value);
    sendInputPutRequest({ p4: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };
  const handleInputBlur5 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue5(value);
    sendInputPutRequest({ p5: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };
  const handleInputBlur6 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue6(value);
    sendInputPutRequest({ p6: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };
  const handleInputBlur7 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue7(value);
    sendInputPutRequest({ p7: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };
  const handleInputBlur8 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue8(value);
    sendInputPutRequest({ p8: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };

  const handleChange = (index, key, value) => {
    if (key === 'suppliesPrice' || key === 'suppliesPriceB2C' || key === 'vat') {
      if (!isNaN(value)) {
        const updatedRows = [...rows];
        updatedRows[index][key] = value;
        setRows(updatedRows);
        setErrors((prevErrors) => ({ ...prevErrors, [`${key}${index}`]: '' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [`${key}${index}`]: 'Must be a number' }));
      }
    } else {
      const updatedRows = [...rows];
      updatedRows[index][key] = value;
      setRows(updatedRows);
    }
  };

  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value, currency_id: value } : row
    );
    setData(updatedData);
  };

  function cancelType(){
    if (isBestSeller) {
      setIsBestSeller(true);
    } else {
      setIsBestSeller(false);
    }
  }
  // const handleToggleChange = (checked) => {
  //   setIsBestSeller(checked);
  // };
  
  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };

  const handleSave = (index) => {
    const row = rows[index];
    // const targetRow = data.find((row) => row.key === key);
    // if (targetRow) {
      console.log('Submitting Row:', row);
      const result = {
        currency: row.currency_id,
        suppliesPrice: row.suppliesPrice,
        suppliesPriceB2C: row.suppliesPriceB2C,
        suppliesId: props.particularDiscountData.suppliesId,
        userId: props.userId,
        orgId: props.orgId,
        sCategory:row.catagoryId,
         type:"mrp"
      };
      props.createMaterialCurrency(result)
      setRows([{ currency: '', suppliesPrice: '', suppliesPriceB2C: '', vat: '',catagoryId:"" }]);
  };
  const handleEditClick = (id) => {
    setEditsuppliesId(id);
  };
  const handleCancelClick = (id) => {
    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditsuppliesId(null);
  };
  function handleUpdate(key,index) {
    console.log('Submitting Row:', key);
    const row = rows[index];
    const updatedData = {
        // currency:row.currency_id ? row.currency_id: key.currency,
        currency:key.currency,
      suppliesPrice: key.suppliesPrice,
      suppliesPriceB2C: key.suppliesPriceB2C,
      suppliesId: props.particularDiscountData.suppliesId,
      userId: props.userId,
      orgId: props.orgId,
      //  type: isBestSeller ? "baseprice" : "mrp"
     
    };
    props.materialPricetype(updatedData);
    setEditsuppliesId(null);
  };
  const handleToggleChange = (key, confirm) => {
    if (confirm) {
      setRowToggleStates((prevState) => ({
        ...prevState,
        [key]: !prevState[key], // Toggle the specific row
      }));
      const newType = !rowToggleStates[key] ? "baseprice" : "mrp"; 
      props.materialPricetype({
        type: newType, 
      });
    } else {
      message.info("Toggle action cancelled");
    }
  };

  const handleUpdateMarkUp = () => {
    const updatedName = {
      markUp:sMarkUp,
        suppliesId: props.particularDiscountData.suppliesId, // Use the updated quiz name from local state
    };
   sendPutRequest(updatedName);
   setIsEditingMarkUp(false); // Close the input box after updating
  };
  const handleSelectDepartmentFocus = () => {
    if (!dtouched) {
      props.getSaleCurrency()
      setDTouched(true);
    }
  };
  const handleSelectCaregoryFocus = () => {
    if (!ctouched) {
      props.getCategory(props.orgId); 
      setcTouched(true);
    }
  };
  console.log(inputValue)
  if (props.fetchingPriceFactor) {
    return <div><BundleLoader/></div>;
  }
  return (
    <div>
      <div class="flex mb-8 flex-start ">
        <div className="flex w-[5rem] items-center">
     <Button  type="primary" onClick={handleAddRow} >
     <DataSaverOnIcon className="!text-icon"/> {translatedMenuItems[0]} {/* Add */}
      </Button>
      </div>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center justify-between w-[30rem]">
                   
              <div>
                <div class="font-bold text-xs font-poppins text-black">
                  {/* Currency */} {translatedMenuItems[1]}
                  </div>
                <div class="w-16">
                <Select                   
                        value={row.currency_id}
                        onChange={(value) => handleChange(index, 'currency_id',value)}
                        onFocus={handleSelectDepartmentFocus}
                      >
                        {props.saleCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>

                </div>
              </div>

              <div class="w-24">
                <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[2]}  (B2B)</div>
              
                <Input 
                 inputMode="numeric"
                    
                        value={row.suppliesPrice}
                        onChange={(e) => handleChange(index,'suppliesPrice',e.target.value)}
                      />
                        {errors[`suppliesPrice${index}`] && <span className="text-red-500">{errors[`suppliesPrice${index}`]}</span>}
                      </div>
           

                      <div>           
                <div class="w-28">
                <div>        
                  <div class="font-bold text-xs font-poppins text-black">
               {/* Catagory */}{translatedMenuItems[7]}
                  
                  </div>
          
                <Select
                      
                      value={row.catagoryId}
                      onChange={(value) => handleChange(index, 'catagoryId',value)}
                      onFocus={handleSelectCaregoryFocus}
                      >
                        {props.categoryListData.map((s) => (
                          <Option key={s.categoryId} value={s.categoryId}>
                            {s.name}
                          </Option>
                        ))}
                      </Select>              
              </div>
                       
                      </div>
                      </div>
                  <div class="flex items-center">    
            <Button class="flex items-center"type="primary" onClick={() => handleSave(index)}>
              {/* Submit */} {translatedMenuItems[4]}
            </Button>
            </div>
          
           
            
          </div>

        ))}
</div>
      <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-poppins font-bold sticky !text-lm z-10">      
            <div className="w-[7.3rem] text-[#00A2E8] text-sm truncate max-md:w-[6.3rem]"> <CurrencyExchangeIcon className='!text-icon'/>  {translatedMenuItems[1]}</div>
            <div className=" w-[8.5rem] truncate max-md:w-[7.9rem]">  <CurrencyExchangeIcon className='!text-base   text-[#84a59d]'/> {translatedMenuItems[2]}(B2B)</div>
            <div className=" w-[7.8rem] truncate max-md:w-[7.8rem] ">   {translatedMenuItems[9]}</div>
            <div className="w-[7.2rem] truncates max-md:w-[7.2rem] ">  <FormatListNumberedIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[7]}
              {/* Catagory name */}
              </div>
            <div className="w-[4.8rem]  truncate max-md:w-[4.8rem] ">   < MergeTypeIcon className='!text-icon text-[#c42847] '  /> {translatedMenuItems[3]}</div>
           
            <div className="w-12"></div>         
            </div>
            <div className="h-[23vh] overflow-x-auto">
          {data.length ? data.map((item) => {
            return (
              <div key={item.id}>
                <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap  hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
                >

                  <div className=" flex font-poppins items-center justify-start md:w-[7.2rem] border-l-2 h-8 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                    <div class="text-xs font-semibold ml-gap font-poppins cursor-pointer">
                    {/* {editsuppliesId === item.id ? (
                      <Select
                        classNames="w-32"
                        value={item.currencyName}
                        onChange={(value) => handleSelectChange(value, item.key, 'currencyName')}
                      >
                        {props.saleCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>
                    ):(
                      <div className=" text-xs  font-poppins">
                      <div> {item.currencyName}</div>
                    </div>
                  )} */}
                  <div className=" text-xs  font-poppins">
                      <div> {item.currencyName}</div>
                    </div>
                    </div>
                  </div>

                  <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9] md:w-[7.6rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.id ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.suppliesPrice}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'suppliesPrice')}
                      />
                    </div>
 ):(
  <div className=" text-xs font-poppins">
  <div> {item.suppliesPrice}</div>
</div>
)}
                  </div>

                  <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9] md:w-[7.3rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  <div className=" text-xs  font-poppins">
                     <div>  {/* Final */}</div> 
                    </div>
                    </div>
                  <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9] md:w-[6.4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  <div className=" text-xs  font-poppins">
                      <div> {item.sCategoryName}</div>
                    </div>
                    </div>
                  
                  {/* <div className=" flex md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <Popconfirm
        title="Are you sure you want to change status ?"
        // onConfirm={handleToggleChange}
       onCancel={cancelType}
        okText="Yes"
        cancelText="No"
      >
        <Switch
         className="toggle-clr"
         checked={isBestSeller}
         onChange={handleToggleChange}
          checkedChildren="Base price"
          unCheckedChildren="MRP"
        />
      </Popconfirm>
                  </div> */}
                   <div className="flex items-center justify-start h-8 ml-gap  bg-[#eef2f9] ">
                   <Popconfirm
  title="Are you sure to change the toggle state?"
  onConfirm={() => handleToggleChange(item.key, true)}
  onCancel={() => handleToggleChange(item.key, false)}
  okText="Yes"
  cancelText="No"
>
  <Switch
    checked={rowToggleStates[item.key] || false}
    className="toggle-checkbox"
    checkedChildren="Base price"
    unCheckedChildren="MRP"
  />
</Popconfirm>

        </div>

                  <div class="flex items-center justify-start h-8 ml-gap  bg-[#eef2f9] md:items-center">
       
 {editsuppliesId === item.id ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        {translatedMenuItems[5]}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.id)} className="ml-[0.5rem]">
                        {translatedMenuItems[6]}
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.id)}
                      />
                    )}
 <div>
      {/* <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductPrice(item.Id)}

                          >
                     <Tooltip title="Delete">
                     <DeleteOutlineIcon
                      style={{ color: 'red' }}
                          className="!text-xl cursor-pointer  flex justify-center items-center mt-1 ml-1"
                          />
                       </Tooltip>
                       </StyledPopconfirm> */}
                       </div>
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingMaterialCurrency ? <EmptyPage /> : null}
          </div>

        </div>
      </div>
      <Suspense fallback={<BundleLoader/>}>

  <div className="flex flex-col mt-2">
  <div class=" flex w-[35%]">
<div>
<div class="text-base font-semibold w-40 ">P-1(%)</div>                       
   <input
            id="p1"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p1 || "1"}
            onBlur={(e) => handleInputBlur(props.priceFactorData.p2,props.priceFactorData.p3,e)}
            onChange={(e) => setInputValue(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
          <div >
          <div class="text-base font-semibold w-40 ">P-2(%)</div>
         <input
            id="p2"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p2 || "1"}
            onBlur={(e) => handleInputBlur2(props.priceFactorData.p1,props.priceFactorData.p3,e)}
            onChange={(e) => setInputValue2(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
          <div  >
                                       
          <div class="text-base font-semibold w-40 ">P-3(%)</div> 
             <input
            id="p3"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p3 || "1"}
            onBlur={(e) => handleInputBlur3(props.priceFactorData.p1,props.priceFactorData.p2,e)}
            onChange={(e) => setInputValue3(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
          </div>
          <div class=" flex mt-2 w-[35%]">
          <div >
          <div class="text-base font-semibold w-40 ">P-4(%)</div>     
           <input
            id="p4"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p4 || "1"}
            onBlur={(e) => handleInputBlur4(e)}
            onChange={(e) => setInputValue4(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
          <div >
          <div class="text-base font-semibold w-40 ">P-5(%)</div>   
                      <input
            id="p5"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p5 || "1"}
            onBlur={(e) => handleInputBlur5(e)}
            onChange={(e) => setInputValue5(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
          <div>
          <div class="text-base font-semibold w-40 ">P-6(%)</div>   
             <input
            id="p6"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p6 || "1"}
            onBlur={(e) => handleInputBlur6(e)}
            onChange={(e) => setInputValue6(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
          </div>
          <div class=" flex mt-2  w-[35%]">
          <div >
          <div class="text-base font-semibold w-40 ">P-7(%)</div>
            <input
            id="p7"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p7 || "1"}
            onBlur={(e) => handleInputBlur7(e)}
            onChange={(e) => setInputValue7(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
          <div >
          <div class="text-base font-semibold w-40 ">P-8(%)</div>    
             <input
            id="p8"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={props.priceFactorData?.p8 || "1"}
            onBlur={(e) => handleInputBlur8(e)}
            onChange={(e) => setInputValue8(e.target.value)}
           placeholder="Input Factor"
          />
          </div> 
         
             </div>  
</div>

{/* <div className="mt-4">
            <div>Mark Up By %</div>
        {isEditingMarkUp ? (
        <input
          type="text"
          className="h-10 w-[10rem] text-xl"
          value={sMarkUp}
          onChange={(e) => setsMarkUp(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateMarkUp()} // Trigger update on 'Enter'
          onBlur={handleUpdateMarkUp} // Optional: Update on blur as well
          autoFocus // Focus the input automatically when editing
        />
      ) : (
        <div onClick={() => setIsEditingMarkUp(true)} className="cursor-pointer text-xl font-[Poppins]">{reduceData.markUp}sMarkUp</div> // Click to enter edit mode
      )}
        
          </div> */}
</Suspense>
    </div>
  );


};

const mapStateToProps = ({ product,categoryList, auth,supplies }) => ({
  materialCurrency: supplies.materialCurrency,
  fetchingMaterialCurrency: supplies.fetchingMaterialCurrency,
  addDiscountModal: product.addDiscountModal,
  addProductOfferModal: product.addProductOfferModal,
  currencies: auth.currencies,
  categoryListData: categoryList.categoryListData,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies,
  orgId: auth.userDetails.organizationId,
  priceFactorData:supplies.priceFactorData,
  fetchingPriceFactor:supplies.fetchingPriceFactor
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialCurrency,
      createMaterialCurrency,
      materialPricetype,
      getCategory,
    //   handleOfferModal,
    //   getCurrency,
      getSaleCurrency,
      getPriceFactor,
      clearPriceFactor
     
    //   removeProductPrice
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PriceAddCard);



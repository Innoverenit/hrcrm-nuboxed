import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Select,Tooltip } from "antd";
import {createMaterialDiscount,getMaterialDiscount,
} from "./SuppliesAction";
import {
  getCategory,
} from "../../Settings/Category/CategoryList/CategoryListAction";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EmptyPage from "../EmptyPage";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import EqualizerIcon from '@mui/icons-material/Equalizer';
const { Option } = Select;

function PriceDiscountCard(props) {

  const [editedFields, setEditedFields] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
    const [dtouched, setDTouched] = useState(false);

  useEffect(() => {
    props.getMaterialDiscount(props.particularDiscountData.suppliesId,"B2B");
   // props.getInvestorCurrency()
 
  }, []);

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
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
      "85",  //  "Add ",//0
      "1369",  //   "Volume",//1
       "218", //   "Value",
       "176", //   "Start Date",
       "126", //   "End Date",
      "154",  //   "Submit",
     "1078",   //   "Save",
      "1079",  //   "Cancel"
         
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
    setData(props.materialDiscount.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.materialDiscount]);


  const handleAddRow = () => {
    const newRow = {
      // key: String(data.length + 1),
      volume: '',
      allowedDiscount: '',
      date: null,
      catagoryId:"",
    };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    if (key === 'allowedDiscount' || key === 'volume' || key === 'vat') {
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

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };

  const handleSave = (index) => {
    const row = rows[index];
    // const targetRow = data.find((row) => row.key === key);
    if (!row.allowedDiscount || isNaN(row.allowedDiscount)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`allowedDiscount${index}`]: 'Input required',
      }));
      return;
    }
    // if (targetRow) {
      console.log('Submitting Row:', row);
      const result = {
        volume: row.volume,
        discountType: "B2B",
        allowedDiscount: row.allowedDiscount,
        suppliesId: props.particularDiscountData.suppliesId,
        startDate: row.startDate ? dayjs(row.startDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
        endDate: row.endDate ? dayjs(row.endDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
        userId: props.userId,
        orgId: props.orgId,
        sCategory:row.catagoryId,
      };
      props.createMaterialDiscount(result)
      setRows([{  allowedDiscount: '', volume: '', catagoryId:"" }]);
  };
  const handleEditClick = (suppliesId) => {
    setEditsuppliesId(suppliesId);
  };
  const handleCancelClick = (suppliesId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [suppliesId]: undefined }));
    setEditsuppliesId(null);
  };

  const { materialDiscount } = props;
  let investorsShareId; // Declare investorsShareId outside
  
  if (materialDiscount && materialDiscount.length > 0) {
    const firstItem = materialDiscount[0];
    investorsShareId = firstItem.investorsShareId;
    console.log(investorsShareId); // or use the investorsShareId as needed
  } else {
    console.error("materialDiscount is undefined or empty");
  }

  function handleUpdate(key) {
    console.log('Submitting Row:', key);
    const updatedData = {
      volume: key.volume,
      allowedDiscount: key.allowedDiscount,
      suppliesId: props.particularDiscountData.suppliesId,
      investorsShareId:investorsShareId,
      currency: key.currency_id,
      startDate: key.startDate ? dayjs(key.startDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
      endDate: key.endDate ? dayjs(key.endDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
      userId: props.userId,
        orgId: props.orgId,
    };
    props.createMaterialDiscount(updatedData,props.particularDiscountData.suppliesId);
    setEditsuppliesId(null);
  };

    const handleSelectDepartmentFocus = () => {
      if (!dtouched) {
        props.getCategory(props.orgId); 
        setDTouched(true);
      }
    };

  return (
    <div>
            <div class="flex mb-8 flex-start ">
      {/* //B2B */}
      <div className="flex w-[5rem]  items-center">
      <Button className="mb-16  w-[5rem]" type="primary" onClick={handleAddRow}>
      <DataSaverOnIcon className="!text-icon"/>  {/* Add */}{translatedMenuItems[0]}
      </Button>
      </div>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center justify-between">
            <div class="flex justify-around w-wk">
     
              <div>
                <div class="font-bold text-xs font-poppins text-black">
                {translatedMenuItems[1]} {/* Volume */}
                  </div>
                <Input  className="w-[4.5rem]"
                 inputMode="numeric"
                  
                        value={row.volume}
                        onChange={(e) => handleChange(index,'volume',e.target.value)}
                      />
                        {errors[`volume${index}`] && <span className="text-red-500">{errors[`volume${index}`]}</span>}
                      </div>

              <div>
              <div>
                <div class="font-bold w-[4rem] text-xs font-poppins text-black">
               {translatedMenuItems[2]} in %{/* Value */}
                   </div>
                <div>
                <Input className="w-[4rem]"
                 inputMode="numeric"
                    
                        value={row.allowedDiscount}
                        onChange={(e) => handleChange(index,'allowedDiscount',e.target.value)}
                      />
                       {errors[`allowedDiscount${index}`] && <span className="text-red-500">{errors[`allowedDiscount${index}`]}</span>}
                      </div></div>
                      </div>
                      <div>
        <div class="font-bold text-xs font-poppins text-black">
          {/* Start Date */}{translatedMenuItems[3]}
          </div>
        <div >
          <DatePicker className="w-[6.5rem]"
 
            value={row.startDate ? dayjs(row.startDate) : null}
            onChange={(date, dateString) => handleChange(index, 'startDate', dateString)}
          />
        </div>
      </div>
      <div>
        <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[4]}</div>
        <div >
          <DatePicker className="w-[6.5rem]"
            value={row.endDate ? dayjs(row.endDate) : null}
            onChange={(date, dateString) => handleChange(index, 'endDate', dateString)}
          />
        </div>
      </div>
      <div>           
                <div class="w-28">
                <div>        
                  <div class="font-bold text-xs font-poppins text-black">
               Catagory
                  
                  </div>
          
                <Select
                      
                      value={row.catagoryId}
                      onChange={(value) => handleChange(index, 'catagoryId',value)}
                      onFocus={handleSelectDepartmentFocus}
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
      <Button type="primary" onClick={() => handleSave(index)}>
            {translatedMenuItems[5]} {/* Submit */}
            </Button>
</div>
            </div>         
          </div>
        ))}
</div>
      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-poppins font-bold !text-lm sticky  z-10">         
            <div className=" w-[12.2rem] text-[#00A2E8] text-sm   truncate max-md:w-[21rem]"><EqualizerIcon className='!text-icon '/> {translatedMenuItems[1]}  </div>
            <div className=" w-[11.1rem]  truncate max-md:w-[11.1rem]">   <CurrencyExchangeIcon className='!text-icon  text-[#84a59d]'/> {translatedMenuItems[2]} </div>
            <div className=" w-[10.2rem]  truncate max-md:w-[10.2rem] "><DateRangeIcon className="!text-icon text-[#896C7B]"/> {translatedMenuItems[3]} </div>
            <div className=" w-[9.2rem]  truncate max-md:w-[9.2rem] "><DateRangeIcon className="!text-icon text-[#896C7B] "/> {translatedMenuItems[4]} </div>
            <div className="w-12"></div>           
              </div>
<div className="h-[23vh] overflow-x-auto">
          {data.length ? data.map((item) => {
            return (
              <div key={item.suppliesId}>
                <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                >

                 
 <div className=" flex w-[7.5rem] items-center justify-center max-md:w-[6.5rem] border-l-2 border-green-500 bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                  {editsuppliesId === item.suppliesId ? (
                    <div class=" text-xs flex items-center justify-center ml-gap font-poppins">
                      <Input
                        className="w-32"
                        value={item.volume}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'volume')}
                      />
                    </div>
                     ):(
                      <div className="text-xs font-poppins">
                      <div> {item.volume}</div>
                    </div>
                    )}
                  </div>
                 
                  {/* <div className=" flex font-medium items-end flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                    {editsuppliesId === item.suppliesId ? (
                      <Select
                      style={{width:"5rem"}}
                        value={item.currency}
                        onChange={(value) => handleSelectChange(value, item.key, 'currency')}
                      >
                        {props.investorCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>
                    ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.currency}</div>
                    </div>
                  )}
                    </div>
                  </div> */}
                  <div className=" flex w-[7rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center  max-md:w-[7.1rem] max-sm:flex-row  max-sm:justify-between  ">
                  {editsuppliesId === item.suppliesId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.allowedDiscount}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'allowedDiscount')}
                      />
                    </div>
 ):(
  <div className="font-normal text-xs  font-poppins">
  <div> {item.allowedDiscount}</div>
</div>
)}
                  </div>



                 
                  {editsuppliesId === item.suppliesId ? (
                   
  <DatePicker
  style={{width:"9rem"}}
    value={item.startDate ? dayjs(item.startDate) : null}
    onChange={(startDate) => handleInputChange(startDate, item.key, 'startDate')}
  />
) : (
  <div className="flex w-[5.9rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center ">
    <div class=" text-xs font-poppins">{dayjs(item.startDate).format('DD/MM/YY')}</div>
  </div>
)}

{editsuppliesId === item.suppliesId ? (
  <DatePicker
  style={{width:"9rem"}}
    value={item.endDate ? dayjs(item.endDate) : null}
    onChange={(endDate) => handleInputChange(endDate, item.key, 'endDate')}
  />
) : (
  <div className="flex w-[5.4rem]  items-center  h-8 ml-gap bg-[#eef2f9] justify-center">
   
    <div class=" text-xs font-poppins">{dayjs(item.endDate).format('DD/MM/YY')}</div>
  </div>
)}
                  <div class="flex md:items-center  items-center  h-8 ml-gap bg-[#eef2f9] justify-center">

 {editsuppliesId === item.suppliesId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        {/* Save */}
                         {translatedMenuItems[6]} 
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.suppliesId)} className="ml-[0.5rem]">
                        {/* Cancel  */}
                        {translatedMenuItems[7]} 
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.suppliesId)}
                      />
                    )}
 {/* <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductPrice(item.suppliesId)}

                          >
                     <Tooltip title="Delete">
                     <DeleteOutlineIcon
                      style={{ color: 'red' }}
                          className="!text-xl cursor-pointer  flex justify-center items-center mt-1 ml-1"
                          />
                       </Tooltip>
                       </StyledPopconfirm>
                       </div> */}
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingMaterialDiscount ? <EmptyPage /> : null}
</div>
        </div>
      </div>

    </div>
  );


};

const mapStateToProps = ({ investor, auth ,supplies,categoryList}) => ({
  materialDiscount: supplies.materialDiscount,
  fetchingMaterialDiscount: supplies.fetchingMaterialDiscount,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies,
  investorCurrencies: auth.investorCurrencies,
  orgId: auth.userDetails.organizationId,
  categoryListData: categoryList.categoryListData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getMaterialDiscount,
       createMaterialDiscount,
       getCategory
       //createMaterialDiscountUpdate,
      // getInvestorCurrency,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PriceDiscountCard);


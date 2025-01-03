import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Select } from "antd";
import {investorShare,getInvestorShare,investorShareUpdate} from "../../InvestorAction";
import {getInvestorCurrency} from "../../../Auth/AuthAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const EmptyPage = lazy(() => import("../../../Main/EmptyPage"));
const { Option } = Select;

function InventoryPriceAddTable(props) {

  const [editedFields, setEditedFields] = useState({});
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.getInvestorShare(props.RowData.investorId);
    props.getInvestorCurrency()
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
    setData(props.inventoryShare.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.inventoryShare]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '1158', // 0 share
          '1435', // 1 Value per Share
          '1436', // 2 Purchase
          '85',// Add 
        
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



  const handleAddRow = () => {
    const newRow = {
      // key: String(data.length + 1),
      quantityOfShare: '',
      amountPerShare: '',
      date: null,


    };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    if (key === 'amountPerShare' || key === 'quantityOfShare' || key === 'vat') {
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
    // if (targetRow) {
      console.log('Submitting Row:', row);
      const result = {
        quantityOfShare: row.quantityOfShare,
        currency: row.currency_id,
        amountPerShare: row.amountPerShare,
        investorId: props.RowData.investorId,
       // buyingDate: row.buyingDate,
        buyingDate: row.buyingDate ? dayjs(row.buyingDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
      };
      props.investorShare(result)
      setRows([{  amountPerShare: '', quantityOfShare: '', }]);
  };
  const handleEditClick = (investorsShareId) => {
    setEditsuppliesId(investorsShareId);
  };
  const handleCancelClick = (investorsShareId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [investorsShareId]: undefined }));
    setEditsuppliesId(null);
  };

  const { inventoryShare } = props;
  let investorsShareId; // Declare investorsShareId outside
  
  if (inventoryShare && inventoryShare.length > 0) {
    const firstItem = inventoryShare[0];
    investorsShareId = firstItem.investorsShareId;
    console.log(investorsShareId); // or use the investorsShareId as needed
  } else {
    console.error("inventoryShare is undefined or empty");
  }

  function handleUpdate(key) {
    console.log('Submitting Row:', key);
    const updatedData = {
      quantityOfShare: key.quantityOfShare,
      amountPerShare: key.amountPerShare,
      investorId: props.RowData.investorId,
      investorsShareId:investorsShareId,
      currency: key.currency_id,
      buyingDate: key.buyingDate ? dayjs(key.buyingDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
    };
    props.investorShareUpdate(updatedData);
    setEditsuppliesId(null);
  };
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <div>
      <div className=" flex items-center justify-end w-wk">
      <Button type="primary" className="mb-16" onClick={handleAddRow} >
        {/* Add Row  */} <DataSaverOnIcon className=" text-white !text-icon"/>{translatedMenuItems[3]}
      </Button>
      </div>
      
      {rows.map((row, index) => (
          <div key={index} class="flex items-center justify-between">
            <div class="flex justify-around w-[30rem]">
            <div>
                <div class="font-bold text-xs font-poppins text-black">Currency</div>
                <div class="w-24">
                <Select
                style={{width:"5rem"}}
                      
                        value={row.currency_id}
                        onChange={(value) => handleChange(index, 'currency_id',value)}
                      >
                        {props.investorCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>

                </div>
              </div>

              <div>
                <div class="font-bold text-xs font-poppins text-black">Quantity Of Share</div>
                <div class="w-24"></div>
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.quantityOfShare}
                        onChange={(e) => handleChange(index,'quantityOfShare',e.target.value)}
                      />
                        {errors[`quantityOfShare${index}`] && <span className="text-red-500">{errors[`quantityOfShare${index}`]}</span>}
                      </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Value per Share</div>
                <div class="w-24">
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.amountPerShare}
                        onChange={(e) => handleChange(index,'amountPerShare',e.target.value)}
                      />
                       {errors[`amountPerShare${index}`] && <span className="text-red-500">{errors[`amountPerShare${index}`]}</span>}
                      </div></div>
                      <div>
        <div class="font-bold text-xs font-poppins text-black">Date</div>
        <div class="w-24">
          <DatePicker
            style={{width:"9rem"}}
            value={row.buyingDate ? dayjs(row.buyingDate) : null}
            onChange={(date, dateString) => handleChange(index, 'buyingDate', dateString)}
          />
        </div>
      </div>
    
            </div>
            <div class="mt-4">
            <Button type="primary" onClick={() => handleSave(index)}>
              Submit
            </Button>
            </div>
            
          </div>
        ))}

      <div className=' flex  sticky z-auto mt-2'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[84%]  p-1 bg-transparent font-bold text-lm font-poppins sticky items-end z-10">         
            <div className=" text-sm text-[#00A2E8] w-[12rem] max-md:w-[12rem]">  <ShowChartIcon className='!text-icon    text-[#776871]' />  {translatedMenuItems[0]}
          {/* Shares */}
              </div>
            <div className=" w-[10.1rem] max-md:w-[14.1rem]"> <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' />  {translatedMenuItems[1]}
    {/* Value per Share */}
              </div>
            <div className="text-xs  w-[8.2rem] max-md:w-[10.2rem] "><DateRangeIcon className="!text-icon   text-[#f28482]"/> {translatedMenuItems[2]}
              {/* Purchase date */}
              </div>
               
              </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.investorsShareId}>
                <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                >

                 
 <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9] h-8 md:w-[16.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.investorsShareId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.quantityOfShare}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'quantityOfShare')}
                      />
                    </div>
                     ):(
                      <div className=" text-xs ml-gap font-poppins">
                      <div> {item.quantityOfShare}</div>
                    </div>
                    )}
                  </div>
                  <div className="flex">
                  <div className=" flex  items-center  justify-start ml-gap bg-[#eef2f9] h-8 md:w-[19.01rem] max-sm:w-full  ">
                  <div className=" flex   md:w-[3.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                    <div class="text-xs font-semibold  font-poppins cursor-pointer">
                    {editsuppliesId === item.investorsShareId ? (
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
                      <div className=" text-xs ml-gap font-poppins">
                      <div> {item.currency}</div>
                    </div>
                  )}
                    </div>
               </div>
                  <div className=" flex   md:w-[6.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.investorsShareId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.amountPerShare}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'amountPerShare')}
                      />
                    </div>
 ):(
  <div className=" text-xs font-poppins">
  <div> {item.amountPerShare}</div>
</div>
)}
                  </div>
                  </div>
</div>

<div className=" flex  items-center  justify-start ml-gap bg-[#eef2f9] h-8 md:w-[19.1rem] max-sm:w-full  ">
                  {editsuppliesId === item.investorsShareId ? (
  <DatePicker
  style={{width:"9rem"}}
    value={item.buyingDate ? dayjs(item.buyingDate) : null}
    onChange={(buyingDate) => handleInputChange(buyingDate, item.key, 'buyingDate')}
  />
) : (
  <div className=" text-xs ml-gap font-poppins">
    <div>{dayjs(item.buyingDate).format('DD/MM/YY')}</div>
  </div>
)}

</div>

                  <div class="flex md:items-center items-center  justify-center ml-gap bg-[#eef2f9] h-8">
 {editsuppliesId === item.investorsShareId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.investorsShareId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.investorsShareId)}
                      />
                    )}
 
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingInvenstoryShare ? <EmptyPage /> : null}

        </div>
      </div>

    </div>
  );


};

const mapStateToProps = ({ investor, auth }) => ({
  inventoryShare: investor.inventoryShare,
  fetchingInvenstoryShare: investor.fetchingInvenstoryShare,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies,
  investorCurrencies: auth.investorCurrencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getInvestorShare,
       investorShare,
       investorShareUpdate,
       getInvestorCurrency,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPriceAddTable);


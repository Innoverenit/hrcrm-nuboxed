import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClubStatusToggle from "./ClubStatusToggle"
import { Button, Input, Select,Tooltip } from "antd";
import {clubShare,getclubShare,updateClub} from "../../SettingsAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { SketchPicker } from "react-color"; 
import AddIcon from '@mui/icons-material/Add';
const { Option } = Select;

function ClubList(props) {

  const [editedFields, setEditedFields] = useState({});
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [colorPickerVisible, setColorPickerVisible] = useState(false); // State for showing color picker

  useEffect(() => {
    props.getclubShare();
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
    setData(props.clubShareData.map((item, index) => ({ ...item, key: String(index), color: item.color || '#4A90E2', })));
  }, [props.clubShareData]);





  const handleAddRow = () => {
    const newRow = {
      // key: String(data.length + 1),
      clubName: '',
      noOfShare: '',
      discount:'',
      color: '#4A90E2', 


    };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    if (key === 'noOfShare' ||  key === 'discount') {
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
  const handleColorChange = (color, index) => {
    const updatedRows = [...rows];
    updatedRows[index].color = color.hex;
    setRows(updatedRows);
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
        clubName: row.clubName,
        noOfShare: row.noOfShare,
        discount: row.discount,
        color: row.color, 
      };
      props.clubShare(result)
      setRows([{  noOfShare: '', clubName: '', color: '#4A90E2' }]);
  };
  const handleEditClick = (clubId) => {
    setEditsuppliesId(clubId);
    setColorPickerVisible(true); // Show color picker on edit
  };
  const handleCancelClick = (clubId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [clubId]: undefined }));
    setEditsuppliesId(null);
    setColorPickerVisible(false); // Hide color picker on cancel
  };

function handleUpdate(key) {
  console.log('Submitting Row:', key);
  const updatedData = {
    clubName: key.clubName,
    noOfShare: key.noOfShare,
    discount: key.discount,
    color: key.color || '#4A90E2', // Ensure color is not null
  };
  // if (clubId) {
    props.updateClub(updatedData, key.clubId);
  // } else {
  //   console.error("clubId is undefined");
  // }
  setEditsuppliesId(null);
  setColorPickerVisible(false); // Hide color picker after update
};
console.log(props.clubShareData)
  return (
    <div>
      <div class="flex right-0 ">
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
        <AddIcon className="!text-icon  "/>
        Add Row
      </Button>
      </div>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center">
            <div class="flex justify-between w-wk  ">
              <div>
                <div class="font-bold text-xs font-poppins text-black">Name</div>
                <div class="w-24"></div>
                <Input
                type="text"
                 inputMode="text"
                  pattern="[a-zA-Z0-9\s]*"
                        className="w-32"
                        value={row.clubName}
                        onChange={(e) => handleChange(index,'clubName',e.target.value)}
                      />
                        {errors[`clubName${index}`] && <span className="text-red-500">{errors[`clubName${index}`]}</span>}
                      </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black"># Shares</div>
                <div class="w-24">
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.noOfShare}
                        onChange={(e) => handleChange(index,'noOfShare',e.target.value)}
                      />
                       {errors[`noOfShare${index}`] && <span className="text-red-500">{errors[`noOfShare${index}`]}</span>}
                      </div></div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Discount %</div>
                <div class="w-24">
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.discount}
                        onChange={(e) => handleChange(index,'discount',e.target.value)}
                      />
                        {errors[`discount${index}`] && <span className="text-red-500">{errors[`discount${index}`]}</span>}
                </div>
              </div>
              <div>
              <div className="font-bold text-xs font-poppins text-black">Color</div>
              <SketchPicker
              styles={{
                default: {
                  picker: {
                    boxShadow: 'none',
                    borderRadius: '8px',
                    width: '16rem', // Adjust width as needed 
                    height:"5rem",overflowX:"auto"
                  },
                  saturation: {
                    borderRadius: '8px',
                  },
                },
              }}
                color={row.color}
                onChange={(color) => handleColorChange(color, index)}
              />
            </div>
            </div>
            <div class="mt-4">
            <Button type="primary" onClick={() => handleSave(index)}>
              Submit
            </Button>
            </div>
            
          </div>
        ))}

      <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[95%]  p-1 bg-transparent font-bold sticky z-10">         
            <div className="w-[1rem] max-md:w-[10rem]">
            {/* <ContactsIcon className="!text-icon  "/> */}
              Name</div>
            <div className="w-[5rem] max-md:w-[10.1rem]"># Shares</div>
            <div className="w-[11.2rem] max-md:w-[11.2rem] ">Discount %</div>
            <div className="w-12"></div>           
              </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.clubId}>
                <div className="flex rounded justify-between mt-1 bg-white h-16 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                >

<div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.clubId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.clubName}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'clubName')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.clubName}</div>
                    </div>
                    )}
                  </div>
                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.clubId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.noOfShare}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'noOfShare')}
                      />
                    </div>
 ):(
  <div className="font-normal text-sm  font-poppins">
  <div> {item.noOfShare}</div>
</div>
)}
                  </div>



                 
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.clubId ? (

                    <div class=" text-xs  font-semibold  font-poppins">
                      <Input
                        className="w-32"
                        value={item.discount}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'discount')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.discount} %</div>
                    </div>
                    )}
                  </div>
                  
                <div class="w-24">
                <ClubStatusToggle
                                  invToCusInd={item.invToCusInd}
                                  clubId={item.clubId}
                                  // suppliesId={item.suppliesId}
                                />
                </div>
                <div>
                  {editsuppliesId === item.clubId ? (
                    <SketchPicker
                    styles={{
                      default: {
                        picker: {
                          boxShadow: 'none',
                          borderRadius: '8px',
                          width: '10rem', // Adjust width as needed 
                          height:"3rem",overflowX:"auto"
                        },
                        saturation: {
                          borderRadius: '8px',
                        },
                      },
                    }}
                      color={item.color || '#4A90E2'} // Ensure default color is used if null
                      onChange={(color) => handleInputChange(color.hex, item.key, 'color')}
                    />
                  ) : (
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: item.color || '#4A90E2', // Ensure color shows even if null
                        borderRadius: '50%',
                      }}
                    ></div>
                  )}
                </div>
                  <div class="flex md:items-center">


 {editsuppliesId === item.clubId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.clubId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className=" !text-icon text-red-600 cursor-pointer flex justify-center "
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.clubId)}
                      />
                    )}
 <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductPrice(item.clubId)}

                          >
                     <Tooltip title="Delete">
                    
                     <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                       </Tooltip>
                       </StyledPopconfirm>
                       </div>
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingClubShare ? <NodataFoundPage /> : null}

        </div>
      </div>

    </div>
  );


};

const mapStateToProps = ({ settings, auth }) => ({
    clubShareData: settings.clubShareData,
  fetchingClubShare: settings.fetchingClubShare,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getclubShare,
       clubShare,
       updateClub
    //   handleDiscountModal,
    //   handleOfferModal,
    //   getCurrency,
    //   getSaleCurrency,
    //   removeProductPrice
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClubList);
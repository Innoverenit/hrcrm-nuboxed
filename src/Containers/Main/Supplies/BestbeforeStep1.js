import React, { useEffect,useState } from "react";
import { Checkbox, Tooltip } from "antd";
import ContactsIcon from '@mui/icons-material/Contacts';
import PixIcon from '@mui/icons-material/Pix'
const BestbeforeStep1 = ({ 
    selectedItems, 
    setSelectedItems, 
    selectAll, 
    setSelectAll, 
    getBestBefore, 
    bestBeforeData, 
    orgId 
}) => {
   
    useEffect(() => {
        getBestBefore(orgId); // Fetch item data when the component is loaded
    }, [orgId, getBestBefore]);
    useEffect(() => {
        if (bestBeforeData.length > 0) {
          setSelectedItems(bestBeforeData);
          setSelectAll(true); // Set to true by default
        }
      }, [bestBeforeData]);
    // Handle individual checkbox selection
    const handleCheckboxChange = (item) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(item)
                ? prevSelected.filter((selected) => selected !== item)
                : [...prevSelected, item]
        );
        setSelectAll(selectedItems.length + 1 === bestBeforeData.length);
    };

    // Handle select all checkbox
    const handleSelectAll = () => {
        setSelectedItems(selectAll ? [] : bestBeforeData);
        setSelectAll(!selectAll);
    };

    return (
        <div>
              <div className="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:hidden">
             <div className="flex w-[90%] justify-between p-1 bg-transparent font-bold font-poppins items-end !text-lm sticky z-10">
             <div className="md:w-[0.25rem]"></div>
             <div className="md:w-[2rem]">
            <Tooltip title="Select All">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </Tooltip>
            </div>
            <div className=" w-[33rem] truncate text-sm text-[#00A2E8] max-md:w-[16rem]">
            <ContactsIcon className='!text-icon'/>  Name
          </div>
          <div className="w-[35.5rem] truncate max-md:w-[35.5rem] ">
           <PixIcon className='!text-icon  '/>  Unit 
          </div>
          </div>
            <div className="overflow-x-auto h-[79vh]">
                {bestBeforeData.map((item) => (
                    <div key={item.id}>
                         <div
                  className="flex rounded  bg-white mt-1   border-l-2 border-green-500 bg-[#eef2f9]  items-center py-ygap max-sm:rounded-lg max-sm:bg-gradient-to-b max-sm:from-blue-200
                    max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                >
                        <Checkbox
                            checked={selectedItems.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                        />
                         <div className="flex items-center h-8 ml-gap bg-[#eef2f9] justify-start md:w-[14rem] max-sm:flex-row max-sm:justify-between">
                         <div className="text-xs flex items-center font-poppins">
                       {item.suppliesName}
                        </div>
                        </div>
                        <div className="flex items-center h-8 ml-gap bg-[#eef2f9] justify-start  md:w-[12rem] max-sm:flex-row max-sm:justify-between">
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

export default BestbeforeStep1;

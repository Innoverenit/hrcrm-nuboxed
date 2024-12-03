import React, { useEffect } from "react";
import { Checkbox, Tooltip } from "antd";

const BestbeforeStep2 = ({ 
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

export default BestbeforeStep2;

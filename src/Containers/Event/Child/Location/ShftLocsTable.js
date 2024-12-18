import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Input, Button, } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";
import {
    getShiftlocs,
} from "./LocationAction";

function ShftLocsTable(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
            "1305",  // "Search",//0
            "1307", // "Reset",//1
            "1306", // " Filter",//2
            
           "110",  // name9
           "126",   //    Start Date
           "176",  //    End Date
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
        props.getShiftlocs(props.storedLoc.locationDetailsId);
    }, []);

    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [particularRowData, setParticularRowData] = useState({});
    const [searchedColumn, setSearchedColumn] = useState("");

    function handleOrder(orderId) {
        setshow(true);
        setorderId(orderId);
    }

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        // ref={node => {
                        //   this.searchInput = node;
                        // }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ width: 240, marginBottom: 8, display: "block" }}
                    />
                   
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchIcon />}
                            size="small"
                            style={{ width: 90 }}
                        >
                          {translatedMenuItems[0]}  {/* Search */}
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                          {translatedMenuItems[1]}  {/* Reset */}
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                           {translatedMenuItems[2]} {/* Filter */}
                        </Button>
                  
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchIcon style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    // setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                ),
        };
    }

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText("");
    }


    return (
        <>
            <div className=' flex  sticky  z-auto h-[35rem] overflow-auto'>
            <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[12.1rem]">{translatedMenuItems[3]}</div>
                        <div className=" md:w-[9.1rem]">{translatedMenuItems[4]}</div>
                        <div className="md:w-[7.7rem]">{translatedMenuItems[5]}</div>
                    </div>
                    {props.shiftLocs.map((item) => {
                       const date1 = dayjs(item.endDate).format("DD/MM/YYYY");
                        const date = dayjs(item.startDate).format("DD/MM/YYYY");
                        return (
                            <div>
                                <div className="flex rounded  mt-4 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] " >
                                    <div class="flex">
                                        <div className=" flex   md:w-[12.2rem] max-sm:w-full ">
                                           {item.shiftName}
                                        </div>

                                        <div className=" flex    md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                            <span>{date}</span>
                                            </div>

                                        </div>
                                        <div className=" flex   md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">

                                        <span>{date1}</span>

                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </>
    )
}

const mapStateToProps = ({ location, auth }) => ({
    shiftLocs: location.shiftLocs,
    fetchingShoftlocs: location.fetchingShoftlocs,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getShiftlocs,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ShftLocsTable);

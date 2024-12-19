import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Switch, message,Popconfirm } from "antd";
import { PstoProductionBuilder, getProductionSpareData } from "../../Product/ProductAction";

const DynamicInputForm = (props) => {
    const quantity = props.step.quantity;
    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [switchStates, setSwitchStates] = useState([]);

    useEffect(() => {
        props.getProductionSpareData(props.step.suppliesId,props.productionProductId,"0");
    }, []);




    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
           "1055", //  "System ID",//0
            "1056",//   "Part # ",//1
           "1057", //   "Tag",//2
          
           
              
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
        setSwitchStates(props.productionSpareData.map((item) => item.usedInd));
    }, [props.productionSpareData]);



    const handleLoadMore = () => {

        setPage(page + 1);
        // props.getProducts(page);
       
              props.getProductionSpareData(props.step.suppliesId,props.productionProductId,page);
             
         
      };
      const handleToggle = (index, item) => {
        const activeCount = switchStates.filter(state => state).length;

        if (switchStates[index]) {
            // If the current switch is already on, allow turning it off
            const newSwitchStates = [...switchStates];
            newSwitchStates[index] = !newSwitchStates[index];
            setSwitchStates(newSwitchStates);
            let data = {
                partNumber: item.cellStockPartNumId,
                poSupplierDetailsId: item.poSupplierDetailsId,
                poSupplierSuppliesId: item.poSupplierSuppliesId,
                productionBuilderId: props.step.productionBuilderId,
                productionProductId: props.productionProductId,
                supplierSuppliesUniqueNumberId: item.supplierSuppliesUniqueNumberId,
                suppliesId: item.suppliesId,
                usedInd: newSwitchStates[index],
                userId: props.step.userId,
            };
            props.PstoProductionBuilder(data);
        } else if (activeCount < quantity) {
            // If less than the allowed quantity of switches are on, allow turning it on
            const newSwitchStates = [...switchStates];
            newSwitchStates[index] = !newSwitchStates[index];
            setSwitchStates(newSwitchStates);
            let data = {
                partNumber: item.cellStockPartNumId,
                poSupplierDetailsId: item.poSupplierDetailsId,
                poSupplierSuppliesId: item.poSupplierSuppliesId,
                productionBuilderId: props.step.productionBuilderId,
                productionProductId: props.productionProductId,
                supplierSuppliesUniqueNumberId: item.supplierSuppliesUniqueNumberId,
                suppliesId: item.suppliesId,
                usedInd: newSwitchStates[index],
                userId: props.step.userId,
            };
            props.PstoProductionBuilder(data);
        } else {
            // If the allowed quantity is reached, show a warning
            message.warning(`You can only toggle ${quantity} switch${quantity > 1 ? 'es' : ''} at a time.`);
        }
    };

    const confirmToggle = (index, item) => {
        handleToggle(index, item);
    };

    return (
        <div className='flex sticky z-auto'>
            <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className="flex w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]">
                    {translatedMenuItems[0]}
                        </div>
                    <div className="md:w-[15.5rem]">
                    {translatedMenuItems[1]}
                        </div>
                    <div className=""></div>
                    <div className="md:w-[15.5rem]">
                    {translatedMenuItems[2]}
                        </div>
                </div>
                <InfiniteScroll
                dataLength={props.productionSpareData.length}
            next={handleLoadMore}
            hasMore={hasMore}
            //loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"77vh"}
            style={{scrollbarWidth:"thin"}}
            endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          >
                {props.productionSpareData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white h-8 items-center p-1">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div className="flex justify-between text-sm  font-semibold font-poppins">
                                        {item.supplierSuppliesUniqueNumberId}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.partNo}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="md:w-[15.5rem]">
                                    <Popconfirm
                            title="Do you want to change the state?"
                            onConfirm={() => confirmToggle(index,item)}
                            okText="Yes"
                            cancelText="No"
                        >
                                        <Switch 
                                            checked={switchStates[index]} 
                                            // onChange={() => handleToggle(item,index)} 
                                            checkedChildren="Yes"
                                            unCheckedChildren="No"
                                        />
                                        </Popconfirm>
                                    </div>
                                </div>
                                {item.usedInd===true&&(
                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                       <Button>Damage</Button>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                </InfiniteScroll>
            </div>
        </div>
    );
};

const mapStateToProps = ({ product, auth }) => ({
    productionSpareData: product.productionSpareData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionSpareData,
            PstoProductionBuilder
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DynamicInputForm);




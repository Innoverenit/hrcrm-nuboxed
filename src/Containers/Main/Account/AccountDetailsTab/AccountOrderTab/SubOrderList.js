import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSubOrderData, updateSubOrderAwb, handleSuborderPhone } from "../../AccountAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FormattedMessage } from 'react-intl';
import { Badge, Button, Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { BundleLoader } from '../../../../../Components/Placeholder';
import { MultiAvatar2 } from "../../../../../Components/UI/Elements";
const SubOrderPhoneModal = lazy(() => import('./SubOrderPhoneModal'));

function SubOrderList(props) {
    useEffect(() => {
        props.getSubOrderData(props.orderId)
    }, [])

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
          
             "660",    // "Order",1
          "679",     // "Created",2
          "1377" , //    ship id
          "1078" ,  //   Save
          "1079" ,  //   Cancel
           
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

    const [awbUpdate, setAwbUpdate] = useState(false)
    const handleAwbNoField = () => {
        setAwbUpdate(!awbUpdate)
    }
    const [awbNo, setAwbNo] = useState("")
    const handleAwbUpdate = (val) => {
        setAwbNo(val)
    }
    function handleCallback2() {
        setAwbUpdate(false)
        setAwbNo("")
    }
    const [subRow, setSubRow] = useState({});
    function handleSubOrderData(item) {
        setSubRow(item)
    }

    return (
        <>
            <div className='flex  sticky z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[12rem]">{translatedMenuItems[0]} #
                            {/* <FormattedMessage
                            id="app.order"
                            defaultMessage="Order#"
                        /> */}
                        </div>
                        <div className=" md:w-[10.1rem]">{translatedMenuItems[1]}</div>
                        <div className=" md:w-[8rem] ">{translatedMenuItems[2]} ID</div>
                        <div className=" md:w-[5rem] "></div>

                    </div>
                    {props.fetchingSuborderData ? <BundleLoader /> : <div class="overflow-x-auto h-[30vh]">
                        <InfiniteScroll
                            style={{scrollbarWidth:"thin"}}
                            dataLength={props.subOrderByOrderId.length}
                            loader={props.fetchingSuborderData ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"50vh"}
                        >
                            {props.subOrderByOrderId.map((item) => {
                                return (
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                            <div class="flex">
                                                <div className=" flex  text-xs font-bold font-poppins  md:w-[12rem] max-sm:w-full  ">
                                                    <Badge
                                                        class=" ml-2"
                                                        size="small"
                                                        count={item.totalPhone}
                                                        overflowCount={999}
                                                        offset={[0, -16]}
                                                    >
                                                        <span
                                                            onClick={() => {
                                                                handleSubOrderData(item)
                                                                props.handleSuborderPhone(true);
                                                            }}
                                                            class="underline cursor-pointer font-bold text-[#1890ff] mr-4"
                                                        >{item.orderNo}</span>
                                                    </Badge>
                                                </div>

                                                <div className=" flex text-xs   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        <MultiAvatar2
                                                            primaryTitle={item.awbUserName}
                                                            imageURL={item.imageURL}
                                                            imgWidth={"1.8rem"}
                                                            imgHeight={"1.8rem"}
                                                        /> &nbsp;&nbsp; {` ${dayjs(item.awbCreationDate).format("DD-MM-YY")}`}
                                                    </div>

                                                </div>
                                                <div className=" flex   justify-center items-center md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs   font-poppins">
                                                        {awbUpdate && (item.orderPhoneAwbId === subRow.orderPhoneAwbId) ?
                                                            <>
                                                                <div class=" flex  justify-around">
                                                                    <Input
                                                                        value={awbNo}
                                                                        type='text'
                                                                        onChange={(e) => handleAwbUpdate(e.target.value)} />
                                                                    <div class=" flex justify-evenly">
                                                                        <Button
                                                                            type='primary'
                                                                            loading={props.updatingSuborderAwb}
                                                                            onClick={() => {
                                                                                props.updateSubOrderAwb({
                                                                                    awbNo: awbNo,
                                                                                    userId: props.userId,
                                                                                    orderPhoneId: item.orderId
                                                                                }, item.orderPhoneAwbId, handleCallback2())
                                                                            }}>{translatedMenuItems[3]}</Button>
                                                                        <Button onClick={handleAwbNoField}>{translatedMenuItems[4]}</Button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : item.awbNo}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" flex  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    <BorderColorIcon
                                                        onClick={() => {
                                                            handleAwbNoField();
                                                            handleSubOrderData(item)
                                                        }}
                                                        className=" !text-icon cursor-pointer text-[tomato]"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>}
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
            <SubOrderPhoneModal
                subRow={subRow}
                handleSuborderPhone={props.handleSuborderPhone}
                showSuborderPhoneList={props.showSuborderPhoneList}
            />
            </Suspense>
        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    fetchingSuborderData: distributor.fetchingSuborderData,
    subOrderByOrderId: distributor.subOrderByOrderId,
    userId: auth.userDetails.userId,
    showSuborderPhoneList: distributor.showSuborderPhoneList,
    updatingSuborderAwb: distributor.updatingSuborderAwb,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSubOrderData,
            updateSubOrderAwb,
            handleSuborderPhone
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SubOrderList);


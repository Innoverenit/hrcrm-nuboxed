import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FormattedMessage } from 'react-intl';
import { Badge, Button, Input } from "antd";
import dayjs from "dayjs";


function SubPackList(props) {
    useEffect(() => {
       
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
            <div className='flex  sticky z-auto w-wk'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[12rem]">
                            Product
                        </div>
                        <div className=" md:w-[10.1rem]">Packet Input</div>
                        

                    </div>
                    <div class="overflow-x-auto ">
                        
                            {/* {props.subOrderByOrderId.map((item) => {
                                return ( */}
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                           <div>Maggi</div> 
<Input/>
                                            <Button>Scan</Button>
                                        </div>
                                    </div>
                                {/* )
                            })} */}
                       
                    </div>
                </div>
            </div>
           
        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
              
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SubPackList);


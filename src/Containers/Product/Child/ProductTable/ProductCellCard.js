import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Tabs,Spin } from "antd";
import { Select } from "../../../../Components/UI/Elements";
import{getAlLoCell,getCatalogueCell,getcellCardList} from "../../../Event/Child/Location/LocationAction";
import ProductCellToggle from "./ProductCellToggle";

const { Option } = Select;

const { TabPane } = Tabs;


const ProductCellCard = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const users = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'David Johnson' },
    { value: '4', label: 'Emily Brown' },
  ];
  console.log(activeTab)
    useEffect(()=>{
        props.getAlLoCell();
       // props.getcellCardList(activeTab,props.particularDiscountData.productId);
        props.getCatalogueCell(props.orgId)
    },[]);


    useEffect(() => {
      const fetchData = async () => {
        if (activeTab) {
          setLoading(true);
          try {
            await props.getcellCardList(activeTab, props.particularDiscountData.productId);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        }
      };
  
      fetchData();
    }, [activeTab]);



    const handleTabClick = (key) => {
      props.getcellCardList(key,props.particularDiscountData.productId);
      //props.getMatrixdata(key,props.particularDiscountData.productId);
    };



    useEffect(() => {
      if (props.catalogueCell.length > 0) {
        setActiveTab(props.catalogueCell[0]?.locationDetailsId);
      }
    }, [props.catalogueCell]);



    return (
      <>
       <Tabs type="card" 
      activeKey={activeTab} 
     onChange={handleTabClick}
       >
      {props.catalogueCell.filter(item => item.productionInd === true)
      .map(item => (
        <TabPane key={item.locationDetailsId} tab={item.locationName}>
         {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
             <Spin />
           </div>
          ) : (
            <div className=' flex justify-end sticky z-auto'>
            <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
              <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">          <div className=""></div>
                <div className=" md:w-[6rem]">#Cell</div>
                <div className=" md:w-[4.2rem] ">Production</div>
             
                {/* <div className=" md:w-[5.1rem]">Description</div> */}
                <div className="w-12"></div>             </div>
    
               {props.cellCardList.map((item) => {
                return (
                  <div >
                    <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3">
    
                      <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                        <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                          <div className="font-normal text-sm text-cardBody font-poppins">
                            <div> {item.cellChamber}</div>
                          </div>
                        </div>
                      </div>
    
                      <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
    
                        <div class=" text-xs text-cardBody font-poppins">
                        
                          <div className="font-normal text-sm text-cardBody font-poppins">
                            {/* <div> {item.cellChamber}</div> */}
                            <ProductCellToggle 
                            cellId={item.cellId}
                            usedInd={item.usedInd}
                            cellChamberLinkId={item.cellChamberLinkId}
                            item={item}  
                            particularDiscountData={props.particularDiscountData}/>
                          </div>
                    
                        </div>
    
                      </div>
                     
                     
    
                  
    
                    </div>
                  </div>
                );
              })} 
    
            </div>
          </div> 
        
          )}
        </TabPane>
   ))}
    </Tabs>


      </>
    );
   }

const mapStateToProps = ({ auth,location,distributor, departments, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId,
    allLoCell:location.allLoCell,
    catalogueCell:location.catalogueCell,
    cellCardList:location.cellCardList,
    fetchingCellCardList:location.fetchingCellCardList

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAlLoCell,
            getCatalogueCell,
            getcellCardList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCellCard);

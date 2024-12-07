import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getPrograms} from "../../ProgramAction"
import { Link } from "../../../../Components/Common";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";

function ProgramTable (props)  {
    console.log(props.programs)
    useEffect(() => {
           props.getPrograms();  
    }, [])

    return (
        <>        
              <div className='flex justify-end sticky top-28 z-auto'>
         <OnlyWrapCard style={{backgroundColor:"white",height:"75vh"}}>
         <div className=" flex justify-between w-[100%]  px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[4.1rem]">Name</div>
        <div className=" md:w-[6.1rem]">Duration</div>
        <div className=" md:w-[4.2rem] ">Price</div>
        <div className="md:w-[5.8rem]">Creation Date</div>
        <div className="w-12"></div>
            </div>
             {props.programs.map((item) => {
               const currentdate = dayjs().format("DD/MM/YYYY");
               const date = dayjs(item.creationDate).format("DD/MM/YYYY");
               const content = item.description;
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
    <Link
          toUrl={`/program/${item.programDetailsId}`}
          title={`${item.program}`}
        >{item.program}</Link>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class="text-xs"
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bold",
                                  }}
                                >
                                  New
                                </span>
                              ) : null}
                            </div>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs  font-poppins">
                        {item.duration} 
                    </div>
    </div></div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
    {item.currency}  {item.price} 
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
       

        <div class=" text-xs  font-semibold  font-poppins">
        {` ${dayjs(item.creationDate).format("ll")}`}
                    </div>
    </div>

</div>
</div>
          );
        })}
             
              </OnlyWrapCard>
              </div> 

        </>
    )
}

const mapStateToProps = ({ program }) => ({
  programs:program.programs,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
       getPrograms
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgramTable);
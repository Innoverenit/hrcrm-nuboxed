import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { cardDetails } from "./carousel-config";
import CarouselItem from "./CarouselItem";
class AppLoginMessage extends Component {

    render() {

        return (
            <>
            <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            <div class="  w-1/2  min-h-[100vh] overflow-auto flex  flex-col justify-center items-center  bg-[#F5F5F5] relative">
                        <br />
                        <div class=" p-4 w-wk  w-[55% ]shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white">

                            Mobile app is under development and will be ready by mid August 2020. For now Korero is best viewed in desktop mode.
                        </div>
                       


                        <div
                            className="text-xs text-center font-poppins  mt-3"  
                            style={{
                                textAlign: "center",
                                fontSize: "12x",
                                fontFamily: "SFS, Arial, sans-serif",
                                position: "absolute",
                                bottom: 0
                            }}
                        >
                            © {new Date().getFullYear()}, {` `} tekorero.com, All rights
              reserved.
            </div>
                    </div>
                    <div className=" flex flex-col mt-8">
            <div class=" text-2xl text-white"> Simplify Your Workflow: Let Automation Drive Your Success 🚀</div>
            <div class="flex mt-2  text-white justify-center text-base">Transform Your Lead Management with CRM Automation</div>
            <div class=" flex mt-2  text-white justify-center text-base">Say goodbye to missed opportunities and manual task tracking</div>
        </div>

        
            <div className="carousel-container">
      <div className="carousel-track ">

        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <CarouselItem 
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
            ></CarouselItem>
          );
        })}
      </div>
    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => ({

});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AppLoginMessage);

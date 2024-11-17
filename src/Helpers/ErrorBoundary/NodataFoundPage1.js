import React from "react";
import error from "../../Assets/Images/i.png";

class NodataFoundPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  handleRefreshPage() {
    window.location.reload();
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    // if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div class="flex justify-center items-center px-[5rem] py-[1.25rem]"
          >
            <div class=" flex  flex-col justify-center items-center w-[25rem] h-[25rem] px-[0.5rem] py-[1.25rem] bg-[#f5f5f5]"
            style={{ boxShadow: " 0 0.8125em 1.6875em -0.3125em rgba(50, 50, 93, 0.25)"}}
            >
              <img
                src={error}
                style={{ height: "3.125em", width: "3.125em", borderRadius: "50%" }}
              ></img>
              <div>
                <div class=" flex text-lg font-bold font-poppins justify-center items-center mt-2"

                >
                None Available!
                </div>
                
              </div>
              {/* <div class=" mt-3" />
              <Button
                type="primary"
              
                onClick={() => this.handleRefreshPage()}
              >
             
              </Button> */}
            </div>
          </div>
        </>
      );
    // }

    return this.props.children;
  }
}

export default NodataFoundPage1;

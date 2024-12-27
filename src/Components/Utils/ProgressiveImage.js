



// import React, { Component } from "react";

// class ProgressiveImage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentImage: this.props.preview,
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     this.handleImageProcessing(this.props.image);
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.image !== this.props.image) {
//       this.setState({ currentImage: this.props.preview, loading: true }, () => {
//         this.handleImageProcessing(this.props.image);
//       });
//     }
//   }

//   componentWillUnmount() {
//     if (this.loadingImage) {
//       this.loadingImage.onload = null;
//     }
//   }

//   handleImageProcessing = async (imageSrc) => {
//     try {
//       const compressedImageBlob = await this.compressImage(imageSrc);
//       const compressedImageURL = URL.createObjectURL(compressedImageBlob);

//       this.fetchImage(compressedImageURL);
//     } catch (error) {
//       console.error("Image processing failed:", error);
//     }
//   };

//   compressImage = (imageSrc) => {
//     return new Promise((resolve, reject) => {
//       const image = new Image();
//       image.crossOrigin = "anonymous"; // Ensure cross-origin support
//       image.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         // Set canvas dimensions
//         canvas.width = image.width / 2; // Adjust scale if needed
//         canvas.height = image.height / 2;

//         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//         canvas.toBlob(
//           (blob) => {
//             if (blob) {
//                 console.log(`Original Size: ${(imageSrc.size / 1024).toFixed(2)} KB`);
//                 console.log(`Compressed Size: ${(blob.size / 1024).toFixed(2)} KB`);
//               resolve(blob);
//             } else {
//               reject(new Error("Image compression failed"));
//             }
//           },
//           "image/webp", // Convert to WebP format
//           0.7 // Quality: Adjust as needed (0.0 to 1.0)
//         );
//       };

//       image.onerror = () => reject(new Error("Image loading failed"));
//       image.src = imageSrc;
//     });
//   };

//   fetchImage = (src) => {
//     const image = new Image();
//     image.onload = () =>
//       this.setState({ currentImage: src, loading: false });
//     image.src = src;
//     this.loadingImage = image;
//   };

//   style = (loading) => {
//     return {
//       transition: "0.5s filter linear",
//       //filter: `${loading ? "blur(20px)" : ""}`,
//       width: this.props.width || "100%",
//       height: this.props.height || "100%",
//       borderRadius: this.props.borderRadius || 0,
//       padding: this.props.padding || 0,
//     };
//   };

//   render() {
//     const { currentImage, loading } = this.state;
//     const { alt } = this.props;
//     return <img style={this.style(loading)} src={currentImage} alt={alt} />;
//   }
// }

// export default ProgressiveImage;

import React, { Component } from "react";

class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: this.props.preview,
      loading: true,
    };
    this.imageRef = React.createRef(); // Reference to the image element
  }

  componentDidMount() {
    // Use Intersection Observer to detect when the image enters the viewport
    this.observeImage();
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect(); // Cleanup observer when component unmounts
    }
  }

  // Setup Intersection Observer
  observeImage = () => {
    const options = {
      root: null, // use the viewport as the root
      rootMargin: "0px", // margin around the root
      threshold: 0.1, // trigger when 10% of the image is visible
    };

    this.observer = new IntersectionObserver(this.handleIntersection, options);
    if (this.imageRef.current) {
      this.observer.observe(this.imageRef.current); // Start observing the image
    }
  };

  // Handle the intersection (when the image comes into view)
  handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If the image is in the viewport, start loading the high-res image
        this.handleImageProcessing(this.props.image);
        this.observer.disconnect(); // Stop observing after the image has been loaded
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.setState({ currentImage: this.props.preview, loading: true }, () => {
        this.handleImageProcessing(this.props.image);
      });
    }
  }

  // Compress the image (same as before)
  handleImageProcessing = async (imageSrc) => {
    try {
      const compressedImageBlob = await this.compressImage(imageSrc);
      const compressedImageURL = URL.createObjectURL(compressedImageBlob);
      this.fetchImage(compressedImageURL);
    } catch (error) {
      console.error("Image processing failed:", error);
    }
  };

  compressImage = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Ensure cross-origin support
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width / 2; // Adjust scale if needed
        canvas.height = image.height / 2;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Image compression failed"));
            }
          },
          "image/webp", // WebP format
          0.7
        );
      };

      image.onerror = () => reject(new Error("Image loading failed"));
      image.src = imageSrc;
    });
  };

  fetchImage = (src) => {
    const image = new Image();
    image.onload = () => this.setState({ currentImage: src, loading: false });
    image.src = src;
  };

  style = (loading) => {
    return {
      transition: "0.5s filter linear",
      filter: `${loading ? "blur(20px)" : ""}`,
      width: this.props.width || "100%",
      height: this.props.height || "100%",
      borderRadius: this.props.borderRadius || 0,
      padding: this.props.padding || 0,
    };
  };

  render() {
    const { currentImage, loading } = this.state;
    const { alt } = this.props;
    return (
      <img
        ref={this.imageRef}
        style={this.style(loading)}
        src={currentImage}
        alt={alt}
      />
    );
  }
}

export default ProgressiveImage;


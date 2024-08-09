import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Carousel } from "antd";
import { base_url } from "../../../../../Config/Auth";
import axios from "axios";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { TweetFeed } from "../../../../../Components/Common";
import { CarouselIcon } from "../../../../../Components/UI/Elements";

class OrganizationBoost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      tweets: [],
      isError: false
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }
  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }
  componentDidMount = () => {
    this.setState({ isFetching: true });
    const {
      userDetails: { firstName, lastName }
    } = this.props;
    axios
      .get(`${base_url}/showTweetFeeds?tweetKey=${firstName} ${lastName}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || ""
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ isFetching: false, tweets: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isFetching: false });
      });
  };

  render() {
    const props = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    const { isFetching, tweets, isError } = this.state;
    const {
      userDetails: { firstName, lastName }
    } = this.props;
    if (isFetching) {
      return <BundleLoader />;
    }
    if (isError) {
      return <p>Error fetching error ...</p>;
    }
    if (!Array.isArray(tweets)) {
      return (
        <p>{`We couldn't find any tweets related to ${firstName} ${lastName}`}</p>
      );
    }
    if (!tweets.length) {
      return (
        <p>{`We couldn't find any tweets related to ${firstName} ${lastName}`}</p>
      );
    }
    if (tweets.length <= 3) {
      return (
        <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          {tweets && !Array.isArray(tweets)
            ? []
            : tweets.map((tweet, i) => {
              return <TweetFeed key={i} {...tweet} />;
            })}
        </div>
      );
    }
    return (
      <>
     <div class=" flex flex-row flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
          <CarouselIcon
            type="left-circle"
            onClick={this.previous}
            top="12.5em"
            left="0em"
            theme="twoTone"
          />
          <CarouselIcon
            type="right-circle"
            onClick={this.next}
            top="12.5em"
            right="0em"
            theme="twoTone"
          />
        </div>
        <div
          style={{
            width: "91%",
            margin: "0em auto"
          }}
        >
          <Carousel ref={node => (this.carousel = node)} {...props}>
            {tweets && !Array.isArray(tweets)
              ? []
              : tweets.map((tweet, i) => {
                return <TweetFeed key={i} {...tweet} />;
              })}
          </Carousel>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationBoost);

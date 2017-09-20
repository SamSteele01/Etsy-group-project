import React, { Component } from 'react';
import '../styles/App.css';
import CustomOrder from './customorder.js';
import DetailsDropdown from './detailsdropdown.js';
import FAQs from './faqs.js';
import FavoriteButton from './favoritebutton.js';
import ItemHeader from './ItemHeader.js';
import ImageCarousel from './imagecarousel.js';
import MeetTheOwner from './meettheowner.js';
import Overview from './overview.js';
import ProductDescription from './productdescription.js';
import RelatedTags from './relatedtags.js';
import Reviews from './reviews.js';
import ShopIcons from './shopicons.js';
import SocialButtons from './socialbuttons.js';

class ItemPageApp extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.state = {
      idvariable: "499471843",
      listingdata: false,
      listinginventorydata: false,
      imagesdata: false,
      shopdata: false,
      shoplistingdata: false,
      shoplistingimagesdata: false,
      feedbackdata: false,
    };
  }
  // This mounts the page.
  componentDidMount() {
    // this.fetchData();
  }
  handleTextChange(event){
    event.preventDefault();
    this.setState({idvariable: event.target.value});
  }
  handlesubmit(event){
    event.preventDefault();
    this.fetchData();
  }
  fetchData = () => {
    //LISTING DATA FETCH
    fetch(`https://openapi.etsy.com/v2/listings/${this.state.idvariable}?api_key=4o6v874o0s0w78131mpf9ni0`).then(results => {
      return results.json();
    }).then(data => {
      this.setState({ listingdata: data.results[0] });
      // FEEDBACK FETCH
      fetch(`https://openapi.etsy.com/v2/users/${data.results[0].user_id}/feedback/as-subject?limit=5&api_key=4o6v874o0s0w78131mpf9ni0`).then(results => {
        return results.json();
      }).then(data => {
        this.setState({ feedbackdata: data.results });
      })
    })
    // IMAGES FETCH
    fetch(`https://openapi.etsy.com/v2/listings/${this.state.idvariable}/images?api_key=2o28zyiccm6dxpspusptspb0`).then(results => {
      return results.json();
    }).then(data => {
      this.setState({ imagesdata: data.results });
    })
    // PERSONALIZATION FETCH
    fetch(`https://openapi.etsy.com/v2/listings/${this.state.idvariable}/inventory?api_key=2o28zyiccm6dxpspusptspb0`).then(results => {
      return results.json();
    }).then(data => {
      this.setState({ listinginventorydata: data.results });
    })
    //SHOP DATA FETCH (INCLUDES USERDATA)
    fetch(`https://openapi.etsy.com/v2/shops/listing/${this.state.idvariable}?api_key=nn7mkmoan2c7xamo4c3pnax4`).then(results => {
      return results.json();
    }).then(data => {
      this.setState({ shopdata: data.results });
      //FETCHES ACTIVE SHOP LISTINGS
      fetch(`https://openapi.etsy.com/v2/shops/${data.results[0].shop_id}/listings/active?limit=5&api_key=nn7mkmoan2c7xamo4c3pnax4`).then(results => {
        return results.json();
      }).then(data => {
        let i = 0;
        while (i < 4){
          //THIS FETCHES THE IMAGES OF THE SHOPS FEATURES
          fetch(`https://openapi.etsy.com/v2/listings/${data.results[i].listing_id}/images?api_key=xu3t5vf2ok7saualskn524az`).then(results => {
            return results.json();
          }).then(data => {
            this.setState(prevState => ({
              shoplistingimagesdata: [...prevState.shoplistingimagesdata, data.results[0].url_75x75]
            }))
          })
          i++
        }
        this.setState({ shoplistingdata: data });
      })
    })
  }
  render() {
    return (
      <div className="ItemPageApp">
      <div className="PlayListForm">
        <form onSubmit={this.handlesubmit}>
          <input onChange={this.handleTextChange} type="text" id="idnumber"
          placeholder="ID" value={this.state.idvariable}/>
          <button type="submit">"SUBMIT"</button>
        </form>
      </div>
        <ItemHeader
        shopdata={this.state.shopdata}
        shoplistingdata={this.state.shoplistingdata}
        shoplistingimagesdata={this.state.shoplistingimagesdata}/>
        <div className = "item-page-wrapper">
          <FavoriteButton/>
          <ImageCarousel imagesdata={this.state.imagesdata}/>
          <CustomOrder/>
          <DetailsDropdown
          listingdata={this.state.listingdata}/>
          <Reviews/>
          <MeetTheOwner/>
          <FAQs/>
          <ProductDescription/>
          <Overview/>
          <SocialButtons/>
          <ShopIcons/>
          <RelatedTags/>
        </div>
      </div>
    );
  }
}

export default ItemPageApp;
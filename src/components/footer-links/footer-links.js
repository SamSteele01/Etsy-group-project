import React, { Component } from 'react';
import ShopLinks from "./shop-links.js";
import SellLinks from "./sell-links.js";
import AboutLinks from "./about-links.js";
import ShareLinks from "../share-links.js";

const snapSize = 500;

class FooterLinks extends Component {
  constructor(props){
    super(props);

        this.state= {
          media: 0,
          parent: {}
        }

        this.setMedia = this.setMedia.bind(this)

      };

      setMedia() {
       this.setState({media: window.innerWidth});
     }


      componentDidMount(){
        window.addEventListener("resize", this.setMedia);
      }


  render() {
    let media = this.state.media;

    let shareLinks = null;
    if (media > snapSize){
      shareLinks = <ShareLinks />;
    }

    return (
      <div className="FooterLinks">
        <ShopLinks />
        <SellLinks />
        <AboutLinks />
        {/* This is where ShareLinks will render if @media>600 */}
        {shareLinks}
      </div>
    );
  }
}


export default FooterLinks;

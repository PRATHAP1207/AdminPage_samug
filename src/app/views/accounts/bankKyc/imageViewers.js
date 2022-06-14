import React, { Component, useState } from "react";
import ImageGallery from "react-image-gallery";
//import "~react-image-gallery/styles/scss/image-gallery.scss";
function ImageViewers(images) {
  //console.log(images);
  return (
    <div style={{ width: "80%",height:"80%" ,textAlign:"center"}}>
      <ImageGallery items={images.images} />
    </div>
  );
}
export default ImageViewers;

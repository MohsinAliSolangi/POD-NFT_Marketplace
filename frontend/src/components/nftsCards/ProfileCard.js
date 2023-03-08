import React, { useEffect } from "react";
import "./nftsCards.css";
import img from "../../assets/images/heart.svg";
import { useLocation, useParams } from "react-router-dom";
import { ImDiamonds } from "react-icons/im";
import nftsCardsSectionData from "../../assets/data/nftsCardsSectionData";
import { Link } from "react-router-dom";
import NFTTile from "../NFTTile";

import NFTAddress from "../../contractsData/NFT-address.json";
import NFTAbi from "../../contractsData/NFT.json"
import marketPlaceAddress from "../../contractsData/MarketPlace-address.json"
import marketPlaceAbi from  "../../contractsData/MarketPlace.json"

import axios from "axios";
import { useState } from "react";
import { ethers } from "ethers";

const imgSize = { width: "20px", height: "18.33px" };

const SetTransactionSigner = ()=>{
  //Get provider from Metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // Set signer
  const signer = provider.getSigner()
  const marketplace = new ethers.Contract(marketPlaceAddress.address, marketPlaceAbi.abi, signer)
  return marketplace
 }


 const nft = ()=>{
  //Get provider from Metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // Set signer
  const signer = provider.getSigner()
  const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
  return nft
 }
function NftsCard({ thedata,key }) {
  const[image, setimage]= useState([]);

  //this is get nft function 
  const getImages = async()=>{
    const uri = await thedata?.image;
    if(uri.slice(uri.length - 4) == "json") {  
      const response = await fetch(uri)
      const metadata = await response.json()
      console.log("metadata",metadata.image);
      setimage(metadata?.image)
    }else {
      const link =  `https://ipfs.io/ipfs/${uri.slice(uri.length - 46)}`;
      const response = await fetch(link)
      console.log("++++++++++",response)
  setimage(response.url)
  console.log("metadata",response);
}
}










const sell= async() =>{
await nft().approve(thedata.marketplace,thedata.itemId);
await SetTransactionSigner().sellItem(thedata.nft,thedata.itemId,10000,0);
alert("Your NFT is Listed");
}

    
useEffect(()=>{
  getImages();
},[])

  return (
    <>
      <div className="container1 mt-5 mb-4">
        <div className="row flex-wrap justify-content-evenly">

              <div
                key={thedata.id}
                className="card1 border  card col-lg-3 col-md-3 col-sm-4 p-2 my-2 d-flex flex-column justify-content-center align-items-center "
              >
                <div>
                  <div className="heart d-flex flex-column align-items-center justify-content-center rounded-3">
                    <img src={img} style={imgSize} alt="" />
                  </div>

                  <Link to={`/nfts/${thedata.itemId}`}>
                    <img
                      className="img-fluid cHeight rounded-2"
                      src={thedata?.image}
                      alt="Card image cap"
                    />
                  </Link>
                  <div className="">
                    <p className="p-16 mt-1">{thedata.name}</p>
                    <p className="p-12  ">
                      <span className="text-info fw-bold mb-0">
                        {thedata.address}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between bg-secondary p-1 m-0 bg-opacity-25 rounded-2">
                    <div>
                      <p className="p-16 mt-0">{1000}</p>
                    </div>
                    <div>
                      <div className="d-flex">
                        {<ImDiamonds />}
                        {/* <p className="p-16 mt-0">{data.pEtherium}</p> */}
                      </div>
                      <div>
                        {/* <p className="text-end p-12">{data.pIndollar}</p> */}
                      </div>
                    </div>
                  </div>
                  <button onClick={sell} className="btn btn-lg w-100 justify-content-center my-2 btn-info1 height py-1 d-flex text-center text-white mx-auto px-5 text-lg-center btn-lg ">
                    Sell Now
                  </button>
                </div>
              </div>
        </div>
          </div>
          <div className="d-flex justify-content-center">
          {/* <button className="btn fw-bold btn-lg  border-primary1 text-info1 px-5 mb-5 py-2 mt-3  rounded-2">
            See more
          </button> */}
        </div>
    </>
  );
}

export default NftsCard;

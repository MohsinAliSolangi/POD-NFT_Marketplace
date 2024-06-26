import React from "react";
import "./nftsCards.css";
import img from "../../assets/images/heart.svg";
import { ImDiamonds } from "react-icons/im";
import { Modal, ModalHeader, Form, ModalBody, Row,Button} from "reactstrap"
import NFTAddress from "../../contractsData/NFT-address.json";
import NFTAbi from "../../contractsData/NFT.json"
import marketPlaceAddress from "../../contractsData/MarketPlace-address.json"
import marketPlaceAbi from  "../../contractsData/MarketPlace.json"
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
  const [Auction, setAuction] = useState(false)
  const [model, setModel] = useState(false)
  const [price, setPrice] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false)








const sell= async() =>{
  try {
    setLoading(true)
await nft().approve(thedata.marketplace,thedata.itemId);
await SetTransactionSigner().sellItem(thedata.nft,thedata.itemId,price,0);
setPrice("")
setTime("")
alert("Your NFT is Listed");
setModel(false)
setLoading(false)
window.location.reload()
    
  } catch (error) {
    setLoading(false)
    console.log(error)
  }

}

const createAuction= async()=>{
  try {
    setLoading(true)
    await nft().approve(thedata.marketplace,thedata.itemId);
  await SetTransactionSigner().createAuction(thedata.nft,thedata.itemId,price,time)
  setPrice("")
  setTime("")
  alert("NFT Set On Auction")
  setAuction(false)
  setLoading(false)
  window.location.reload()

 } catch (error) {
    setLoading(false)
    console.log(error)
  }  
}

console.log("thedata",thedata)
  return (
    <>
      <div className="container1 mt-5 mb-4">
        <div className="col flex-wrap justify-content-evenly">

              <div
                key={thedata.id}
                className="card1 border  card col-lg-3 col-md-3 col-sm-4 p-2 my-2 d-flex flex-column justify-content-center align-items-center "
              >
                <div>
                  <div className="heart d-flex flex-column align-items-center justify-content-center rounded-3">
                    <img src={img} style={imgSize} alt="" />
                  </div>

                    <img
                      className="img-fluid cHeight rounded-2"
                      src={thedata?.image}
                      alt="Card image cap"
                    />
              
                  <div className="">
                    <p className="p-16 mt-1">{thedata.name}</p>
                    <p className="p-12 ">
                      <span className="text-info fw-bold mb-0">
                        {thedata.description}
                      </span> 
                    </p>
                  </div>
                  <div className="d-flex justify-content-between bg-secondary p-1 m-0 bg-opacity-25 rounded-2">
                    <div>
                      <p className="p-16 mt-0">{0x0}</p>
                    </div>
                    <div>
                      <div className="d-flex">
                        {<ImDiamonds />}
                  <p className="p-16 mt-0">{thedata.itemId}</p>
                      </div>
                      <div>
                        <p className="text-end p-12">$: {0x0}</p>
                      </div>
                    </div>
                  </div>
                  <button  onClick={() => setModel(true)} disabled = {loading} className="btn btn-lg w-100 justify-content-center my-2 btn-info1 height py-1 d-flex text-center text-white mx-auto px-5 text-lg-center btn-lg ">
                    Set On Sale
                  </button>
               
                  <div>
                  <button onClick={() => setAuction(true)} disabled = {loading} className="btn btn-lg w-100 justify-content-center my-2 btn-info1 height py-1 d-flex text-center text-white mx-auto px-5 text-lg-center btn-lg ">
                  Set On Auction
                  </button>
                  </div>
               
                </div>
              </div>
        </div>
          </div>

<div>
<Modal
size='lg'
isOpen={Auction}
toggle={() => setAuction(!Auction)}>
<ModalHeader
  toggle={() => setAuction(!Auction)}>
  Set Auction
</ModalHeader>
<ModalBody>
  <Form >
    <Row>
      <div>
        <input
          required type="number"
          className='form-control'
          placeholder='Enter Price'
          onChange={(e) => setPrice(e.target.value)}
          ></input>
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          required type="number"
          className='form-control'
          placeholder='Enter Time'
          onChange={(e) => setTime(e.target.value)}
          
          ></input>
      </div>
      <div>
        <Button onClick={() => createAuction()} disabled = {loading} style={{ marginLeft: "200px", marginTop: "10px" }}> Submit </Button>
      </div>
    </Row>
  </Form>
</ModalBody>
</Modal>
</div>


<div>
<Modal
size='lg'
isOpen={model}
toggle={() => setAuction(!model)}>
<ModalHeader
  toggle={() => setAuction(!model)}>
  Set On Sale
</ModalHeader>
<ModalBody>
  <Form >
    <Row>
      <div>
        <input
          required type="number"
          className='form-control'
          placeholder='Enter Price'
          onChange={(e) => setPrice(e.target.value)}
          ></input>
      </div>

      {/* <div style={{ marginTop: "20px" }}>
        <input
          required type="number"
          className='form-control'
          placeholder='Enter Time'
          onChange={(e) => setTime(e.target.value)}
         ></input>
      </div>
       */}
      <div>
        <Button onClick={() => sell()} disabled = {loading} style={{ marginLeft: "200px", marginTop: "10px" }}> Submit </Button>
      </div>
    </Row>
  </Form>
</ModalBody>
</Modal>
</div>



</>


  );
}

export default NftsCard;

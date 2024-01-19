import "./App.css";
import NFTs from "./data.json";
import { useState } from "react";
import Navbar from "./components/navbar";
import contractData from "./contract.json";
import Web3 from "web3";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 
  const addToCart = (nft, index) => {
    nft.index = index;
    setCart([...cart, nft]);
    setTotalAmount(totalAmount + nft.price);
  };

  const removeFromCart = (nftToRemove, index) => {
      nftToRemove.index = index;
      setCart(cart.filter(nft => nft.index !== index));
      setTotalAmount(totalAmount - nftToRemove.price);
};

  const handlePayment = async () => {
    if (totalAmount === 0) {
      alert("Your cart can't be empty");
      return;
    }
    let connectedAccount;
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected");
        const accounts = await web3.eth.getAccounts();
        connectedAccount = accounts[0];
        console.log(connectedAccount);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
    const receiverAddress = contractData.owner;
    // const web3 = new Web3(provider);
    const web3 = new Web3(window.ethereum);
    console.log("Connected Account: ", connectedAccount);
    console.log("Receiver: ", receiverAddress);
    console.log("Total Amount: ", totalAmount);
    try {
      const trxnObj = {
        from: connectedAccount,
        to: receiverAddress,
        value: totalAmount,
        gas: "30000",
      };
      const trxn = await web3.eth.sendTransaction(trxnObj);
      const trxnHash = trxn.transactionHash;
      console.log("Transaction sent.\n Hash: ", trxnHash);
      for (let i = 0; i < cart.length; i++) {
        NFTs[cart[i].index].isSold = true;
      }
      alert("Transaction successful!");
      setCart([]);
      setTotalAmount(0);
      const trxnURL = `https://sepolia.etherscan.io/tx/${trxnHash}`;
      const newTrxn = { trxnHash, trxnURL };
      let transactions = [...pastTrxns, newTrxn]
      setPastTrxns(transactions)
    } catch (e) {
      console.log(e);
    }
  };
  
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pastTrxns, setPastTrxns] = useState([]);


  return (
    <BrowserRouter className="nft-marketplace">
      <Navbar
        cart={cart}
        totalAmount={totalAmount}
        handlePayment={handlePayment}
        pastTrxns={pastTrxns}
      />
      <Routes>
        <Route index element={<Home addToCart={addToCart} removeFromCart={removeFromCart}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

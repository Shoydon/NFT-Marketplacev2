import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Web3 from 'web3';
import Transaction from '../components/trxn';
import { NavLink } from 'react-router-dom';
import { useState , useEffect } from 'react';

const Navbar = ({ cart, totalAmount, handlePayment, pastTrxns }) => {
    
    
    const [connectedAccount, setConnectedAccount] = useState('');

    const handleChangeAccount = async () => {
        if (window.ethereum && document.getElementById('connected-account')) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log("Wallet connected");
                const accounts = await web3.eth.getAccounts();
                setConnectedAccount(accounts[0]);
                console.log(connectedAccount);
                const conn_account = document.getElementById('connected-account');
                conn_account.text = connectedAccount;
            } catch (e) {
                console.log(e);
            }
          }
    }

    useEffect(() => {
        handleChangeAccount();
    }, [connectedAccount]); 

    // let connectedAccount;
    const [connected, setConnected] = useState(false);
    
    async function connectWallet() {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Wallet connected");
                const accounts = await web3.eth.getAccounts()
                // connectedAccount = accounts[0];
                setConnectedAccount(accounts[0]);
                console.log(connectedAccount);
                setConnected(true);
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    }

    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <NavLink  style={{textDecoration: 'none'}}>
                    <h1 className='text-body-secondary'>NFT-Marketplace</h1>
                </NavLink>
                <form class="d-flex" role="search">
                    {/* <div id="connect-button">
                        <button class="btn btn-primary m-2" type="button" onClick={connectWallet}>Connect wallet</button>
                    </div> */}
                    { !connected && <button class="btn btn-primary m-2" type="button" onClick={connectWallet}>Connect wallet</button>}
                    <button class="btn btn-info m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Shopping Cart</button>
                </form>
            </div>
                {connected && <p className='lead m-2'> <small  className='text-body-secondary'>Connected account: </small><strong className='connected-account'>{connectedAccount}</strong></p>}

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h2 class="offcanvas-title" id="offcanvasScrollingLabel">Shopping Cart</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div className="cart-list">
                        {/* {cart.map((nft, index) => (
                            !nft.isSold && (<DisplayCard key = {nft.id} nft={nft} removeFromCart={removeFromCart} />
                            ) */}
                        {/* {cart.map((nft, index) => (
                            !nft.isSold && (<div><img src={require(`../nft-images/${nft.id}.jpg`)} className='card-img-top card-img' alt={nft.name} style={{ margin: '5px', borderRadius: '5px' }} /><button onClick={removeFromCart(nft, index)} className='btn btn-primary'>Remove from Cart</button></div>
                            )
                        ))} */}
                        {cart.map((nft, index) => (
                            !nft.isSold && (<img src={require(`../nft-images/${nft.id}.jpg`)} className='card-img-top card-img' alt={nft.name} style={{ margin: '5px', borderRadius: '5px' }} />
                            )
                        ))}
                    </div>
                    <p className='text-body-secondary'>Total Amount: {totalAmount} wei</p>
                    <button onClick={handlePayment} className='btn btn-primary m-2'>Proceed to Payment</button>
                    
                    <hr></hr>

                    <div className="past-trxns">
                        <h3>Past Transactions</h3>
                        {
                            pastTrxns.map((txn) => {
                                return (<Transaction key={txn.trxnHash} trxnHash={txn.trxnHash} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar
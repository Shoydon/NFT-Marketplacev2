const Transaction = ({trxnHash}) => {
    return (
        <div className="transaction" style={{margin: "5px"}}>
            <p>Transaction Hash: {trxnHash}<br/>
                <a href ={(`http://sepolia.etherscan.io/tx/${trxnHash}`)} target = "_blank" rel="noreferrer">View on etherscan</a>
            </p>
        </div>
    )
};
export default Transaction

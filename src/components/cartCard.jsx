const DisplayCard = ({ nft, index, removeFromCart }) => {
    return (
        <div>
            <img src={require(`../nft-images/${nft.id}.jpg`)} className='card-img-top card-img' alt={nft.name} style={{ margin: '5px', borderRadius: '5px' }} /><button onClick={removeFromCart(nft, index)} className='btn btn-primary'>Remove from Cart</button>
        </div>
    )
}

export default DisplayCard
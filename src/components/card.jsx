import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './card.css'

const NFTCard = ({ nft, addToCart, index, removeFromCart }) => {
    const handleAddToCart = () => {
        if(!nft.isAdded){
            nft.isAdded = true;
            addToCart(nft, index);
        }
    };

    const handleRemoveFromCart = () => {
        if(nft.isAdded){
            nft.isAdded = false;
            removeFromCart(nft, index)
        }
    }

    return (
        <div className="card m-5">
            <div className="card-img">
                <img src={require(`../nft-images/${nft.id}.jpg`)} className = 'card-img-top card-img' alt={nft.name} />
            </div>
            <div className="card-body">
                <h5 className='card-title'>{nft.id}</h5>
                <p className='card-text'>{nft.description}</p>
                <p className='card-text'>Price: {nft.price} wei</p>
                {!nft.isAdded ? <button onClick={handleAddToCart} className='btn btn-primary'>Add to Cart</button> : <button onClick={handleRemoveFromCart} className='btn btn-danger'>Remove from Cart</button>}
            </div>
        </div>
    );
};

export default NFTCard

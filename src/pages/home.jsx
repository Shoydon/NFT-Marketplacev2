import NFTs from '../data.json'
import NFTCard from '../components/card';

const Home = ({ addToCart, removeFromCart }) => {

    return(
        <div>
            <div className="nft-list">
        {NFTs.map(
          (nft, index) =>
            !nft.isSold && (
              <NFTCard
                key={nft.id}
                nft={nft}
                addToCart={addToCart}
                index={index}
                removeFromCart={removeFromCart}
              />
            )
        )}
      </div>
        </div>
    )
}

export default Home;
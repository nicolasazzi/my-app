
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';

function Product (product) {

    const [showLarge, setShowLarge] = useState(false); 

    return (
        <div className='product' onClick={() => setShowLarge(!showLarge)}>
            <p className='title'> {product?.title} </p>
            { ! showLarge ? <img src={product?.images?.['0']?.thumbnail} /> : null }
            { showLarge ? <img src={product?.images?.['0']?.large} /> : null }

        </div>
    );
}

function Results(result) {

    if (result === {}) {
        return (
            <p> Testing </p>
        );
    }
    else {

        var products = result?.result?.data?.data?.products;

        return (
            <div> { products?.map((product) => Product(product) )} </div>
        );
    }
}

function App() {

    const [result, setResult] = useState({})
    const [keyword, setKeyword] = useState('')

    function search(keyword, setResult) {

        var headers = {
            'Authorization': '446a6828200604377695aa034cf57e36',
            'UserAddressId': '2378',
            'StoreId': '1',
        }
    
        var config = {
            'headers': headers,
        }

        axios.get(`https://app.markitworld.com/api/v2/user/products/?keyword=${keyword}`, config).then((response) => setResult(response));
    }

    return (
        <div>
            <p> Search for a product: </p>
            <input onChange={event => setKeyword(event.target.value)} type="text" />
            <button onClick={() => search(keyword, setResult)}> Search </button>
            <Results result={result}/>
        </div>
    ); 
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
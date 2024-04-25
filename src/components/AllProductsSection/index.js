import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiURL = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiURL, options)

    if (response.ok === true){
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.products.map(products => ({
        id: products.id,
        brand: products.brand,
        title:products.title,
        price: products.price,
        rating: products.rating,
        imageUrl: products.image_url
      }))
      this.setState({productsList: updatedData,isLoading: false})
    }
    
  }
  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return <> {isLoading?<Loader type="TailSpin" className="loader" color="#00BFFF" height={50} width={50}/> :this.renderProductsList()}</>
  }
}

export default AllProductsSection

// Object property shorthand

const name = 'leeminxji'
const userAge = 25

const user = {
    name, // We can abbreviate 'name:'
    user: userAge,
    location: 'Incheon'
}

console.log(user)

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating : 4.2
}

// const label = product.label
// const stock = product.stock

// const {label : productLabel, stock, rating = 5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating) // undefined

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock)
}
transaction('order', product)
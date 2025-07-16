const Product = require("../../models/admin/products-model")

const fetchAllFilterProducts = async(req, res) => {
    const {sortBy, brand=[], category=[]}  = req.query


    try {

        let filters = {}
        let sort = {}

        if(brand.length > 0){
            filters.brand = {$in: brand.split(',')}
        }


        if(category.length > 0){
            filters.category = {$in: category.split(',')}
        }



        switch (sortBy) {
            case 'lowtohigh':
                sort.price = 1
                break;
            case 'hightolow':
                sort.price = -1
                break;
            case 'atoz':
                sort.title = 1
                break;
            case 'ztoa':
                sort.title = -1
                break;
            default:
                sort.price = 1
                break;
        }


        const products = await Product.find(filters).sort(sort)


        res.status(201).json({
            success: true,
            data: products
        })
    
    } catch (error) {
        res.status(500).json({
            success: false
        })
    }
}


const fetchProductDetails = async(req, res) => {
    try {
        const {id} = req.params

        if(!id) {
            res.status(400).json({
                success: false , 
                message : 'product id does not exist in params '
            })
        }

        const productDetails = await Product.findOne({_id: id})

        if(!productDetails) {
            res.status(404).json({
                success: false , 
                message : 'Product not found  '
            })
        }

        res.status(200).json({
            success: true , 
            data: productDetails
        })
        
    } catch (error) {
        res.status(500).json({
            success: false ,
            message : 'Error: ' + error
        })
       
    }
}

const searchProducts = async(req, res) => {

    const {query} = req.params;


    if(!query){
        return res.status(404).json({
            message: 'search query is required', 
            success: false 
        })
    }

    const regEx = new RegExp(query, 'i')


    const searchQuery = {
        $or:[
            {title: regEx},
            {description: regEx},
            {brand: regEx},
            {category: regEx}
        ]
    }



    const searchedProducts = await Product.find(searchQuery)




    // if(!searchedProducts || !searchedProducts.length ) {
    //     return res.status(404).json({
    //         message: 'no results', 
    //         success: false 
    //     })
    // }

    return res.status(200).json({
        success: true , 
        data: searchedProducts
    })


}

module.exports = {fetchAllFilterProducts, fetchProductDetails, searchProducts}
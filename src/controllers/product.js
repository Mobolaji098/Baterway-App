const Products = require('../models/product');


// @route GET api/product
// @desc Show all products
// @access Public
exports.index = async (req, res) => {
    console.log(req)
    const products = await Products.find({});
    res.status(200).json({products});
};
// @route POST api/product/store
// @desc Add product
// @access Public
exports.store = async (req, res) => {
    try {
        const {name,price,weight,description,categories,itemInReturn,location } = req.body;
        // Make sure all parameters are added


        let productPayload={
            userId:req.user._id,
            name:name,
            price:price,
            weight:weight,
            description:description,
            categories:categories,
            itemInReturn:itemInReturn,
            location:location
        };
       

        const newProduct = new Products(productPayload);

        // Save the updated user product
        await newProduct.save();

        console.log(req.user )

        res.status(200).json({message: 'Product Added for ' + req.user.userName + '.'});

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// @route GET api/product/{id}
// @desc Returns a specific user products
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.id;

        const user = await User.findById(id);
        console.log({"req":req,})

        if (!user) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
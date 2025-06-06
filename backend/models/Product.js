const { default: mongoose } = require('mongoose')
const moongoose=require('mongoose')


const productSchema=new moongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                Enumerator:['veg','non-veg']
            }
        ]
    },
    image:{
        type:String
    },
    bestseller:{
        type:String
    },
    description:{
        type:String
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]

})

const Product=moongoose.model('Product',productSchema)
module.exports=Product
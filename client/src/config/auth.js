export const registerFormController = [
    {
        name: "username",
        label: "User Name", 
        placeholder: 'Enter your username here: ', 
        componentType: 'input', 
        type: 'text'
    },
    {
        name: "email",
        label: "Email", 
        placeholder: 'Enter your email', 
        componentType: 'input', 
        type: 'email'
    },
    {
        name: "password",
        label: "Password", 
        placeholder: 'Enter your password', 
        componentType: 'input', 
        type: 'password'
    },
    // {
    //     name: "select",
    //     label: "select", 
    //     placeholder: 'select', 
    //     componentType: 'select', 
    //     type: 'select',
    //     options: [
    //         {
    //             id: 1,
    //             label: 'admin',
    //             value: 'admin'
    //         },
    //         {
    //             id: 2,
    //             label: 'user',
    //             value: 'user'
    //         }
    //     ]
    // },
    // {
    //     name: "text",
    //     label: "text", 
    //     placeholder: 'text here', 
    //     componentType: 'textarea', 

    // },
]

export const loginFormController = [
    {
        name: "email",
        label: "Email", 
        placeholder: 'Enter your email', 
        componentType: 'input', 
        type: 'email'
    },
    {
        name: "password",
        label: "Password", 
        placeholder: 'Enter your password', 
        componentType: 'input', 
        type: 'password'
    },
]

export const addProductFormElements = [
    {
        label:'Title',
        name: 'title',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter Product title'
    },
    {
        label: 'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: 'Product Description'
    },
    {
        label: 'Category',
        name: 'category',
        componentType: 'select',
        options: [
            {id: 'men', label: 'Men'},
            {id: 'women', label: 'Women'},
            {id: 'kids', label: 'Kids'},
            {id: 'accessories', label: 'Accessories'},
            {id: 'footwear', label: 'Footwear'}
        ]
    },
    {
        label: 'Brand',
        name: 'brand',
        componentType: 'select',
        options:[
            {id: 'campus', label: 'Campus'},
            {id: 'addidas', label: 'Addidas'},
            {id: 'armani', label: 'Armani'},
            {id: 'puma', label: 'Puma'},
            {id: 'h&m', label: 'H&M'},
            {id: 'hrx', label: 'HRX'},
            {id: 'cr7', label: 'CR7'},
        ]
    },
    {
        label:'Price',
        name: 'price',
        componentType: 'input',
        type: 'text',
        placeholder: 'product price'
    },
    {
        label:'Sales Price',
        name: 'salePrice',
        componentType: 'input',
        type: 'text',
        placeholder: 'Sales Price'
    },
    {
        label:'Total Stock',
        name: 'totalStock',
        componentType: 'input',
        type: 'text',
        placeholder: 'Total Stocks'
    },
    
]


export const menuElements = [
    {
        id: 'home',
        label: 'Home',
        path: '/shopping/home'
    },
    {
        id: 'products',
        label: 'Products',
        path: '/shopping/listing'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shopping/listing'
    }, 
    {
        id: 'women',
        label: 'Women',
        path: '/shopping/listing'
    }, 
    {
        id: 'kids',
        label: 'Kids',
        path: '/shopping/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shopping/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shopping/listing'
    },
    {
        id: 'search',
        label: 'Search',
        path: '/shopping/search'
    },

    
]


export const filterOptions = {
    category: [
        {id: 'men', label: 'Men'},
        {id: 'women', label: 'Women'},
        {id: 'kids', label: 'Kids'},
        {id: 'accessories', label: 'Accessories'},
        {id: 'footwear', label: 'Footwear'},

    ],
    brand: [
        {id: 'cr7', label: 'CR7'},
        {id: 'puma', label: 'Puma'},
        {id: 'adidas', label: 'Adidas'},
        {id: 'h&m', label: 'H&M'},
        {id: 'HRX', label: 'HRX'},
        {id: 'campus', label: 'Campus'}
    
    ]
}

export const sortOptions = [
    {id:'lowtohigh', label: 'Low to High'},
    {id:'hightolow', label: 'High to Low'},
    {id:'atoz', label: 'a to z'},
    {id:'ztoa', label: 'z to a'},

]

export const addressFormControls = [
    {
        label: 'Address',
        name: 'address',
        componentType: 'input', 
        type: 'text',
        placeholder: 'Enter Your Address here'
    },
    {
        label: 'City',
        name: 'city',
        componentType: 'input', 
        type: 'text',
        placeholder: 'Enter Your City here'
    },{
        label: 'Pincode',
        name: 'pincode',
        componentType: 'input', 
        type: 'text',
        placeholder: 'Enter Your Pincode here'
    },{
        label: 'Phone',
        name: 'phone',
        componentType: 'input', 
        type: 'text',
        placeholder: 'Enter Your Phone No. here'
    },
    {
        label: 'Notes',
        name: 'notes',
        componentType: 'input', 
        type: 'text',
        placeholder: 'Any note'
    },
]
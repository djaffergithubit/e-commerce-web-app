import React, { useEffect, useState } from 'react'
import upload from "../../assets/upload-cloud.svg"
import axios from "axios"
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '../../states/tokenSlice'
import { nanoid } from '@reduxjs/toolkit'
import { addMessage } from '../../states/messagesSlice'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {

    const [newProduct, setNewProduct] = useState({
        productName: '',
        productCategory: '',
        productBrand: '',
        productColor: '',
        productPrice: null,
        productRegularPrice: null,
        quantity: null,
        description: ''
    })

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [files, setFiles] = useState(null);
    const authToken = useSelector(selectAuthToken)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const onFileChangeHandler = (e) => {
        setFiles(e.target.files);
    };

    const handleChange = (e) => {
        const { name, value} = e.target;
        
            setNewProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        
    };

    const handleProcedureContentChange = (content) => {
        setNewProduct(prevProduct => {
            return{
                ...prevProduct,
                description: content
            }
        })
      };

    useEffect(()=>{
        axios.get('http://localhost:3500/categories')
        .then((response)=>{
            setCategories(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    useEffect(()=>{
        axios.get(`http://localhost:3500/brands/${newProduct.productCategory}`)
        .then((response)=>{
            setBrands(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [newProduct.productCategory])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        for (const file of files) {
            formData.append(`productImages`, file);
        }

        formData.append('productName', newProduct.productName);
        formData.append('productCategory', newProduct.productCategory);
        formData.append('productBrand', newProduct.productBrand);
        formData.append('productColor', newProduct.productColor);
        formData.append('productPrice', newProduct.productPrice);
        formData.append('productRegularPrice', newProduct.productRegularPrice);
        formData.append('description', newProduct.description);
        formData.append('quantity', newProduct.quantity);
       
        axios.post('http://localhost:3500/products/create', formData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response)=>{
            dispatch(addMessage({id: nanoid(), message: response.data.message, type: 'Success'}))
            Navigate('/admin/products')
            console.log(response.data)
        })
        .catch((error)=>{
            // dispatch(addMessage({id: nanoid(), message: error, type: 'info'}))
            console.log(error.message)
            Navigate('/admin/products')
        })

        console.log(authToken)
    }


    var modules = {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] }
          ],
          [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
      };
    
      var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
      ];

  return (
    <div className=' item1 px-4 py-2'>
        <div className=' max-w-lg w-full'>
        <h1 className=' text-2xl font-light tracking-wide'>Add New Product</h1>
        <form action="" className=' flex flex-col gap-3' onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
            <div className="file-input-container">
                <label className="custom-file-label " htmlFor="file-input">
                    <img className=' w-[30px] mx-auto' src={upload} alt="" />
                    <p className=' pt-6 text-center'>Click to upload up 5 images</p>
                </label>
                <input 
                    id="file-input"
                    className="hidden"
                    name='files'
                    type="file"
                    multiple
                    onChange={onFileChangeHandler}
                />

            </div>
                {/* <div className=' flex flex-col'>
                    <label htmlFor="">Product images</label>
                    <input 
                    className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md'
                    type="text" 
                    name=''
                    placeholder='No image set for this product'
                    />
                </div> */}
                <div className=' flex flex-col'>
                    <label htmlFor="productName">Product Name</label>
                    <input 
                    className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md'
                    type="text" 
                    name='productName'
                    onChange={handleChange}
                    value={newProduct.productName}
                    placeholder='Product Name'
                    />
                </div>
                <div className=' flex flex-col'>
                    <label htmlFor="productCategory">Product Category</label>
                    <select name="productCategory" id="" className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md' onChange={handleChange} value={newProduct.productCategory} >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.categoryName} value={category.categoryName}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className=' flex flex-col'>
                    <label htmlFor="productBrand">Product Brand</label>
                    <select name="productBrand" id="" className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md' onChange={handleChange} value={newProduct.productBrand}>
                        <option value="">Select Brand</option>
                        {brands.map(brand => (
                            <option key={brand.categoryName} value={brand.brandName}>{brand.brandName}</option>
                        ))}
                    </select>
                </div>
            <div className=' flex flex-col'>
                <label htmlFor="productColor">Product Color</label>
                <input 
                className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md'
                type="text"  
                name='productColor'
                onChange={handleChange}
                value={newProduct.productColor}
                placeholder='Color'
                />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="productRegularPrice">Regular Price</label>
                <input 
                className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md'
                type="text" 
                name='productRegularPrice'
                onChange={handleChange}
                value={newProduct.productRegularPrice}
                placeholder='Regular Price'
                />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="productPrice">Product Price</label>
                <input 
                className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md'
                type="text" 
                name='productPrice'
                onChange={handleChange}
                value={newProduct.productPrice}
                placeholder='Product Price'
                />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="productName">quantity</label>
                <input 
                className=' px-4 py-2 border-gray-500 border-solid border-x-2 border-y-2 outline-none rounded-md'
                type="text" 
                name='quantity'
                onChange={handleChange}
                value={newProduct.quantity}
                placeholder='quantity'
                />
            </div>
            <div>
                <h1>Product description</h1>
      <div className=" grid justify-center">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          name='description'
          placeholder="write your content ...."
          onChange={handleProcedureContentChange}
          className=" h-[120px]"
        >
        </ReactQuill>
      </div>
    </div>
            <button type='submit' className=' bg-blue-700 text-white px-4 py-1 rounded-md text-xl font-normal tracking-wide w-48 z-[4500]' >Save Product</button>
        </form>
        </div>
        
    </div>
  )
}

export default AddProduct
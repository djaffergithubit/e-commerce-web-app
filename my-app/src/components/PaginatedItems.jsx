import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductItems from './productItems';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { activeButtonValue, setActiveButton } from '../states/activeButtonSlice';
import { currentBrandValue } from '../states/currentBrandSlice';

function PaginatedItems({ itemsPerPage, searchProduct, items, setItems }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [itemCategory, setItemCategory] = useState([]);
  const [itemBrand, setItemBrand] = useState([]);
  const currentBrand = useSelector(currentBrandValue);

  const activeButton = useSelector(activeButtonValue);
  const dispatch = useDispatch()

  const handlePageClick = useCallback((event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  }, [items, itemsPerPage]);

  useEffect(() => {
    if (searchProduct === '') {
      setItems(products)
    }else{
      dispatch(setActiveButton({ value: 'All' }))
      setItems(items?.filter(item => (item.productName.toLowerCase()).includes(searchProduct.toLowerCase())))
    }
  }, [searchProduct])

  // for each product, fetch the category
  const fetchCategories = useCallback(async () => {
    try {
      const responses = await Promise.all(products.map(async item => 
        axios.get(`http://localhost:3500/categories/${item.productCategory}`)
      ));
      const categories = responses.map((response, index) => ({
        itemId: products[index]._id,
        categoryName: response.data
      }));

      setItemCategory(categories);
    } catch (error) {
      console.log(error);
    }
  }, [products]);

  // for each product, fetch the brand
  const fetchBrands = useCallback(async () => {
    try {
      const responses = await Promise.all(products.map(async item => 
        axios.get(`http://localhost:3500/brands/brand-name/${item.productBrand}`)
      ));
      const brands = responses.map((response, index) => ({
        itemId: products[index]._id,
        brandName: response.data
      }));
      
      setItemBrand(brands);
    } catch (error) {
      console.log(error);
    }
  }, [products]);

  // filter the items based on the category or brand  
  const getFilteredItems = useCallback((filterCrt, isCategory) => {
    const currentElements = (isCategory ? itemCategory : itemBrand).filter(element => (isCategory ? element.categoryName : element.brandName) === filterCrt);
    const newItems = currentElements.map(element => products.find(item => element.itemId === item._id));
    setItems(newItems);
  }, [itemCategory, itemBrand, products]);


 // fetch the products from the server
  useEffect(() => {
    axios.get('http://localhost:3500/products')
      .then((response) => {
        setItems(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(()=>{
    fetchBrands();
  }, [fetchBrands]);

  // filter the items based on the active button
  useEffect(() => {
    itemCategory.map(item => {
      if (activeButton === item.categoryName) {
        getFilteredItems(item.categoryName, true) 
      }

      if (activeButton === 'All') {
        setItems(products)
      }
    })
  }, [activeButton, getFilteredItems, products]);

  // filter the items based on the current brand
  useEffect(() => {
    itemBrand.map(item => {
      if (currentBrand === item.brandName) {
        getFilteredItems(item.brandName, false)
      }

      if (currentBrand === 'All') {
        setItems(products)
      }
    })
  }, [currentBrand, getFilteredItems, products]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <ProductItems currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next "
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName=" flex justify-center items-center gap-2 py-8 px-2"
        nextClassName=' cursor-pointer px-2 py-1 rounded border-[1px] border-solid border-[#333333] text-[14px] text-[#333333] hover:bg-blue-500 hover:text-white'
        previousClassName='cursor-pointer px-2 py-1 rounded border-[1px] border-solid border-[#333333] text-[14px] text-[#333333] hover:bg-blue-500 hover:text-white'
        pageClassName='cursor-pointer px-3 py-1 rounded border-[1px] border-solid border-[#333333] text-[14px] text-[#333333] hover:bg-blue-500 hover:text-white'
        activeClassName=' bg-blue-500 text-white'
      />
    </>
  );
}

export default PaginatedItems;

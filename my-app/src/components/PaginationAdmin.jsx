import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductItems from './productItems';
import axios from 'axios';
import Table from './Table';

function PaginationAdmin( props ) {
  const [itemOffset, setItemOffset] = useState(0);
  const [showScroll, setShowScroll] = useState(false)

  const handlePageClick = useCallback((event) => {
    const newOffset = (event.selected * props.itemsPerPage) % props.items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  }, [props.items, props.itemsPerPage]);

 // fetch the products from the server
//   useEffect(() => {
//     axios.get('http://localhost:3500/products')
//       .then((response) => {
//         setItems(response.data);
//       })
//       .catch((error) => console.log(error));
//   }, []);

  const endOffset = itemOffset + props.itemsPerPage;
  const currentItems = props.items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.items.length / props.itemsPerPage);

  useEffect(()=>{
    if (window.innerWidth < 1080) {
      setShowScroll(false)
    }else{
      setShowScroll(true)
    }
  }, [])

  useEffect(()=>{
    window.addEventListener('resize', ()=>{
        if (window.innerWidth > 950) {
            setShowScroll(true)
        }else{
            setShowScroll(false)
        }
    })
}, [window.innerWidth])



  return (
    <div className={`w-full ${!showScroll && 'max-w-[915px] overflow-x-scroll'}`}>
      <Table 
        data={currentItems} 
        isProducts={props.isProducts}
        categories={props.categories}
        isCoupon={props.isCoupon}
        isOrder={props.isOrder}
      />
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
    </div>
  );
}

export default PaginationAdmin;

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getCategories  } from "../../../features/category/categorySlice";
import { getProducts } from "../../../features/product/productSlice";

export default function CategoryFilter() {
  const dispatch = useDispatch();

  const [CategoryId, setCategoryId] = React.useState(null);
  const { categories , isLoading} = useSelector((state) => state.category);

  useEffect(()=>{
    dispatch(getCategories())        
},[]);

  const handleChange = (event) => {
    dispatch(getProducts(event.target.value))
    setCategoryId(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={CategoryId ?? ''}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>Filter by category</em>
          </MenuItem>
          {categories.map((category) => 
          <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import countryList from 'react-select-country-list'
import { placeOrder } from '../../features/order/orderSlice'
import { useNavigate } from 'react-router'

const OrderForm = () => {

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [streetName, setStreetName] = useState('');
    const [buildingNo, setBuildingNo] = useState('');
    const [floorNo, setFloorNo] = useState('');
    const [apartmentNo, setApartmentNo] = useState('');
    const { order,orderItems, isLoading } = useSelector((store) => store.order);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (order.id) {
            navigate('/payment', { state: { order:order,orderItems:orderItems } })
        }
    }, [order])

    const options = useMemo(() => countryList().getData(), [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            street_name: streetName,
            country: country,
            city: city,
            building_no: parseInt(buildingNo),
            floor_no: parseInt(floorNo),
            apartment_no: parseInt(apartmentNo)
        };
        dispatch(placeOrder(orderData))
    }


    return (
        <>
            <h3 style={{marginTop:'2rem'}}>Order Address</h3>

            <form onSubmit={handleSubmit} >

                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select value={country} onChange={(e) => setCountry(e.target.value)} label="Country" required>
                        {options.map((option, i) => (
                            <MenuItem key={i} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                        <TextField
                            label="City"
                            variant="outlined"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Street Name"
                            variant="outlined"
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                <TextField
                    label="Building No"
                    variant="outlined"
                    value={buildingNo}
                    onChange={(e) => setBuildingNo(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    type='number'
                />

                <TextField
                    label="Floor No"
                    variant="outlined"
                    value={floorNo}
                    onChange={(e) => setFloorNo(e.target.value)}
                    type='number'
                    margin="normal"
                    fullWidth
                    required
                />

                <TextField
                    label="Apartment No"
                    variant="outlined"
                    value={apartmentNo}
                    onChange={(e) => setApartmentNo(e.target.value)}
                    margin="normal"
                    type='number'
                    fullWidth
                    required
                />

                <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#ece87d', color: '#2d2a32', marginBottom: "10rem" }}>
                    Proceed to payment
                </Button>
            </form>
        </>
    )
}
export default OrderForm



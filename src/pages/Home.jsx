import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import { Link } from 'react-router-dom'
import { Button, FormControl, TextField } from '@mui/material'

const Home = () => {
    const [filters, setFilters] = useState({})
    const [itemList, setItemList] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [noMoreItems, setNoMoreItems] = useState(false)
    const [searchFilter, setSearchFilter] = useState('')

    const getFilterQuery = () => {
        return Object.keys(filters).length > 0 
        ? '&' + (Object.keys(filters).map(key => `${key}=${filters[key]}`).join('&'))
        : ''
    }

    useEffect( () => {
        setPageNo(1);
        setItemList([]);
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/property?page=1${getFilterQuery()}`)
        .then(response => response.json())
        .then(responseData => {
            if (responseData.data.length > 0)
                setItemList(responseData.data)
            else 
                setNoMoreItems(true)
        })
    }, [filters])

    const getNewPage = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/property?page=${pageNo + 1}${getFilterQuery()}`)
        .then(response => response.json())
        .then(responseData => {
            if (responseData.data.length > 0)
                setItemList([...itemList, ...responseData.data])
            else 
                setNoMoreItems(true)
        })
        setPageNo(pageNo + 1)
    }


  return (
    <Container>
        <div className="home-form">
            <FormControl >
                {/* assignment - throtling & debouncing */}
                <TextField 
                    label="Search" 
                    variant="filled" 
                    onChange={e => setSearchFilter(e.target.value)}
                    onKeyDown={e => {
                        if (e.keyCode == 13) {
                            setFilters({...filters, input: searchFilter})
                            setNoMoreItems(false)
                        }
                    }}
                />
            </FormControl>
        </div>

        {/* todo: category filter - https://awaas-vishwa.vercel.app/ */}

        <div className="item-list">
            {itemList.length > 0 && (
                    itemList.map((item, key) => <ItemCard key={key} {...item}  />)
            )}
        </div>

        <div className="home-pages">
            {   noMoreItems 
                ? (<Button variant="contained" disabled>No More Items</Button>)
                : (<Button variant="contained" onClick={getNewPage}>Load More</Button>)
            }
        </div>
    </Container>
  )
}

const ItemCard = ({
    id, title, imgList, listType, location, price, createdAt
}) => {
    return (
        <div className='item-card-container'>
            <Link to={`/item/${id}`} >
                <div className="item-card">
                    <div className="item-card-imgs">
                        {
                            imgList && imgList.length > 0 
                            ? (
                                imgList.map((img, idx) => <img key={idx} src={img} />)
                            )
                            : ( <div className='item-card-no-img'>No Images</div> )
                        }
                    </div>
                    <div className="item-card-body">
                        <div className="item-card-price">₹ {price.toLocaleString()}</div>
                        <div className="item-card-title">{title}</div>
                        <div className="item-card-location">{location}</div>
                    </div>
                    <div className="item-card-footer">
                        <div>{listType}</div>
                        <div>{createdAt}</div>      {/* todo: local string */}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Home

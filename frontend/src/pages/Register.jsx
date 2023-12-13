import { useState, useEffect } from "react";


import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from '../Store/apiSlice';


export default function Register() {
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector(state => state.api) // from name
    
    // on ready
    useEffect(() => {
        dispatch(fetchApi({
            method:"GET", 
            apiEndpoint:"http://localhost:3000/user",
        }))
    },[]);


  return (
    <>
        {/* err? show */}
        {error && <p>error</p>}

        {/* loading? (waiting for package...) do something */}
        {loading ? (
            <p>loading...</p>
        ) : (
            // not loading? (package is here?) show data
                <p>package here</p>
                // data.map((item) => (
                // pass to Card or Item or whatever
                // <Item {...item} />
        )}
    </>
  )
}
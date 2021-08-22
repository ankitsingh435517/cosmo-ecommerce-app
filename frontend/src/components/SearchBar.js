import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SearchBar = () => {
    const history = useHistory();

    const [searchItem, setSearchItem] = useState('');

    return (
        <div className=" w-1/2 flex items-center mr-12">
            <input type="text" value={searchItem} onChange={(e) => {setSearchItem(e.target.value)}} className="-mr-6 pr-72 outline-none pl-2 py-0.5 tracking-wider font-sm border rounded" placeholder="Search   for   products ..."></input>
            <Link to={`/searchProducts?keyword=${searchItem}`}>
                <button className="text-sm"><i className="fa fa-search" aria-hidden="true"></i></button>
            </Link>
        </div>
    )
}

export default SearchBar

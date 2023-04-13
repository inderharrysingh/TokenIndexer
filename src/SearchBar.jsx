
import './Index.css';
import SearchIcon from './Search.svg';

function SearchBar({ value, setValue, search }){


    return (
         <div className='search'>
          <input placeholder="Enter Your Adress"
          value={value}
          onChange={(event) => {setValue(event.target.value)}}
          >
          </input>
           <img src={SearchIcon} alt="Search" onClick={ ()=> {
            search()}}  />
        </div>
    )
}

export default SearchBar;
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {STATE_NAMES} from '../Data/Constants';

function Search() {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(false);

  const states = STATE_NAMES.map((state) => state);

  function updateSearch() {
    return states.filter((val) =>
      search === '' ? '' : val.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <div className="search-wrapper">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onFocus={() => setChecked(true)}
        placeholder="Search your State..."
        autoComplete="Off"
        type="search"
        name="search"
        className="search"
      />
      {search !== '' && search !== ' ' && checked && (
        <div className="search-links-wrapper">
          {updateSearch().map((result) => {
            if (states.includes(result)) {
              let index = states.indexOf(result);

              return (
                <Link
                  key={index}
                  to={`/state/${states[index].split(' ').join('')}`}
                >
                  <div className="search-links">{states[index]}</div>
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default Search;

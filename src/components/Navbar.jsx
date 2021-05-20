import {useState} from 'react';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import {Link} from 'react-router-dom';

function Navbar(props) {
  const [menuClose, setMenuClose] = useState(false);

  return (
    <nav>
      <Link to="/" className="logo" key="logo">
        <h4>
          Covid19 <span className="sub">Help India</span>
        </h4>
      </Link>

      <MenuRoundedIcon
        className="menu"
        onClick={() => setMenuClose(!menuClose)}
      />

      <ul className={`links ${menuClose ? 'active' : ''}`}>
        {props.pages.map((val, idx) => {
          return (
            <li key={idx}>
              <Link
                className="link"
                to={val.link}
                key={idx}
                onClick={() => {
                  setMenuClose(false);
                }}
              >
                {val.pageName}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;

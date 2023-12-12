import { Link } from "react-router-dom";

// 1. get state
import { useSelector } from "react-redux";

function Navbar() {

// 2. get value (count)
const count = useSelector(function selector(state) {return state.counter.count})


return (
    <>
        <Link to="/">
            {/* USE COUNT */}
            Home ({count})
        </Link>
        <Link to="/menu">
            Menu
        </Link>
    </>
  );
}


export default Navbar;
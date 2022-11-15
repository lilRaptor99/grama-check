import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h3>Home</h3>
            <Link to="/menu">Go to Menu</Link>
        </div>
    );
};

export default Home;
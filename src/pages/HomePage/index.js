import Categories from '../../components/Categories';
import Search from '../../components/Search';

const HomePage = () => {
    
    return (
        <>
            <Search />
            <Categories category="Top Rated Movies" link="/top-rated" />
            <Categories category="Popular Movies" link="/popular" />
        </>
    );
};

export default HomePage;
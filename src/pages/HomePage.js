import Categories from '../components/Categories';
import Header from '../components/Header';
import Search from '../components/Search';

const HomePage = () => {
    
    return (
        <div>
            <Header/>
            <main>
                <Search />
                <Categories category="Top Rated Movies" />
                <Categories category="Popular Movies" />
            </main>
        </div>
    );
};

export default HomePage;
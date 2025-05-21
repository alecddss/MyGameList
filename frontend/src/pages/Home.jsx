import GameCard from "../components/GameCard"
import { useState, useEffect } from "react"
import { getRecentGames, getGames, searchGames } from "../services/api";
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [games, setGames] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularGames = async () => {
            try{
                const popularGames = await getRecentGames()
                setGames(popularGames)
            }

            catch (err) {
                console.log(err)
                setError("Failed to load popular games...")
            }   
            
            finally{
                setLoading(false)
            }
        }

        loadPopularGames()

    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try {
            const searchResults = await searchGames(searchQuery)
            setGames(searchResults)
            setError(null)
        } 
        
        catch (err) {
            setError("Failed to search for games...")
            console.log(err)
        }

        finally{
            setLoading(false);
        }
    };

    {/* Displaying the home page, which will have the search bar and a grid of GameCards */}
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-input" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {/* If there's an error, display it */}
            {error && <div className="error-message">{error}</div>}

            {/* While loading, display "Loading games" text. Otherwise, display the games */}
            {loading ? <div className="loading">Loading games...</div> : 
                <div className="games-grid">
                    {games.map(game => (
                    <   GameCard game={game} key={game.id}/>
                    ))}
                </div>
            }
        </div>
    )
}

export default Home
import { useEffect, useState } from 'react';
import menuData from '../assets/menu.json'; // Adjust the path as necessary
import './menu.css'; // Import the CSS file for styling

const Menu = () => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      // Initialize displayedItems with original menu data
      setDisplayedItems(menuData);
    }, []);
  
    const handleSortToggle = () => {
      if (isSorted) {
        // If currently sorted, revert to original menu
        setDisplayedItems(menuData);
      } else {
        // If currently unsorted, sort the items alphabetically
        const allItems = menuData.flatMap(category => category.items);
        const sorted = allItems.sort((a, b) => a.name.localeCompare(b.name));
  
        // Wrap sorted items back into categories for rendering
        const sortedCategories = [
          {
            category: "Sorted Items",
            items: sorted,
          },
        ];
  
        setDisplayedItems(sortedCategories);
      }
  
      // Toggle the sorting state
      setIsSorted(!isSorted);
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredItems = displayedItems.map(category => ({
      category: category.category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }));
  // Calculate total items
  const totalItems = filteredItems.reduce((count, category) => {
    return count + category.items.length; // Count items in each category
  }, 0);

    return (
      <div>
        <div className='searchSort'>
        <input
        className='search'
          type="text"
          placeholder="Search for sushi..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSortToggle}>
          {isSorted ? 'Unsort' : 'Sort Alphabetically'}
        </button>
        </div>
        <p>Total items: {totalItems}</p>
        <div>
          {filteredItems.map((category, index) => (
            <div key={index}>
              <h2>{category.category}</h2>
              <ul>
                {category.items.length > 0 ? (
                  category.items.map((item, idx) => (
                    <li key={idx}>
                      <b>{item.name}</b> - {item.price}
                      <br />
                      {item.description}
                    </li>
                  ))
                ) : (
                  <li>No items found.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Menu;
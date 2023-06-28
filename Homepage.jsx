import React, { useContext } from "react";
import './homepage.css';
import News from '../components/News';
import { NewsContext } from "../NewsContext";

const HomePage = ({selectedCategory}) => {
  const data  = useContext(NewsContext);
  console.log(selectedCategory)
  return(
    <div className="col">  
      
    {data && <News selectedCategory={selectedCategory} />}
      
    </div>  
    

  );
};

export default HomePage;
 
//import React, { useState } from 'react';
// import './homepage.css';

// const HomePage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Sample news data
//   const news = [
//     {
//       id: 1,
//       title: 'Breaking News',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//       id: 2,
//       title: 'Sports Update',
//       description: 'Nulla facilisi. Morbi iaculis dui vel justo elementum lacinia.',
//     },
//     {
//       id: 3,
//       title: 'Technology News',
//       description: 'Fusce ut dapibus odio, in sagittis sapien. Vivamus tempus risus sit amet.',
//     },
//   ];

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredNews = news.filter((item) =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="col">
//       <h1>Welcome to the News Portal</h1>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search news..."
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       <div className="news-container">
//         {filteredNews.length > 0 ? (
//           filteredNews.map((item) => (
//             <div className="news-item" key={item.id}>
//               <h2>{item.title}</h2>
//               <p>{item.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No news found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

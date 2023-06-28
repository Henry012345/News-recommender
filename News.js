import React, { useContext, useEffect, useState } from "react";
import NewsArticle from "./NewsArticle";
import { NewsContext } from "../NewsContext";
const explicitKeywords = [
  "pornography",
  "sexual content",
  "nudity",
  "adult entertainment",
  "violence",
  "gore",
  "drugs",
  "alcohol",
  "gambling",
  "hate speech",
  "racism",
  "sexism",
  "homophobia",
  "terrorism",
  "self-harm",
  "suicide",
  "explicit language",
  "graphic content",
  "sexual abuse",
  "explicit images/videos",
  "explicit text",
  "erotic",
  "fetish",
  "incest",
  "bestiality",
  "pedophilia",
  "prostitution",
  "obscene",
  "indecent",
  "vulgar",
  "lewd",
  "obscenity",
  "voyeurism",
  "rape",
  "molestation",
  "domination",
  "sadism",
  "masochism",
  "bondage",
  "torture",
  "snuff",
  "death",
  "cult",
  "occult",
  "witchcraft",
  "devil worship",
  "drug abuse",
  "intoxication",
  "impaired driving",
  "weaponry",
  "explosives",
  "terrorism",
  "extremism",
  "harmful substances",
  "illegal activities",
  "hate crimes",
  "sexual harassment",
  "bullying",
  "cyberbullying",
  "body shaming",
  "eating disorders",
  "suicide methods",
  "self-harm techniques",
  "hacking",
  "phishing",
  "scam",
  "fraud",
  "counterfeit",
  "identity theft",
  "plagiarism",
  "cheating",
  "copyright infringement",
];

function News({ selectedCategory }) {
  const { data } = useContext(NewsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const something = data && data.map((item) => item.articles);
  // console.log(something)

  const findExplicit = (inpStr) => {
    let str = inpStr.split(" ");
    let hasFound = false;
    str.forEach((st) => {
      if (explicitKeywords.includes(st)) {
        console.log(st);
        hasFound = true;
        return hasFound;
      }
    });

    return hasFound;
  };

  var allNews = data && [].concat(...data.map((item) => item.articles));
  allNews = allNews.filter(
    (element) => !findExplicit(element.title.toLowerCase())
   
  );
 
  console.log(findExplicit("ports court rejects IBA appeal, IOC condemns leadership language - Reuters"));
  
  const filteredArticles = allNews.filter((news) => news.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const [backendResult, setBackendResult] = useState([]);
  console.log(selectedCategory);

  useEffect(() => {
    const resp = fetch("http://localhost:5000/articles", {
      method: "POST",
      body: JSON.stringify({ interest: selectedCategory }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((resp) => {
        console.log(selectedCategory);
        console.log(resp);
        var allNews = resp[0]
        console.log(allNews);
        allNews = allNews.filter(
          (element) => !findExplicit(element.title.toLowerCase())
          // element.title.toLowerCase().includes(explicitKeywords);
        );
        const filteredArticles = allNews.filter((news) => news.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setBackendResult(filteredArticles);
      });
  }, [selectedCategory]);

  return (
    <div>
      <h1 className="head__text">News App 👋</h1>
      <div className="search__container">
        <input type="text" placeholder="Search news..." value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div className="all__news">
        {data ? (
          backendResult.length > 0 ? (
            backendResult.map((news) => <NewsArticle data={news} key={news.title} />)
          ) : (
            <p>No matching articles found.</p>
          )
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}

export default News;

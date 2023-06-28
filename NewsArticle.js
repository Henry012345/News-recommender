import React from "react";

function NewsArticle({ data }) {
  return (
    <div className="news">
      <a href={data.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
        <h1 className="news__title">{data.title}</h1>
        <p className="news__desc">{data.description}</p>
        <span className="news__author">{data.author}</span> <br />
        <span className="news__published">{data.publishedAt}</span>
        <span className="news__source">{data.source.name}</span>
      </a>
    </div>
  );
}

export default NewsArticle;

import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();

  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handleClick = (index) => {
    setPage(index);
  };
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prePage = () => {
    setPage((oldPage) => {
      let prePage = oldPage - 1;
      if (prePage < 0) {
        prePage = data.length - 1;
      }
      return prePage;
    });
  };
  return (
    <main>
      <div className="section-title">
        <h1> {loading ? "Loading..." : "Pagination"}</h1>
        <div className="underline"></div>
        <div className="followers">
          <div className="container">
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />;
            })}
          </div>

          {!loading && (
            <div className="btn-container">
              <button className="prev-btn" onClick={prePage}>
                Prev
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    className={`page-btn ${
                      index === page ? "active-btn" : null
                    } `}
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {`${index + 1}`}
                  </button>
                );
              })}
              <button className="next-btn" onClick={nextPage}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;

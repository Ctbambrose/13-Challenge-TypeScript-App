import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from "../interfaces/Candidate.interface.js";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState <Candidate |null>(null);
    const [isLoading, setIsLoading] = useState(true);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const fetchNextCandidate = async () => {
    setIsLoading(true);
    try {
      const candidates = await searchGithub();
      if (!candidates.length) {
        setNoMoreCandidates(true);
        return;
      }

      // Pick the first candidate and get detailed info
      const fullProfile = await searchGithubUser(candidates[0].login);
      setCurrentCandidate(fullProfile);
    } catch (error) {
      console.error("Failed to fetch candidate:", error);
      setNoMoreCandidates(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCandidate = () => {
    if (!currentCandidate) return;

    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    saved.push(currentCandidate);
    localStorage.setItem("savedCandidates", JSON.stringify(saved));

    fetchNextCandidate();
  };

  const handleSkipCandidate = () => {
    fetchNextCandidate();
  };

  if (isLoading) {
    return <p>Loading candidate...</p>;
  }

  if (noMoreCandidates) {
    return <p>No additional candidates available</p>;
  }

  return (
    <article>
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <section>
          <img className='avatar' src={currentCandidate.avatar_url} alt={currentCandidate.name}/>
          <h2>{currentCandidate.name || "Name not Provided"}</h2>
          <p>
            <strong>Username:</strong> {currentCandidate.login}
          </p>
          <p>
            <strong>Location:</strong> {currentCandidate.location || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {currentCandidate.email || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {currentCandidate.company || "N/A"}
          </p>
          <p>
            <strong>Profile:</strong>{" "}
            <a
              href={currentCandidate.html_url}
              target="_blank"
              rel="noreferrer"
            >
              GitHub Profile
            </a>
          </p>
          <div className='add-button'>
          <button onClick={handleSaveCandidate}>&#65291;</button>
          <button onClick={handleSkipCandidate}>&#x002D;</button>
          </div>
        </section>
      )}
    </article>
  )
};

export default CandidateSearch;

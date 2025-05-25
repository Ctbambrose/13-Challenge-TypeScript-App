import { useEffect, useState } from 'react';
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates</p>
      ) : (
        savedCandidates.map((candidate) => (
          <table key={candidate.id}>
            <tbody >
              <tr >
                <td><img className="potential-avatar" src={candidate.avatar_url} alt={candidate.name} /></td>
                <td><strong>{candidate.name || 'No Name Provided'}</strong></td>
                <td><strong>Username:</strong> {candidate.login}</td>
                <td><p><strong>Location:</strong> {candidate.location || 'N/A'}</p></td>
                <td><p><strong>Email:</strong> {candidate.email || 'N/A'}</p></td>
                <td><p><strong>Company:</strong> {candidate.company || 'N/A'}</p></td>
                <td><p><strong>Profile:</strong> <a href={candidate.html_url} target="_blank" rel="noreferrer">GitHub Profile</a></p></td>
              </tr>
            </tbody>
          </table>
        ))
      )}
    </section>
  );
};

export default SavedCandidates;

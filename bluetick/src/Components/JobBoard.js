import React, { useState, useEffect } from 'react';
import JobPosting from './JobPosting';

const JobBoard = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobPostings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/jobstories.json`);
      const jobIds = await response.json();
      
      const startIndex = (pageNumber - 1) * 6;
      const endIndex = startIndex + 6;
      const jobsToFetch = jobIds.slice(startIndex, endIndex);
      
      const jobPromises = jobsToFetch.map(async (jobId) => {
        const jobResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
        return jobResponse.json();
      });
      
      const jobs = await Promise.all(jobPromises);
      setJobPostings(jobs);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePostings = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    fetchJobPostings();
  }, [pageNumber]);

  return (
    <div className="job-board">
      <h1 style={{display:"flex", justifyContent:"center"}} >< strong style={{color:"blue"}}>Job</strong>Board</h1>
      {jobPostings.map((job) => (
        <JobPosting key={job.id} job={job} />
      ))}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={loadMorePostings}>Load More</button>
      )}
    </div>
  );
};

export default JobBoard;

import React from 'react';

const JobPosting = ({ job }) => {
  return (
    <div className="job-posting">
      <h2>{job.title}</h2>
      <p>Posted by {job.by} on {new Date(job.time * 1000).toLocaleDateString()}</p>
      {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer">Details</a>}
    </div>
  );
};

export default JobPosting;

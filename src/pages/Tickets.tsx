import { useEffect, useState } from 'react';
import axios from 'axios';

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  department: string;
  reportedby: string;
  assignedto: string;
  attachments: string;
  tags: string;
  comments: string;
}

const Tickets = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://api.solveitsl.site:3000/api/issueService/issues');
        setIssues(response.data);
      } catch (error) {
        setError('Failed to fetch issues');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {issues.map((issue) => (
        <div key={issue._id} className="p-4 bg-white rounded shadow-md">
          <h3 className="mb-2 text-xl font-bold">{issue.title}</h3>
          <p className="mb-4 text-gray-700">{issue.description}</p>
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 rounded ${getStatusColor(issue.status)}`}>{issue.status}</span>
            <span className={`px-2 py-1 rounded ${getPriorityColor(issue.priority)}`}>{issue.priority}</span>
          </div>
          <p className="mb-2 text-gray-500">Type: {issue.type}</p>
          <p className="mb-2 text-gray-500">Department: {issue.department}</p>
          <p className="mb-2 text-gray-500">Reported By: {issue.reportedby}</p>
          <p className="mb-2 text-gray-500">Assigned To: {issue.assignedto}</p>
          <p className="mb-2 text-gray-500">Tags: {issue.tags}</p>
          <p className="mb-2 text-gray-500">Comments: {issue.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
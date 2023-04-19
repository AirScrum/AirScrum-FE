// Contains all HTTP requests promises and async functions
import axios from "axios";
export const fetchMeetings = async (token) => {
  const uri = process.env.REACT_APP_KIA;
  const data = await axios.get(`${uri}/history`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const fetchUserStories = async (token, meetingID) => {
  const uri = process.env.REACT_APP_KIA;
  const data = await axios.get(`${uri}/history/${meetingID}`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const deleteMeeting = async (token, meetingID) => {
  const uri = process.env.REACT_APP_KIA;
  const response = await axios.delete(`${uri}/history/${meetingID}`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const updateUserStory = async (token, userStoryID, data) => {
  const uri = process.env.REACT_APP_KIA;
  console.log(`token`, token);
  const response = await axios.put(`${uri}/userstories/${userStoryID}`, data, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
export const deleteUserStory = async (token, userStoryID) => {
  const uri = process.env.REACT_APP_KIA;
  console.log(`token`, token);
  const response = await axios.delete(`${uri}/userstories/${userStoryID}`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

import API, {getAuthToken} from './api';

export const fetchAllQuestions = async () => {
  try {
    const response = await API.get('question/all');
    return response.data.questions;  
  } catch (error) {
    throw error;
  }
};

export const fetchUserQuestions = async () => {
  try {
    const token = getAuthToken();
    const response = await API.get('question', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.questions;
  } catch (error) {
    throw error;
  }
};

export const addQuestion = async (questionData: { question: string; answer: string }) => {
  try {
    const authToken = getAuthToken();
    const response = await API.post('question', questionData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.question;
  } catch (error) {
    throw error;
  }
};

export const createQuestion = (questionData: { question: string; answer: string }) => {
  return API.post('question', questionData);
};

export const updateQuestion = (id: number, question: string) => {
  const token = getAuthToken();
  return API.put(`question/${id}`, { question } , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteQuestion = (id: number) => {
  const token = getAuthToken();
  return API.delete(`question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


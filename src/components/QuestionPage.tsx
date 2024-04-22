import React, { useEffect, useState } from 'react';
import { fetchAllQuestions, fetchUserQuestions, addQuestion, updateQuestion, deleteQuestion } from '../services/QuestionService';
import { getAuthToken } from '../services/api';

const QuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [userQuestions, setUserQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [renderQuestions, setRenderQuestions] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const token = await getAuthToken();
        if (isMounted) {
          setAuthToken(token);
        }

        const allQuestions = await fetchAllQuestions();
        const userSpecificQuestions = await fetchUserQuestions();
        if (isMounted) {
          setQuestions(allQuestions);
          setUserQuestions(userSpecificQuestions);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [renderQuestions]);

  const handleAddQuestion = async () => {
    if (newQuestion.trim() && authToken) {
      try {
        const question = await addQuestion(
          { question: newQuestion, answer: "" },
        );
        console.log('Add Successful:', question);
        setRenderQuestions(!renderQuestions);
        setNewQuestion("");
      } catch (err: any) {
        setError(err.message || "An error occurred while adding the question.");
      }
    }
  };

  const handleUpdateQuestion = async (
    questionId: number,
    updatedQuestion: string
  ) => {
      try {
        const updatedQuestionData = await updateQuestion(
          questionId,
          updatedQuestion
        );
        console.log('Update Successful:', updatedQuestionData);
        setRenderQuestions(!renderQuestions);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while updating the question."
        );
      }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (authToken) {
      try {
        await deleteQuestion(questionId);
        setRenderQuestions(!renderQuestions);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while deleting the question."
        );
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>All Questions</h2>
      {questions.length > 0 ? (
        <ul>
          {questions.map(question => (
            <li key={question.id}>{question.question}</li>
          ))}
        </ul>
      ) : (
        <p>No questions found.</p>
      )}

      <h2>Your Questions</h2>
      {userQuestions.length > 0 ? (
        <ul>
          {userQuestions.map(question => (
            <li key={question.id}>
              {question.question}
              <button
                onClick={() => {
                  const updatedQuestion = prompt("Enter the updated question");
                  if (updatedQuestion !== null) {
                    handleUpdateQuestion(question.id, updatedQuestion);
                  }
                }}
              >
                Update
              </button>

              <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user-specific questions found.</p>
      )}

      <div>
        <input type="text" value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="Enter a new question" />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
    </div>
  );
};

export default QuestionPage;
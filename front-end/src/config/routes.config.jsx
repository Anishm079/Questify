import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://questify-nodejs-backend.onrender.com",
  withCredentials: true,
});

export const axiosAuthInstance = axios.create({
  baseURL: "https://questify-nodejs-backend.onrender.com",
  withCredentials: true,
  headers: {
    "content-Type": "application/json",
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("questify-log-isauth-T");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }
});

axiosAuthInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refreshToken();
      localStorage.setItem("questify-log-isauth-T",newAccessToken.token)
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken.token}`;
        return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);

//Auth based Queries

export const login = async ({ email, password }) => {
  const response = await axiosAuthInstance.post("/api/auth/v4/user/login", {
    email: email,
    password: password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axiosAuthInstance.post("/api/auth/v4/user/logout");
  return response.data;
};

export const register = async (data) => {
  const response = await axiosAuthInstance.post(
    "/api/auth/v4/user/register",
    data
  );
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosAuthInstance.get("/api/auth/v4/refresh_jwt");
  return response.data;
};

export const setAvatar = async (data) => {
  const response = await axiosInstance.post("/api/auth/v4/set_avatar", data);
  return response.data;

};

export const getUserData=async () =>{
  const response = await axiosInstance.get("/api/auth/v4/user/details");
  return response.data;
}

//Questions based Queries

export const getAllQuestions = async ({ limit, page }) => {
  const response = await axiosInstance.get(
    `/api/question/all_question?limit=${limit}&page=${page}`
  );
  return response.data;
};

export const addQuestion = async (data) => {
  const response = await axiosInstance.post("/api/question/add_question", data);
  return response.data;
};

export const upvoteQuestion = async ({ question_id }) => {
  const response = await axiosInstance.put(
    `/api/question/${question_id}/upvote`
  );
  return response.data;
};

export const downvoteQuestion = async ({ question_id }) => {
  const response = await axiosInstance.put(
    `/api/question/${question_id}/downvote`
  );
  return response.data;
};

export const myQuestions = async () => {
  const response = await axiosInstance.get("/api/question/my_questions");
  return response.data;
};

export const recommendedQuestions = async ({ question }) => {
  const response = await axiosInstance.get(`/api/question/${question}`);
  return response.data;
};

//Answer based Queries

export const addAnswer = async ({ question_id, answer }) => {
  const response =await axiosInstance.post(`/api/answer/${question_id}/add_answer`, {
    answer,
  });
  return response.data;
};

export const myAnswer = async () => {
  const response =await axiosInstance.get(`/api/answer/my_answers`);
  return response.data;
};

export const upvoteAnswer = async ({ answer_id }) => {
  const response =await axiosInstance.put(`/api/answer/${answer_id}/upvote`);
  return response.data;
};

export const downvoteAnswer = async ({ answer_id }) => {
  const response =await axiosInstance.put(`/api/answer/${answer_id}/downvote`);
  return response.data;
};

//Query based Queries

export const singleQuery = async ({ question_id }) => {
  const response = await axiosInstance.get(`/api/all_queries/${question_id}`);
  return response.data;
};

export const pageQueries = async ({ page, limit }) => {
  const response = await axiosInstance.get(
    `/api/all_queries/getPageQueries?limit=${limit}&page=${page}`
  );
  return response.data;
};

export const searchQuery = async ({ search }) => {
  const response = await axiosInstance.get(
    `/api/all_queries/search?q=${search}`
  );
  return response.data;
};

//user
export const follow=async ({user})=>{
  const response = await axiosInstance.put(`/user/follow/${user}`)
  return response.data;
}

export const followers = async () =>{
  const response = await axiosInstance.get(`/user/get_followers`);
  return response.data;
}

export const followings = async () =>{
  const response = await axiosInstance.get(`/user/get_following`);
  return response.data;
}
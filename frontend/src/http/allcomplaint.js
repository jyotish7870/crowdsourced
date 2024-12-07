import service from "./service";

export const getAllComplaints = async () => {
  try {
    const response = await service.get("/issues/allIssues", {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// export const createComplaint = async (data) => {
//   try {
//     const response = await service.post("/complaints", data);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const getComplaint = async (id) => {
//   try {
//     const response = await service.get(`/complaints/${id}`);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const updateComplaint = async (id, data) => {
//   try {
//     const response = await service.put(`/complaints/${id}`, data);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const deleteComplaint = async (id) => {
//   try {
//     const response = await service.delete(`/complaints/${id}`);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const upvoteComplaint = async (id) => {
//   try {
//     const response = await service.put(`/complaints/upvote/${id}`);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const downvoteComplaint = async (id) => {
//   try {
//     const response = await service.put(`/complaints/downvote/${id}`);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const openComplaint = async () => {
//   try {
//     const response = await service.get("/complaints/open");
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const closedComplaint = async () => {
//   try {
//     const response = await service.get("/complaints/closed");
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const resolvedComplaint = async () => {
//   try {
//     const response = await service.get("/complaints/resolved");
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const createComment = async (id, data) => {
//   try {
//     const response = await service.post(`/complaints/${id}/comments`, data);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const deleteComment = async (id, commentId) => {
//   try {
//     const response = await service.delete(
//       `/complaints/${id}/comments/${commentId}`
//     );
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

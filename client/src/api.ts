import axios from "axios";
import { IUser } from "./interfaces/user.interface";
import { INote } from "./interfaces/note.interface";
import { ITag } from "./interfaces/tag.interface";
import { IFolder } from "./interfaces/folder.interface";

const baseURL = "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface IAuthData {
  username: string;
  password: string;
}

interface IAuthResponse {
  access_token: string;
}

interface IApi {
  login: (data: IAuthData) => Promise<IAuthResponse>;
  register: (data: IAuthData) => Promise<IAuthResponse>;
  getUser: () => Promise<IUser>;
  createFolder: (title: string) => Promise<IFolder>;
  moveToFolder: (folderId: string, noteId: string) => Promise<INote>;
  getNotesNotInFolder: () => Promise<INote[]>;
  getNotesInFolder: (folderId: string) => Promise<INote[]>;
  createNote: (noteData: Partial<INote>) => Promise<INote>;
  editNote: (noteId: string, noteData: Partial<INote>) => Promise<INote>;
  getTags: () => Promise<ITag[]>;
  createTag: (text: string) => Promise<ITag>;
  assignTag: (tagId: string, noteId: string) => Promise<void>;
  removeTag: (tagId: string, noteId: string) => Promise<void>;
}

const api: IApi = {
  async login({ username, password }) {
    const { data } = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    return data;
  },
  async register({ username, password }) {
    const { data } = await axiosInstance.post("/auth/register", {
      username,
      password,
    });

    return data;
  },
  async getUser() {
    const { data } = await axiosInstance.get("/auth/me");

    return data;
  },

  async getNotesNotInFolder() {
    const { data } = await axiosInstance.get("/notes/");

    return data;
  },

  async getNotesInFolder(folderId: string) {
    const { data } = await axiosInstance.get(`/notes/folder/${folderId}`);

    return data;
  },

  async createNote(noteData) {
    const { data } = await axiosInstance.post("/notes/create", noteData);

    return data;
  },

  async editNote(id, noteData) {
    const { data } = await axiosInstance.patch(`/notes/edit/${id}`, noteData);

    return data;
  },

  async createFolder(folderData) {
    const { data } = await axiosInstance.post("/folders/create", folderData);

    return data;
  },

  async getTags() {
    const { data } = await axiosInstance.get(`/tags`);

    return data;
  },

  async createTag(tagData) {
    const { data } = await axiosInstance.post("/tags/create", tagData);

    return data;
  },

  async assignTag(tagId: string, noteId: string) {
    const { data } = await axiosInstance.put(
      `/notes/${noteId}/assign-tag/${tagId}`
    );

    return data;
  },

  async removeTag(tagId: string, noteId: string) {
    const { data } = await axiosInstance.delete(
      `/notes/${noteId}/remove-tag/${tagId}`
    );

    return data;
  },

  async moveToFolder(folderId: string, noteId: string) {
    const { data } = await axiosInstance.put(
      `/notes/${noteId}/move-to-folder/${folderId}`
    );

    return data;
  },
};

export default api;

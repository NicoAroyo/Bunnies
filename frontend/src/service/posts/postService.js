import { API_URL } from "../../utils/constants";
import { BlobService } from "./blobService";

export class PostService {
  #blobService = new BlobService();
  async uploadPost(post) {
    const url = await this.#blobService.uploadFiles(post.files[0]);
    post.imageUrl = url;
    delete post.files;
    return fetch(`${API_URL}posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async getPosts() {
    return fetch(`${API_URL}posts`).then(this.#success).catch(this.#failure);
  }

  async #success(response) {
    const data = await response.json();
    return data;
  }

  #failure(response) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}

import { API_URL } from "../../utils/constants";


export class RelationshipsService {

  async deleteAsync(id) {
    return fetch(`${API_URL}relationships/${id}`, {
      method: "DELETE",
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async postAsync(item) {
    return fetch(`${API_URL}relationships`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async getFriends(userId) {
    return fetch(`${API_URL}relationships/getFriends/${userId}`).then(this.#success).catch(this.#failure);
  }

  async getBlocked(userId) {
    return fetch(`${API_URL}relationships/getBlocked/${userId}`).then(this.#success).catch(this.#failure);
  }

  async getRequests(userId){
    return fetch(`${API_URL}relationships/getRequested/${userId}`).then(this.#success).catch(this.#failure);
  }

  async patchAsync(item, userId) {
    return fetch(`${API_URL}relationships/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.#success)
      .catch(this.#failure);
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
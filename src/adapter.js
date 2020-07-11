class APIAdapter {

  constructor(baseURL, defaultHeader) {
    this.baseURL = baseURL
    this.defaultHeader = defaultHeader
  }

  getAllDogs() {
    return fetch(this.baseURL).then(resp => resp.json())
  }

  updateDog(dogId, updateDog) {
    return fetch(`${this.baseURL}/${dogId}`, {
        method: "PATCH",
        headers: this.defaultHeader,
        body: JSON.stringify(updateDog)
      })
      .then(resp => resp.json())  
  }

  createDog(newDogObj) {
    return fetch(this.baseURL, {
        method: "POST",
        headers: this.defaultHeader,
        body: JSON.stringify(newDogObj)
      })
      .then(resp => resp.json())  
  }

  deleteDog(dogId) {
    return fetch(`${this.baseURL}/${dogId}`, {
      method: "DELETE"
    })
  }
}

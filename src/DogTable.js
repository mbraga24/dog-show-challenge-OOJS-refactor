class DogTable {
  constructor(dog, parentElement) {
    this.dog = dog
    this.parentElement = parentElement
  }

  populateForm(dog) {
    updatedDogForm.name.value = dog.name
    updatedDogForm.breed.value = dog.breed
    updatedDogForm.sex.value = dog.sex
  
    // give the form information about which dog we're editing
    updatedDogForm.dataset.id = dog.id
  }

  handleDelete = (event) => {
    adapter.deleteDog(this.dog.id)
    this.dogRow.remove()
  }

  handleUpdate = (event) => {
    this.populateForm(this.dog)
    
    new ControlledForm(updatedDogForm, {
      onSubmit: (formData) => {
        console.log(formData)
        adapter.updateDog(this.dog.id, formData)
        .then(updatedDog => {
            const existingDog = this.parentElement.querySelector(`[data-id="${this.dog.id}"]`)
            existingDog.children.name.textContent = updatedDog.name
            existingDog.children.breed.textContent = updatedDog.breed
            existingDog.children.sex.textContent = updatedDog.sex
          })
      }
    })
  }

  renderDog() {
    this.dogRow = document.createElement('tr')
    this.dogRow.dataset.id = this.dog.id
    this.dogRow.innerHTML = ` 
      <td name="name">${this.dog.name}</td> 
      <td name="breed">${this.dog.breed}</td> 
      <td name="sex">${this.dog.sex}</td> 
      <td>
        <button id="update-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      </td>`

    const deleteBtn = this.dogRow.querySelector('#delete-btn')
    deleteBtn.addEventListener('click', this.handleDelete)

    const updateBtn = this.dogRow.querySelector('#update-btn')
    updateBtn.addEventListener('click', this.handleUpdate)
  
    tableBody.append(this.dogRow)
  }
}
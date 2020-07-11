const adapter = new APIAdapter("http://localhost:3000/dogs", {
  "Content-Type": "application/json",
  Accept: "application/json"
})

// DOM elements
const tableBody = document.querySelector('#table-body')
const updatedDogForm = document.querySelector('#update-dog-form')
const createDogForm = document.querySelector('#create-dog-form')

new ControlledForm(createDogForm, {
  onSubmit: (formData) => {
    adapter.createDog(formData)
    .then(newDog => {
      const dogTable = new DogTable(newDog, tableBody) 
      dogTable.renderDog()
    })
  }
})

function renderAllDogs(dogs) {
  dogs.forEach(dog => {
    const dogTable = new DogTable(dog, tableBody) 
    dogTable.renderDog()
  })
}

// Initial Fetch & Render
adapter.getAllDogs().then(renderAllDogs)
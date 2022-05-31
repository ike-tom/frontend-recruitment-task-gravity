import { url } from "./const.js"
import { FETCH_DATA_ERROR_MESSAGE } from "./const.js"
import { clearTableBody } from "./utils/clearTableBody.js"
import { createErrorMessage } from "./utils/createErrorMessage.js"
import { removeClassHandler } from "./utils/removeClassHandler.js"
import { saveNumberOfClicks } from "./utils/saveNumberOfClicks.js"

const openModalButton = document.querySelector(".open-modal-button")
const modal = document.querySelector(".dialog")
const resetClicksButton = document.querySelector(".reset-clicks-button")
const clicksCounter = document.querySelector(".number-of-clicks")
const closeIcon = document.querySelector(".fa-times")
const loader = document.querySelector(".loader")
const overlay = document.querySelector(".overlay")

let numberOfClicks = 0
let isLoading = true

const setIsLoading = (state) => {
  isLoading = state
  if (isLoading) {
    loader.style.display = "inline-block"
    openModalButton.disabled = true
  } else {
    loader.style.display = "none"
  }
}

const clearErrorMessage = () => {
  const errorMessage = document.querySelector(".error-message")
  if (errorMessage) errorMessage.remove()
}

const getNumberOfClicks = () => {
  const numberOfClicksString = localStorage.getItem("numberOfClicks")
  if (numberOfClicksString) {
    numberOfClicks = parseInt(numberOfClicksString)
  } else numberOfClicks = 0
}

const updateNumberOfClicks = (numberOfClicks) => {
  if (numberOfClicks === 1) clicksCounter.innerHTML = `${numberOfClicks} time`
  else clicksCounter.innerHTML = `${numberOfClicks} times`
}

async function fetchUsers() {
  try {
    setIsLoading(true)
    const response = await fetch(url)
    if (!response.ok) throw new Error(FETCH_DATA_ERROR_MESSAGE)
    const users = await response.json()
    createTableBody(users)
  } catch (error) {
    const dialogContainer = document.querySelector(".dialog__container")
    dialogContainer.appendChild(createErrorMessage(error.message))
  } finally {
    setIsLoading(false)
  }
}

const createTableBody = (arr) => {
  const tableBody = document.querySelector(".tableBody")
  clearTableBody()
  arr.map((user) => {
    const tableRowElement = document.createElement("tr")
    const number = document.createElement("td")
    const name = document.createElement("td")
    const email = document.createElement("td")
    const address = document.createElement("td")
    const phoneNumber = document.createElement("td")
    const company = document.createElement("td")

    number.innerText = user.id
    name.innerText = user.name
    email.innerText = user.email
    address.innerText = `${user.address.suite}, ${user.address.street}, ${user.address.city}`
    phoneNumber.innerText = user.phone
    company.innerText = user.company.name

    number.style.fontWeight = "700"

    tableRowElement.append(number, name, email, address, phoneNumber, company)
    tableBody.appendChild(tableRowElement)
  })
  return tableBody
}

const openModal = () => {
  addClassHandler(modal, "visible")
  addClassHandler(overlay, "active")
}
const closeModal = () => {
  removeClassHandler(modal, "visible")
  removeClassHandler(overlay, "active")
}

const addClassHandler = (element, classToHandle) => {
  element.classList.add(classToHandle)
}

const resetClicks = () => {
  numberOfClicks = 0
}

const addClick = () => {
  numberOfClicks = ++numberOfClicks
  if (numberOfClicks > 5) showResetClickButton()
}

const showResetClickButton = () => {
  resetClicksButton.style.display = "block"
}

const setIsClickOutsideModal = (event) => {
  const modal = document.querySelector(".dialog")
  if (modal) {
    const modalBoundaries = modal.getBoundingClientRect()
    const clickX = event.clientX
    const clickY = event.clientY
    return (
      clickX < modalBoundaries.left ||
      clickX > modalBoundaries.right ||
      clickY < modalBoundaries.top ||
      clickY > modalBoundaries.bottom
    )
  } else return false
}
openModalButton.addEventListener("click", (event) => {
  getNumberOfClicks()
  addClick()
  saveNumberOfClicks(numberOfClicks)
  updateNumberOfClicks(numberOfClicks)
  openModal()
  fetchUsers()
  event.stopPropagation()
})
resetClicksButton.addEventListener("click", () => {
  resetClicks()
  saveNumberOfClicks(numberOfClicks)
  resetClicksButton.style.display = "none"
  closeModal()
  clearTableBody()
  openModalButton.disabled = false
  clearErrorMessage()
})

closeIcon.addEventListener("click", () => {
  closeModal()
  clearTableBody()
  openModalButton.disabled = false
  clearErrorMessage()
})

document.addEventListener("click", (event) => {
  if (setIsClickOutsideModal(event)) {
    closeModal()
    clearTableBody()
    openModalButton.disabled = false
    clearErrorMessage()
  }
})

export const createErrorMessage = (message) => {
  const errorMessage = document.createElement("div")
  errorMessage.classList.add("error-message")
  errorMessage.innerHTML = message
  return errorMessage
}

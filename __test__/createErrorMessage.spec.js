/**
 * @jest-environment jsdom
 */

import { createErrorMessage } from "../src/js/utils/createErrorMessage.js"

test("createErrorMessage should create error message", () => {
  document.body.innerHTML = `
        <div >        
        </div>
    `

  const errorMessage = createErrorMessage("Error message")

  expect(errorMessage.innerHTML).toBe("Error message")
})

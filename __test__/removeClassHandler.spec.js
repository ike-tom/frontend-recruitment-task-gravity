/**
 * @jest-environment jsdom
 */

import { removeClassHandler } from "../src/js/utils/removeClassHandler"

test("removeClassHandler should remove class from element", () => {
  const element = document.createElement("div")
  const classToHandle = "visible"
  element.classList.add(classToHandle)
  removeClassHandler(element, classToHandle)
  expect(element.classList.contains(classToHandle)).toBe(false)
})

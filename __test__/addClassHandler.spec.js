/**
 * @jest-environment jsdom
 */

import { addClassHandler } from "../src/js/utils/addClassHandler"

test("addClassHandler should add class to element", () => {
  const element = document.createElement("div")
  const classToHandle = "visible"
  addClassHandler(element, classToHandle)
  expect(element.classList.contains(classToHandle)).toBe(true)
})

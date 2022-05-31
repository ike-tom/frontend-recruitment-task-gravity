/**
 * @jest-environment jsdom
 */

import { saveNumberOfClicks } from "../src/js/utils/saveNumberOfClicks"

test("saveNumberOfClicks should save number of clicks", () => {
  const numberOfClicks = 1
  saveNumberOfClicks(numberOfClicks)
  expect(localStorage.getItem("numberOfClicks")).toBe("1")
})

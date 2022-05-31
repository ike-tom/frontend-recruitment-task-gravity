/**
 * @jest-environment jsdom
 */

import { clearTableBody } from "../src/js/utils/clearTableBody.js"
test("clearTableBody", () => {
  document.body.innerHTML = `
    <table>
      <tbody class="tableBody">
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
        <tr>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
  `
  const tableBody = document.querySelector(".tableBody")
  clearTableBody()
  expect(tableBody.innerHTML).toBe("")
})

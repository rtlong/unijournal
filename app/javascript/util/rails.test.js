import { csrfToken } from "./rails"

describe(csrfToken, () => {
  test('it returns the <meta name="csrf-token"> that Rails adds to the document', () => {
    const value = "some-secret-token-123"
    const meta = global.document.createElement("meta")
    meta.setAttribute("name", "csrf-token")
    meta.setAttribute("content", value)
    global.document.head.appendChild(meta)

    expect(csrfToken()).toBe(value)
  })
})

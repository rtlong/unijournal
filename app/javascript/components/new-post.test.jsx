import expect from "expect"
import React from "react"
import { shallow, mount } from "enzyme"

import { jsdomInit } from "../../../test-helper"
import NewPost from "./new-post"

function buildComponentProps(opts) {
  return Object.assign(
    {
      expanded: false,
      source: "",
      onSubmit: jest.fn(),
      onOpen: jest.fn(),
      onCancel: jest.fn(),
      onChange: jest.fn(),
    },
    opts,
  )
}

describe("components/NewPost", () => {
  describe("[expanded=false]", () => {
    const props = buildComponentProps({ expanded: false })

    test("is a button which when clicked fires @onOpen", () => {
      const component = shallow(<NewPost {...props} />)
      expect(component.is("Button")).toBeTruthy()
      expect(component.prop("onClick")).toBe(props.onOpen)
    })
  })

  describe("[expanded=true]", () => {
    const source = "Foo"
    const props = buildComponentProps({
      expanded: true,
      source,
    })

    jsdomInit()
    const component = mount(<NewPost {...props} />)

    test("has a <Button> to close the form", () => {
      const button = component.find("Button")
      expect(button.length).toBe(1)
      expect(button.prop("onClick")).toBe(props.onCancel)
    })

    test("has a <textarea> for post body input", () => {
      const textarea = component.find("textarea")
      expect(textarea.length).toBe(1)
      expect(textarea.prop("value")).toBe(source)
    })

    test("has a <Markdown> to render @source as post will be displayed", () => {
      const markdown = component.find("ReactMarkdown")
      expect(markdown.length).toBe(1)
      expect(markdown.prop("source")).toBe(source)
    })

    test("<textarea> onchange triggers @onChange with new contents", () => {
      const textarea = component.find("textarea")
      const newTextareaValue = "Bar"

      expect(props.onChange).toHaveBeenCalledTimes(0)
      textarea.getDOMNode().value = newTextareaValue
      textarea.simulate("change")
      expect(props.onChange).toHaveBeenCalledTimes(1)
      expect(props.onChange).toHaveBeenCalledWith(newTextareaValue)
    })

    test("form submit triggers @onSubmit", () => {
      const form = component.find("form")
      const evt = {
        preventDefault: jest.fn(),
      }

      expect(props.onSubmit).toHaveBeenCalledTimes(0)
      form.simulate("submit", evt)
      expect(props.onSubmit).toHaveBeenCalledTimes(1)
      expect(evt.preventDefault).toHaveBeenCalledTimes(1)
    })
  })
})

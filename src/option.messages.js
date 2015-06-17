import postcssMessagesConsole from "postcss-log-warnings"
// https://github.com/postcss/postcss-messages/issues/16
// import postcssMessagesCSS from "postcss-messages"
import postcssMessagesCSS from "./plugins/messages"
import postcssMessageCSSstyles from "./messages.browser.js"

// hacking plugins
postcssMessagesConsole.postcssPlugin = "cssnext"
postcssMessagesCSS.postcssPlugin = "cssnext"

export default (options) => {
    // true === all interfaces
  if (options.messages === true) {
    return [
      postcssMessagesCSS({styles: postcssMessageCSSstyles}),
      postcssMessagesConsole,
    ]
  }

  // object: only the one you want
  if (typeof options.messages === "object") {
    return [
      ...options.messages.browser
      ? [
        postcssMessagesCSS({
          styles: postcssMessageCSSstyles,
          ...(
            typeof options.messages.browser === "object"
            ? options.messages.browser
            : {}
          ),
        }),
      ]
      : [],
      ...options.messages.console
      ? [
        postcssMessagesConsole({
          ...(
            typeof options.messages.console === "object"
            ? options.messages.console
            : {}
          ),
        }),
      ]
      : [],
    ]
  }

  // otherwise nothing :)
  return []
}

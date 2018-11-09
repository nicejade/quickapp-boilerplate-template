/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file at
 * https://github.com/facebookincubator/create-react-app/blob/master/LICENSE
 */
exports.prepareUrls = function(protocol, host, port) {
  const url = require('url')
  const chalk = require('chalk')
  const address = require('address')

  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '/'
    })
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname: '/'
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'
  let prettyHost, lanUrlForConfig, lanUrlForTerminal
  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip()
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrlForConfig)) {
          // Address is private, format it for later use
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost)
  const localUrlForBrowser = formatUrl(prettyHost)
  const lanUrlForBrowser = formatUrl(lanUrlForConfig)

  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    lanUrlForBrowser,
    localUrlForTerminal,
    localUrlForBrowser
  }
}

exports.startBrowserProcess = url => {
  const opn = require('opn')
  const chalk = require('chalk')
  const OSX_CHROME = 'google chrome'
  const browser = process.env.BROWSER

  // If we're on OS X, the user hasn't specifically
  // requested a different browser, we can try opening
  // Chrome with AppleScript. This lets us reuse an
  // existing tab when possible instead of creating a new one.
  const shouldTryOpenChromeWithAppleScript =
    process.platform === 'darwin' && (typeof browser !== 'string' || browser === OSX_CHROME)

  if (shouldTryOpenChromeWithAppleScript) {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      const execSync = require('child_process').execSync
      execSync('ps cax | grep "Google Chrome"')
      execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
        cwd: __dirname,
        stdio: 'ignore'
      })
      return true
    } catch (err) {
      console.log(`${chalk.red('✘')} Opps, Something Error：\n`, err)
    }
  }

  // Another special case: on OS X, check if BROWSER has been set to "open".
  // In this case, instead of passing `open` to `opn` (which won't work),
  // just ignore it (thus ensuring the intended behavior, i.e. opening the system browser):
  // https://github.com/facebookincubator/create-react-app/pull/1690#issuecomment-283518768
  if (process.platform === 'darwin' && browser === 'open') {
    browser = undefined
  }

  // Fallback to opn
  // (It will always open new tab)
  try {
    const options = { app: browser }
    opn(url, options).catch(() => {}) // Prevent `unhandledRejection` error.
    return true
  } catch (err) {
    return false
  }
}

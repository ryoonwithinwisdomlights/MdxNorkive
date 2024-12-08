/**

* Intercept the language prefix of page-id
 * The format of notionPageId can be en:xxxxx
 * @param {*} str
 * @returns en|kr|xx
 */
function extractLangPrefix(str) {
  const match = str.match(/^(.+?):/);
  if (match && match[1]) {
    return match[1];
  } else {
    return "";
  }
}

/**

* Intercept the id of page-id
 * The format of notionPageId can be en:xxxxx   * @param {*} str
 * @returns xxxxx
 */
function extractLangId(str) {
  // If the match is successful, return the matched content
  const match = str.match(/:\s*(.+)/);
  // If the match is successful, return the matched content
  if (match && match[1]) {
    return match[1];
  } else {
    // If there is no match, return an empty string or other value you want to return.
    return str;
  }
}

/**
 * To distinguish pages in the list, only the end ID is enough.
 */

function getShortId(uuid) {
  if (!uuid || uuid.indexOf("-") < 0) {
    return uuid;
  }
  // Find the position of the first '-'
  const index = uuid.indexOf("-");
  //Extract the part from the beginning to before the first '-'
  return uuid.substring(0, index);
}

module.exports = { extractLangPrefix, extractLangId, getShortId };

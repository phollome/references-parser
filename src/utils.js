/**
 * Parse passed reference
 * @param {string} reference
 * @returns {{author: string, title: string, publisher: string, href: string|null}|null}
 */
export function parseReference(reference) {
  const author = reference.slice(0, reference.indexOf(":")); // [Author]: Title. Publisher.
  const {
    publisher = reference
      .slice(0, reference.lastIndexOf(".")) // [Author: Title. Publisher].
      .split(".") // ["Author: Title", " Publisher"]
      .pop() // " Publisher"
      .trimStart(), //" [Publisher]"
    href,
  } = parseLink(reference);

  const title = reference.slice(
    author.length + 2,
    reference.indexOf(href || publisher) - 2
  ); // Author. [Title]. Publisher. || Author. [Title]. http://website.com/article.
  return { author, publisher, title, href };
}

/**
 * Parse link
 * @param {string} reference
 * @returns {{publisher: string, href: string}|{href: null}}
 */
function parseLink(reference) {
  const urlIndex = reference.indexOf("http");
  if (urlIndex > -1) {
    const url = new URL(reference.slice(urlIndex)); // Author. Title. [http://website.com/article.]
    const publisher = url.hostname; // http://[website.com]/article.
    const href = reference.slice(urlIndex, -1); // [http://website.com/article].
    return { publisher, href };
  } else {
    return { href: null };
  }
}

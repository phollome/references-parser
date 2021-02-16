const { parseReference, isReferenceResultValid } = require("../utils");

test("parses book reference", () => {
  const validReference =
    "Name of the author: Title of the book. Name of the publisher.";
  const parsedReference = parseReference(validReference);
  expect(parsedReference).toMatchObject({
    author: "Name of the author",
    title: "Title of the book",
    publisher: "Name of the publisher",
    href: null,
  });
});

test("parses online reference", () => {
  const validReference =
    "Name of the author: Title of the article. https://website.com/article.";
  const parsedReference = parseReference(validReference);
  expect(parsedReference).toMatchObject({
    author: "Name of the author",
    title: "Title of the article",
    publisher: "website.com",
    href: "https://website.com/article",
  });
});

test("ignore url parsing error while typing", () => {
  const validReference = "Name of the author: Title of the article. https:";
  const parsedReference = parseReference(validReference);
  expect(parsedReference.href).toBeNull();
});

test("validate result", () => {
  const validBookReference =
    "Name of the author: Title of the book. Name of the publisher.";
  const parsedBookReference = {
    author: "Name of the author",
    title: "Title of the book",
    publisher: "Name of the publisher",
    href: null,
  };
  expect(isReferenceResultValid(validBookReference, parsedBookReference)).toBe(
    true
  );

  const validOnlineReference =
    "Name of the author: Title of the article. https://website.com/article.";
  const parsedOnlineReference = {
    author: "Name of the author",
    title: "Title of the article",
    publisher: "website.com",
    href: "https://website.com/article",
  };
  expect(
    isReferenceResultValid(validOnlineReference, parsedOnlineReference)
  ).toBe(true);
});

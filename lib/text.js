const namedEntities = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  quot: '"',
};

export function decodeHtmlEntities(value = "") {
  let decoded = String(value);

  for (let pass = 0; pass < 3; pass += 1) {
    const next = decoded
      .replace(/&(?:#)?(x[\da-f]+|\d+);/gi, (_, code) => {
        const number = code.toLowerCase().startsWith("x")
          ? parseInt(code.slice(1), 16)
          : parseInt(code, 10);
        return Number.isNaN(number) ? _ : String.fromCodePoint(number);
      })
      .replace(
        /&([a-z]+);/gi,
        (match, name) => namedEntities[name.toLowerCase()] || match,
      );

    if (next === decoded) break;
    decoded = next;
  }

  return decoded;
}

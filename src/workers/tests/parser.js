const { parse, getFunctions, getExpressionsInScope } = require("../parser");

const func = `
function square(n) {
  return n * n;
}
`;

const addFunc = `
function add(a,b) {
  var sum = a + b;
  return sum
}
`;

describe("parser", () => {
  describe("getFunctions", () => {
    it("simple", () => {
      parse({ text: func }, { id: "func" });
      const fncs = getFunctions({ id: "func" });
      expect(fncs).to.equal(false);
    });
  });

  describe.only("getExpressionsInScope", () => {
    it("aaaaaasdf", () => {
      parse({text: addFunc}, {id: "addFunc"})
      getExpressionsInScope({
          source: {id: "addFunc"},
          lineNumber: 3,
          columnNumber: 4
      })

      expect(1).to.be(1)
    })  
  })
});

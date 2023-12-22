// Test: Run test file
// @ts-ignore
test("test 1", (expect) => {
  expect(true).toBeTruthy();
});
// Test: Run test 2
// @ts-ignore
test("test 2", (expect) => {
  expect(false).toBeFalsy();
});

function istest(value: string): boolean {
  return value.endsWith(".test.ts");
}

// @ts-ignore
// Test: Run test file
test("test 3", (expect) => {
  expect(istest("tetete")).toBeFalsy();
});

// @ts-ignore
// Test: Run test 2
test("test 4", (expect) => {
  expect(istest("tetete")).toBeTruthy();
});

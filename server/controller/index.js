const index = (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>Welcome Express!!😊</h1>");
};

export { index };

module.exports = (req, res) => {
  const content = '404 | Not found';
  res.render("error/404", {
    title: content
  });
}

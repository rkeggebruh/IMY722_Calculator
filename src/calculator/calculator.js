function add(a, b) {
  return (parseInt(a, 16) + parseInt(b, 16)).toString(16).toUpperCase();
}

module.exports = { add };
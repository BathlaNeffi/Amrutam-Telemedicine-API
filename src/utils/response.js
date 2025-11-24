function success(res, message, data = {},key = 'data') {
  return res.status(200).json({
    status: "success",
    message,
    [key]:data
  });
}

function error(res, message, status = 400) {
  return res.status(status).json({
    status: "error",
    message
  });
}

module.exports = { success, error };

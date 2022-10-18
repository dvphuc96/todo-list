var validation = {
  isCheckEmpty: (value, errId, name) => {
    if (value.trim() === "") {
      document.getElementById(errId).style.display = "block";
      document.getElementById(errId).innerHTML = `${name} không được bỏ trống!`;
      return false;
    }
    document.getElementById(errId).style.display = "none";
    return true;
  },
  isCheckExists(value, errId, name, arr) {
    if (arr.includes(value)) {
      document.getElementById(errId).style.display = "block";
      document.getElementById(errId).innerHTML = `${name} đã tồn tại!`;
      return false;
    }
    document.getElementById(errId).style.display = "none";
    return true;
  },
};

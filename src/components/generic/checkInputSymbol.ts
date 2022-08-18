export default function checkInputSymbol(str: string) {
  let maxLength = 6;
  let count = 0;

  if (str.indexOf(".") !== -1) maxLength = str.indexOf(".") + 6;

  if (str.length > maxLength) return false;

  str.length > 1 &&
    str.split("").forEach((item) => {
      if (item === ".") ++count;
    });

  if (count > 1) return false;

  switch (str.slice(-1)) {
    case "":
      return true;
    case "1":
      return true;
    case "2":
      return true;
    case "3":
      return true;
    case "4":
      return true;
    case "5":
      return true;
    case "6":
      return true;
    case "7":
      return true;
    case "8":
      return true;
    case "9":
      return true;
    case "0":
      return true;
    case ".":
      return true;
    default:
      return false;
  }
}

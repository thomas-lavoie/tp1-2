export function formatTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp);
  const year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  switch (month) {
    case "01":
      month = "janvier";
      break;
    case "02":
      month = "février";
      break;
    case "03":
      month = "mars";
      break;
    case "04":
      month = "avril";
      break;
    case "05":
      month = "mai";
      break;
    case "06":
      month = "juin";
      break;
    case "07":
      month = "juillet";
      break;
    case "08":
      month = "aout";
      break;
    case "09":
      month = "septembre";
      break;
    case "10":
      month = "octobre";
      break;
    case "11":
      month = "novembre";
      break;
    case "12":
      month = "décembre";
      break;
  }
  const weekday = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ][date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${weekday}, le ${day} ${month} ${year}, à ${hours}:${minutes}:${seconds}`;
}

let acceptedFileFormat =
  "image/jpeg,image/jpg,image/gif,image/png,image/bmp,image/webp,image/avif";

export function validExtension(ext) {
  return acceptedFileFormat.indexOf("/" + ext) > 0;
}

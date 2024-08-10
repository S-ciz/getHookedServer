
function generateID(maxNumberOfID = 20) {
  const lowercaseletters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseletters = lowercaseletters.toUpperCase();
  const lettersCombined = lowercaseletters + uppercaseletters;
  const digits = "0123456789";

  let combinedCharacters = lettersCombined + digits;
  combinedCharacters = combinedCharacters.split("");
  let id = "";
  let randNumber = 0;
  for (let i = 0; i < maxNumberOfID; i++) {
    randNumber = Math.floor(Math.random() * combinedCharacters.length);
    id += combinedCharacters[randNumber];
  }

  return id;
}

function idExists(list, newId) {
  for (let item of list) {
    if (item === newId);
    return true;
  }

  return false;
}

module.exports = { generateID, idExists };

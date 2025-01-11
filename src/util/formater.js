export let shortText = (text, len = 59) => {
  if (text.length < len) {
    return text;
  }
  let output = text.slice(0, len);
  let outputArr = output
    .split(" ")
    .map((word) =>
      word.split("-").map((i, index) => (index === 0 ? i : "-" + i)),
    )
    .flat();
  let final = outputArr.slice(0, outputArr.length - 1);
  let finalJoin = final.reduce(
    (acc, char) => (char.startsWith("-") ? acc + char : acc + (" " + char)),
    "",
  );
  return finalJoin[finalJoin.length - 1] === "."
    ? finalJoin
    : finalJoin + "...";
};

export let formatHeader = (text, thereshold = 18, className = "text-3xl") => {
  let splitedText = text.split(" ");
  let formatedText = splitedText.map((item) =>
    item.split("-").some((word) => word.length > thereshold) ? (
      <span className={className}>{item}</span>
    ) : (
      item
    ),
  );
  return formatedText;
};

const GenerateDate = (string) => {
  return new Date(string).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default GenerateDate;

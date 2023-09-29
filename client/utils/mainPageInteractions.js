// Retrieve auth cookie:
const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("sessionData="))
  ?.split("=")[1];

export const getMainPage = async () => {
  const url = `/api/get-mainpage/`;

  const mainPageJson = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: cookieValue,
    },
  });

  const mainPageData = await mainPageJson.json();

  return mainPageData;
};

export const updateMainPage = async (newData) => {
  const url = `/api/update-mainpage/`;

  const mainPageJson = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: cookieValue,
    },
    body: JSON.stringify(newData),
  });

  const mainPage = await mainPageJson.json();

  return mainPage;
};

export default getMainPage;

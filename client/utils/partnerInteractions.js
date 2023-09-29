// Retrieve auth cookie:
const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("sessionData="))
  ?.split("=")[1];

export const getPartners = async () => {
  const url = `/api/get-partners/`;

  const partnersJson = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: cookieValue,
    },
  });

  const partnersArr = await partnersJson.json();

  return partnersArr;
};

export const createPartner = async (data) => {
  const url = `/api/create-partner/`;

  const partnerJson = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: cookieValue,
    },
    body: JSON.stringify(data),
  });

  const partner = await partnerJson.json();

  return partner;
};

export const updatePartner = async (newData) => {
  const url = `/api/update-partner/`;

  const partnerJson = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: cookieValue,
    },
    body: JSON.stringify(newData),
  });

  const partner = await partnerJson.json();

  return partner;
};

export const deletePartner = async (id) => {
  const url = `/api/delete-partner/`;

  const deleteJson = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: cookieValue,
    },
    body: JSON.stringify({ id }),
  });

  const response = await deleteJson.json();

  if (response.message === "Partner deleted successfully") {
    return true;
  } else {
    alert("Error deleting partner:", response.message);
    return false;
  }
};

export default getPartners;

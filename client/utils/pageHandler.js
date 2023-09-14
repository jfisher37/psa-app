import { isJen } from "./isJen.js";

const pageHandler = async () => {
  //create relevant dom els
  const pageListEl = document.getElementById("footer-list");
  const pageIconEls = Array.from(pageListEl.getElementsByTagName("li"));

  //async imports of relevant modules:
  const homepage = await import("../pages/homepage.js").then(async (module) => {
    return await module.default;
  });

  const projectPage = await import("../pages/projectPage.js").then(async (module) => {
    return await module.default;
  });

  const partnerPage = await import("../pages/partnerPage.js").then(async (module) => {
    return await module.default;
  });

  const editProjectPage = await import("../pages/editProjectPage.js").then(async (module) => {
    return await module.default;
  });


  //creates onClicks for footer icons
  pageIconEls.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();

      //change class of selected icon to show its selected
      pageIconEls.forEach((el) => {
        el.removeAttribute("class");
      });
      icon.setAttribute("class", "page-selected");

      //load page related to icon
      if (icon.dataset.page === "homepage") {
        homepage();
      } else if (icon.dataset.page === "projects") {
        projectPage();
      } else if (icon.dataset.page === "partners") {
        partnerPage();
      } else if (icon.dataset.page === "jen") {
        if (isJen()) {
          editProjectPage("new");;
        }
      } else if (icon.dataset.page === "logout") {
        document.cookie = "sessionData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
      }
    });
  });
};

export default pageHandler;

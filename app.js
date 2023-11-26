function app() {
  // functions and call back functions
  const closeMenuBars = () => {
    if (dropdownMenu.classList.contains("show-dropdown")) {
      dropdownMenu.classList.remove("show-dropdown");
    }
    if (notificationMenu.classList.contains("showNotification")) {
      notificationMenu.classList.remove("showNotification");
    }
  };
  const handleClickNavigate = () => {
    window.open("https://www.shopify.com/", "_blank");
  };

  const handleMouseOver = () => {
    divInput.classList.add("search-focus");
    input.focus();
    closeMenuBars();
  };

  const handleMouseOut = () => {
    divInput.classList.remove("search-focus");
    input.blur();
  };

  const handleClickNotification = () => {
    if (dropdownMenu.classList.contains("show-dropdown")) {
      dropdownMenu.classList.remove("show-dropdown");
    }
    bellBtn.forEach((btn) => {
      if (btn.ariaExpanded === "false") {
        btn.setAttribute("aria-expanded", "true");
      } else {
        btn.setAttribute("aria-expanded", "false");
      }
    });
    notificationMenu.classList.toggle("showNotification");
  };

  const handleClickDrop = () => {
    if (notificationMenu.classList.contains("showNotification")) {
      notificationMenu.classList.remove("showNotification");
    }
    dropdownBtn.forEach((btn) => {
      if (btn.ariaExpanded === "false") {
        btn.setAttribute("aria-expanded", "true");
      } else {
        btn.setAttribute("aria-expanded", "false");
      }
    });
    dropdownMenu.classList.toggle("show-dropdown");
    dropList.item(0).focus();
  };

  const HideHeaderTab = () => {
    topBar.classList.add("hide");
  };

  const dropListKeyNavigate = (event, index) => {
    const isLastItem = index === dropList.length - 1;
    const isFirstItem = index === 0;
    const nextItem = dropList.item(index + 1);
    const prevItem = dropList.item(index - 1);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (isLastItem) {
        dropList.item(0).focus();
        return;
      }
      nextItem.focus();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      if (isFirstItem) {
        dropList.item(dropList.length + 1).focus();
        return;
      }
      prevItem.focus();
    }
    if (event.key === "Escape") {
      dropdownMenu.classList.remove("show-dropdown");
      dropdownBtn.forEach((item) => {
        item.focus();
      });
    }

    if (event.key === "Enter") {
      dropdownNavigate();
    }
  };

  const dropdownNavigate = () => {
    window.open("https://admin.shopify.com", "_blank");
  };

  const collapseTab = () => {
    tabWrapper.style.display = "none";
    actionContainer.style.height = "130px";
    tabExpand.classList.remove("hide-element");
    tabCollapse.classList.add("hide-element");
    controlTab.setAttribute("aria-expanded", "true");
  };

  const expandTab = () => {
    tabWrapper.style.display = "inline-flex";
    actionContainer.style.height = "480px";
    tabCollapse.classList.remove("hide-element");
    tabExpand.classList.add("hide-element");
    controlTab.setAttribute("aria-expanded", "false");
  };

  const handleTabs = (_, tab) => {
    tabs.forEach((item) => {
      item.classList.remove("tab-open");
      item.classList.add("tab-closed");
    });
    tabsWrapper.forEach((tabs) => {
      tabs.classList.remove("tab-open-section");
      tabs.classList.add("tab-closed-section");
    });
    tab.classList.add("tab-open");
  };

  // DOM Target variables
  const icon = document.querySelector(".logo-section");
  const divInput = document.querySelector(".section_2");
  const input = document.querySelector(".section_2 input");
  const bellBtn = document.querySelectorAll(".bell-icon");
  const notificationMenu = document.querySelector(".notification");
  const dropdownBtn = document.querySelectorAll(".drop-down-btn");
  const dropdownMenu = document.querySelector(".drop-down");
  const headerBtn = document.querySelector(".btn-div-2");
  const topBar = document.querySelector(".top-bar");
  const dropList = document.querySelectorAll(".upper-button");
  const tabWrapper = document.querySelector(".tab-wrapper");
  const actionContainer = document.querySelector(".action-container");
  const controlTab = document.querySelector(".icon-holder");
  const tabCollapse = document.querySelector(".collapse");
  const tabExpand = document.querySelector(".expand");
  const tabs = document.querySelectorAll(".tab-sec");
  const tabsWrapper = document.querySelectorAll(".tab-sec-wrapper");

  // mouse listeners
  icon.addEventListener("click", handleClickNavigate);
  input.addEventListener("mouseover", handleMouseOver);
  input.addEventListener("mouseout", handleMouseOut);
  bellBtn.forEach((item) => {
    item.addEventListener("click", handleClickNotification);
  });
  dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", handleClickDrop);
  });
  headerBtn.addEventListener("click", HideHeaderTab);
  topBar.addEventListener("click", closeMenuBars);
  dropList.forEach((btn) => {
    btn.addEventListener("click", dropdownNavigate);
  });
  tabCollapse.addEventListener("click", collapseTab);
  tabExpand.addEventListener("click", expandTab);

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (event) {
      handleTabs(event, tab);
    });
  });

  // keyboard listeners
  icon.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.key === "") {
      handleClickNavigate();
    }
  });

  bellBtn.forEach((btn) => {
    btn.addEventListener("keyup", function (e) {
      if (e.key === "Enter" || e.key === "") {
        handleClickNotification();
      }
    });
  });

  dropdownBtn.forEach((btn) => {
    btn.addEventListener("keyup", function (e) {
      if (e.key === "Enter" || e.key === "") {
        handleClickDrop();
      }
    });
  });

  headerBtn.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.key === "") {
      HideHeaderTab();
    }
  });

  dropList.forEach((item, index) => {
    item.addEventListener("keyup", function (e) {
      dropListKeyNavigate(e, index);
    });
  });

  controlTab.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.key === "") {
      if (tabWrapper.style.display === "inline-flex") {
        collapseTab();
      } else {
        expandTab();
      }
    }
  });
}
app();

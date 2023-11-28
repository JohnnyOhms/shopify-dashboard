// `````````````````````````DOCUMENTATION OF THE CODE LOGIC```````````````````````````````````````

// ### Purpose:
// This code implements various functionalities for a web interface related to onboarding steps, dropdown menus, navigation, and progress tracking.

// ### Functions:
// 1. **Navigation and Interface Control:**
//    - `handleClickNavigate()`: Opens the Shopify website in a new tab/window.
//    - `handleMouseOver()`: Sets autofocus on a search input when hovered.
//    - `handleMouseOut()`: Removes autofocus from the search input when not hovered.
//    - `handleClickNotification()`: Controls the visibility of notification dropdown menus.
//    - `handleClickDrop()`: Controls the visibility of profile dropdown menus.
//    - `hideHeaderTab()`: Hides a pricing callout from the interface.
//    - `dropListKeyNavigate()`: Handles keyboard navigation within dropdown lists.
//    - `dropdownNavigate()`: Navigates to the Shopify admin page.

// 2. **Onboarding Steps Management:**
//    - `collapseTab()`: Collapses the onboarding steps view.
//    - `expandTab()`: Expands the onboarding steps view.
//    - `showAndHideTabs()`: Shows or hides individual onboarding steps.
//    - `handleTabs()`: Controls the display of individual onboarding steps.
//    - `expandNextIncompleteStep()`: Expands the next incomplete onboarding step.

// 3. **Progress Tracking:**
//    - `progressBar()`: Updates the progress bar based on completed steps.
//    - `increment()`: Increments the count of completed steps.
//    - `decrement()`: Decrements the count of completed steps.

// 4. **Checkbox Interaction:**
//    - `handleUncheckBox()`: Handles unchecking an onboarding step checkbox.
//    - `handleCheckBox()`: Handles checking an onboarding step checkbox.
//    - `checked()`: Controls the state of onboarding step checkboxes.

// ### Event Listeners:
// - Event listeners are set up for various UI elements, such as clicks, key presses, and mouse actions. They trigger the associated functions for specific interactions.

// ### DOM Target Variables:
// - These variables hold references to HTML elements, making them accessible throughout the script for manipulation or event binding.

// ### Comments:
// - Each function is commented to explain its purpose, outlining the logic or actions it performs. This improves code readability and understanding.

// Function to close menu bars if open
function closeMenuBars() {
  // Close dropdown menu if it's open
  if (dropdownMenu.classList.contains("show-dropdown")) {
    dropdownMenu.classList.remove("show-dropdown");
  }
  // Close notification menu if it's open
  if (notificationMenu.classList.contains("showNotification")) {
    notificationMenu.classList.remove("showNotification");
  }
}

// Function to navigate to Shopify website on logo click
function handleClickNavigate() {
  window.open("https://www.shopify.com/", "_blank");
}

// Function to enable autofocus on search input
function handleMouseOver() {
  divInput.classList.add("search-focus");
  input.focus();
  closeMenuBars();
}

// Function to disable autofocus on search input
function handleMouseOut() {
  divInput.classList.remove("search-focus");
  input.blur();
}

// Function to toggle notification dropdown visibility
function handleClickNotification() {
  // Close dropdown menu if it's open
  if (dropdownMenu.classList.contains("show-dropdown")) {
    dropdownMenu.classList.remove("show-dropdown");
  }
  // Toggle aria-expanded attribute for bell icons and show/hide notification menu
  bellBtn.forEach((btn) => {
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
  notificationMenu.classList.toggle("showNotification");
}

// Function to toggle profile dropdown visibility
function handleClickDrop() {
  // Close notification menu if it's open
  if (notificationMenu.classList.contains("showNotification")) {
    notificationMenu.classList.remove("showNotification");
  }
  // Toggle aria-expanded attribute for dropdown buttons and show/hide dropdown menu
  dropdownBtn.forEach((btn) => {
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
  dropdownMenu.classList.toggle("show-dropdown");
  // animation to add slide down items
  listItem.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("reveal");
    }, index * 100);
  });
  dropList.item(0).focus();
  // animation to remove slide down items
  if (!dropdownMenu.classList.contains("show-dropdown")) {
    listItem.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove("reveal");
      }, index * 100);
    });
  }
}

// Function to hide pricing callout from the screen
function hideHeaderTab() {
  topBar.classList.add("hidden-topbar");
}

// Function to navigate using keyboard keys within the profile dropdown section
function dropListKeyNavigate(event, index) {
  const isLastItem = index === dropList.length - 1;
  const isFirstItem = index === 0;
  const nextItem = dropList.item(isLastItem ? 0 : index + 1);
  const prevItem = dropList.item(isFirstItem ? dropList.length - 1 : index - 1);

  if (event.key.startsWith("Arrow")) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextItem.focus();
    } else {
      prevItem.focus();
    }
  } else if (event.key === "Escape") {
    dropdownMenu.classList.remove("show-dropdown");
    dropdownBtn.forEach((item) => {
      item.focus();
    });
  } else if (event.key === "Enter") {
    dropdownNavigate();
  }
}

// Function to navigate to Shopify admin from the profile dropdown
function dropdownNavigate() {
  window.open("https://admin.shopify.com", "_blank");
}

// Function to collapse the onboarding step tabs
function collapseTab() {
  closeMenuBars();
  tabWrapper.style.display = "none";
  actionContainer.style.height = "125px";
  tabExpand.classList.remove("hide-element");
  tabCollapse.classList.add("hide-element");
  controlTab.setAttribute("aria-expanded", "true");
}

// Function to expand the onboarding step tabs
function expandTab() {
  closeMenuBars();
  actionContainer.style.height = "100%";
  tabCollapse.classList.remove("hide-element");
  tabExpand.classList.add("hide-element");
  controlTab.setAttribute("aria-expanded", "false");
  setTimeout(() => {
    tabWrapper.style.display = "inline-flex";
  }, 200);
}

// Function to show/hide individual onboarding steps
function showAndHideTabs(tab) {
  tabs.forEach((eachTab) => {
    eachTab.querySelector(".sec-2").classList.add("hide-sec-2");
    const eachTitle = eachTab.querySelector(".tab-title");
    eachTitle.classList.remove("title-tab-display");
    eachTitle.setAttribute("aria-expanded", "false");
    if (!eachTab.classList.contains("tab-closed")) {
      eachTab.classList.add("tab-closed");
    }
  });
  tab.querySelector(".sec-2").classList.remove("hide-sec-2");
  const title = tab.querySelector(".tab-title");
  title.classList.add("title-tab-display");
  title.setAttribute("aria-expanded", "true");
  tab.classList.remove("tab-closed");
}

// Function to handle clicking on individual onboarding steps
function handleTabs(tab) {
  closeMenuBars();
  showAndHideTabs(tab);
}

// Function to expand the next incomplete onboarding step
function expandNextIncompleteStep() {
  for (const tab of tabs) {
    const tabBtn = tab.querySelector(".shopping-item-checkbox");
    if (!tabBtn.classList.contains("checked")) {
      showAndHideTabs(tab);
      tab.querySelector(".shopping-item-checkbox").focus();
      break;
    }
  }
}

// Function to update progress bar when an onboarding step is completed or not completed
function progressBar() {
  const progressBar = document.querySelector("#range");
  const progress = (COMPLETED / checkBox.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Function to increment completed steps count
function increment() {
  COMPLETED++;
  taskNum.textContent = `${COMPLETED} / ${checkBox.length} completed`;
  progressBar();
}

// Function to decrement completed steps count
function decrement() {
  COMPLETED--;
  taskNum.textContent = `${COMPLETED} / ${checkBox.length} completed`;
  progressBar();
}

// Function to handle unchecking an onboarding step checkbox
function handleUncheckBox(box) {
  const notCompleted = box.querySelector(".not-completed-icon");
  const completed = box.querySelector(".completed-icon");
  const loading = box.querySelector(".loading-spinner-icon");
  const HIDDEN_CLASS = "hidden";
  completed.classList.add(HIDDEN_CLASS);
  loading.classList.remove(HIDDEN_CLASS);
  setTimeout(() => {
    loading.classList.add(HIDDEN_CLASS);
    notCompleted.classList.remove(HIDDEN_CLASS);
    box.classList.remove("checked");
    box.ariaLabel = box.ariaLabel.replace("as not completed", "as completed");
    decrement();
  }, 1000);
}

// Function to handle checking an onboarding step checkbox
function handleCheckBox(box) {
  const notCompleted = box.querySelector(".not-completed-icon");
  const completed = box.querySelector(".completed-icon");
  const loading = box.querySelector(".loading-spinner-icon");
  const HIDDEN_CLASS = "hidden";
  notCompleted.classList.add(HIDDEN_CLASS);
  loading.classList.remove(HIDDEN_CLASS);
  setTimeout(() => {
    loading.classList.add(HIDDEN_CLASS);
    completed.classList.remove(HIDDEN_CLASS);
    box.classList.add("checked");
    box.ariaLabel = box.ariaLabel.replace("as completed", "as not completed");
    increment();
    expandNextIncompleteStep();
  }, 1000);
}

// Function to handle clicking on an onboarding step checkbox
function checked(box, index) {
  const isChecked = box.classList.contains("checked");
  if (isChecked) {
    handleUncheckBox(box);
  } else {
    handleCheckBox(box);
  }
}

// DOM Target variables (Defined outside the function to make them accessible)
const icon = document.querySelector(".logo-section");
const divInput = document.querySelector(".section_2");
const input = document.querySelector(".section_2 input");
const bellBtn = document.querySelectorAll(".bell-icon");
const notificationMenu = document.querySelector(".notification");
const dropdownBtn = document.querySelectorAll(".drop-down-btn");
const dropdownMenu = document.querySelector(".drop-down");
const headerBtn = document.querySelector(".btn-div-2");
const topBar = document.querySelector(".top-bar");
const listItem = document.querySelectorAll(".upper");
const dropList = document.querySelectorAll(".upper-button");
const tabWrapper = document.querySelector(".tab-wrapper");
const actionContainer = document.querySelector(".action-container-wrapper");
const controlTab = document.querySelector(".icon-holder");
const tabCollapse = document.querySelector(".collapse");
const tabExpand = document.querySelector(".expand");
const tabs = document.querySelectorAll(".tab");
const checkBox = document.querySelectorAll(".shopping-item-checkbox");
const taskNum = document.querySelector(".completed-num");
let COMPLETED = 0;

// Event listeners setup moved outside the function for better readability
icon.addEventListener("click", handleClickNavigate);
input.addEventListener("mouseover", handleMouseOver);
input.addEventListener("mouseout", handleMouseOut);
bellBtn.forEach((item) => {
  item.addEventListener("click", handleClickNotification);
});
dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", handleClickDrop);
});
headerBtn.addEventListener("click", hideHeaderTab);
topBar.addEventListener("click", closeMenuBars);
dropList.forEach((btn) => {
  btn.addEventListener("click", dropdownNavigate);
});
tabCollapse.addEventListener("click", collapseTab);
tabExpand.addEventListener("click", expandTab);
tabs.forEach((tab) => {
  tab.addEventListener("click", function (event) {
    handleTabs(tab);
  });
});
checkBox.forEach((box, index) => {
  box.addEventListener("click", function (event) {
    checked(box, index);
  });
});

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
    hideHeaderTab();
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

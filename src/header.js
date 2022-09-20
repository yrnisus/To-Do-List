

export default function header() {
  const header = document.createElement('header');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper');

  // menu burger icon
  const menuIconWrapper = document.createElement('div');
  menuIconWrapper.classList.add('menu-icon-wrapper')
  const menuIcon = document.createElement('i');
  menuIcon.classList.add("fa-solid", "fa-bars", "menu-icon");
  menuIconWrapper.appendChild(menuIcon);

  //Task List Icon
  const taskIcon = document.createElement('i');
  taskIcon.classList.add("fa-solid", "fa-list-check");

  headerWrapper.appendChild(menuIconWrapper);

  // centered text would like to remove
  // headerWrapper.appendChild(taskIcon);

  const headerText = document.createElement('div');
  headerText.classList.add("header-text");
  headerText.innerText = "To Do";

  headerWrapper.appendChild(headerText);
  header.appendChild(headerWrapper);

  return header;
}
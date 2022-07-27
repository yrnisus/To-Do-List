import _ from 'lodash';
import '@fortawesome/fontawesome-free/js/all';
import './style.css';


import header from './header.js';
import content from './content.js'
import sidebar from './sidebar.js'


function createPage() {
    document.body.appendChild(header());
    // document.body.appendChild(sidebar());

    const contentContainer = document.createElement('div');
    contentContainer.classList.add("content-container");

    contentContainer.appendChild(sidebar());
    contentContainer.appendChild(content());

    document.body.appendChild(contentContainer);
}


//  function component() {
//    const element = document.createElement('div');
//   const btn = document.createElement('button');

//    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   btn.innerHTML = 'Click me and check the console!';
//   btn.onclick = printMe;

//   element.appendChild(btn);

//    return element;
//  }

createPage();





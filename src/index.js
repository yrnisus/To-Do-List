import _ from 'lodash';
import '@fortawesome/fontawesome-free/js/all';
import './style.css';


import header from './header.js';
import content from './content.js'
import sidebar from './sidebar.js'


function createPage() {
    document.body.appendChild(header());
    document.body.appendChild(sidebar());
    document.body.appendChild(content());
}

createPage();





import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ProfileBadgeComponent} from './profiles'
import {FeedComponent, postsComponent, oasisDetailComponent} from './posts'
import * as serviceWorker from './serviceWorker';

const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}
const e = React.createElement
const postsEl = document.getElementById("oasisme-2")
if (postsEl) {
    ReactDOM.render(
        e(postsComponent, postsEl.dataset), postsEl);
}

const oasisFeedEl = document.getElementById("oasisme-2-feed")
if (oasisFeedEl) {
    ReactDOM.render(
        e(FeedComponent, oasisFeedEl.dataset), oasisFeedEl);
}

const oasisDetailElements = document.querySelectorAll(".oasisme-2-detail")

oasisDetailElements.forEach(container=> {
    ReactDOM.render(
        e(oasisDetailComponent, container.dataset), 
        container);
})

const userProfileBadgeElements = document.querySelectorAll(".oasisme-2-profile-badge")

userProfileBadgeElements.forEach(container=> {
    ReactDOM.render(
        e(ProfileBadgeComponent, container.dataset), 
        container);
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

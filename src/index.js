import './style.css'
import axios from "axios";
const newStoriesUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
const storyUrl = 'https://hacker-news.firebaseio.com/v0/item/';
const storyWrapper = document.getElementById('story-wrapper');
const loadMore = document.getElementById('loadmore');

let idList = [];
let currentId = 0;
let stories = [];

startApp(); //show first 10 stories

async function startApp() {
    idList = await fetchData(newStoriesUrl);
    await getStories();
    showStories();
}

async function fetchData(url) {
    const res = await axios.get(url);
    return res.data;
}

async function getStories() {
    stories = []; //empty the array
    loadMore.innerHTML = 'Loading...';
    loadMore.removeEventListener('click', showStories);
    for (let i = 0; i < 10; i++) {
        stories.push (await fetchData(`${storyUrl + idList[currentId++]}.json`));
    }
    loadMore.innerHTML = 'Load More';
    loadMore.addEventListener('click', showStories);
}

function showStories() {
    currentId -= 10;
    stories.map(story => {
        storyWrapper.innerHTML += 
        `<span class="story-container">
            <a class="story-title" href="${story.url}">${++currentId}. ${story.title}</a>
            <span class="story-date">${timeSince(new Date(story.time * 1000))}</span>
        </span>`
    })
    getStories(); //fetch next 10 stories (ready to show)
}

//get data timestamps
const intervals = [
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
    ];
    
function timeSince(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}
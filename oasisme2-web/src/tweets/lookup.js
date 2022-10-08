import {backendLookup} from '../lookup'

export function apioasisCreate(newoasis, callback){
    backendLookup("POST", "/posts/create/", callback, {content: newoasis})
  }

export function apioasisAction(oasisId, action, callback){
    const data = {id: oasisId, action: action}
    backendLookup("POST", "/posts/action/", callback, data)
}

export function apioasisDetail(oasisId, callback) {
    backendLookup("GET", `/posts/${oasisId}/`, callback)
}

export function apioasisFeed(callback, nextUrl) {
    let endpoint =  "/posts/feed/"
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}


export function apioasisList(username, callback, nextUrl) {
    let endpoint =  "/posts/"
    if (username){
        endpoint =  `/posts/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}
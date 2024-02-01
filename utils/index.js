export async function getData(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

export async function postData(url, data) {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (resp.status === 401) {
        throw new Error('Username or password is incorrect');
    }

    const responseData = await resp.json();
    return responseData;

}


export function isLoggedIn() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = '../../index.html'
    }
}

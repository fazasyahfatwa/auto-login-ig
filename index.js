import fetch from 'node-fetch';

const loginInstagram = () => new Promise((resolve, reject) => {
    fetch('https://www.instagram.com/api/v1/web/accounts/login/ajax/', {
        method: 'POST',
        headers: {
            'authority': 'www.instagram.com',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.8',
            'cookie': 'ig_did=2F5DB78B-0293-4BBE-A06C-D58A2C7504CE; mid=Y1uFSgALAAFlrhFcHbq4X6rMAAyT; datr=l-74Y-P2ORotLM17vC0pYhuD; shbid="10916\\0546090213134\\0541709638695:01f72fc29638b7bb25f4d248b1ea8c663a8329ddcf8bbc27eaecd4192c25549e67d25599"; shbts="1678102695\\0546090213134\\0541709638695:01f7f3b3f237a6dfd6faca7659abb8c5d351fa30613599d249c62163df73759a9363772e"; ig_nrcb=1; rur="CCO\\05458424180399\\0541709682249:01f736d03748fef533ef1ea704f151094fe913684dd997826977915309d27c56d81e9fbb"; csrftoken=4bPU5ndacTzQQh2VJz6Z7PZJ0FEGVJLQ',
            'origin': 'https://www.instagram.com',
            'referer': 'https://www.instagram.com/accounts/login/',
            'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'sec-gpc': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'x-asbd-id': '198387',
            'x-csrftoken': '4bPU5ndacTzQQh2VJz6Z7PZJ0FEGVJLQ',
            'x-ig-app-id': '936619743392459',
            'x-ig-www-claim': 'hmac.AR1yeMmnR1xBCnffTJhu7MkCxI9iGAZqrfZ3UXf1oMh4RJUM',
            'x-instagram-ajax': '1007057884',
            'x-requested-with': 'XMLHttpRequest'
        },
        body: new URLSearchParams({
            'enc_password': '#PWD_INSTAGRAM_BROWSER:10:1678146291:AfFQAFKGdyVijHKv6GNh4Z4PHiOLiore7OzDT1BVxxNwhYoJ3d14JkHpinarYLRn2na13UGn5spnuiNb/XH6sWQdziHYSX+4durInCozr5ascS1MCB7wyHHTPXvUh9aQjcyhTGIktl3YnUpQGiIXkOLQ',
            'username': 'miesedap3180',
            'queryParams': '{}',
            'optIntoOneTap': 'false',
            'trustedDeviceRecords': '{}'
        })
    })
    .then(async res => {
        const newResult = {
            cookie: res.headers.raw()['set-cookie'],
            body: await res.json()
        }
        resolve(newResult)
    })
    .catch(err => {
        reject(err)
    })
});

const getProfile = (newCookie) => new Promise((resolve, reject) => {
    fetch('https://www.instagram.com/api/v1/accounts/edit/web_form_data/', {
        method: 'GET',
        headers: {
            'authority': 'www.instagram.com',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.6',
            'cookie': newCookie,
            'referer': 'https://www.instagram.com/accounts/edit/',
            'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'sec-gpc': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'x-asbd-id': '198387',
            'x-ig-app-id': '936619743392459',
            'x-ig-www-claim': 'hmac.AR2Vmk4mXY-abw_9Ydz5_P1DKeFk-pQes6WpO0uEjnz7WLCa',
            'x-requested-with': 'XMLHttpRequest'
        }
    })
    .then(res => res.text())
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
});


(async() => {
    try {
        const resultLogin = await loginInstagram();
        console.log(resultLogin);
        const cookie = resultLogin.cookie;
        // const csrftoken = cookie[0].split(';')[0]; //cara 1
        const csrftoken = cookie.find((x) => x.includes('csrftoken')).split(';')[0]; //cara 2 (misal kalo pake ip luar cookie bakal berbeda)
        const rur = cookie.find((x) => x.includes('rur')).split(';')[0];
        const ds_user_id = cookie.find((x) => x.includes('ds_user_id')).split(';')[0];
        const sessionid = cookie.find((x) => x.includes('sessionid')).split(';')[0];
        const user_id = resultLogin.body.userId; 

        // const newCookie = `${csrftoken}; ${rur}; ${ds_user_id}; user_id=${user_id}, ${sessionid}`;

        // const resultProfile = await getProfile(newCookie);
        // console.log(cookie,csrftoken, rur, ds_user_id, sessionid, user_id);
        console.log(csrftoken);
    } catch (error) {
        console.log(error)
    }

})();
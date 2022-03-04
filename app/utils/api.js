export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}
    &sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if(!data.items) {
                // throw here and not catch since we can't really do anything to update user here( do it when we invoke function)
                throw new Error(data.message)
            }
            return data.items
        })
}
var headers = new Headers()
  headers.append('Content-Type', 'application/json')
export function GQL(query) {
    return (variables) => fetch("/graphql", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    }).then(res => res.json());
}
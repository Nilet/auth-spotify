export async function getAccessToken(
    clientId: string,
    code: string
): Promise<string> {
    const verifier = localStorage.getItem('verifier')
    const params = new URLSearchParams()
    params.append('client_id', clientId)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', 'http://localhost:5173/callback')
    params.append('code_verifier', verifier!)

    const url = 'https://accounts.spotify.com/api/token'
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params,
    })

    const { access_token } = await result.json()
    return access_token
}

async function validateToken(token) {
    const response = await fetch('http://127.0.0.1:8081/auth/token/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    });

    if (!response.ok) {
        throw new Error('Token validation failed');
    }

    const data = await response.json();
    if (data.code !== 0) {
        throw new Error('Token validation failed');
    }

    return data.result.authenticated;
}

export default validateToken;
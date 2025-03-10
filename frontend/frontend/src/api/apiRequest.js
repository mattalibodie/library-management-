export const apiRequest = async (url, method, headers, body) => {
  const requestOptions = {
    method: method,
    headers: headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
    redirect: "follow",
  };
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    return error
  }
};
export default apiRequest;
export const googleSignin = async (apiUrl: string, token: string) => {
  const resp = await fetch(`${apiUrl}/google-signin`, {
    body: JSON.stringify({ token: token }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await resp.json();
};

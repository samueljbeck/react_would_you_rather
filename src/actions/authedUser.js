export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function handleLogin (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}
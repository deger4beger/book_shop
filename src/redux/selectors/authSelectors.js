export const getIsAuth = (state) => {
	return state.auth.isAuth
}

export const getIsLoading = (state) => {
    return state.auth.isLoading
}

export const getEmail = (state) => {
	return state.auth.userData.email
}

export const getPicture = (state) => {
	return state.auth.userData.picture
}

export const getName = (state) => {
	return state.auth.userData.name
}
import axios from "axios"
import { getToken, loginHelper, logoutHelper } from "../redux/helpers"

const UNAUTHORIZED = 401
const FORBIDDEN = 403

const instance = axios.create({
	withCredentials: true,
	baseURL: "https://dew-shop.herokuapp.com/",
})

const refreshInstance = axios.create({
	withCredentials: true,
	baseURL: "https://dew-shop.herokuapp.com/"
})

instance.interceptors.request.use((req) => {
	const token = getToken()
	if (token) {
		req.headers.Authorization = `Bearer ${token}`
	}
	return req
})


instance.interceptors.response.use(
	response => response,
	async error => {
    	if (error.response.status === UNAUTHORIZED || error.response.status === FORBIDDEN) {
    		try {
    			const { method, url, data } = error.config
    			const payload = await authApi.refresh()
    			loginHelper(payload)
    			switch (method) {
    				case "post": {
    					const res = await instance.post(url, data)
    					return Promise.resolve(res)
    				}
    				case "get": {
    					const res = await instance.get(url)
    					return Promise.resolve(res)
    				}
    				case "put": {
    					const res = await instance.put(url, data)
    					return Promise.resolve(res)
    				}
    				case "patch": {
    					const res = await instance.patch(url, data)
    					return Promise.resolve(res)
    				}
    				case "delete": {
    					const res = await instance.delete(url)
    					return Promise.resolve(res)
    				}
    				default: {
    					return Promise.reject(error)
    				}
    			}
    		} catch (err) {
    			logoutHelper()
    			return Promise.reject(error)
    		}
    	}
    }
)

export const authApi = {
	login(id_token) {
		return instance.post("user/googlelogin/", {id_token})
			.then(response => response.data)
	},
	logout() {
		return instance.post("user/logout/")
			.then(response => response.data)
	},
	refresh() {
		return refreshInstance.post("/user/refresh/")
			.then(response => response.data)
	}
}

export const booksApi = {
    getBooks(queryString) {
        return instance.get(`product/?${queryString}`)
            .then(response => response.data)
    },
    getOneBook(id) {
        return instance.get(`product/${id}/`)
            .then(response => response.data)
    },
    updateRating(rating, id) {
        return instance.patch(`product/rate/${id}/`, {
            rate: rating
        }).then(response => response.data)
    },
    sendReview(id, comment) {
        return instance.post(`feedback/form/${id}/`, { comment })
            .then(response => response.data)
    },
    toggleLikeDislike(id, mode) {
        return instance.patch(`product/comment/rate/${id}/`, {
            data: mode
        }).then(response => response.data)
    },
    getDiscountBooks() {
        return instance.get("discount/")
            .then(response => response.data)
    }
}

export const cartApi = {
    addBook(id, inCart) {
        return instance.patch(`product/cart/${id}/`, {
            in_cart: inCart
        }).then(response => response.data)
    },
    removeBook(id) {
        return instance.delete(`product/cart/deleteBook/${id}/`)
            .then(response => response.data)
    },
    getBooks() {
        return instance.get("cart/")
            .then(response => response.data)
    },
    removeCopy(id) {
        return instance.patch(`product/cart/delete/${id}/`)
            .then(response => response.data)
    },
    removeAll(id) {
        return instance.delete(`product/cart/deleteCart/${id}/`)
            .then(response => response.data)
    },
    getOrderData(data, confirm=false) {
        return instance.post("order/", {
            "id": data,
            confirm
        }).then(response => response.data)
    }
}

export const profileApi = {
    getProfile() {
        return instance.get("profile/")
            .then(response => response.data)
    },
    updateOrderData(data) {
        return instance.put("profile/form/", data)
            .then(response => response.data)
    }
}

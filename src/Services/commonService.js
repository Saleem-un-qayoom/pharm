const commonService = {
	getTotalPrice: cart => {
		let temp = [...cart];

		let price = 0.0;

		for (let i = 0; i < temp.length; i++) {
			price =
				price +
				(temp[i].product_info[0].product_price -
					(temp[i].product_info[0].product_price / 100) *
						temp[i].product_info[0].product_discount) *
					temp[i].quantity;
		}
		return price.toFixed(2);
	},
	getCartItemById: (id, cart) => {
		let temp = {};
		for (let i = 0; i < cart.length; i++) {
			if (id == cart[i].id) {
				temp = cart[i];
				break;
			}
		}
		return temp;
	},

	addItemToCart: (item, cart, setCart) => {
		let found = false;
		let temp = [...cart];
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === item.id) {
				temp[i] = { ...temp[i], quantity: temp[i].quantity + 1 };
				found = true;
				break;
			}
		}
		if (!found) {
			temp.push({ ...item, quantity: 1 });
		}
		setCart(temp);
		localStorage.setItem('pharm-box-cart', JSON.stringify(temp));
	},

	increaseQuantity: (item, cart, setCart) => {
		let temp = [...cart];
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === item.id) {
				temp[i] = { ...temp[i], quantity: temp[i].quantity + 1 };
				break;
			}
		}

		setCart(temp);
		localStorage.setItem('pharm-box-cart', JSON.stringify(temp));
	},

	decreaseQuantity: (item, cart, setCart) => {
		let lastItemInQuantity = -1;
		let temp = [...cart];
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === item.id) {
				if (temp[i].quantity > 1) {
					temp[i] = {
						...temp[i],
						quantity: temp[i].quantity - 1,
					};
				} else {
					lastItemInQuantity = i;
				}
				break;
			}
		}
		if (lastItemInQuantity !== -1) {
			temp.splice(lastItemInQuantity, 1);
		}
		setCart(temp);
		localStorage.setItem('pharm-box-cart', JSON.stringify(temp));
	},
	removeItemFromCart: (item, cart, setCart) => {
		let temp = [...cart];
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === item.id) {
				temp.splice(i, 1);
				break;
			}
		}
		setCart(temp);
		localStorage.setItem('pharm-box-cart', JSON.stringify(temp));
	},
	isItemAlreadyInCart: (item, cart, setCart) => {
		let found = 0;
		let temp = [...cart];
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === item.id) {
				found = temp[i].quantity;
				break;
			}
		}
		return found;
	},
	returnItemFromCartById: (id, cart) => {
		let cartItem = null;
		let temp = [...cart];
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === id) {
				cartItem = temp[i];
				break;
			}
		}
		return cartItem;
	},
};

export default commonService;

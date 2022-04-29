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

	getCartItemById: (id, carts) => {
		let cartItem = {};

		for (let cart of carts)
			if (cart.id === id) {
				cartItem = cart;
				break;
			}
		return cartItem;
	},

	addItemToCart: (item, carts, setCart) => {
		let found = false;
		carts = [...carts];

		for (let [index, cart] of carts.entries())
			if (cart.id === item.id) {
				carts[index] = {
					...cart,
					quantity: carts[index].quantity + 1,
				};
				found = true;
				break;
			}

		if (!found) {
			carts.push({ ...item, quantity: 1 });
		}
		setCart(carts);
		localStorage.setItem('pharm-box-cart', JSON.stringify(carts));
	},

	increaseQuantity: (item, carts, setCart) => {
		carts = [...carts];

		for (let [index, cart] of carts.entries()) {
			if (cart.id === item.id) {
				carts[index] = {
					...cart,
					quantity: carts[index].quantity + 1,
				};
				break;
			}
		}

		setCart(carts);
		localStorage.setItem('pharm-box-cart', JSON.stringify(carts));
	},

	decreaseQuantity: (item, carts, setCart) => {
		let lastItemInQuantity = -1;
		carts = [...carts];

		for (let [index, cart] of carts.entries())
			if (cart.id === item.id) {
				if (cart.quantity > 1) {
					carts[index] = {
						...cart,
						quantity: carts[index].quantity - 1,
					};
				} else {
					lastItemInQuantity = index;
				}
				break;
			}

		if (lastItemInQuantity !== -1) {
			carts.splice(lastItemInQuantity, 1);
		}
		setCart(carts);
		localStorage.setItem('pharm-box-cart', JSON.stringify(carts));
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
	isItemAlreadyInCart: (item, cart) => {
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
	returnItemFromCartById: (id, carts) => {
		let cartItem = null;
		carts = [...carts];
		for (let i = 0; i < carts.length; i++) {
			if (carts[i].id === id) {
				cartItem = carts[i];
				break;
			}
		}
		return cartItem;
	},

	isPrescriptionRequired: cart => {
		let temp = [...cart];
		let isPrescriptionRequired = false;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].prescription_required === '1') {
				isPrescriptionRequired = true;
				break;
			}
		}
		return isPrescriptionRequired;
	},
};

export default commonService;

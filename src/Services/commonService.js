import { CartAtom } from '../Recoil/atom';

const commonService = {
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
};

export default commonService;
